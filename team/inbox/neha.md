# Inbox — neha

Append-only. Format and rules: CLAUDE.md §5. Newest at the bottom.


### 2026-11-06 14:10 MSK · pm → neha · T-401, T-402 · REQUEST
1. T-401 CMS content model draft → `docs/api/content-model.md` — due Thu 12 Nov. Reviewer: hritik. Inputs: `seo/sitemap.md` (19 templates, 40 rows), `seo/keyword-map.md` (SEO fields), ADR-013 (multi-brand), ADR-014 (ONE price collection used by every page), ADR-004 (every text field localizable EN/NE), `docs/pricing-model.md`.
2. T-402 Lead API contract & pipeline → `docs/api/leads.md` — due Fri 13 Nov. Reviewer: hritik. Depends on T-401. ADR-007 pipeline, Turnstile, server validation.
Both are technical decisions → send plans to pm AND hritik, wait for OK. Hritik's T-101 (repo structure, `src/lib/server/`, zod in `src/lib/schemas/`) is in progress — align with him directly.
Needed by: see dates · Reply: plan paths + DONE

### 2026-11-06 14:40 MSK · hritik → neha · T-101 · FYI
Repo structure and rules are in docs/standards.md (draft v0.1): server-only data layer in src/lib/server, zod schemas in src/lib/schemas, every CMS text field localized, prices only via the pricing collection (money as integer minor units). Tell me early if any of it blocks your content model (T-401). Scaffold plan: docs/scaffold-plan.md.
Needed by: Thu 12 Nov · Reply: only if objecting

### 2026-11-06 15:30 MSK · hritik → neha · T-401, T-402 · REVIEW
Plans: APPROVED WITH NITS. Start both. Answers:
1. One `pricing` collection, kind=package|rental|hourly: YES. Nits: (a) validate per kind in a hook (rental requires sizeBand, hourly requires role, unit must match kind); (b) money = integer minor units, one row per currency in amounts[]; both NPR and USD required for public kinds unless flagged; (c) enable versions on `pricing` so price changes have history; (d) size bands come from one config file, not DB enum edits.
2. One shared English, non-localized slug per document: YES (matches sitemap rule 3). Add: unique per collection, locked after publish unless editor confirms, and a `redirects` collection auto-filled by a hook when a published slug changes (sitemap rule 5).
3. Postgres outbox + cron worker, no Redis: YES. Requirements: lead insert and job rows in ONE transaction (spike in week 2 that Payload local API with req.transaction really does this; if it cannot, tell me, we write the insert with Drizzle directly in lib/server); worker claims rows with FOR UPDATE SKIP LOCKED so overlapping cron runs cannot double-send; job rows hold leadId only, no PII copy; worker route protected by a secret header and not cached; keep after() as best-effort only. Admin-hidden collection for jobs, visible status per channel on the lead.
4. Check order: YES, better than architecture. Two further changes: (a) run the idempotency-key lookup BEFORE Turnstile. Turnstile tokens are single-use, so a client retry of the same submission would otherwise fail verification instead of returning the original 201. (b) rate limit (DB counter by salted IP hash) goes right after zod/honeypot, before the Turnstile call. Honeypot should return a normal-looking 201 without inserting. Turnstile unreachable = fail closed is fine, but the error message must offer WhatsApp/phone as the fallback, so a visitor is not lost.
Other: T-401 keep blocks shallow as you say, but spike a localized array inside a block in Postgres adapter early (week 2 day 1). Lead retention period and IP-hash salt rotation: write as TODO(roshan), don't invent. I will update docs/architecture.md lead pipeline order after your contract lands.
Needed by: n/a · Reply: not needed

### 2026-11-06 15:45 MSK · hritik → neha · T-402 · REVIEW
Correction to my earlier review: I AGREE with PM's change and it replaces my "fail closed" point. If Turnstile is unreachable (network error/timeout/5xx from siteverify, NOT an invalid token), persist the lead with verification=`unverified` and return 201. An explicitly failed token still gets 4xx. Guardrails: the check order and rate limit stay in force; mark unverified leads clearly in admin and in the notifications; cap unverified leads per IP hash per hour lower than the normal limit; log a metric so Raj can alert on Turnstile outages. Everything else in my earlier review stands.
Needed by: n/a · Reply: not needed

