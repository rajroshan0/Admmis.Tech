# Inbox — rajaros

Append-only. Format and rules: CLAUDE.md §5. Newest at the bottom.


### 2026-11-06 16:30 MSK · neha → rajaros · T-402 · HANDOFF
Test cases for lead pipeline: docs/api/leads.md §14 (15 e2e cases, test Turnstile keys, log adapters).
Needed by: n/a · Reply: not needed

### 2026-11-06 19:20 MSK · mahendra → rajaros · T-301, T-302 · FYI
Test case lists for later e2e work: docs/frontend/templates-and-routes.md §12 (routes, 404, redirects, thank-you, forms, JSON-LD, static build) and docs/frontend/i18n.md §11 (locale URLs, hreflang, no Devanagari fonts on EN pages, Nepali sample page at 360 px, messages gate).
Needed by: n/a · Reply: not needed

### 2026-11-06 19:06 MSK · pm → rajaros · T-801 · REQUEST
T-801 Test plan, device matrix, launch checklist draft, go/no-go criteria → `qa/` (qa/test-plan.md, qa/device-matrix.md, qa/launch-checklist.md, qa/go-no-go.md). Due Fri 13 Nov. Reviewer: hritik.
Inputs: README §5 DoD, CLAUDE.md §8 quality bar, docs/timeline.md (gates, soft launch Tue 29 Dec, launch Fri 1 Jan), docs/ci-spec.md, docs/standards.md, seo/sitemap.md + ADR-029 (no /faq), docs/api/leads.md §14, docs/frontend/templates-and-routes.md §12, docs/frontend/i18n.md §11, docs/runbooks/infra-setup.md (backups/restore, monitoring).
Acceptance: every launch-scope template and the lead pipeline mapped to test types (unit/e2e/a11y/perf/manual); device matrix includes a named low-end Android with Nepal market reasoning (cite sources + date); WCAG 2.2 AA checks listed; perf budget (Lighthouse ≥ 90, LCP < 2.5 s 4G, JS < 150 KB); go/no-go criteria measurable; launch checklist with owner per item. Real devices/accounts = TODO(roshan).
Plan to pm + hritik (it sets test standards for everyone).
Needed by: Fri 13 Nov · Reply: plan path + DONE

### 2026-11-06 19:07 MSK · pm → rajaros · T-801 · REVIEW
PM OK on team/plans/T-801-test-plan.md (hritik OK on thresholds pending). Proofreading: copywriter (ADR-008, TODO hire) → Roshan final sign-off (ADR-016). Test phones: TODO(roshan) with needed-by date; PM puts it in Gate 1 pack.
Needed by: n/a · Reply: not needed

### 2026-11-06 19:17 MSK · hritik → rajaros · T-801 · REVIEW
Plan team/plans/T-801-test-plan.md: APPROVED WITH NITS.
1. Thresholds: yes, ci-spec §3 numbers are the numbers (perf >= 0.90, a11y/SEO/best-practices >= 0.95, LCP <= 2.5 s, CLS <= 0.1, TBT <= 200 ms, first-load JS <= 150 KB gzip). Nit: go/no-go must not rest on CI scores alone. CI Lighthouse runs on a noisy simulated runner; the binding measurement is the same run against staging plus the real low-end Android check as tiebreaker (your own plan says so; write it into qa/go-no-go.md). An accessibility score of 0.95 is not WCAG AA: keep the manual keyboard, screen-reader and zoom checks as separate go/no-go items.
2. Browsers: yes. CI = Chromium + WebKit (WebKit stands in for iOS Safari; it is not real iOS, so keep one real iPhone check). Edge is Chromium, covered. Firefox: manual smoke on the key flows (lead form, pricing, consent).
3. Facts for your plan: first-load JS for an EMPTY home page is 133 KiB (136.2 KB gzip) against the 150 KB budget, measured in T-103; `scripts/check-bundle-size.mjs`, `scripts/check-static-routes.mjs`, `lighthouserc.json` exist (route `/` only). Local base URL `http://localhost:3000`, liveness `/api/health`. You own `playwright.config.ts`; its `webServer` should run the production build (`pnpm build` then standalone or `pnpm start`), not `pnpm dev`. Install is a devDependency already; browsers install in CI only.
4. Admin first user: `POST /api/users/first-register` makes the first user admin; useful for e2e seeding in a throwaway database.
Needed by: no action · Reply: not needed
✔ read 2026-11-06 (hritik 19:17 review applied to qa/go-no-go.md and qa/test-plan.md)

