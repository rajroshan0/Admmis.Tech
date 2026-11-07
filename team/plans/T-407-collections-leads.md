# Plan — T-407 remaining collections + lead API
Owner: neha · 2026-11-07 · Reviewer: hritik

## Goal
Finish cases, posts, events, teamMembers, clients, testimonials, leads, leadJobs; ship `POST /api/leads` per docs/api/leads.md v0.2 so no lead is lost.

## Approach (decisions for hritik, mahendra)
1. Collections follow content-model + T-604b limits (cases.year, posts.excerpt 280, events.locationNote/archiveNote). Same access (contentAccess), drafts, published-only via `findPublished`.
2. Leads: `leads` and `leadJobs` as Payload collections. Admin and sales read/update leads; editors none. Inserts only by server code (create access false for everyone, route uses local API with overrideAccess). PII fields never in default columns. Lead + 3 jobs written in one transaction (`payload.db.beginTransaction`).
3. Rate limit: hidden Payload collection `leadRateLimits` (keyHash, windowStart, count) instead of a raw table, so the migration is generated normally. Limits per leads.md section 5.
4. Validation: zod 4 in `src/lib/schemas/lead.ts`, shared with the form. Phone: Devanagari digits (U+0966..096F) are normalised to ASCII before validation, then 7 to 20 digits. Answer for sharwan: yes.
5. Turnstile: `src/lib/server/leads/turnstile.ts`, 3 s timeout, hostname check. Missing secret in dev/CI: only the Cloudflare dummy keys allowed.
6. **No-JS submit (decision needed).** Turnstile needs JS, so a no-JS form has no token. Proposal: `/api/leads` also accepts `application/x-www-form-urlencoded` (plain HTML form or server action). A request without a token is stored as `verification = unverified-no-js`, no CRM job, email and chat alerts flagged "no spam check", stricter limit (2 per hour per IP hash), honeypot still applies, answer is a 303 redirect to the thank-you page. Same circuit breaker as the unverified path. Needs one new enum value in leads.md and content-model.
7. Not in this task (stated so nobody assumes): email/chat/CRM senders and the cron worker route (T-410), `/api/health/ready`, `after()` first attempt. The route inserts jobs; sending is next.

## Steps / deliverables
`src/collections/{Cases,Posts,Events,TeamMembers,Clients,Testimonials,Leads,LeadJobs,LeadRateLimits}.ts`, `src/lib/schemas/lead.ts`, `src/lib/server/leads/{normalize,turnstile,ratelimit,create}.ts`, `src/app/api/leads/route.ts`, tests, `src/config/services.ts`, docs update (leads.md v0.3), report.

## Acceptance
- [ ] typecheck, lint, tests pass without a DB.
- [ ] Unit tests: schema (strict, one-of email/phone, Devanagari digits, honeypot), turnstile outcomes (mocked fetch), rate-limit decision, access rules for leads.
- [ ] DB parts (transaction, idempotent replay, rate-limit table) wait for Docker (C1).

## Risks
Route cannot be run end to end without Postgres. Mitigation: logic in pure functions behind small interfaces, route tested with a fake payload.
