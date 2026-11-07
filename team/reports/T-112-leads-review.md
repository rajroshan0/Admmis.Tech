# T-112 Review: collections and lead API (T-407, neha)
Reviewer: hritik · 2026-11-07 · Verdict: **CHANGES REQUIRED** (3 small security must-fixes, then approved; I do not need to re-review the rest)
Read: route, handle, request, config, redirect, ratelimit, turnstile, payload-deps, Leads, LeadRateLimits, schema. Not run: tests, DB parts (need Docker).

## My T-407 conditions: all met
HMAC of IP (not raw), limiter fails open, Origin / Sec-Fetch-Site check on every path, 3 per hour for unverified, 303 with whitelisted targets and `?error=<code>` only, no CRM job for no-JS, honeypot `contact_ref_hp` (strict zod schema, handled before parsing), JSON path cannot claim no-JS (needs a token), one transaction for lead + jobs, logs carry no PII, leads: create false everywhere, personal fields locked, editors see nothing, delete admin only.

## Must-fix
1. `IP_HASH_SALT` defaults to `'dev-only-salt'`: with a known key, the stored IPv4 HMACs can be reversed by brute force. In production (`NODE_ENV=production`) require the variable, minimum 32 chars, else refuse to start. Add to `.env.example` as empty.
2. `clientIp` with `TRUSTED_PROXY=none` takes the **leftmost** `X-Forwarded-For` value, which the client controls: rotating it defeats every per-IP limit. Use the rightmost value (the one our proxy appended), and in production require `TRUSTED_PROXY=cloudflare`. `CF-Connecting-IP` is only safe if the origin accepts traffic from Cloudflare only: raj must firewall the VPS to Cloudflare ranges (or Caddy `trusted_proxies`). Missing header gives `'unknown'`, one shared bucket for everyone: log it and do not rate-limit on it.
3. Turnstile: any `success:false` becomes `invalid` (403), including Cloudflare `error-codes` `invalid-input-secret`, `missing-input-secret`, `internal-error`. A wrong or missing secret would reject every real lead. Map those codes (and an empty secret in production) to `unreachable`, log `turnstile_misconfigured`, and let the unverified path with its limits take over. Only `invalid-input-response` / `timeout-or-duplicate` are `invalid`.

## Before launch (not before commit)
4. `bump()` is find-then-update, not atomic: parallel requests undercount, and two simultaneous first hits hit the unique key, throw, and the limiter fails open exactly under a parallel flood. Use one atomic upsert (`INSERT ... ON CONFLICT (key) DO UPDATE SET count = count + 1 RETURNING count`) through the Drizzle handle, and verify with Docker. Also 4 writes per request: acceptable, but measure.
5. Body limit is checked after `req.text()`; a chunked body is read fully first. Cloudflare caps it, so low risk; stream with a byte cap if cheap.
6. `submitLead` swallows exceptions silently: log the error name (no message with PII) so a broken DB is visible in Sentry.
7. Sales can edit note `by`/`at` (forgeable author); make `by` set by hook. `ipHash` and `idempotencyKey` are hidden in the admin UI but readable over REST by sales: add field-level read false.
8. `LEAD_ALLOWED_HOSTS` defaults to `localhost:3000` and fails closed in production if forgotten: put it in `.env.example` and raj's deploy checklist with `TRUSTED_PROXY`, `TURNSTILE_SECRET_KEY`.

## Re-check 2026-11-07 (neha's fixes): APPROVED
Verified in code: production config refuses a short or default `IP_HASH_SALT`, `TRUSTED_PROXY` other than cloudflare, and a missing Turnstile secret; `clientIp` uses the rightmost `X-Forwarded-For`; Turnstile secret-error codes map to `misconfigured`, which stores the lead as unverified and logs. Nit: the new production checks also fire in any `NODE_ENV=production` run, including the CI e2e against `next start`; rajaros/raj must set dummy-but-valid values there. Open before launch: atomic `bump()` upsert (Docker session) and the Cloudflare-only origin firewall (raj).
