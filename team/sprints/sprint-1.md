# Sprint 1 — Sat 7 Nov – Sun 15 Nov 2026

Owner: pm · Product Owner: Roshan · Planned 2026-11-07 10:50 MSK · Review: **Sun 15 Nov 15:00 MSK = Gate 2**
Backlog: `team/BACKLOG.md` · Release plan: `team/RELEASE-PLAN.md` · Process: ADR-040

## Sprint goal
**Roshan can run `pnpm dev` and see a real ADMMIS.TECH homepage — ADMMIS colours, Sindoor Studio layout, real copy —
today (Sat 7 Nov, 20:00 MSK), and by Sun 15 Nov it is polished, tested and the foundations for Sprint 2 are proven.**

## Committed stories (78 points)
US-102 logo (3) · US-103 home spec (5) · US-104 a11y colour fixes (2) · US-105 wireframes, start (8) · US-201 tokens (3) ·
US-202 fonts (2) · US-203 UI components (5) · US-204 header/footer/sticky bar (5) · US-205 hero (3) · US-401 homepage (5) ·
US-402 next-intl (3) · US-702 sitemap v0.2 (1) · US-704 schema + analytics spec (3) · US-802 USD-0 infra (3) ·
US-803 DNS steps (2) · US-902 spikes (5) · US-904 home e2e (5) · US-1001 voice (2) · US-1002 home copy (3) ·
US-1003 page briefs, P0 pages (8) · US-911 pricing summary (2)

## Day 1 (today) — order of work, MSK
| Time | Who (max 2 at once) | What |
|---|---|---|
| 10:45–13:30 | **sharwan** + **writer** | T-603 home spec + mock, T-601 logo · T-1001 voice, T-1002 home copy |
| 13:30–13:50 | pm | Accept spec, logo, copy; commit |
| 14:00–18:00 | **satish** + **mahendra** | T-203/T-204 tokens, components, hero · T-303 homepage route + message files |
| 18:00–19:15 | **hritik** (+ one builder for fixes) | T-104 code review of the homepage build; must-fixes applied |
| 19:15–20:00 | pm | Verify `pnpm dev`, screenshots, commit, write `team/sprints/sprint-1-day1-review.md` |

## Tasks per team member

### sharwan — UI/UX
| Task | Story | Deliverable | Due | Reviewer |
|---|---|---|---|---|
| T-603 Homepage design spec + static mock (ADMMIS colours, all contrast fixes) | US-103, US-104 | `design/homepage/home-spec.md`, `design/homepage/home.html` | **Sat 7 Nov 13:30** | pm → Roshan (day-1 review) |
| T-601 ADMMIS.TECH logo in the ADMMIS family (finish) | US-102 | `design/logo/admmis-tech-*.svg`, `favicon.svg`, `README.md`, `index.html` | **Sat 7 Nov 13:30** | pm → Roshan |
| T-604 Wireframes, all other templates (mobile first) | US-105 | `design/wireframes/` | Sun 15 Nov (rest in Sprint 2) | pm, satish |

