# Gate 1 — Discovery & foundations

Owner: pm · Task: T-901 · Version: v0.2 · Gate: **Fri 13 Nov 15:00 MSK** · Approver: Roshan (ADR-016, SLA 12 h)
Technical review: hritik — `docs/gates/gate-1-tech-review.md`

## 1. What you are approving

| # | Area | Decision type |
|---|---|---|
| A | Sitemap and launch scope | Mostly decided today (ADR-029); confirm only |
| B | Brand direction (1 of 3) and logo concept | Pick |
| C | Engineering foundation (standards, content model, lead API, i18n, tokens) | Approve as baseline |
| D | Hosting and infrastructure plan | Pick options + approve spend |
| E | Pricing model and rental terms | Approve / change (deferred items) |
| F | Lead handling details (deferred from 6 Nov) | Pick options |
| G | QA approach and go/no-go criteria | Approve |

## 2. Status of week-1 work

| ID | Deliverable | Owner | Status | Reviewer verdict |
|---|---|---|---|---|
| T-702 | `seo/sitemap.md` | sudip | DONE v0.1 → v0.2 (ADR-029) due Wed 11 Nov | pm |
| T-701 | `seo/keyword-map.md` | sudip | DONE (volumes are ESTIMATE) | pm |
| T-703 | `seo/competitor-benchmark.md` | sudip | DONE v0.1 | pm |
| T-602 | `design/brand-directions/` (3 HTML pages + README) | sharwan | REVIEW — your pick | pm |
| T-601 | `design/logo/` (3 concepts) | sharwan | PARTIAL — blocked on Q18 ADMMIS files | pm |
| T-101 | `docs/standards.md`, `docs/scaffold-plan.md`, `docs/ci-spec.md`, `docs/architecture.md` | hritik | DONE | pm |
| T-103 | App scaffold (`pnpm dev`), README "Getting started" | hritik | DONE — all smoke tests pass; committed `bd694cb` | pm re-verified; neha peer review pending |
| T-401 | `docs/api/content-model.md` | neha | DONE v0.2 | hritik APPROVED |
| T-402 | `docs/api/leads.md` | neha | DONE v0.2 | hritik APPROVED |
| T-201 | `docs/frontend/component-inventory.md` | satish | DONE v0.1.1 | hritik APPROVED WITH CHANGES (v0.2 Fri 20 Nov) |
| T-202 | `docs/frontend/design-tokens.md` | satish | DONE v0.1.1 | hritik APPROVED |
| T-301 | `docs/frontend/templates-and-routes.md` | mahendra | DONE v0.1 | hritik APPROVED WITH NITS |
| T-302 | `docs/frontend/i18n.md` | mahendra | DONE v0.1 | hritik APPROVED WITH NITS |
| T-501 | `docs/runbooks/infra-setup.md`, `infra/` | raj | DONE — committed `501dc76` | hritik APPROVED WITH NITS |
| T-502 | `Dockerfile`, `docker-compose.yml`, `.github/workflows/` | raj | PARTIAL — hritik's changes applied; first real test = first CI run after your push | hritik |
| T-801 | `qa/` test plan, device matrix, launch checklist (61 items), go/no-go (19 criteria) | rajaros | DONE v0.1 | hritik APPROVED WITH NITS (in T-102) |
| T-102 | `docs/gates/gate-1-tech-review.md` | hritik | DONE — recommends Gate 1 can pass | pm |