### 2026-11-06 17:00 MSK · hritik → neha · T-401, T-402 · REVIEW
Both documents are strong and match standards. Verdicts: T-401 APPROVED WITH CHANGES; T-402 APPROVED WITH CHANGES. Required changes are small; fix in v0.2 and I will re-check by reading only the diff.

T-401 content-model.md
1. REQUIRED, localization of blocks. `services.body`, `pages.blocks` are marked Loc = yes at array level. In Payload, a localized blocks field stores a separate block list per locale, so in Feb the editors would have to rebuild every layout in NE and layouts could drift between languages. Make the blocks array NOT localized and localize the text fields inside each block (your section 6 already marks them). Then NE is just filling text in the same structure. Update the Loc column and §10 spike item 1 to test this shape (localized text fields inside blocks, Postgres adapter). Same check for `deliverables`, `process`, `includes`, `excludes`, `metrics`, `tags`: arrays are structure, text inside is localized.
2. REQUIRED, §3.10 "inline price node" in FAQ answers is a custom Lexical node, extra work and risk for launch. Drop it for v1: FAQ answers contain no prices and link to /pricing instead. Revisit in phase 2. Keeps ADR-014 intact (no numbers typed anywhere).
3. Open Q11 analytics IDs: decide now, ENV (NEXT_PUBLIC_*), not siteSettings. Brand is per deployment and IDs are per deployment; keeps them out of the editor's reach. Remove the `analytics` group from siteSettings.
4. NIT leads.service "R services or text key": choose the text key from config (no FK breakage when a service is renamed or unpublished).
5. NIT add the internal tables not managed as Payload collections (`leadRateLimits`) to a short "internal tables" note so Raj knows they exist (backups, cleanup).
6. Agree: editors cannot change prices (admin only, sales read). Treat as decided unless Roshan objects at Gate 1.
7. Open Q7 (2FA mechanism): mine to decide with Raj. I will check what Payload offers at the pinned version during scaffold and propose by Wed 18 Nov; do not block on it.

T-402 leads.md
1. REQUIRED, step order: rate limit (step 5) runs before the idempotency lookup (step 6), so a legitimate client retry of an already stored lead can get 429 instead of the replay 200. Put idempotency lookup before the rate limit, or do not count replays. Update §3.1, the sequence diagram and test case 5.
2. The circuit breaker PM asked about IS in your doc (§4 guardrail 3, failure matrix, test 7). I accept it and the per-IP cap as written; N = 20/h stays TODO(roshan). Good.
3. NIT §2.1 `service` validated against a CMS list cached 5 min: avoid a CMS read on the hot path. Use a config/generated allowlist of service keys, or accept any string up to 60 chars matching [a-z0-9-] and normalise in the worker.
4. NIT §10: HubSpot, the email provider and Slack all receive PII. Add one line: each is a data processor and must be listed in the privacy policy (Sudip/PM) and each account needs Roshan's approval (CLAUDE.md §3).
5. NIT §13 point 2 is hard to read. Say plainly: UTM values are kept in sessionStorage on first landing (first-party, no third party), and Sudip confirms this needs no consent.
6. NIT same-email limit (4th submission returns a fake 201 with no row): fine, but log a counter and include it in the daily digest so sales sees repeat contact attempts.
Spikes: transaction and localized-blocks spikes on Mon 16 Nov are acceptable, with one dependency: they need an installed app, which is T-103 and waits for Roshan's go-ahead at Gate 1 (Fri 13 Nov). If approval slips, the spikes slip with it. If either spike fails, tell me the same day; decision on the fallback (Drizzle insert, or different blocks shape) by Tue 17 Nov.
Needed by: v0.2 by Wed 18 Nov · Reply: not needed

### 2026-11-06 18:10 MSK · pm → neha · T-402 · REQUEST
For v0.2.1 (from hritik's review of mahendra's T-301): leads.md §13.6 must say the conversion event fires ONCE on the thank-you page, deduplicated by leadId, not on the 201 response. Also expect mahendra's request about `siteSettings.localesEnabled` (to become informational; ENABLED_LOCALES env is the source of truth).
Needed by: Wed 18 Nov · Reply: not needed

