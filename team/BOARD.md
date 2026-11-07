# Task board — ADMMIS.TECH website

Owner: **pm** (only the PM edits this file; others report status by message).
Status: `TODO` · `PLANNING` · `IN PROGRESS` · `REVIEW` · `BLOCKED` · `DONE`
Times MSK. **Gate 1 PASSED Sat 7 Nov (ADR-030).** Scrum from 7 Nov (ADR-040): backlog `team/BACKLOG.md`,
release plan `team/RELEASE-PLAN.md`. This board mirrors the active sprint: `team/sprints/sprint-1.md`.

## Sprint 1 — Sat 7 – Sun 15 Nov (active) · goal: homepage live in the ADMMIS brand ✔ (accepted, ADR-041) → now pulling Sprint 2 forward for soft launch ≤ Mon 14 Dec

Updated 2026-11-07 16:00 MSK. Priority order (Roshan 7 Nov 15:45): language switch → template designs → service + rent templates built → CMS collections in code → service copy → QA.

### Active / next (in priority order)
| ID | Task | Owner | Deliverable | Story | Reviewer | Due | Status |
|---|---|---|---|---|---|---|---|
| T-306 | EN/नेपाली switch wiring + `/ne` homepage (hreflang, fonts, tests) | mahendra | `src/app/(site)/`, `src/lib/`, `src/messages/ne/`, `tests/e2e/ne.spec.ts` | US-401 (ADR-041) | hritik | Sat 7 Nov 17:00 | DONE (T-107 APPROVED WITH NITS; commit ed35189) |
| T-206 | LanguageSwitch component + Header `languages` prop, ServiceItem `linkLabel` | satish | `src/components/layout/LanguageSwitch.tsx` (+test), Header, services grid | ADR-041 | hritik | Sat 7 Nov | DONE (commit ed35189; Mukta-fallback nit goes into T-207) |
| T-604a | Service page + services hub + on-rent template design specs (narrowed T-604) | sharwan | `design/templates/service-spec.md`, `rent-spec.md` (+ mocks) | US-105 | pm, satish | Sat 7 Nov 19:00 | DONE (public prices + "Price on request" fallback; hub/rent-product mocks pending in T-604b) |
| T-207 | Components for service + rent templates (from T-604a) | satish | `src/components/` | Sprint 2 (pulled) | hritik | Tue 10 Nov | DONE (T-108 APPROVED WITH NITS) |
| T-307 | Routes/templates: `/services`, `/services/[slug]`, `/rent`, `/rent/[slug]`, messages, metadata | mahendra | `src/app/(site)/`, `src/messages/en/` | Sprint 2 (pulled) | hritik | Wed 11 Nov | DONE (T-110 APPROVED WITH NITS; pages noindex until COPY_READY) |
| T-404 | Migrations-at-start check + collections plan | neha | `team/plans/T-404-collections.md` | US-305 prep | hritik | Mon 9 Nov (was Thu 12) | DONE (plan OK by hritik; migration run needs Docker C1) |
| T-406 | CMS collections in code (Pages, Services, Rentals, Media, globals) per content-model + T-604a fields | neha | `src/collections/` | Sprint 2 (pulled) | hritik | Thu 12 Nov | DONE (T-109 APPROVED WITH NITS; migrations unverified until Docker C1) |
| T-308 | Sync service + rent copy into pages; COPY_READY = 5 P0 services | mahendra | `src/messages/en/{services,rent}.json` | US-1004 | rajaros (QA) | Sat 7 Nov | DONE |
| T-708 | SEO review of service copy + 6 P1 briefs (T-705b) | sudip | `team/inbox/writer.md`, `seo/briefs/` | US-1003 | pm | Sat 7 Nov | DONE |
| T-709 | SEO review of P1 service + rent copy → flip COPY_READY | sudip → mahendra | review note | US-1004 | pm | Sat 7 Nov | DONE (9 services indexable; /rent noindex until A6) |
| T-604b | Specs: pricing, contact, about, work, blog, event | sharwan | `design/templates/*-spec.md` | US-105 | pm, satish | Sat 7 Nov | DONE |
| T-208 | Components for T-604b specs (contact form first) + T-108 nits | satish | `src/components/` | Sprint 2 (pulled) | hritik | Tue 10 Nov | DONE (T-111 APPROVED WITH NITS, fixes in) |
| T-407 | Collections: cases, posts, events, team, leads + lead API | neha | `src/collections/`, `src/app/api/` | Sprint 2 (pulled) | hritik | Wed 11 Nov | DONE (T-112 must-fixes applied; atomic limiter + DB checks wait for Docker C1) |
| T-309 | Routes: /pricing, /contact (+thank-you), /about, /work, /blog, /event | mahendra | `src/app/(site)/` | Sprint 2 (pulled) | hritik | Thu 12 Nov | DONE (T-113 must-fix done; real submit needs DB; /privacy needed — T-1006) |
| T-1006 | Legal pages copy: privacy (+ policyVersion), terms, cookies — consent link on /contact 404s until /privacy exists; Roshan approves legal text | writer → mahendra | `content/pages/privacy.md` … | US-411 | Roshan | Fri 20 Nov | TODO (blocks form going live) |
| T-1003 | Services hub + service page copy (P0 briefs first) | writer | `content/pages/services*.md`, `content/pages/services/*.md` | US-1004 | sudip, pm | Tue 10 Nov (was Sun 15) | DONE (9 pages + hub; P0 SEO-reviewed T-708; P1 review pending) |
| T-1005 | Rent hub + rental pages copy | writer | `content/pages/rent*.md` | US-1004 | sudip, pm | Wed 11 Nov | DONE (SEO-reviewed; terms TODO(roshan)) |
| T-805 | QA of /ne + service/rent templates (manual + e2e) | rajaros | `qa/bugs/`, `tests/e2e/` | US-904 | hritik | Thu 12 Nov | DONE (e2e 80/80 after T-308, axe clean, no new bugs) |

