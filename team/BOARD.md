# Task board — ADMMIS.TECH website

Owner: **pm** (only the PM edits this file; others report status by message).
Status: `TODO` · `PLANNING` · `IN PROGRESS` · `REVIEW` · `BLOCKED` · `DONE`
Times MSK. **Gate 1 PASSED Sat 7 Nov (ADR-030).** Scrum from 7 Nov (ADR-040): backlog `team/BACKLOG.md`,
release plan `team/RELEASE-PLAN.md`. This board mirrors the active sprint: `team/sprints/sprint-1.md`.

## Sprint 1 — Sat 7 – Sun 15 Nov (active) · goal: homepage running in the ADMMIS brand today 20:00 MSK

| ID | Task | Owner | Deliverable | Story | Reviewer | Due | Status |
|---|---|---|---|---|---|---|---|
| T-603 | Homepage design spec + mock (ADMMIS colours, contrast fixes) | sharwan | `design/homepage/` | US-103/104 | pm → Roshan | Sat 7 Nov 13:30 | IN PROGRESS |
| T-601 | ADMMIS.TECH logo, ADMMIS family (finish) | sharwan | `design/logo/admmis-tech-*.svg` | US-102 | pm → Roshan | Sat 7 Nov 13:30 | IN PROGRESS |
| T-1001 | Voice and tone guide | writer | `content/voice-and-tone.md` | US-1001 | pm → Roshan | Sat 7 Nov 12:30 | IN PROGRESS |
| T-1002 | Homepage copy + microcopy | writer | `content/pages/home.md`, `content/microcopy.md` | US-1002 | pm, sudip → Roshan | Sat 7 Nov 13:30 | IN PROGRESS |
| T-203 | Brand tokens + self-hosted fonts | satish | `src/styles/`, `src/brands/admmis-tech/` | US-201/202 | hritik | Sat 7 Nov 16:00 | TODO (after T-603) |
| T-204 | UI/layout components + home blocks | satish | `src/components/` | US-203/204/205 | hritik | Sat 7 Nov 18:00 | TODO (after T-603) |
| T-303 | Homepage route, message files, metadata | mahendra | `src/app/(site)/`, `src/messages/en/` | US-401 | hritik | Sat 7 Nov 18:00 | TODO (after T-1002) |
| T-104 | Code review of homepage build | hritik | `team/reports/T-104-home-review.md` | US-903 | pm | Sat 7 Nov 19:15 | TODO |
| T-903 | Day-1 review for Roshan | pm | `team/sprints/sprint-1-day1-review.md` | — | Roshan | Sat 7 Nov 20:00 | TODO |
| T-106 | Disable AGENTS.md + standards line (ADR-034) | hritik | `next.config.ts`, `docs/standards.md` | — | pm | Mon 9 Nov | TODO |
| T-403 | Peer review T-103 + fresh-clone check | neha | `team/reports/T-403-…` | — | hritik | Mon 9 Nov | TODO |
| T-504 | DNS steps for Roshan (Cloudflare Free) | raj | `docs/runbooks/dns-cloudflare.md` | US-803 | hritik | Mon 9 Nov | TODO |
| T-505 | Docker Desktop note for Roshan's Mac | raj | request to pm | — | pm | Mon 9 Nov | TODO |
| T-704 | Sitemap v0.2 | sudip | `seo/sitemap.md` | US-702 | pm | Mon 9 Nov | TODO |
| T-707 | SEO check of home copy | sudip | `team/inbox/writer.md` | US-1002 | pm | Mon 9 Nov | TODO |
| T-802 | Manual QA of day-1 homepage | rajaros | `qa/bugs/`, report | US-904 | pm | Mon 9 Nov | TODO |
| T-105 | Five architecture spikes | hritik | `docs/spikes/` | US-902 | pm | Tue 10 Nov | TODO |
| T-304 | next-intl routing | mahendra | `src/lib/i18n/`, `src/proxy.ts` | US-402 | hritik | Tue 10 Nov | TODO |
| T-503 | USD-0 infra plan + paid fallback | raj | `docs/runbooks/infra-setup.md` v0.2 | US-802 | hritik → Roshan | Tue 10 Nov | TODO |
| T-904 | 1-page pricing summary | pm | `docs/pricing-summary.md` | US-911 | Roshan | Tue 10 Nov | TODO |
| T-705 | Page briefs (P0 Wed, all Sun) | sudip | `seo/briefs/` | US-1003 | pm, writer | Wed 11 / Sun 15 Nov | TODO |
| T-404 | Migrations-at-start check + collections plan | neha | `team/plans/T-404-collections.md` | US-305 prep | hritik | Thu 12 Nov | TODO |
| T-803 | Playwright + axe e2e home, Lighthouse | rajaros | `tests/e2e/home.spec.ts` | US-904 | hritik | Thu 12 Nov | TODO |
| T-205 | Component inventory + tokens v0.2 | satish | `docs/frontend/` | — | hritik | Fri 13 Nov | TODO |
| T-305 | Templates/routes + i18n v0.2 | mahendra | `docs/frontend/` | — | hritik | Fri 13 Nov | TODO |
| T-405 | Free-provider check for lead alerts | neha | `docs/api/leads.md` §11 | US-503 prep | hritik | Fri 13 Nov | TODO |
| T-706 | Schema + analytics event spec | sudip | `seo/schema-spec.md`, `seo/analytics-events.md` | US-704 | hritik | Fri 13 Nov | TODO |
| T-804 | Go/no-go v0.2 | rajaros | `qa/` | — | hritik | Fri 13 Nov | TODO |
| T-604 | Wireframes, other templates | sharwan | `design/wireframes/` | US-105 | pm, satish | Sun 15 Nov | TODO |
| T-1003 | Services hub + 2 service pages copy (prep) | writer | `content/pages/` | US-1004 | sudip, pm | Sun 15 Nov | TODO |
| T-905 | Sprint 1 Review = Gate 2 | pm | `team/sprints/sprint-1-review.md` | — | Roshan | Sun 15 Nov 15:00 | TODO |

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
| Day-1 homepage review: accept / changes | Sun 8 Nov | Sprint 1 |
| Pricing decision (after 1-page summary T-904) | Fri 13 Nov | pricing + rent pages |
| Docker Desktop install (100 GB freed ✔) | Mon 9 Nov | /admin + DB locally |
| Hero sari-model PNGs (≥ 2000 px, 2–3 poses) | Fri 20 Nov | US-107 |
| Case-study facts + permission (4 cases, `docs/company-info.md`) | Fri 20 Nov | US-1007 |
| PAN confirm (12 digits?), which phone(s)/address for ADMMIS.TECH | Fri 20 Nov | footer, legal |
| Q10 chat/sales email/CRM/who answers leads | Fri 20 Nov | US-503/506 |
| OK on free host proposal (T-503) + account actions + DNS → Cloudflare | Mon 23 Nov | staging |
| Original vector ADMMIS logo, if one exists | any time | T-601 (redraw used meanwhile) |