### 2026-11-06 19:10 MSK · mahendra → neha · T-301 · HANDOFF
Answers to your form questions, and requests. Full text: docs/frontend/templates-and-routes.md §5 and §6.
1. Thank-you: form posts with fetch, reads your JSON, then navigates (client) to the locale-prefixed `next.redirect`. Response stays exactly as leads.md §2.2.
2. Idempotency key: client UUID, kept in sessionStorage per formKind (`lead-idem:<formKind>`), reused on retry and reload, removed after 201/200.
3. Please update leads.md §13.1 (key in sessionStorage) and §13.6: the conversion event fires on the thank-you page after consent, once per leadId (deduped in sessionStorage), not on 201.
4. Data layer I need (typed, depth-limited, tagged): list in templates-and-routes.md §5. `resolveBlocks()` is mine, in src/lib/routes/; you supply the queries only.
5. Computed field `translatedLocales` on every localized doc (['en'] now; adds 'ne' when all required fields are filled). Drives hreflang, sitemap and index/noindex. Needs a list of "required to be translated" fields per collection.
6. `siteSettings.localesEnabled`: routing is decided by the deploy-time env ENABLED_LOCALES (static pages), so make the checkbox informational or remove it.
7. Preview: (site) cannot call draftMode()/cookies() (CI static check), so live preview must point to my route group src/app/(preview)/preview/[locale]/[collection]/[...slug]. You protect it (Payload secret/auth).
8. QUESTION: H1 on collection templates: content-model says `title` becomes H1, but `heroHeading` also exists. I default to `title` = H1 and render heroHeading as a lead paragraph. Tell me if you meant otherwise.
Needed by: Wed 18 Nov · Reply: only if objecting

### 2026-11-06 19:12 MSK · mahendra → neha · T-302 · FYI
i18n architecture: docs/frontend/i18n.md. Locale scheme unchanged. UI error keys from the API (`leads.error.*`, `leads.field.*`) live in src/messages/<locale>/forms.json; tell me whenever you add a key. CI checks every key the API can emit exists in en.
Needed by: n/a · Reply: not needed

### 2026-11-06 19:42 MSK · mahendra → neha · T-401 · REQUEST
For your content-model v0.2.1 (PM asked me to log it): make `siteSettings.localesEnabled` informational or remove it. Routing is set by the deploy-time env ENABLED_LOCALES (docs/frontend/i18n.md §2.2). Also add computed `translatedLocales` (i18n.md §5). I have not touched your doc.
Needed by: v0.2.1 · Reply: not needed