## 3. Technical readiness (summary of hritik's review)
- The design documents agree with each other and with the ADRs. **The architecture is not yet proven by running code.**
- Recommendation: **Gate 1 passes on design**; five spikes on Mon 16 Nov must pass before Gate 2: Payload 3.93 + Next 16 on Node 24 builds and runs; Tailwind v4 brand theming; next-intl static rendering and JS cost; 2FA for the CMS admin; standalone Docker image with Payload.
- **The stack runs (T-103):** Next 16.4.5 + Payload 3.93.0 + Tailwind 4.3.4 on Node 24. typecheck, lint, tests, build, `pnpm dev` (/, /admin, /api/health) and the standalone server pass. Not yet run: Docker, Postgres 17, Playwright, Lighthouse.
- **JS budget warning:** an empty page already loads **136 KB of the 150 KB** budget (Next + React baseline). Only ~14 KB is left for language switching, cookie consent, forms and analytics. Satish and Mahendra design to this; hritik owns the allocation.
- **Security:** `pnpm audit` had 1 critical + 3 high findings inside Payload's dependencies; fixed with version overrides (now 1 low, 1 moderate). Rich-text runtime check after the fix is still to do.

## 4. Questions for you — yes/no or pick one

### A. Scope (decided 6 Nov, confirm nothing changed)
A1. Sitemap per ADR-029 (/rent + 3 rental pages, web-development merged, custom-software page, no /faq). **Confirm: yes/no**
A2. Node.js 24 LTS for the app (scaffold already runs on it). Recommendation: **yes**. Impact if no: re-test on Node 26, ~0.5 day.

### B. Brand
B1. Pick brand direction **1, 2 or 3** (or "1 with the palette of 3"). Sharwan recommends **1 Sindoor Studio** for Nepali SMEs and low-end phones; 2 if international/rental buyers matter most. See `design/brand-directions/README.md`.
B2. Logo: pick a concept (1 Peak, 2 Tile, 3 Knockout) in `design/logo/index.html` — final match to the ADMMIS family needs **Q18 files** (logo SVG, colours, fonts).
B3. Hero model files (PNG ≥ 2000 px, 2–3 poses, ADR-009): delivery date?

### D. Hosting (details `docs/runbooks/infra-setup.md` §2, §14)
D1. Provider: **AWS Lightsail, Mumbai** (only provider whose Mumbai region was confirmed from its own page; Vultr/Linode not verifiable). **yes/no**
D2. Staging layout — pick:

| Option | Setup | ≈ USD/month | Risk |
|---|---|---|---|
| **A (recommended)** | 4 GB production + 2 GB staging VPS | 36–40 (incl. snapshots) | — |
| B | One 4 GB VPS for both | 24–28 | staging load and memory can hurt the live site; one host holds both |

D3. Uptime checks — pick: free 5-minute interval (USD 0) **(recommended until launch)** or paid 1-minute plan (price to verify).
D4. Backups: daily, encrypted, kept 7 daily / 4 weekly / 3 monthly, monthly restore test. **yes/no**
D5. Q17: who controls DNS for admmis.org? (blocks Cloudflare setup)
D6. Your 12 setup actions (~3 hours, `infra-setup.md` §14): when can you do them? Actions 4–5 (servers) unlock week-2 hardening.
D7. Is the GitHub repo private? (affects free CI minutes)

### C. Technical decisions (hritik proposals, ADR candidates)
C1. **Production database migrations** — pick: A) committed migrations run automatically at app start via the Postgres adapter **(recommended: no extra tool in the image; to verify on Payload 3.93)** · B) a separate one-off migrate step at deploy with the Payload CLI.
C2. **Browser error monitoring** — pick: A) Sentry server-side only at launch **(recommended: keeps the JS budget)** · B) browser SDK loaded late, after idle/consent (later, if measured) · C) browser SDK in the main bundle (breaks the 150 KB budget).
C3. `AGENTS.md`: Next 16 writes an AI-tools rule file into the repo root. Recommendation: **disable it** (`agentRules: false`) and keep one rulebook (CLAUDE.md); hritik adds its one useful line ("read the Next 16 docs in node_modules before coding") to `docs/standards.md`.

### E. Pricing (`docs/pricing-model.md`, Q16)
E1. Size bands S/M/L/XL and rental prices per band. **approve / change**
E2. **Team on rent** (deferred 6 Nov) — pick:

| Option | How it works | Pro | Con |
|---|---|---|---|
| **A (recommended)** | Per person/month: senior ≈ NPR 180,000 · designer ≈ 150,000 · QA ≈ 120,000 | ~33% margin, scales with team size | Price looks high next to "from NPR 100,000" |
| B | Fixed bundle (e.g. 1 senior + 1 designer part-time) per band | Simple to sell | Easy to lose money when scope grows |
| C | Quote only, no public price | No risk | Weaker conversion; ADR-005 favours public prices |

E3. Rental terms: setup fee 1× monthly, minimum 6 months, support hours per band, code buyout 6×. **approve / change**

### F. Lead handling (deferred from 6 Nov; needed by Gate 2 Fri 20 Nov at the latest)
F1. **Lead retention** — pick: A) 24 months then delete **(recommended: covers repeat-sales cycles, short enough for privacy)** · B) 12 months · C) keep until the person asks to delete.
F2. **Circuit breaker** when Cloudflare Turnstile is down — pick: A) accept up to N = 20 unverified leads/hour, then show WhatsApp/phone fallback **(recommended: no lost leads, spam capped)** · B) N = 50 · C) fail closed (form shows fallback immediately).
F3. **UTM capture before cookie consent** (first-party, sessionStorage, attached only to a submitted lead) — pick: A) allowed for EN launch, re-check in privacy review **(recommended)** · B) only after consent (lose source data for most visitors).
F4. Q10: team chat tool, sales email, CRM (HubSpot Free proposed), who answers leads. Needed by Fri 20 Nov.

### G. Quality
G1. Approve the QA approach and the 19 go/no-go criteria in `qa/go-no-go.md` (decision meeting Thu 24 Dec; any failure of lead pipeline, pricing, consent, security or real-device criteria = NO-GO). **yes/no**
G2. Test phones: lend or buy 2 budget Android phones + 1 iPhone for the real-device pass (needed by Mon 21 Dec), or accept emulation/BrowserStack only (weaker). Spend is yours.
G3. Content proofreading: the bilingual copywriter (ADR-008, not hired yet) proofreads, you give the final sign-off. Hiring date?

## 5. Open risks

| Risk | Impact | Mitigation / owner |
|---|---|---|
| Founder's Mac disk nearly full (scaffold needs ~3 GB) | Can't run the site locally; slows T-103 | Roshan frees space; installs stopped at < 1 GB free |
| No Docker on the Founder's Mac | Docker compose for Postgres can't run locally | Install Docker Desktop (needs disk) or use Homebrew Postgres; CI is first real image build |
| Q18 ADMMIS brand files missing | Logo can't be finalised | Roshan, by Mon 9 Nov |
| Q17 DNS owner unknown | Cloudflare + staging setup blocked | Roshan, by Tue 10 Nov |
| Architecture unproven until spikes | Gate 2 slip if Payload/Next 16/Tailwind 4 combination fails | Spikes Mon 16 Nov; fallbacks in scaffold-plan §6 |
| Content is the critical path (copywriter, case-study permissions Q4) | Late pages | Hiring + Q4 answers by Fri 13 Nov |

## 6. Other open questions due at Gate 1
Q4 case-study clients · Q9 ADMMIS registration details · Q19 team pay model · Q20 budget approval (`docs/budget.md`). Full list: `docs/open-questions.md`.

## 7. Outcome — 2026-11-07 10:38 MSK
**PASSED** by Roshan with the PM's recommendations (ADR-030). Recorded: ADR-031 (brand), ADR-032 (migrations), ADR-033
(Sentry), ADR-034 (AGENTS.md), ADR-035 (backups), ADR-036 (leads F1–F3 A), ADR-037 (free services only; DNS by Roshan),
ADR-038 (writer), ADR-039 (QA), ADR-040 (Scrum). **Open:** pricing E1–E3 → 1-page summary first; hosting D1/D2 replaced
by a free-host evaluation (T-503); D3 = free 5-min monitor; G2 test phones; F4/Q10.
