# Go / No-Go Criteria

Owner: rajaros · Task: T-801 · Version: v0.1 · 2026-11-06 · Reviewer: hritik · Decider: Roshan (via PM)
Decision meeting: **Thu 24 Dec 2026** (code freeze). Launch sign-off Wed 30 Dec. QA states the result plainly, including bad news. A criterion is met only with evidence linked in `qa/go-no-go-evidence.md` (created at the first run).

## 1. Hard criteria (all must pass for GO)

| # | Criterion | Measure | Source of evidence | Owner |
|---|---|---|---|---|
| G-1 | Zero open S1 bugs | `qa/bugs.md` count = 0 | bug log | rajaros |
| G-2 | Zero open S2 on critical flows (lead form/pipeline, pricing, homepage, navigation, consent, contact, event registration) | count = 0 | bug log | rajaros |
| G-3 | Lead pipeline: all leads.md §14 e2e cases pass (13 deferred until NE); failure-of-channel cases L-17, L-18 pass; one real test lead on **production** reaches DB, email, chat (or log adapters if Q10 unresolved, then documented) | CI green + prod smoke record | CI run + smoke log | rajaros, neha |
| G-4 | Price single source: P-1..P-5 pass; zero price literals in code | CI green | CI run | rajaros, neha |
| G-5 | Lighthouse mobile, 3-run median per LHCI route: performance >= 90, LCP <= 2.5 s, CLS <= 0.1, TBT <= 200 ms, accessibility >= 95, SEO >= 95, best-practices >= 95 | LHCI report on **staging and production-like build** | LHCI artifact | hritik, rajaros |
| G-6 | First-load JS <= 150 KB gzip on every public content route | bundle-budget job output | CI | hritik |
| G-7 | Accessibility: zero axe violations (serious/critical, and any) in CI on all template URLs; manual WCAG 2.2 AA checklist (test-plan §6) complete on home, pricing, contact with zero blockers; screen-reader pass on iOS and Android done | CI + checklist | CI + signed checklist | rajaros |
| G-8 | Consent: C-1..C-4 pass on staging and production; no third-party request before consent | e2e + manual network capture | CI + HAR | rajaros, mahendra |
| G-9 | Security: S-1..S-11 pass; `pnpm audit` clean at high/critical; no secrets in client bundle; admin not reachable without auth; 2FA enabled on all real accounts (ADR-017) | scripts + Raj attestation | report | raj, rajaros |
| G-10 | Backups: last 24 h dump exists; restore test passed within 14 days before launch, RTO recorded | `docs/runbooks/restore-log.md` entry | restore log | raj |
| G-11 | Monitoring: uptime, lead-worker heartbeat, backup heartbeat, Sentry alerts proved by a deliberate test alert | alert received | screenshots | raj |
| G-12 | Real-device pass (script in device-matrix §6) done on >= 2 Android + 1 iPhone, zero S1/S2, LCP <= 2.5 s on the throttled profile on the Android devices. Emulation alone does not satisfy this | device log | device log | rajaros, TODO(roshan) devices |
| G-13 | Cross-browser smoke done (matrix §3) with zero S1/S2 | log | log | rajaros |
| G-14 | Content: sweep script clean (no placeholders, broken links, missing alt, duplicate titles); every launch page proofread; no copied FITTIN material; client names/logos only with recorded written permission; legal pages approved by Roshan | script output + sign-offs | report | rajaros, sudip, pm, roshan |
| G-15 | SEO: test-plan §9 checks pass; sitemap valid and lists only indexable pages; production serves `index`, staging serves `noindex`; no `/faq` in sitemap (ADR-029) | script | report | rajaros, sudip |
| G-16 | Build is static/ISR for all `(site)` routes (ci-spec §9) and deployed image equals the tested commit (tag matches) | CI + deploy log | CI | hritik, raj |
| G-17 | i18n readiness: EN pages request no Devanagari font; locale redirect cases pass; Nepali sample page renders at 360 px without clipping | e2e + manual | CI | rajaros, mahendra |
| G-18 | Launch checklist (qa/launch-checklist.md) 100 % complete or each open item has an explicit, written Roshan waiver | checklist | checklist | pm |
| G-19 | Rollback plan rehearsed once on staging (deploy previous tag) | runbook log | log | raj |

### Measurement rules (Hritik review, 2026-11-06)
- CI Lighthouse runs on a noisy simulated runner. For G-5 the binding measurement is the same run against **staging**, with the real low-end Android check (G-12) as tiebreaker. CI scores alone never satisfy G-5.
- A Lighthouse accessibility score of 95 is not WCAG 2.2 AA. G-7 keeps manual keyboard, screen-reader and 200%/400% zoom checks as separate line items; each must pass on its own.
- WebKit in CI stands in for Safari but is not real iOS: G-12 requires one real iPhone.
- Firefox: manual smoke on lead form, pricing and consent (G-13).
- Budget headroom: an empty home page already uses 133 KiB (136.2 KB gzip) of the 150 KB JS budget (T-103 measurement). Any JS added to a route is watched; I flag a regression above +5 KB per change to Hritik.

## 2. Soft criteria (NO-GO only if the risk is unacceptable; otherwise listed in the decision note)
- Open S3 count <= 10 and none on home, pricing or contact; open S4 allowed.
- Lighthouse on any non-critical route 85-89: allowed with a written fix date in hypercare (4-15 Jan).
- Single-device S3 quirks documented in the release notes.

## 3. Decision rule

| Result | Decision |
|---|---|
| All G-1..G-19 pass | **GO** |
| Any of G-1..G-4, G-8, G-9, G-12 fails | **NO-GO** (blocks launch) |
| Other hard criterion fails | **NO-GO unless** Roshan signs a time-boxed waiver in `team/inbox/roshan.md` stating the risk, the owner and the date it is fixed |
| Unknown / not measured | counts as fail |

A NO-GO on Thu 24 Dec triggers: list of failing criteria with owners, re-test slot Mon 28 Dec, new decision Tue 29 Dec morning before the soft launch. Scope cut options (remove a case study, a blog post, the event registration form in favour of an email link) are proposed by PM, not by QA.

## 4. Process
1. Wed 23 Dec evening: I run the whole criteria list on the release candidate and publish a one-page status (pass/fail/unknown per row).
2. Thu 24 Dec 10:00 MSK standup: owners confirm fixes; I re-run failing rows.
3. Thu 24 Dec afternoon: I give a plain GO / NO-GO recommendation to PM; PM prepares the gate pack; Hritik gives the technical review; Roshan decides within 12 h (ADR-016).
4. After GO, any new commit to the release branch needs a risk note and a targeted re-test; emergency fixes only (S1/S2).
5. Soft launch Tue 29 Dec: production smoke (launch checklist section 5). A failure there is handled as an S1.
6. Hypercare 4-15 Jan: daily check of lead flow, Search Console errors, uptime, and Lighthouse on production.

## 5. Preliminary (draft) status, 2026-11-06
Not started: the application scaffold is pending (T-103). All criteria are "unknown" and so count as fail by rule until measured.
