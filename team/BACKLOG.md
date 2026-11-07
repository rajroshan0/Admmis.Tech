# Product backlog — tech.admmis.org launch

Owner: **pm** (Scrum Master, PO proxy) · Product Owner: **Roshan** · Created 2026-11-07 · Process: ADR-040
Scope source: `docs/timeline.md` launch scope, `seo/sitemap.md` v0.1 + ADR-029. Phase 2 at the bottom.

**Points:** 1, 2, 3, 5, 8 (relative effort; 8 = biggest allowed, split anything bigger).
**Priority (MoSCoW):** M must for launch · S should · C could · W won't (Phase 2).
**Status:** `Done` · `Sprint N` (committed) · `Ready` (meets Definition of Ready) · `Not ready` (blocker or missing AC).
**Definition of Ready:** AC written, owner, estimate, no unresolved blocker. **Definition of Done:** CLAUDE.md §8 + reviewed + Roshan-accepted at Sprint Review (user-facing work).

Role in "As a …": **visitor** (Nepali SME owner or international buyer on a phone), **editor** (ADMMIS staff using the CMS), **sales** (person answering leads), **Roshan** (owner/approver), **team** (engineers).

Totals (launch scope): **86 stories · 330 points** (28 points already Done). Velocity assumption: **~95 points/sprint**, recalibrated after Sprint 1 (team of 10 AI members; the real limit is Roshan's facts and approvals, not build speed). See `team/RELEASE-PLAN.md`.

---

## E1 · Brand & design (owner role: sharwan)

| ID | Story | Acceptance criteria | Owner | Pts | Pri | Depends on | Status |
|---|---|---|---|---|---|---|---|
| US-101 | As Roshan, I want 3 brand directions to choose from, so that the brand is decided early | 3 HTML directions + comparison; Roshan picked one | sharwan | 5 | M | — | Done (ADR-031) |
| US-102 | As a visitor, I want the ADMMIS.TECH logo to look like part of the ADMMIS family, so that I trust it is the same company | Redrawn emblem + `ADMMIS.TECH` wordmark, orange dot; light/dark SVG, mark, favicon legible at 32 px; < 10 KB each | sharwan | 3 | M | ADMMIS files (received) | Sprint 1 |
| US-103 | As the team, I want a homepage design spec in the ADMMIS colours, so that we build the right thing the first time | `design/homepage/home-spec.md` + `home.html`; all pairs AA with computed ratios; 360 px + 1280 px; text limits per section | sharwan | 5 | M | US-101 | Sprint 1 |
| US-104 | As a visitor using a keyboard or low vision, I want visible focus, strong control borders and readable status colours, so that I can use every form | `--line-strong` ≥ 3:1, status colours AA, alt-section set, focus visible on bg and alt | sharwan | 2 | M | US-103 | Sprint 1 |
| US-105 | As the team, I want wireframes for every other template, so that build can start on them | Wireframes for services-hub, service, rent-hub, rent-product, pricing, cases-list, case, about, contact, careers, job, event, blog-list, article, legal, thank-you, 404; states from satish's list | sharwan | 8 | M | US-103 | Sprint 1 (start) / 2 |
| US-106 | As Roshan, I want high-fidelity designs of the key templates, so that I can approve them at Gate 3 | Hi-fi for service, rent-product, pricing, case, contact (desktop + mobile) | sharwan | 8 | M | US-105 | Sprint 2 |
| US-107 | As a visitor, I want the hero to show the ADMMIS sari model, so that the brand feels local and distinctive | Hero art direction with Roshan's PNGs (≥ 2000 px, 2–3 poses); AVIF/WebP, LCP < 2.5 s | sharwan + satish | 3 | M | Hero files from Roshan | Not ready (files) |
| US-108 | As the team, I want a UI kit spec (all components and states), so that new pages need no new design | `design/ui-kit.md` covering every component in the inventory | sharwan | 5 | S | US-106 | Sprint 3 |
| US-109 | As a visitor, I want simple icons and illustrations for services, so that I scan the page quickly | One SVG icon per service + rent product, one style, < 2 KB each | sharwan | 2 | S | US-103 | Sprint 3 |

## E2 · Design system in code (owner role: satish)

| ID | Story | Acceptance criteria | Owner | Pts | Pri | Depends on | Status |
|---|---|---|---|---|---|---|---|
| US-201 | As the team, I want the ADMMIS brand tokens in Tailwind 4, so that every page uses one theme | `tokens-base.css` + `src/brands/admmis-tech/tokens.css` + `base.css` per design-tokens.md §5; values = home-spec | satish | 3 | M | US-103 | Sprint 1 |
| US-202 | As a visitor, I want fonts that load fast and support Nepali later, so that text appears instantly | Montserrat via `next/font` self-hosted (no runtime CDN), `display: swap`, Devanagari face `preload: false`; ≤ 4 files | satish | 2 | M | US-201 | Sprint 1 |
| US-203 | As the team, I want core UI components (Button, Link, Container, Section, Card, Heading, Accordion), so that pages are assembled not hand-coded | Components in `src/components/ui/`, typed props, no hard-coded strings, keyboard + focus, reduced motion | satish | 5 | M | US-201 | Sprint 1 |
| US-204 | As a visitor, I want a header with menu and a footer on every page, so that I can always navigate and contact | Header (logo, ≤ 6 nav, CTA, mobile menu with focus trap), Footer, MobileStickyBar (WhatsApp/call/quote) | satish | 5 | M | US-203 | Sprint 1 |
| US-205 | As a visitor, I want a hero that is clear and fast on a cheap phone, so that I understand the offer in 5 seconds | Hero block with placeholder art (CSS/SVG), LCP element is text, CLS < 0.1 | satish | 3 | M | US-203 | Sprint 1 |
| US-206 | As the team, I want the remaining 13 CMS blocks as components, so that editors can build pages | Blocks per component-inventory v0.2 (cards grid, steps, case teaser, pricing table, FAQ, CTA band, logos, rich text, etc.) | satish | 8 | M | US-203, US-106 | Sprint 2 |
| US-207 | As a visitor, I want pricing tables and a rental band selector, so that I see what I would pay | PricingTable, BandSelector, CurrencyToggle (NPR/USD); reads price collection; ≤ 3 KB JS | satish | 5 | M | US-206, US-403 | Sprint 2 |
| US-208 | As a visitor, I want subtle motion that never blocks reading, so that the site feels modern but stays fast | CSS-only reveal/hover; `prefers-reduced-motion` respected; 0 KB extra JS | satish | 2 | S | US-203 | Sprint 3 |
| US-209 | As a rental client (future), I want the theme to re-skin by changing one token file, so that our site can be built from this codebase | Second demo brand builds with `BRAND=demo`; no component change needed (ADR-013/027) | satish | 3 | S | US-201 | Sprint 3 |

## E3 · CMS & data (owner role: neha)

| ID | Story | Acceptance criteria | Owner | Pts | Pri | Depends on | Status |
|---|---|---|---|---|---|---|---|
| US-301 | As the team, I want the content model designed, so that pages, prices and leads have one structure | `docs/api/content-model.md` v0.2 approved | neha | 5 | M | — | Done |
| US-302 | As an editor, I want Pages, Services, RentProducts, Cases, Jobs, Posts, Media collections in Payload, so that I can edit the site | Collections in `src/collections/`, localized text fields, blocks per v0.2, access control; typegen clean | neha | 8 | M | US-301 | Sprint 2 |
| US-303 | As Roshan, I want prices in one collection only admins can change, so that prices are never inconsistent | `pricing` collection, admin-only write (ADR-025), `{{price:id}}` resolver used by pages | neha | 3 | M | US-302 | Sprint 2 |
| US-304 | As an editor, I want site settings and navigation as globals, so that I can change footer/contact info without code | `siteSettings`, `navigation` globals; company info from `docs/company-info.md` | neha | 2 | M | US-302 | Sprint 2 |
| US-305 | As the team, I want committed migrations that run at app start, so that production schema is safe | First migration generated; runs at start (ADR-032); verified on clean Postgres | neha + hritik | 3 | M | US-302 | Sprint 2 |
| US-306 | As an editor, I want 2FA on the CMS admin, so that a stolen password is not enough | TOTP (or Cloudflare Access) for /admin per spike result; documented | neha + raj | 3 | M | spike | Sprint 2 |
| US-307 | As the team, I want a seed script that loads `content/` copy into the CMS, so that content entry is repeatable | `pnpm seed` loads pages + cases + posts from `content/` Markdown; idempotent | neha | 5 | M | US-302, content | Sprint 3 |
| US-308 | As an editor, I want draft preview, so that I can check a page before publishing | Payload drafts + Next draft mode on page templates | neha + mahendra | 3 | S | US-302 | Sprint 3 |

## E4 · Pages & templates (owner role: mahendra; blocks from satish)

| ID | Story | Acceptance criteria | Owner | Pts | Pri | Depends on | Status |
|---|---|---|---|---|---|---|---|
| US-401 | As a visitor, I want a homepage that explains what ADMMIS.TECH does and how to contact it, so that I can decide in one visit | `/` renders all home sections from `content/pages/home.md` copy (via message files now, CMS later); Lighthouse mobile ≥ 90; no hard-coded strings | mahendra + satish | 5 | M | US-103, US-1002, US-204 | Sprint 1 |
| US-402 | As the team, I want next-intl routing (EN at `/`, NE later at `/ne/`), so that Nepali needs no rework | next-intl per i18n.md §2.2, static rendering kept, `/en/x` → 308 `/x`, messages in `src/messages/en/` | mahendra | 3 | M | — | Sprint 1 |
| US-403 | As a visitor, I want a services hub and 9 service pages, so that I find the service I need | Templates `services-hub` + `service`; 9 URLs per sitemap; CMS-driven | mahendra | 8 | M | US-206, US-302 | Sprint 2 |
| US-404 | As a visitor, I want a rent hub and 3 rental pages with plans, so that I can rent a website, AI agent or team | `rent-hub` + `rent-product`; band selector; FAQ (ownership, term, support) | mahendra | 5 | M | US-207 | Sprint 2 |
| US-405 | As a visitor, I want a pricing page in NPR and USD with a quote form, so that I know the budget before calling | `/pricing`; packages from price collection; quote CTA | mahendra | 5 | M | US-207, US-303 | Sprint 2 |
| US-406 | As a visitor, I want case studies, so that I see real work | `/work` + `/work/[slug]`, 4 cases | mahendra | 5 | M | US-302, case facts | Sprint 3 |
| US-407 | As a visitor, I want About, Contact and Thank-you pages, so that I know who you are and can reach you | `/about`, `/contact` (form), `/contact/thank-you` (noindex) | mahendra | 3 | M | US-501 | Sprint 2 |
| US-408 | As a job seeker, I want a careers page and job postings, so that I can apply | `/careers` + `/careers/[slug]` (apply = email/form) | mahendra | 3 | M | US-302 | Sprint 3 |
| US-409 | As an event guest, I want the opening event page, so that I know when and where and can register | `/opening-event`, details from Roshan, registration via lead form type `event` | mahendra | 3 | M | event facts | Sprint 3 |
| US-410 | As a visitor, I want a blog with 3 articles, so that I learn and trust the expertise | `/blog` + `/blog/[slug]`, Article JSON-LD | mahendra | 3 | M | US-302 | Sprint 3 |
| US-411 | As a visitor, I want privacy, terms and cookie pages, so that I know how my data is used | `/privacy`, `/terms`, `/cookies` (legal template), text approved by Roshan | mahendra | 2 | M | legal text | Sprint 3 |
| US-412 | As a visitor, I want a helpful 404 page, so that a broken link is not a dead end | HTTP 404, links home/services/contact | mahendra | 1 | M | US-204 | Sprint 2 |
| US-413 | As a visitor, I want every page to share metadata, canonical and Open Graph tags, so that links look right when shared | `generateMetadata` per template from CMS SEO fields; OG image default | mahendra | 3 | M | US-302 | Sprint 3 |

## E5 · Content (owner role: writer; briefs: sudip)

| ID | Story | Acceptance criteria | Owner | Pts | Pri | Depends on | Status |
|---|---|---|---|---|---|---|---|
| US-1001 | As Roshan, I want a voice-and-tone guide, so that every page sounds like one brand | `content/voice-and-tone.md` ≤ 1 page; Roshan OK | writer | 2 | M | — | Sprint 1 |
| US-1002 | As a visitor, I want clear homepage copy, so that I understand the offer and next step | `content/pages/home.md`; field structure for devs; word limits met; no invented facts | writer | 3 | M | US-1001 | Sprint 1 |
| US-1003 | As the writer, I want an SEO page brief per launch page, so that copy matches search intent | `seo/briefs/<slug>.md` for all ~30 pages: title, meta, H1/H2, keywords, links | sudip | 8 | M | sitemap v0.2 | Sprint 1 / 2 |
| US-1004 | As a visitor, I want services hub + 9 service pages copy, so that each service is explained with proof and FAQ | 10 files in `content/pages/`; brief-compliant | writer | 8 | M | US-1003 | Sprint 2 |
| US-1005 | As a visitor, I want rent hub + 3 rental pages copy and pricing page copy, so that I understand plans and terms | 5 files; prices only as `{{price:id}}` | writer | 5 | M | US-1003, pricing decision | Sprint 2 |
| US-1006 | As a visitor, I want About, Contact, Careers and Event copy, so that I know the company and how to engage | 4+ files; facts only from Roshan | writer | 3 | M | facts | Sprint 2 |
| US-1007 | As a visitor, I want 4 case studies, so that I see proof of results | 4 files in `content/cases/`; results only from Roshan; client permission recorded | writer | 5 | M | case facts (Roshan) | Not ready (facts) |
| US-1008 | As a visitor, I want 3 useful launch articles, so that I learn something and trust the team | 3 files in `content/blog/`, 900–1,400 words, topics from keyword map | writer | 5 | M | US-1003 | Sprint 3 |
| US-1009 | As a visitor, I want clear form labels, errors, cookie banner and emails, so that nothing confuses me | `content/microcopy.md` complete; auto-reply + lead-alert email text | writer | 3 | M | US-501 | Sprint 2 |
| US-1010 | As Roshan, I want legal page drafts, so that a lawyer or I can finalise them quickly | privacy/terms/cookies drafts marked `TODO(roshan/lawyer)`; processors listed | writer + neha | 3 | M | processor list | Sprint 3 |
| US-1011 | As Roshan, I want all copy proofread and approved before content freeze, so that we launch without errors | Proofread checklist per page; Roshan sign-off | writer + Roshan | 2 | M | all content | Sprint 4 |

## E6 · Lead pipeline (owner role: neha; form UI mahendra)

| ID | Story | Acceptance criteria | Owner | Pts | Pri | Depends on | Status |
|---|---|---|---|---|---|---|---|
| US-501 | As a visitor, I want a short quote form that works on my phone, so that I can ask for a price in 1 minute | Form UI (name, email/phone, service, message, consent); server validation; accessible errors | mahendra | 5 | M | US-203 | Sprint 2 |
| US-502 | As sales, I want every lead saved in the database before anything else, so that no lead is ever lost | `POST /api/leads` per `docs/api/leads.md` v0.2; idempotency, rate limit, outbox | neha | 8 | M | US-302 | Sprint 2 |
| US-503 | As sales, I want an email and a chat alert for each lead, so that I answer fast | Outbox worker → email (free provider) + Slack free webhook; retries; log provider in dev | neha | 5 | M | US-502, Q10 | Sprint 3 |
| US-504 | As a visitor, I want an automatic confirmation email, so that I know my request arrived | Auto-reply (ADR-026), text from writer | neha | 2 | M | US-503 | Sprint 3 |
| US-505 | As sales, I want spam blocked without losing real leads, so that the inbox stays usable | Turnstile + circuit breaker N = 20/h + fallback (ADR-036) | neha | 3 | M | US-502, Cloudflare | Sprint 3 |
| US-506 | As sales, I want leads in a free CRM, so that we track follow-ups | HubSpot Free (or chosen) sync via outbox; failure doesn't block | neha | 3 | S | Q10 | Sprint 3 |
| US-507 | As Roshan, I want leads deleted after 24 months, so that we keep only what we need | Scheduled retention job (ADR-036); documented | neha | 2 | S | US-502 | Sprint 4 |
| US-508 | As a visitor, I want WhatsApp and call buttons, so that I can contact in the way I prefer | `wa.me` + `tel:` links in sticky bar/contact; numbers from site settings | mahendra | 1 | M | US-304 | Sprint 2 |

## E7 · SEO & analytics (owner role: sudip; implementation mahendra)

| ID | Story | Acceptance criteria | Owner | Pts | Pri | Depends on | Status |
|---|---|---|---|---|---|---|---|
| US-701 | As Roshan, I want a sitemap, keyword map and competitor benchmark, so that structure follows demand | `seo/` docs v0.1 | sudip | 8 | M | — | Done |
| US-702 | As the team, I want sitemap v0.2 with all Gate-1 fixes, so that everyone builds against one list | ADR-029 applied (no /faq), rule 5 = 308, robots fix, H1 rule | sudip | 1 | M | — | Sprint 1 |
| US-703 | As a search engine, I want sitemap.xml, robots.txt and JSON-LD, so that pages are indexed correctly | Generated sitemap/robots; Organization, Service, Article, FAQ, Breadcrumb JSON-LD per spec | mahendra (spec sudip) | 5 | M | US-413 | Sprint 3 |
| US-704 | As Roshan, I want a schema and analytics event spec, so that we measure leads by channel | `seo/schema-spec.md`, `seo/analytics-events.md` (GA4 events, conversions) | sudip | 3 | M | — | Sprint 1 |
| US-705 | As a visitor, I want a cookie banner that loads analytics only after I agree, so that my privacy is respected | Consent banner; GA4/Pixel/Clarity load only after consent (ADR-006); ≤ 4 KB JS | mahendra | 5 | M | US-704 | Sprint 3 |
| US-706 | As Roshan, I want GA4, Meta Pixel and Clarity set up (free), so that we see traffic and leads | IDs in env; events fire per spec; verified in debug view | sudip + mahendra | 3 | M | accounts (Roshan) | Sprint 3 |
| US-707 | As Roshan, I want Google Search Console and Bing verified at launch, so that indexing starts on day 1 | Verification via DNS/meta; sitemap submitted | sudip | 1 | S | production | Sprint 5 |

## E8 · Infra & security (owner role: raj)

| ID | Story | Acceptance criteria | Owner | Pts | Pri | Depends on | Status |
|---|---|---|---|---|---|---|---|
| US-801 | As Roshan, I want an infra plan and runbooks, so that setup is predictable | `docs/runbooks/infra-setup.md` approved w/ nits | raj | 5 | M | — | Done |
| US-802 | As Roshan, I want a USD 0 infra plan with a free host near Nepal, so that we spend nothing before launch | Revised plan: Oracle Cloud Always Free (Mumbai, verified with source) vs cheapest paid fallback; trade-off table; new ADR proposal | raj | 3 | M | ADR-037 | Sprint 1 |
| US-803 | As Roshan, I want plain DNS steps for admmis.org → Cloudflare Free, so that I can do it myself in 15 minutes | `docs/runbooks/dns-cloudflare.md`: registrar steps, records to keep, verification | raj | 2 | M | — | Sprint 1 |
| US-804 | As the team, I want CI (lint, types, tests, build, Lighthouse) on every PR, so that main is always releasable | `.github/workflows/ci.yml` green on first push; free minutes | raj + hritik | 3 | M | push (Roshan) | Sprint 2 |
| US-805 | As the team, I want a Docker image and deploy script that work, so that deploys are one command | Standalone image builds in CI; `deploy.sh` with migration-at-start (ADR-032); rollback | raj | 5 | M | US-804 | Sprint 2 |
| US-806 | As Roshan, I want staging and production servers hardened, so that the site is safe from day 1 | SSH keys only, firewall, auto-updates, Cloudflare proxy, 2FA everywhere (ADR-017) | raj | 5 | M | host + Roshan actions | Sprint 3 |
| US-807 | As Roshan, I want daily encrypted backups with a tested restore, so that we can recover from any failure | ADR-035 implemented; first restore test recorded | raj | 3 | M | US-806 | Sprint 3 |
| US-808 | As the team, I want error and uptime monitoring (free), so that we know about problems before clients | Sentry server-side (ADR-033), free uptime monitor 5-min, alerts to Slack | raj | 2 | M | US-806 | Sprint 4 |
| US-809 | As Roshan, I want media on Cloudflare R2 free tier, so that images are fast and backed up | Payload S3 adapter → R2; CDN URLs | raj + neha | 2 | M | Cloudflare | Sprint 3 |
| US-810 | As Roshan, I want a security baseline review, so that we launch without known holes | Headers/CSP, dependency audit, admin protection, secrets check; report | raj + hritik | 3 | M | US-806 | Sprint 4 |

## E9 · QA & launch (owner role: rajaros; tech review hritik; pm)

| ID | Story | Acceptance criteria | Owner | Pts | Pri | Depends on | Status |
|---|---|---|---|---|---|---|---|
| US-901 | As Roshan, I want a test plan and go/no-go criteria, so that launch quality is decided by facts | `qa/` v0.1; ADR-039 | rajaros | 5 | M | — | Done |
| US-902 | As the team, I want the 5 architecture spikes passed, so that the stack is proven early | Payload+Next16 on Node 24 build/run, Tailwind 4 theming, next-intl static + JS cost, admin 2FA, standalone Docker image | hritik | 5 | M | — | Sprint 1 |
| US-903 | As the team, I want code review on every change, so that standards hold | Hritik review verdict per PR/task; standards.md current | hritik | 3 | M | — | every sprint |
| US-904 | As Roshan, I want e2e tests for the homepage and lead form, so that regressions are caught | Playwright: home renders, nav, form happy/error path, a11y (axe) | rajaros | 5 | M | US-401, US-501 | Sprint 1 (home) / 2 |
| US-905 | As a visitor on a cheap Android phone, I want every page fast, so that I don't leave | Lighthouse mobile ≥ 90, LCP < 2.5 s 4G, JS < 150 KB on all templates; budget in CI | rajaros + hritik | 3 | M | templates | Sprint 4 |
| US-906 | As a visitor with a disability, I want the site WCAG 2.2 AA, so that I can use it | axe clean + manual keyboard/screen-reader pass on all templates | rajaros | 3 | M | templates | Sprint 4 |
| US-907 | As Roshan, I want a real-device and browser pass, so that it works on the phones our clients use | Device matrix run (free: own phones + emulators); bugs logged | rajaros | 3 | M | staging | Sprint 4 |
| US-908 | As Roshan, I want a go/no-go meeting with evidence, so that I launch with confidence | 19 criteria evidenced; decision recorded | rajaros + pm | 2 | M | US-905..907 | Sprint 5 |
| US-909 | As Roshan, I want production deployed and soft-launched, so that the site is live before the event | Prod deploy, smoke test, monitoring green, rollback tested | raj + pm | 3 | M | US-908 | Sprint 5 |
| US-910 | As Roshan, I want hypercare after soft launch, so that issues are fixed within a day | Daily checks, bug SLA 24 h, first analytics review | all | 3 | M | US-909 | Sprint 6 |
| US-911 | As Roshan, I want a 1-page pricing summary, so that I can approve prices and rental terms | `docs/pricing-summary.md` (1 page): bands, rental prices, team-on-rent options, terms, margins; decision list | pm | 2 | M | — | Sprint 1 |

---

## Phase 2 (after launch — not committed)

| ID | Story | Pri | Pts (rough) |
|---|---|---|---|
| US-P01 | As a Nepali reader, I want the whole site in Nepali (`/ne/`), so that I read in my language | W (Feb 2027) | 13 (split later) |
| US-P02 | As a visitor, I want a cost calculator, so that I estimate a project myself | W | 8 |
| US-P03 | As a visitor, I want an AI chat assistant, so that I get answers at night | W | 8 |
| US-P04 | As a retailer/restaurant/pharmacy/school owner, I want an industry page, so that I see solutions for my business | W | 8 |
| US-P05 | As sales, I want leads in the ADMMIS CRM, so that all units share one pipeline | W | 5 |
| US-P06 | As a visitor, I want an events/webinars section, so that I can join future events | W | 5 |
| US-P07 | As a client, I want a client portal, so that I see project status and invoices | W | 13 |
| US-P08 | As a visitor, I want browser error monitoring (Sentry SDK lazy), so that client errors get fixed | C (if JS budget allows, ADR-033) | 2 |
