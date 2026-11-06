# Plan — T-402 Lead API contract & pipeline design
Owner: neha · Date: 2026-11-06 · Due: Fri 13 Nov · Reviewer: hritik

## 1. Goal (in my own words)
`docs/api/leads.md`: a written contract for `POST /api/leads` and the pipeline behind it, so Mahendra can build the form and shared zod schema, Raj can provision env/secrets, Rajaros can write test cases, and I can implement in week 2. Guarantee (ADR-007): once the API returns success, the lead is in PostgreSQL and no downstream failure (email, chat, CRM) can lose it.

## 2. Inputs I read
ADR-005/006/007, `docs/architecture.md` (Lead pipeline), `docs/standards.md` (§3 errors/logging, §8 security), `docs/pricing-model.md` (size bands), `seo/sitemap.md` (forms on contact, pricing, service, rent pages), open question Q10 (chat/email/CRM unknown). Depends on T-401 (`leads` collection fields).

## 3. Approach
- **Order of steps:** parse JSON (size cap) -> zod validate -> honeypot -> Turnstile siteverify -> rate limit -> idempotency check -> insert `leads` -> enqueue outbox jobs -> 201. Architecture lists Turnstile first; I will put cheap checks (size, zod, honeypot) before the Turnstile network call to save cost, and flag this small deviation to Hritik.
- **Outbox pattern:** table `leadJobs` (or `leadDeliveries`): one row per channel (email, chat, crm), status pending|sent|failed|dead, attempts, nextAttemptAt, lastError (no PII), created in the SAME transaction as the lead insert. A worker (Next.js route called by cron/Raj's scheduler, plus an immediate best-effort attempt after the response via `after()`) processes due jobs with exponential backoff (e.g. 1m, 5m, 30m, 2h, 12h, then dead + admin alert). Idempotency keys per channel to avoid duplicates.
- **Swappable adapters (Q10 unknown):** interfaces `EmailChannel`, `ChatChannel`, `CrmChannel`; env selects provider (Resend or Brevo; Slack webhook or Telegram/WhatsApp; HubSpot Free). Everything TODO(roshan) until Q10 answered; a `noop`/log-only adapter works for staging.
- **Dead-letter safety net:** a lead whose jobs are dead remains visible in admin with channel status; a daily digest email lists leads with failed channels.
- **Privacy/consent (ADR-006):** consent checkbox for contact processing with timestamp + policy version stored; UTM/referrer/landing page stored; IP stored only as salted hash for rate limit/abuse (not raw), retention period proposed (e.g. 24 months, TODO(roshan)). Logs carry lead ID only; Sentry beforeSend strips PII.
- **Contract content:** request schema (name, company, email, phone, service, sizeBand, budgetRange, message, source{utm_*, referrer, landingPath}, locale, consent, turnstileToken, honeypot, idempotencyKey), validation rules (lengths, email, E.164-ish phone, at least email or phone), response shapes, error code table with HTTP status, i18n error keys, rate limit numbers, CORS/origin check, notification templates (draft text, EN), CRM field mapping (HubSpot properties), test case list for Rajaros, env var names.
- Alternatives rejected: calling notifications inline and catching errors (loses jobs on crash); external queue (Redis/BullMQ) at launch -- extra infra on a single VPS; Postgres outbox is enough (can revisit).

## 4. Steps
1. Align on `leads` fields with T-401. 2. Request/response + zod schema (code block, shared with Mahendra). 3. Pipeline sequence diagram (mermaid). 4. Outbox and retry design with state machine. 5. Error codes. 6. Security (Turnstile, rate limit, origin, size, honeypot, PII). 7. Notification templates. 8. CRM mapping. 9. Env vars. 10. Test cases + unit-test list. 11. Self-check vs ADR-007 failure matrix (each channel down, DB down, Turnstile down). 12. Handoffs.

## 5. Deliverables
| File | Content |
|---|---|
| `docs/api/leads.md` | Lead API contract and pipeline design v0.1 |
| `team/reports/T-402-lead-api.md` | Completion report |

## 6. Acceptance criteria (testable)
- [ ] Request and response schemas complete with every field typed, limits and error codes.
- [ ] Failure matrix proves no lead lost when email, chat, CRM, Turnstile service, or worker fails (DB-down returns 503, lead not acknowledged).
- [ ] Retry schedule, max attempts, dead-letter handling defined.
- [ ] Rate limit values and Turnstile flow defined; secrets are env names only.
- [ ] Notification templates and CRM mapping drafted; unknowns marked TODO(roshan).
- [ ] Test case list usable by Rajaros; zod schema agreeable to Mahendra.

## 7. Assumptions · Risks · Questions
- DECISION (pm, 2026-11-06): Turnstile UNREACHABLE (timeout/5xx) -> do NOT fail closed. Save lead with `verification: unverified`, skip CRM push, send email/chat alert with a "spam check unavailable" flag, sales triages in admin. Invalid or missing token -> reject (403). Both cases go in the failure matrix.
- ASSUMPTION: no Redis; rate limit in Postgres or in-memory per instance + Cloudflare WAF rule (Raj).
- ASSUMPTION: worker triggered by VPS cron hitting a secret-protected route (Raj provides).
- RISK: Q10 unanswered until 20 Nov -> adapters swappable, defaults to log-only.
- RISK: single-instance memory rate limit resets on restart -> DB-based counter.
- QUESTION (hritik): outbox in Postgres + cron worker acceptable? Check order deviation OK?
- QUESTION (mahendra): is a thank-you redirect or JSON success handled client-side? idempotency key generated client-side?
- QUESTION (raj): cron/scheduler for worker, Cloudflare rate-limit rule.

## 8. Estimate
~1.5 working days after T-401. Could grow if CRM choice changes.
