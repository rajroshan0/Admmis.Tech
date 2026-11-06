# Report — T-402 Lead API contract & pipeline design
Owner: neha · Date: 2026-11-06 · Status: DONE (draft v0.1, awaiting Hritik review)

## Delivered
| File | What it is |
|---|---|
| `docs/api/leads.md` | Request/response schema (zod), error codes, step order, Turnstile, rate limits, outbox/retry/worker, failure matrix, notification templates, HubSpot mapping, env names, adapter interfaces, form contract, test cases |

## Acceptance criteria
- [x] Schemas, limits, error codes complete (sections 2, 2.3).
- [x] Failure matrix covers email, chat, CRM, all down, worker down, crashes, DB down, Turnstile invalid and unreachable, rate limit, honeypot, duplicate (section 7).
- [x] Retry schedule, dead-letter and digest defined (section 6).
- [x] Rate limit and Turnstile flow defined; env names only, no secrets.
- [x] Templates and CRM mapping drafted; unknowns TODO(roshan).
- [x] 15 e2e cases + unit list for Rajaros.

## Decisions & assumptions made
- PM decision applied (Hritik agreed): Turnstile unreachable stores lead as `unverified-turnstile-unavailable`, skips CRM, flags alerts. Guardrails: per-IP cap 2/h and 5/24h for unverified, circuit breaker at N=20 unverified/hour (TODO(roshan)) returning 503 `verification_unavailable` with WhatsApp/phone fallback, metrics for Raj. Invalid/missing token rejects.
- Idempotency lookup runs before rate limit and Turnstile (Hritik review).
- Hritik's nits applied: idempotency before Turnstile, rate limit before Turnstile, honeypot fake 201, single transaction, SKIP LOCKED, secret worker header, leadId-only jobs.
- Log-only adapters until Q10.
- ASSUMPTION: Payload local API transaction covers lead+jobs; else Drizzle (spike Mon 16 Nov).
- Rate-limit numbers are proposals.

## Open issues / risks
- Q10, CRM approval, retention, auto-reply need Roshan. Worker scheduler and WAF rule need Raj.

## Handoffs
- mahendra: section 13 form contract + schema. raj: sections 5, 6.3, 11. rajaros: section 14. sudip: UTM capture, budget ranges.

## Needs Roshan
- Q10 answers, CRM account approval, retention period, auto-reply permission.

## Update 2026-11-06 (post-review)
Added unverified guardrails per PM and Hritik: stricter per-IP cap (2/h), circuit breaker at N=20 unverified/hour (TODO(roshan) confirm) returning 503 `verification_unavailable` with WhatsApp/phone fallback, metrics for Raj. Hritik confirmed the Turnstile ruling.