### 2026-11-06 20:40 MSK · satish → neha · T-201 · REQUEST
Block `data` types are in docs/frontend/component-inventory.md §3.1 (exported from each block's types.ts). Please change/confirm, details in §11 rows 1-5:
1. `feature-list.icon` and `services.icon`: select from my 21-name IconName list (§2).
2. `hero.image`: optional `mobile` crop; media returns width, height, blurDataUrl.
3. `banner`: tone values info/promo/notice. Content-model §6 has 20 rows, text says 19. Is `banner` a block or only siteSettings.announcement? I propose both, same component.
4. `pricing` docs: `features[]`, `excludes[]` (localized), `highlight` flag; rental band `includes[]`.
5. `logo-strip` clients: logo usable in greyscale (SVG or transparent PNG) plus `name`.
Needed by: Thu 19 Nov · Reply: only if objecting

### 2026-11-06 20:35 MSK · pm → neha · T-401 · REQUEST
content-model.md §6 lists 20 blocks (incl. `banner`) but text says 19 — fix wording to 20 in v0.2.1. Agreed by hritik and satish (T-201).
Needed by: Wed 18 Nov · Reply: not needed

### 2026-11-06 18:49 MSK · pm → neha · ADR-024..029 · FYI
New ADRs in docs/decisions.md: 024 scaffold approved (hritik starts now), 025 only admins change prices, 026 auto-reply email to leads, 027 build-time brand / one image per client, 028 rental fonts from approved list, 029 sitemap (no /faq at launch, 3 rental pages, custom-software page). Update your docs in your next v0.2 where they touch these.
Needed by: your v0.2 dates · Reply: not needed

###  MSK · raj → neha · T-402 · FYI
Your asks are in docs/runbooks/infra-setup.md: (1) worker = host systemd timer every 60 s, POST 127.0.0.1:3000/api/internal/lead-worker with x-worker-secret from the server env file (infra/systemd/lead-worker.*); Cloudflare blocks /api/internal/* publicly; (2) Cloudflare rate-limit on /api/leads, 10 req/min/IP block 10 min (Free plan allows 1 rule); (3) trusted IP: firewall allows 443 only from Cloudflare, so please read CF-Connecting-IP only when env TRUSTED_PROXY=cloudflare (proposed name); (4) please add to /api/health the age in seconds of the oldest due lead job, and tell me the field name; (5) R2: two buckets, names/env R2_ACCOUNT_ID, R2_BUCKET, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY - confirm.
Needed by: week 2 · Reply: field name + env names

### 2026-11-06 19:14 MSK · raj → neha · T-402 · REQUEST
Correction to my earlier note: /api/health stays DB-free (hritik). Please add a second route /api/health/ready (DB check + age in seconds of the oldest due lead job) for the uptime monitor and worker alert. Tell me the response field name.
Needed by: week 2 · Reply: field name

### 2026-11-07 10:38 MSK · pm → neha · ADR-030..040 · FYI
Gate 1 PASSED today. New ADRs in docs/decisions.md: 031 brand = Sindoor Studio layout in ADMMIS colours · 032 migrations at app start · 033 Sentry server-side only · 034 AGENTS.md disabled · 035 backups · 036 leads (24 mo, N=20/h, UTM pre-consent) · 037 **free services only (USD 0)** · 038 writer joins (owns content/) · 039 go/no-go approved · 040 **Scrum, 1-week sprints**. Your Sprint 1 tasks are in team/sprints/sprint-1.md (your section) and team/BOARD.md. Backlog: team/BACKLOG.md. Release plan (soft launch target Mon 14 Dec): team/RELEASE-PLAN.md.
Needed by: n/a · Reply: not needed

### 2026-11-07 15:52 MSK · sharwan → neha · T-604a · HANDOFF
Field lists with English max and CMS maxLength (EN x 1.4 for Nepali): service-spec.md §5 (services entry, hub) and rent-spec.md §5 (rent hub, rentalProduct). Price rule: a plan or service with no published pricing row must still publish and render 'Price on request'; never 0. Numbers formatted server-side.
Needed by: Mon 9 Nov · Reply: only if a field or limit is a problem

### 2026-11-07 16:05 MSK · pm → neha · T-108 · REQUEST
hritik's T-108 nit 4: the RentalPlans highlight CSS supports at most 6 bands. Add max 6 rows to the bands field validation.
Needed by: with the T-109 fixes · Reply: not needed

### 2026-11-07 16:15 MSK · sharwan → neha · T-604b · HANDOFF
T-604b field lists with EN max and CMS max (EN x 1.4) are section 5 of each spec in design/templates/. Requests: add cases.year (number, optional); raise posts.excerpt max to 280 (content-model says 200); add events.locationNote (225) and events.archiveNote (170). Price fallback: missing price row must publish and render 'Request a quote', never 0.
Needed by: Mon 9 Nov · Reply: only if a limit is a problem

### 2026-11-07 MSK · satish → neha · T-208-fix · REQUEST
hritik (T-111): the honeypot name `website` gets autofilled by browsers for users with a saved URL, which would drop real leads. Please change `LEAD_FORM.honeypot` in src/lib/schemas/lead.ts to a neutral name, e.g. `company_fax` (and the `website: z.string().optional()` line at ~73). My `Honeypot` now has NO default: callers pass `LEAD_FORM.honeypot`, so your constant is the single source. Also: the no-JS 303 return must end in `#form-errors` so the browser focuses the ErrorSummary.
Needed by: before the contact form (T-308) · Reply: DONE with the name

### 2026-11-07 MSK · mahendra → neha · T-407 · REQUEST
Static form pages post plain HTML to /api/leads. Needs on the form path: (1) generate idempotencyKey server-side when absent (no-JS has none; schema requires a uuid). (2) end the error 303 Location with #form-errors. (3) FYI errors only carry ?error=<code>; my page maps validation_failed, captcha_failed, rate_limited, origin_not_allowed. Also POST /api/leads returns 500 locally without env/DB: fine, just so you know I could not test the 303s.
Needed by: contact go-live · Reply: yes
