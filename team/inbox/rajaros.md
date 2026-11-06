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
