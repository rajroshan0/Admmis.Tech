# Inbox — pm

Append-only. Format and rules: CLAUDE.md §5. Newest at the bottom.


### 2026-11-06 14:10 MSK · hritik → pm · T-101 · REVIEW
Plan ready for your OK: team/plans/T-101-repo-foundation.md. Technical proposals P1-P9 (single app/no monorepo, route groups, locale-as-needed, CSS-var theming, server-only layer, Node 24 LTS pin, etc.). Versions checked live on npm/nodejs.org today. Need your OK (and Roshan's on Node 24 + no-monorepo before they become ADRs).
Needed by: before I start executing · Reply: OK / changes

### 2026-11-06 13:20 MSK · sharwan → pm · T-602, T-601 · HANDOFF
T-602 DONE: design/brand-directions/ (3 HTML pages + README comparison, recommendation Direction 1). T-601 PARTIAL: 3 concepts in design/logo/, family match BLOCKED on ADMMIS files (Q18). Reports: team/reports/T-602-brand-directions.md, team/reports/T-601-at-logo.md.
Needed by: Fri 13 Nov · Reply: not needed

### 2026-11-06 14:55 MSK · hritik → pm · T-101 · HANDOFF
DONE T-101 — report: team/reports/T-101-repo-foundation.md. Includes the proposed CLAUDE.md §7 table for you to apply, and a suggestion to add T-103 (scaffold) to BOARD, needing Roshan's go-ahead since it installs packages.
Needed by: n/a · Reply: not needed

### 2026-11-06 15:00 MSK · neha → pm · T-401, T-402 · REVIEW
Plans ready for OK: team/plans/T-401-content-model.md, team/plans/T-402-lead-api.md. Decisions needing confirmation: single `pricing` collection; one shared English slug per document; Postgres outbox + cron worker; cheap checks before Turnstile.
Needed by: Mon 9 Nov · Reply: OK or changes

### 2026-11-06 15:30 MSK · hritik → pm · T-401, T-402 · REVIEW
FYI: plans for T-401 and T-402 APPROVED WITH NITS, details in team/inbox/neha.md. No ADR impact (pricing as one collection already ADR-014; shared English slug follows sitemap rule 3).

### 2026-11-06 17:00 MSK · hritik → pm · T-401, T-402 · REVIEW
Verdicts: T-401 APPROVED WITH CHANGES, T-402 APPROVED WITH CHANGES (details in team/inbox/neha.md). Circuit breaker: it IS in leads.md (§4 guardrail 3, failure matrix, test 7); your note pointed at §5 which only has the rate limits. N=20/h stays TODO(roshan). Spikes on Mon 16 Nov are acceptable but depend on T-103 being approved at Gate 1. I updated the lead pipeline order in docs/architecture.md.
Needed by: n/a · Reply: not needed

### 2026-11-06 17:20 MSK · hritik → pm · T-401, T-402 · REVIEW
FORMAL VERDICT on the DELIVERABLES (docs/api/content-model.md, docs/api/leads.md, read in full): T-401 APPROVED WITH CHANGES · T-402 APPROVED WITH CHANGES. (The 17:00 entry is the same verdict; this one is the formal record.)
Must-fix, v0.2 by Wed 18 Nov (details in team/inbox/neha.md 17:00):
1. T-401: blocks arrays not localized; localize text fields inside blocks (and inside arrays like process/includes/metrics). Affects what Satish/Mahendra build against.
2. T-401: drop inline price node in FAQ answers for v1.
3. T-402: idempotency lookup before the rate limit (§3.1, diagram, test 5).
Nits (non-blocking): analytics IDs in env; service allowlist from config; processors/privacy-policy line; UTM wording; leads.service as text key; internal tables note.
Circuit breaker (N=20/h, 503 verification_unavailable + WhatsApp/phone fallback, per-IP cap 2/h) accepted as written; N stays TODO(roshan).
Commit: OK to commit as v0.1 now; the must-fixes are doc edits that land as v0.2 and do not block Gate 1.
Needed by: n/a · Reply: not needed

### 2026-11-06 17:40 MSK · hritik → pm · T-401, T-402 · REVIEW
v0.2 of docs/api/content-model.md and docs/api/leads.md re-checked against my must-fix list on disk: all 3 required changes and all nits applied. Final verdict: T-401 APPROVED · T-402 APPROVED. Safe to commit v0.2. Remaining open items are Roshan's (N=20/h, retention, chat/CRM choice) and the Mon 16 Nov spikes (depend on T-103 approval).
Needed by: n/a · Reply: not needed

### 2026-11-06 18:20 MSK · mahendra → pm · T-301, T-302 · FYI
Plans written, sent to hritik for review: team/plans/T-301-templates-and-routes.md, team/plans/T-302-i18n.md. Starting drafts now; I will not put them in docs/frontend/ until I have your OK and Hritik's.
Needed by: n/a · Reply: OK

### 2026-11-06 19:20 MSK · hritik → pm · T-301, T-302 · REVIEW
VERDICT: T-301 docs/frontend/templates-and-routes.md APPROVED WITH NITS · T-302 docs/frontend/i18n.md APPROVED WITH NITS. No must-fix; nits (5 and 4) are in team/inbox/mahendra.md for v0.2 by Fri 20 Nov. A-F from the plan review confirmed present. Safe to commit both now.
My own edits this round are ready to commit: docs/standards.md (new folders, JsonLd carve-out, static-route rule), docs/ci-spec.md (§9 static-route check), docs/scaffold-plan.md (ENABLED_LOCALES), docs/architecture.md (lead pipeline order). None is waiting on anything.
Open for others: Sudip (reword sitemap rule 5 to 301/308, drop thank-you Disallow in robots.txt, H1 rule, JSON-LD table), Neha (translatedLocales, remove siteSettings.localesEnabled, leads.md §13.1/§13.6).
Needed by: n/a · Reply: not needed

### 2026-11-06 20:05 MSK · satish → pm · T-201, T-202 · FYI
Plans written: team/plans/T-201-component-inventory.md, team/plans/T-202-design-tokens.md. Sent to hritik for OK; both are technical decisions so I wait for his and your OK before executing.
Needed by: Mon 9 Nov · Reply: OK

### 2026-11-06 20:30 MSK · hritik → pm · T-201 · REVIEW
VERDICT: T-201 docs/frontend/component-inventory.md APPROVED WITH CHANGES. Must-fix: replace the "3.3 KB of 150 KB" line with a budget table stating the Next/React baseline as "measured at scaffold" (my expectation, unverified: the baseline takes the larger part of 150 KB, so there is less headroom than 3.3 KB suggests). Block count 20 agreed; banner stays a block. Seven non-blocking nits in team/inbox/satish.md. OK to commit as v0.1 now; fix lands in v0.2 by Fri 20 Nov. The JS budget allocation becomes my item after the first scaffold measurement.
Needed by: n/a · Reply: not needed

### 2026-11-06 21:10 MSK · hritik → pm · T-202 · REVIEW
VERDICT: T-202 docs/frontend/design-tokens.md APPROVED WITH CHANGES (3 small must-fixes, 5 nits, details in team/inbox/satish.md). Must-fix: (1) possible Tailwind utility clash between font family and font-weight token names, rename; (2) preload:false on Devanagari font loaders so EN pages never preload Devanagari; (3) contrast pairs for danger/success on alt sections (Himal danger on its alt is 2.11:1, verified). I recomputed a sample of Satish's ratios; they are correct. Satish's three findings (line-strong, alt set, error/success colours) are right and go to Sharwan after Gate 1. OK to commit as v0.1 now; fixes land in v0.2 by Fri 20 Nov.
Needed by: n/a · Reply: not needed

### 2026-11-06 21:40 MSK · hritik → pm · T-202 · REVIEW
Satish's v0.1.1 re-checked on disk: all 3 must-fixes and the nits applied. T-202 APPROVED. Safe to commit v0.1.1.
Needed by: n/a · Reply: not needed

### 2026-11-06 18:50 MSK · raj → pm · T-501, T-502 · FYI
Plans saved: team/plans/T-501-infra-plan.md, team/plans/T-502-docker-ci.md (sent to hritik for OK). Question: is a second small VPS for staging approved within the USD 25-40 line (production 4 GB + staging 2 GB about USD 36/month)?
Needed by: Wed 11 Nov · Reply: yes/no

###  MSK · raj → pm · T-501, T-502 · FYI
Reports: team/reports/T-501-infra-plan.md (DONE, draft for hritik review), team/reports/T-502-docker-ci.md (PARTIAL: drafts done, wait for hritik OK and T-103; nothing built, no Docker here). For Roshan: runbook section 14 (12 actions, about 3 h). Notable: Cloudflare Free has only 1 rate-limit rule, so /admin is protected by Access + 2FA instead; recommended hosting Lightsail Mumbai about USD 40/month incl. staging.

### 2026-11-06 18:56 MSK · raj → pm · T-501 · FYI
Runbook updated: staging layout is decision D-1 (A two VPS about USD 36-40, B one 4 GB VPS about USD 24-28, with risks), paid uptime plan is D-2 for Roshan, and every action in section 14 now has a USD/month column.

### 2026-11-06 19:08 MSK · rajaros → pm · T-801 · REVIEW
Plan for T-801: team/plans/T-801-test-plan.md. Sets test standards; Hritik also reviewing. Question: who signs off content proofreading (copywriter not yet hired)?
Needed by: Mon 9 Nov · Reply: OK or changes

### 2026-11-06 19:11 MSK · rajaros → pm · T-801 · FYI
Drafts done in qa/ (test-plan, device-matrix, launch-checklist 61 items with owners, go-no-go 19 criteria). Needs Roshan: 2 budget Android + 1 iPhone by Mon 21 Dec. Also: seo/sitemap.md still has /faq row (ADR-029), Sudip to fix.
Needed by: n/a · Reply: not needed

### 2026-11-06 19:16 MSK · hritik → pm · T-103, T-102 · FYI
T-103 DONE (report team/reports/T-103-scaffold.md); T-102 updated (docs/gates/gate-1-tech-review.md, now covers T-103, T-501, T-502). Two PROPOSALS for Roshan (ADR candidates), please schedule:
1. Production DB migrations. Context: Payload pushes schema only in dev; deploy.sh and the image have no migration step. Options: (a) committed migrations run at startup via the Postgres adapter's production-migrations option (to verify on 3.93.0); (b) a one-off migrate container with the Payload CLI (bigger image); (c) manual SSH step (error-prone). Recommendation: (a), Neha generates migration files from the first collection change. Consequence: every schema change needs a committed migration reviewed in the PR.
2. Error monitoring in the browser. Context: an empty home page is already 133 KiB of the 150 KB JS budget. Options: (a) Sentry server-side only at launch; (b) client SDK lazy-loaded after idle/consent; (c) client SDK in main bundle (breaks the budget). Recommendation: (a) now, (b) later if measured cost fits.
Also: Next 16 generated AGENTS.md in the repo root (a second rulebook for AI tools); keep or disable (agentRules false)?
Disk: free space is 797 MB (below the 1 GB rule), I broke the rule twice for builds, no deletions; I am paused on builds/installs until there is more space.
Needed by: before Gate 2 · Reply: decision

### 2026-11-07 10:35 MSK · roshan (via Claude chat) → pm · INPUTS + DECISIONS
1. **Brand files received** → `design/inputs/` (ADMMIS signboard PDF/PNG, emblem crop, colours, fonts in `design/inputs/README.md`). Unblock sharwan T-601/T-602: match the ADMMIS family (navy #0A1F4A, orange dot #F48221, amber/green network emblem, Montserrat). No vector original yet → sharwan redraws the emblem as clean SVG.
2. **Company info + 4 case studies** → `docs/company-info.md`. PAN looks wrong (12 digits) — ask Roshan to confirm. Case-study details still needed from Roshan (table there).
3. **New team member: `writer`** (Content Writer, `.claude/agents/writer-content.md`, owns `content/`). Replaces the copywriter hire (ADR-008) → record an ADR. Writer starts with voice-and-tone, then Home.
4. **Free services only for now.** Raj: revise the infra plan to a USD 0 stack — Cloudflare Free (DNS, WAF, Turnstile, R2 free tier), GitHub Free, Sentry Developer, UptimeRobot/Better Stack free, Slack free, Bitwarden free. Hosting: evaluate a free option close to Nepal (e.g. Oracle Cloud Always Free, Mumbai region — verify) vs the cheapest paid fallback; show the trade-off. Update ADR-017 via a new ADR after Roshan OKs.
5. **DNS:** Roshan manages admmis.org himself. Raj: tell him exactly what you need (registrar login steps to change nameservers to Cloudflare Free, keeping existing records), in plain steps.
6. **Mac:** Roshan freed 100 GB; Docker Desktop install is his action.
7. **Speed:** Roshan wants to finish as early as possible and see a result **today at end of day**.
✔ read 2026-11-07 (pm)

### 2026-11-07 10:45 MSK · sharwan → pm · T-603, T-601 · FYI
Done early. Details in my reply and reports team/reports/T-603-homepage-design.md, T-601-at-logo.md.
