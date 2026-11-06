# Sitemap — tech.admmis.org (launch scope, 1 Jan 2027)

Owner: sudip · Task: T-702 · Version: v0.1 draft · 2026-11-06
Primary keywords are working labels. T-701 (`seo/keyword-map.md`) validates and may adjust them. Volumes are not claimed here.

## 1. URL rules

1. Lowercase, hyphenated, ASCII only. No trailing slash. No dates or IDs in URLs.
2. Max 2 levels deep: `/section/slug`. Keep slugs short (1–4 words).
3. **Locale (ASSUMPTION, Mahendra confirms in T-302):** English lives at the root (`/services/ai-agents`). Nepali is added in Feb 2027 under `/ne/` (`/ne/services/ai-agents`). Page paths and slugs stay identical across locales (English slugs, no Devanagari in URLs). Every page carries `hreflang` `en`, `ne`, `x-default` once NE exists. All tables below list paths without locale.
4. Self-referencing canonical on every indexable page. Canonical host: `https://tech.admmis.org`.
5. Redirects: 301 only; keep a redirect map in the CMS once any slug changes after launch.
6. Case studies, blog posts and jobs use the CMS `slug` field, editable by editors, unique per collection.
7. Never put prices, plan names or filters into URLs. Query-string pages (`?utm=`, `?service=`) canonicalise to the clean URL.

## 2. Page table

Priority: P0 = must rank / convert at launch, P1 = important, P2 = supporting. Index: Y = indexed, N = noindex.
Templates are names for Mahendra/Sharwan to map to routes; they are not final component names.

### 2.1 Core

| # | URL | Page | Template | Parent | Primary keyword (working) | Pri | Index |
|---|---|---|---|---|---|---|---|
| 1 | `/` | Home | `home` | — | software development company Nepal | P0 | Y |
| 2 | `/services` | Services hub | `services-hub` | `/` | IT services Nepal | P1 | Y |
| 3 | `/pricing` | Pricing (packages NPR + USD, budget guide, quote form) | `pricing` | `/` | software development cost Nepal | P0 | Y |
| 4 | `/rent` | On rent hub (website / AI agent / team, plans, FAQ) | `rent-hub` | `/` | website on rent Nepal | P0 | Y |
| 5 | `/work` | Our work (case list) | `cases-list` | `/` | software projects portfolio Nepal | P1 | Y |
| 6 | `/about` | About ADMMIS.TECH | `about` | `/` | about ADMMIS.TECH | P2 | Y |
| 7 | `/contact` | Contact and quote form | `contact` | `/` | contact software company Kathmandu | P1 | Y |
| 8 | `/faq` | FAQ hub (pricing, timelines, ownership, support) | `faq` | `/` | web development FAQ Nepal | P2 | Y |

### 2.2 Services (9, from docs/timeline.md; all use template `service`)

| # | URL | Page | Parent | Primary keyword (working) | Pri |
|---|---|---|---|---|---|
| 9 | `/services/web-development` | Websites and web platforms | `/services` | web development company Nepal | P0 |
| 10 | `/services/mobile-app-development` | Mobile apps (Flutter, React Native, native) | `/services` | mobile app development Nepal | P0 |
| 11 | `/services/custom-software` | Custom software and SaaS | `/services` | custom software development Nepal | P1 |
| 12 | `/services/ai-agents` | AI products, AI agents, chatbots | `/services` | AI agent development Nepal | P0 |
| 13 | `/services/qa-testing` | QA and software testing | `/services` | software testing services Nepal | P1 |
| 14 | `/services/audit` | Code, UX/UI and SEO audit | `/services` | website audit service Nepal | P1 |
| 15 | `/services/outstaffing` | Dedicated developers, designers, QA, DevOps | `/services` | hire dedicated developers Nepal | P0 |
| 16 | `/services/digital-marketing` | SEO, social, paid ads, influencer | `/services` | digital marketing agency Nepal | P0 |
| 17 | `/services/offline-marketing` | Events, print, BTL | `/services` | event and BTL marketing Kathmandu | P2 |

Note: timeline lists "Development, Mobile apps, Websites" as separate items. I merge "Development" and "Websites" into `web-development` and add `custom-software` for SaaS/platform work, so 9 services in total and no overlap. Decision for PM/Roshan: confirm this split.

### 2.3 On rent (ADR-012). SCOPE ADDITION: hub plus 3 child pages

Each rental product is a separate search intent ("website on rent", "AI agent subscription", "hire a team monthly"). One shared template, content from the `rentalPlans` collection, so the cost is low.

| # | URL | Page | Template | Parent | Primary keyword (working) | Pri |
|---|---|---|---|---|---|---|
| 18 | `/rent/website` | Website on rent | `rent-product` | `/rent` | website on rent Nepal | P0 |
| 19 | `/rent/ai-agent` | AI agent on rent | `rent-product` | `/rent` | AI chatbot subscription Nepal | P1 |
| 20 | `/rent/team` | Team on rent | `rent-product` | `/rent` | rent a development team Nepal | P1 |

