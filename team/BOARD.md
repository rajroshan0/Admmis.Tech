# Task board — ADMMIS.TECH website

Owner: **pm** (only the PM edits this file; others report status by message).
Status: `TODO` · `PLANNING` · `IN PROGRESS` · `REVIEW` · `BLOCKED` · `DONE`
Times MSK. Gate 1 = **Fri 13 Nov 15:00 MSK** (Roshan approves sitemap, scope, brand direction).

## Week 1 — Discovery & foundations (Mon 9 – Fri 13 Nov)

| ID | Task | Owner | Deliverable | Depends on | Reviewer | Due | Status |
|---|---|---|---|---|---|---|---|
| T-702 | Sitemap draft (all launch-scope pages, URLs, templates, primary keyword) | sudip | `seo/sitemap.md` | — | pm | Wed 11 Nov | DONE (v0.1; 3 calls for Gate 1) |
| T-701 | Keyword map EN (clusters, intent, one primary per page) | sudip | `seo/keyword-map.md` | T-702 | pm | Thu 12 Nov | DONE (volumes = ESTIMATE) |
| T-703 | Nepal competitor + price benchmark (≥10 agencies + FITTIN) | sudip | `seo/competitor-benchmark.md` | — | pm | Thu 12 Nov | DONE (v0.1, search-depth) |
| T-601 | "AT" logo — 3 concepts in the ADMMIS family | sharwan | `design/logo/` | ADMMIS brand files (Roshan) | pm | Fri 13 Nov | PARTIAL — 3 concepts done; BLOCKED on Q18 for family match |
| T-602 | 3 brand directions incl. sari-model hero | sharwan | `design/brand-directions/` | T-702 (structure) | pm | Fri 13 Nov | REVIEW (Roshan picks 1–3 at Gate 1) |
| T-101 | Repo foundation: structure, `docs/standards.md`, scaffold plan, CI spec | hritik | `docs/standards.md`, `docs/architecture.md` update | — | pm → Roshan | Wed 11 Nov (standards) / Fri 13 Nov 12:00 | REVIEW (Roshan at Gate 1) |
| T-401 | CMS content model draft | neha | `docs/api/content-model.md` | — | hritik | Thu 12 Nov | DONE (v0.2; hritik approved w/ changes, applied) |
| T-402 | Lead API contract & pipeline design | neha | `docs/api/leads.md` | T-401 | hritik | Fri 13 Nov | DONE (v0.2; hritik approved w/ changes, applied) |
| T-201 | Component inventory (keep / change / new / drop) | satish | `docs/frontend/component-inventory.md` | — | hritik | Thu 12 Nov | DONE (v0.1.1) |
| T-202 | Design-token architecture for multi-brand theming | satish | `docs/frontend/design-tokens.md` | T-101 | hritik | Fri 13 Nov | DONE (v0.1.1, must-fixes applied) |
| T-301 | Template & route map | mahendra | `docs/frontend/templates-and-routes.md` | T-702 | hritik | Thu 12 Nov | DONE (v0.1; nits for v0.2 Fri 20 Nov) |
| T-302 | i18n architecture (EN now, NE in Feb without rework) | mahendra | `docs/frontend/i18n.md` | T-101 | hritik | Fri 13 Nov | DONE (v0.1; nits for v0.2 Fri 20 Nov) |
| T-501 | Infra plan & runbooks (VPS options, DNS, Cloudflare, backups, monitoring, 2FA, Roshan's action list) | raj | `docs/runbooks/infra-setup.md` | — | hritik | Fri 13 Nov | PLANNING |
| T-502 | Dockerfile, docker-compose, CI workflow skeleton | raj | `Dockerfile`, `docker-compose.yml`, `.github/workflows/ci.yml` | T-101 | hritik | Fri 13 Nov | PLANNING |
| T-801 | Test plan, device matrix, launch checklist draft, go/no-go criteria | rajaros | `qa/` | — | hritik | Fri 13 Nov | TODO |
| T-103 | App scaffold per `docs/scaffold-plan.md` (installs packages; smoke tests; TS 7 vs 5.9 check) | hritik | `src/`, config files | T-101 + Roshan go-ahead | pm → Roshan | after Gate 1 | TODO (needs Roshan approval) |
| T-102 | Technical review of week-1 engineering work + readiness note | hritik | `docs/gates/gate-1-tech-review.md` | T-202, T-302, T-401, T-402, T-501, T-502 | pm | Fri 13 Nov 12:00 | TODO |
| T-901 | Gate 1 pack for Roshan | pm | `docs/gates/gate-1.md` | all above | Roshan | Fri 13 Nov 15:00 | TODO |

## Waiting on Roshan
| Item | Needed by | For |
|---|---|---|
| ADMMIS logo/brand files (logo, colours, fonts) | Tue 10 Nov | T-601, T-602 |
| Hero sari-model files (PNG ≥ 2000 px, 2–3 poses) | Wed 11 Nov | T-602 |
| Rental plan details (Q12–Q15 in `docs/open-questions.md`) | Fri 13 Nov | Gate 1 |

## Next weeks (outline — PM details these after Gate 1)
Week 2: homepage design · design system build · CMS skeleton · copy starts → Gate 2 Fri 20 Nov (homepage design)
Week 3: remaining templates designed · Sprint 1 build → Gate 3 Fri 27 Nov (all templates)
See `docs/timeline.md` for weeks 4–8.