### Done today (Sat 7 Nov)
| ID | Task | Owner | Status |
|---|---|---|---|
| T-603 | Homepage design spec + mock | sharwan | DONE |
| T-601 | ADMMIS.TECH logo (ADMMIS family) | sharwan | DONE — Roshan accepted (A4) |
| T-1001 | Voice and tone guide | writer | DONE — Roshan approved (A2) |
| T-1002 | Homepage copy + microcopy (+ SEO fix round) | writer | DONE — Roshan approved (A3), sudip's H1 (A10) |
| T-1004 | Nepali homepage draft + switch labels | writer | DONE — waits for Roshan's proofread (A11) |
| T-203 | Brand tokens + self-hosted fonts | satish | DONE |
| T-204 | UI/layout components + home blocks (+ BUG fixes) | satish | DONE |
| T-303 | Homepage route, message files, metadata (+ fix round) | mahendra | DONE |
| T-104 | Code review of homepage build | hritik | DONE (APPROVED WITH NITS, nits applied) |
| T-106 | AGENTS.md disabled (ADR-034) | hritik | DONE (A5: Roshan OK to remove the file) |
| T-503 / T-504 / T-505 | USD-0 infra plan v0.2, DNS guide, local-dev guide | raj | DONE (hritik approved with nits) — waits for Roshan (A8, C1, C3) |
| T-704 / T-707 | Sitemap v0.2, SEO check of home copy | sudip | DONE |
| T-705 | Page briefs — P0 (9 briefs) | sudip | P0 DONE; remaining briefs Sun 15 Nov |
| T-802 / T-803 | Homepage manual QA (10 bugs) + Playwright/axe e2e, Lighthouse 95–97 | rajaros | DONE (hritik approved with nits) |
| T-904 | 1-page pricing summary | pm | DONE — waits for Roshan (A6) |
| T-903 | Day-1 review | pm | DONE (superseded: Roshan reviewed live, ADR-041) |

### Still open this sprint (unchanged)
| ID | Task | Owner | Due | Status |
|---|---|---|---|---|
| T-403 | Peer review T-103 + fresh-clone check | neha | Mon 9 Nov | TODO |
| T-105 | Five architecture spikes | hritik | Tue 10 Nov | TODO |
| T-304 | next-intl routing (replaces typed loader) | mahendra | Tue 10 Nov | TODO (after T-307 if it competes) |
| T-405 | Free-provider check for lead alerts | neha | Fri 13 Nov | TODO |
| T-706 | Schema + analytics event spec | sudip | Fri 13 Nov | TODO |
| T-804 | Go/no-go v0.2 | rajaros | Fri 13 Nov | TODO |
| T-205 / T-305 | Component inventory + tokens v0.2 / templates + i18n docs v0.2 | satish / mahendra | Fri 13 Nov | TODO |
| T-705b | Page briefs — all remaining launch pages | sudip | Sun 15 Nov | TODO |
| T-905 | Sprint 1 Review = Gate 2 | pm | Sun 15 Nov 15:00 | TODO |

## Week 1 — Discovery & foundations (closed at Gate 1, Sat 7 Nov)