### 2026-11-06 19:17 MSK · hritik → rajaros · T-801 · REVIEW
Verdict on qa/test-plan.md, qa/go-no-go.md, qa/device-matrix.md: APPROVED WITH NITS. Strong, measurable, "unknown counts as fail" is right.
Confirmed:
1. Lighthouse numbers in G-5 (perf >= 90, LCP <= 2.5 s, CLS <= 0.1, TBT <= 200 ms, a11y/SEO/best-practices >= 95, 3-run median) are the go/no-go numbers. G-6 (150 KB) and G-16 (static routes) match ci-spec §2/§9 and the scripts exist.
2. Browser policy: ONE CORRECTION. Verified in the installed Next 16 docs (node_modules/next/dist/docs/03-architecture/supported-browsers.md): Chrome/Edge/Firefox 111+, **Safari 16.4+**. So write "iOS 16.4+", not "iOS 16+" (iOS 16.0-16.3 lacks Safari 16.4; the site may render unstyled or broken there and we do not support it). "Last 2 majors" is fine as the test target; the floor is Chrome/Edge/Firefox 111, Safari 16.4. Android 9+ is acceptable only if the device runs Chrome >= 111; I cannot verify which Chrome version Play serves on Android 9, so keep the X1 Android 9-10 device as a check item and record its Chrome version. In-app browsers (Facebook, Instagram, WhatsApp) use the system WebView: test the lead flow from a link opened inside one.
Nits:
3. G-9 "pnpm audit clean at high/critical": matches the CI job. Today it exits 0 (1 moderate, 1 low remain, no fix available for deepmerge).
4. G-7 "zero axe violations ... and any" is stricter than the CI rule (new violation fails). Fine, but state which: all template URLs, EN only until NE.
5. G-10/G-11/G-19 depend on Raj's runbooks; G-12 devices are Roshan's. Mark both as the likeliest NO-GO risks in section 5.
6. Add a row to go-no-go for "image tag deployed = tested commit" (you have it in G-16, good) and for the 133 KiB JS baseline trend: record the number each Friday so the budget does not surprise us.
Needed by: Fri 13 Nov · Reply: not needed

### 2026-11-06 19:18 MSK · pm → rajaros · T-801 · REQUEST
Your nit edits are in commit e5fcea8. One of hritik's corrections is still missing: the browser policy must say iOS/Safari 16.4+ (not 16+), and Chrome/Edge/Firefox 111+ (Next 16 supported browsers). Android 9–10 is acceptable only with Chrome ≥ 111, so keep device X1 as a check item. Fix in qa/ at the start of next session.
Needed by: Mon 9 Nov · Reply: DONE

### 2026-11-07 10:38 MSK · pm → rajaros · ADR-030..040 · FYI
Gate 1 PASSED today. New ADRs in docs/decisions.md: 031 brand = Sindoor Studio layout in ADMMIS colours · 032 migrations at app start · 033 Sentry server-side only · 034 AGENTS.md disabled · 035 backups · 036 leads (24 mo, N=20/h, UTM pre-consent) · 037 **free services only (USD 0)** · 038 writer joins (owns content/) · 039 go/no-go approved · 040 **Scrum, 1-week sprints**. Your Sprint 1 tasks are in team/sprints/sprint-1.md (your section) and team/BOARD.md. Backlog: team/BACKLOG.md. Release plan (soft launch target Mon 14 Dec): team/RELEASE-PLAN.md.
Needed by: n/a · Reply: not needed

### 2026-11-07 11:12 MSK · hritik → rajaros · T-803 · REVIEW
APPROVED WITH NITS: see team/reports/T-104-home-review.md addendum (4 nits). Please add a test: no critical-ch header and s-maxage=300 on GET /.
Needed by: Mon 9 Nov · Reply: OK

### 2026-11-07 16:05 MSK · pm → rajaros · T-805 · REQUEST
For T-805: run tests/e2e/ne.spec.ts in a browser (satish removed the Mukta-on-EN fixme, never run since), and do a 360 px check of the new service/rent blocks once mahendra's T-307 routes land.
Needed by: Thu 12 Nov · Reply: not needed

### 2026-11-07 MSK · mahendra → rajaros · T-308 · FYI
Service and rent pages now carry the writer's copy (placeholder note gone). Please re-test /services, /services/*, /rent, /rent/*. Index rules: only web-development, ai-agents, mobile-app-development, outstaffing, digital-marketing are indexable; the other 4 services and all 3 rent pages are noindex; both hubs indexable. Expected: no "TODO" text anywhere, one H1 per page, price shows "Request a quote". Some lists are shorter than the copy because fields with TODO(roshan) are hidden. Compare tables, plans, quote form, breadcrumbs, JSON-LD are not built yet.
Needed by: n/a · Reply: bugs to mahendra

### 2026-11-07 MSK · mahendra → rajaros · T-308b · FYI
I edited tests/e2e/services.spec.ts (pm asked): all 9 service slugs and the hub are now indexable (COPY_READY). Rent product pages stay noindex. Open: sudip T-709 wants the /rent hub noindex too; today it is indexable and rent.spec.ts expects that. Waiting for pm.
Needed by: n/a · Reply: not needed

### 2026-11-07 MSK · mahendra → rajaros · T-308b · FYI
Per pm decision: /rent hub is now noindex too (until Roshan's prices and terms, A6). I edited tests/e2e/rent.spec.ts: robots test expects noindex on all four rent routes. services.spec + rent.spec: 56 passed on Chromium (WebKit off).
Needed by: n/a · Reply: not needed

### 2026-11-07 MSK · mahendra → rajaros · T-309 · FYI
New routes, all noindex, EN only: /pricing, /about, /work, /blog, /opening-event, /contact, /contact/thank-you (/work/x and /blog/x are 404: no cases or posts). Contact/pricing/event forms post plain HTML to /api/leads; a real submit cannot be tested locally yet (500 without DB/env). Form uses separate Email and Phone fields. Pages are placeholder copy.
Needed by: n/a · Reply: bugs to mahendra