### writer — Content
| Task | Story | Deliverable | Due | Reviewer |
|---|---|---|---|---|
| T-1001 Voice and tone guide | US-1001 | `content/voice-and-tone.md` | **Sat 7 Nov 12:30** | pm → Roshan |
| T-1002 Homepage copy + homepage microcopy | US-1002 | `content/pages/home.md`, `content/microcopy.md` | **Sat 7 Nov 13:30** | pm, sudip (SEO) → Roshan |
| T-1003 Prep: services hub + web-development + ai-agents copy (from sudip's briefs) | US-1004 (early) | `content/pages/services.md`, `…/web-development.md`, `…/ai-agents.md` | Sun 15 Nov | sudip, pm |

### satish — Frontend (design system)
| Task | Story | Deliverable | Due | Reviewer |
|---|---|---|---|---|
| T-203 Brand tokens in Tailwind 4 + self-hosted fonts | US-201, US-202 | `src/styles/*`, `src/brands/admmis-tech/tokens.css`, font loader | **Sat 7 Nov 16:00** | hritik |
| T-204 UI + layout components and home section blocks (Header, Footer, MobileStickyBar, Hero, cards, steps, FAQ accordion, CTA band) | US-203, US-204, US-205 | `src/components/ui/`, `src/components/layout/`, `src/components/blocks/` | **Sat 7 Nov 18:00** (polish Tue 10 Nov) | hritik |
| T-205 Component inventory v0.2 + design-tokens v0.2 (hritik's nits, ADMMIS values) | — | `docs/frontend/component-inventory.md`, `docs/frontend/design-tokens.md` | Fri 13 Nov | hritik |

### mahendra — Frontend (pages, i18n, SEO markup)
| Task | Story | Deliverable | Due | Reviewer |
|---|---|---|---|---|
| T-303 Homepage route: copy → message files, page composition, metadata | US-401 | `src/messages/en/*.json`, `src/app/(site)/[locale]/page.tsx`, `layout.tsx` | **Sat 7 Nov 18:00** | hritik |
| T-304 next-intl routing per i18n.md (replace the minimal proxy) | US-402 | `src/lib/i18n/`, `src/proxy.ts` | Tue 10 Nov | hritik |
| T-305 templates-and-routes v0.2 + i18n v0.2 (nits) | — | `docs/frontend/*.md` | Fri 13 Nov | hritik |

### hritik — Tech lead
| Task | Story | Deliverable | Due | Reviewer |
|---|---|---|---|---|
| T-104 Code review of the homepage build (standards, a11y, JS budget, no hard-coded strings) | US-903 | `team/reports/T-104-home-review.md` | **Sat 7 Nov 19:15** | pm |
| T-106 Disable AGENTS.md (`agentRules: false`), add the Next 16 docs line to standards (ADR-034) | — | `next.config.ts`, `docs/standards.md` | Mon 9 Nov | pm |
| T-105 Five architecture spikes | US-902 | `docs/spikes/` + report | Tue 10 Nov | pm → Gate 2 |

### neha — Backend / CMS
| Task | Story | Deliverable | Due | Reviewer |
|---|---|---|---|---|
| T-403 Peer review of T-103 scaffold + fresh-clone check (pending since 6 Nov) | — | `team/reports/T-403-scaffold-peer-review.md` | Mon 9 Nov | hritik |
| T-404 Verify migrations-at-start on Payload 3.93 (ADR-032) + plan the Sprint 2 collections | US-305 (prep), US-302 (prep) | `team/plans/T-404-collections.md` | Thu 12 Nov | hritik |
| T-405 Lead pipeline free-provider check (email/chat/CRM free tiers, ADR-037) | US-503 (prep) | update `docs/api/leads.md` §11 | Fri 13 Nov | hritik |

### raj — DevOps / security
| Task | Story | Deliverable | Due | Reviewer |
|---|---|---|---|---|
| T-503 USD-0 infra plan: free host near Nepal (Oracle Always Free Mumbai — verify with sources) vs cheapest paid fallback, trade-off table, ADR proposal | US-802 | `docs/runbooks/infra-setup.md` v0.2 | Tue 10 Nov | hritik → Roshan |
| T-504 DNS steps for Roshan: admmis.org → Cloudflare Free, keep existing records | US-803 | `docs/runbooks/dns-cloudflare.md` | Mon 9 Nov | hritik |
| T-505 Docker Desktop install note for Roshan's Mac + local Postgres check | — | section in `README.md` request to pm | Mon 9 Nov | pm |

### sudip — SEO & content strategy
| Task | Story | Deliverable | Due | Reviewer |
|---|---|---|---|---|
| T-704 Sitemap v0.2 (ADR-029, rule 5 → 308, robots, H1 rule) | US-702 | `seo/sitemap.md` | Mon 9 Nov | pm |
| T-705 Page briefs: P0 pages first (services, rent, pricing), then all launch pages | US-1003 | `seo/briefs/<slug>.md` | P0 Wed 11 Nov · all Sun 15 Nov | pm, writer |
| T-706 Schema + analytics event spec | US-704 | `seo/schema-spec.md`, `seo/analytics-events.md` | Fri 13 Nov | hritik, mahendra |
| T-707 SEO check of home copy (title, meta, H1, keyword) | US-1002 | note in `team/inbox/writer.md` | Mon 9 Nov | pm |

### rajaros — QA
| Task | Story | Deliverable | Due | Reviewer |
|---|---|---|---|---|
| T-802 Manual QA of the day-1 homepage (360 px, keyboard, contrast, copy vs content file) | US-904 | `qa/bugs/` entries + `team/reports/T-802-home-qa.md` | Mon 9 Nov | pm |
| T-803 Playwright + axe e2e for the homepage; Lighthouse mobile run | US-904 | `tests/e2e/home.spec.ts`, report | Thu 12 Nov | hritik |
| T-804 Go/no-go v0.2 (hritik nits, free-only test devices plan) | — | `qa/` | Fri 13 Nov | hritik |

### pm — Scrum Master
| Task | Story | Deliverable | Due | Reviewer |
|---|---|---|---|---|
| T-902 Gate 1 close-out: ADR-030..040, backlog, release plan, sprint plan | — | `docs/decisions.md`, `team/BACKLOG.md`, `team/RELEASE-PLAN.md`, this file | Sat 7 Nov 11:30 | Roshan |
| T-903 Day-1 review | — | `team/sprints/sprint-1-day1-review.md` | **Sat 7 Nov 20:00** | Roshan |
| T-904 1-page pricing summary | US-911 | `docs/pricing-summary.md` | Tue 10 Nov | Roshan |
| T-905 Daily scrum + burndown; Sprint 1 Review (Gate 2) | — | `team/standups/`, `team/sprints/sprint-1-review.md` | daily · Sun 15 Nov | Roshan |

## Risks
| Risk | Mitigation |
|---|---|
| Day-1 deadline: build depends on spec + copy landing by 13:30 | Fixed section list given to both sharwan and writer up front; satish starts tokens/components from the Sindoor demo if spec is late |
| Two builders editing at once | Strict file split: satish = `src/components`, `src/styles`, `src/brands`; mahendra = `src/app`, `src/messages`, `src/lib/i18n` |
| JS budget (empty page ~136 of 150 KB) | Home has no client JS except menu + FAQ (native `<details>` where possible); hritik measures in T-104 |
| `pnpm dev` needs Postgres for /admin; Docker not installed | Public home does not touch the DB; /admin needs Docker Desktop (Roshan action) |
| Facts missing (case results, PAN, event details) | Shown as clearly marked placeholders; never invented |

## What Roshan must deliver this sprint
1. Review the day-1 homepage tonight / tomorrow — accept or list changes (voice guide, logo, home copy, look).
2. Answer the TODO(roshan) batch from the writer (in the day-1 review).
3. Pricing decision after the 1-page summary (Tue 10 Nov) — by Fri 13 Nov.
4. Install Docker Desktop (for /admin + database locally).
5. Hero model PNGs and case-study facts — by Fri 20 Nov latest (earlier = better).
6. OK on the free host proposal (Tue 10 Nov) so setup can start.

## Burndown
| Day | Done / committed points |
|---|---|
| Sat 7 Nov | 0 / 78 (start) |

## Status — Sat 7 Nov 16:15 MSK (pm)
1. Roshan's 6 priorities for the session are all DONE and committed (ed35189 → 5c0365b).
2. Language switch EN/नेपाली + /ne homepage (T-306/T-206): live locally; /ne stays draft + noindex in prod until A11 proofread.
3. Template designs for service, services hub and on-rent (T-604a): done; prices public, "Request a quote" fallback.
4. Built: /services + 9 service pages, /rent + 3 rental pages (T-207, T-307, T-308), static, JS 143.7 KB, real copy.
5. CMS collections in code (T-404/T-406): Pages, Services, Pricing, RentalPlans, Faqs, Redirects, Media, Users, siteSettings; migrations unverified until Docker (C1).
6. Copy: services hub + 9 service pages + rent hub + 3 rental pages (T-1003/T-1005); P0 SEO-reviewed (T-708), 6 new briefs.
7. QA (T-805): e2e 80/80 pass, axe clean, no new bugs. Indexable: hubs + 5 P0 service pages; rest noindex until reviewed.
8. Reviews: hritik T-107/108/109/110, all APPROVED WITH NITS; must-fixes done, nits sent to inboxes.
9. Blockers for Roshan: C1 Docker (migrations), A6 prices/rent terms, A11 Nepali proofread, B3 WhatsApp, B7/B12 facts.
10. Next: T-709 review of P1 + rent copy → COPY_READY; T-604b designs for pricing/contact/about/cases/blog; satish T-108 nits.