If PM rejects the child pages, row 4 takes the keyword "website on rent Nepal" with all three products on one page, and rows 18–20 are dropped. The hub keyword would then be "software rental subscription Nepal".
Hub (row 4) primary keyword when children exist: `monthly website and software subscription Nepal`. T-701 settles this.

### 2.4 Our work (4–6 case studies, with client permission)

| # | URL | Page | Template | Parent | Primary keyword | Pri |
|---|---|---|---|---|---|---|
| 21–26 | `/work/[slug]` | Case study (4–6 at launch) | `case` | `/work` | one per case, "[industry] [solution] Nepal" (set when cases are chosen) | P1 | 

### 2.5 Company, careers, event, blog

| # | URL | Page | Template | Parent | Primary keyword | Pri | Index |
|---|---|---|---|---|---|---|---|
| 27 | `/careers` | Careers (we are hiring) | `careers-list` | `/` | IT jobs Kathmandu | P1 | Y |
| 28 | `/careers/[slug]` | Job posting (one per open role) | `job` | `/careers` | "[role] job Kathmandu" | P2 | Y (while open) |
| 29 | `/opening-event` | Opening event, 1 Jan 2027 (details, registration) | `event` | `/` | ADMMIS.TECH opening event | P1 | Y |
| 30 | `/blog` | Blog index | `blog-list` | `/` | tech and marketing blog Nepal | P2 | Y |
| 31–33 | `/blog/[slug]` | 3 launch articles | `article` | `/blog` | topics set in T-701 (see keyword map) | P1 | Y |

The event page uses a flat URL because it will be printed and shared. After the event it stays as an archive page.

### 2.6 Legal and system

| # | URL | Page | Template | Index | Notes |
|---|---|---|---|---|---|
| 34 | `/privacy` | Privacy policy | `legal` | Y (low priority) | Linked from footer and all forms |
| 35 | `/terms` | Terms of service | `legal` | Y (low priority) | |
| 36 | `/cookies` | Cookie policy and settings | `legal` | Y (low priority) | Consent banner links here |
| 37 | `/contact/thank-you` | Form success page | `thank-you` | **N** | GA4 conversion page; excluded from sitemap.xml |
| 38 | `/404` | Not found | `error` | **N** (returns HTTP 404) | Links to home, services, contact |
| 39 | `/sitemap.xml` | XML sitemap | generated | — | Lists Y pages only, with `xhtml:link` alternates when NE exists |
| 40 | `/robots.txt` | Robots | generated | — | Allow all; disallow `/admin`, `/api`, `/contact/thank-you`; points to sitemap |

Total indexable content pages at launch: about 36 (with 5 cases, about 2 jobs; exact count depends on CMS data).

## 3. Primary keyword uniqueness check

All primary keywords in sections 2.1–2.3 are distinct. One intentional near-overlap: `/rent/website` vs `/services/web-development`. Separation by intent: rental = monthly subscription of a ready-made site ("on rent", "subscription"); web development = custom project build. Internal links between them are planned in the T-701 linking plan.

## 4. Navigation proposal (for Sharwan)

- **Header (max 6 items):** Services (dropdown: 9 services) · On rent · Pricing · Our work · About (dropdown: About, Careers, Blog, FAQ) · primary CTA button "Get a quote" → `/contact`.
- **Footer:** Services list · On rent products · Company (About, Careers, Blog, Opening event, FAQ, Contact) · Legal (Privacy, Terms, Cookies) · language switcher (EN now; NE hidden until ready).
- **Sticky actions on mobile:** WhatsApp, call, get a quote.
- **Breadcrumbs** (visible and BreadcrumbList schema) on all pages deeper than level 1.
- Every service and rental page ends with: related case studies, pricing teaser (from the price collection), FAQ block, quote form.

## 5. Phase 2 (not built at launch; reserve the URL space)

| URL | Page |
|---|---|
| `/ne/...` | Nepali versions (~Feb 2027) |
| `/industries/retail`, `/industries/restaurants`, `/industries/pharmacy`, `/industries/education`, `/industries/tourism` | Industry landing pages |
| `/services/seo-audit`, `/services/ux-audit`, `/services/code-audit` | Audit split, if search demand justifies |
| `/calculator` | Cost / ROI calculator |
| `/events`, `/events/[slug]` | Events and webinars section (`/opening-event` then redirects or is listed) |
| `/blog/category/[slug]` | Blog categories, once more than ~10 posts |
| `/partners`, `/docs`, `/portal` | Partners, documentation, client portal |

## 6. Open questions

| # | Question | To | Needed by |
|---|---|---|---|
| 1 | Approve rental hub + 3 child pages (rows 18–20)? | pm / Roshan | Gate 1, Fri 13 Nov |
| 2 | Approve service split (web-development vs custom-software)? | pm / Roshan | Gate 1 |
| 3 | Confirm locale scheme: EN unprefixed, NE under `/ne/` | mahendra (T-302) | Thu 12 Nov |
| 4 | Which 4–6 case studies, and are clients' names allowed public? | Roshan | Wed 25 Nov |
| 5 | Is a standalone `/faq` wanted at launch, or only FAQ blocks on pages? | pm | Gate 1 |