| ID | Task | Owner | Deliverable | Depends on | Reviewer | Due | Status |
|---|---|---|---|---|---|---|---|
| T-702 | Sitemap draft (all launch-scope pages, URLs, templates, primary keyword) | sudip | `seo/sitemap.md` | — | pm | Wed 11 Nov | DONE (v0.1; calls decided ADR-029 → v0.2 by Wed 11 Nov) |
| T-701 | Keyword map EN (clusters, intent, one primary per page) | sudip | `seo/keyword-map.md` | T-702 | pm | Thu 12 Nov | DONE (volumes = ESTIMATE) |
| T-703 | Nepal competitor + price benchmark (≥10 agencies + FITTIN) | sudip | `seo/competitor-benchmark.md` | — | pm | Thu 12 Nov | DONE (v0.1, search-depth) |
| T-601 | "AT" logo — 3 concepts in the ADMMIS family | sharwan | `design/logo/` | ADMMIS brand files (Roshan) | pm | Fri 13 Nov | PARTIAL → finished in Sprint 1 (files received 7 Nov) |
| T-602 | 3 brand directions incl. sari-model hero | sharwan | `design/brand-directions/` | T-702 (structure) | pm | Fri 13 Nov | DONE (Direction 1 in ADMMIS colours, ADR-031) |
| T-101 | Repo foundation: structure, `docs/standards.md`, scaffold plan, CI spec | hritik | `docs/standards.md`, `docs/architecture.md` update | — | pm → Roshan | Wed 11 Nov (standards) / Fri 13 Nov 12:00 | DONE (Gate 1) |
| T-401 | CMS content model draft | neha | `docs/api/content-model.md` | — | hritik | Thu 12 Nov | DONE (v0.2; hritik approved w/ changes, applied) |
| T-402 | Lead API contract & pipeline design | neha | `docs/api/leads.md` | T-401 | hritik | Fri 13 Nov | DONE (v0.2; hritik approved w/ changes, applied) |
| T-201 | Component inventory (keep / change / new / drop) | satish | `docs/frontend/component-inventory.md` | — | hritik | Thu 12 Nov | DONE (v0.1.1) |
| T-202 | Design-token architecture for multi-brand theming | satish | `docs/frontend/design-tokens.md` | T-101 | hritik | Fri 13 Nov | DONE (v0.1.1, must-fixes applied) |
| T-301 | Template & route map | mahendra | `docs/frontend/templates-and-routes.md` | T-702 | hritik | Thu 12 Nov | DONE (v0.1; nits for v0.2 Fri 20 Nov) |
| T-302 | i18n architecture (EN now, NE in Feb without rework) | mahendra | `docs/frontend/i18n.md` | T-101 | hritik | Fri 13 Nov | DONE (v0.1; nits for v0.2 Fri 20 Nov) |
| T-501 | Infra plan & runbooks (VPS options, DNS, Cloudflare, backups, monitoring, 2FA, Roshan's action list) | raj | `docs/runbooks/infra-setup.md` | — | hritik | Fri 13 Nov | DONE (hritik APPROVED WITH NITS; D-1/D-2 to Gate 1) |
| T-502 | Dockerfile, docker-compose (prod-like), CI workflow skeleton. Dev Postgres compose is in T-103 | raj | `Dockerfile`, `docker-compose.yml`, `.github/workflows/ci.yml` | T-101, T-103 | hritik | Fri 13 Nov | PARTIAL (changes applied; first CI run after Roshan's push) |
| T-801 | Test plan, device matrix, launch checklist draft, go/no-go criteria | rajaros | `qa/` | — | hritik | Fri 13 Nov | DONE v0.1 (hritik APPROVED WITH NITS) |
| T-103 | App scaffold per `docs/scaffold-plan.md` (installs packages; `.env.example`; docker compose for Postgres; README "Getting started"; smoke tests; TS 7 vs 5.9 check). Local only (ADR-024) | hritik | `src/`, config files, README section | T-101 | pm (+ neha peer review, standards §12) | Mon 9 Nov | DONE (smoke tests pass; neha peer review + fresh-clone check pending) |
| T-102 | Technical review of week-1 engineering work + readiness note | hritik | `docs/gates/gate-1-tech-review.md` | T-202, T-302, T-401, T-402, T-501, T-502 | pm | Fri 13 Nov 12:00 | DONE |
| T-901 | Gate 1 pack for Roshan | pm | `docs/gates/gate-1.md` | all above | Roshan | Fri 13 Nov 15:00 | DONE (Gate 1 PASSED, ADR-030) |

## Waiting on Roshan
| Item | Needed by | For |
|---|---|---|
| Nepali homepage proofread (A11) | Tue 10 Nov | `/ne` goes public |
| Pricing decision (after 1-page summary T-904) | Fri 13 Nov | pricing + rent pages |
| Docker Desktop install (100 GB freed ✔) | Mon 9 Nov | /admin + DB locally |
| Hero sari-model PNGs (≥ 2000 px, 2–3 poses) | Fri 20 Nov | US-107 |
| Case-study facts + permission (4 cases, `docs/company-info.md`) | Fri 20 Nov | US-1007 |
| PAN confirm (12 digits?), which phone(s)/address for ADMMIS.TECH | Fri 20 Nov | footer, legal |
| Q10 chat/sales email/CRM/who answers leads | Fri 20 Nov | US-503/506 |
| OK on free host proposal (T-503) + account actions + DNS → Cloudflare | Mon 23 Nov | staging |
| Original vector ADMMIS logo, if one exists | any time | T-601 (redraw used meanwhile) |
