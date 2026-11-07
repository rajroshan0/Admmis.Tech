# Sitemap — tech.admmis.org (launch scope, 1 Jan 2027)

Owner: sudip · Tasks: T-702, T-704 · Version: v0.2 · 2026-11-07 (Gate 1 passed; ADR-029 and ADR-030 applied)
Primary keywords are working labels. T-701 (`seo/keyword-map.md`) validates and may adjust them. Volumes are not claimed here.

## 1. URL rules

1. Lowercase, hyphenated, ASCII only. No trailing slash. No dates or IDs in URLs.
2. Max 2 levels deep: `/section/slug`. Keep slugs short (1–4 words).
3. **Locale (confirmed by mahendra, T-302):** English lives at the root (`/services/ai-agents`). Nepali is added in Feb 2027 under `/ne/` (`/ne/services/ai-agents`). Page paths and slugs stay identical across locales (English slugs, no Devanagari in URLs). `hreflang` (`en`, `ne`, `x-default`; EN is x-default) is emitted only for pages that exist in NE (`translatedLocales`). Untranslated NE pages are noindex with a self canonical and are not in sitemap.xml. All tables below list paths without locale.
4. Self-referencing canonical on every indexable page. Canonical host: `https://tech.admmis.org`.
5. Redirects: permanent redirects only, **301 or 308** (Next.js `permanentRedirect` emits 308; search engines treat both the same). Never 302 for a moved page. Keep a redirect map in the CMS once any slug changes after launch.
6. Case studies, blog posts and jobs use the CMS `slug` field, editable by editors, unique per collection.
7. **H1 rule:** exactly one H1 per page, and it carries the page's primary keyword in natural wording. Source field: for `pages` templates (home, hubs, pricing, rent, about, contact, legal) and for `services` entries, H1 = `heroHeading` (editor-written, <= 70 characters, falls back to `title` if empty). For `posts`, `cases`, `jobs` and `events`, H1 = `title`. `seoTitle` (the `<title>` tag) is separate and <= 60 characters. H1 and `<title>` must not be identical on money pages.
8. **Pagination:** none at launch (3 posts, few cases). From about 10 posts, use path pages (`/blog/page/2`) with self canonicals, not `?page=`.
9. Never put prices, plan names or filters into URLs. Query-string pages (`?utm=`, `?service=`) canonicalise to the clean URL.

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

Note: there is **no standalone `/faq` at launch** (ADR-029). FAQ blocks live on service, rent, pricing and home pages. The CMS `faq` template stays unused; `/faq` is reserved for Phase 2 (section 5). Rows were not renumbered, so row 8 is intentionally absent.

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

Note: the timeline lists "Development, Mobile apps, Websites" as separate items. Per ADR-029, "Development" and "Websites" are merged into `web-development`, and `custom-software` covers SaaS and platform work: 9 services, no overlap. Confirmed by Roshan (ADR-029, ADR-030).

### 2.3 On rent (ADR-012). Hub plus 3 child pages (approved, ADR-029)

Each rental product is a separate search intent ("website on rent", "AI agent subscription", "hire a team monthly"). One shared template, content from the `rentalPlans` collection, so the cost is low.

| # | URL | Page | Template | Parent | Primary keyword (working) | Pri |
|---|---|---|---|---|---|---|
| 18 | `/rent/website` | Website on rent | `rent-product` | `/rent` | website on rent Nepal | P0 |
| 19 | `/rent/ai-agent` | AI agent on rent | `rent-product` | `/rent` | AI chatbot subscription Nepal | P1 |
| 20 | `/rent/team` | Team on rent | `rent-product` | `/rent` | rent a development team Nepal | P1 |

Hub (row 4) primary keyword: `monthly website and software subscription Nepal` (T-701). The hub's job is to route to the three product pages and to explain plans by company size (ADR-018); it must not target "website on rent Nepal" (that belongs to `/rent/website`).

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
| 37 | `/contact/thank-you` | Form success page | `thank-you` | **N** | `noindex` via meta robots; excluded from sitemap.xml; GA4 conversion fires here once per lead; not blocked in robots.txt |
| 38 | `/404` | Not found | `error` | **N** (returns HTTP 404) | Links to home, services, contact |
| 39 | `/sitemap.xml` | XML sitemap | generated | — | Lists Y pages only, with `xhtml:link` alternates when NE exists |
| 40 | `/robots.txt` | Robots | generated | — | Allow all; `Disallow: /admin` and `/api` only; `Sitemap: https://tech.admmis.org/sitemap.xml`. **Do not disallow `/contact/thank-you`**: a blocked URL cannot show its `noindex` and can still appear in results. Use noindex only |

Total indexable content pages at launch: about 35 (with 5 cases, about 2 jobs; exact count depends on CMS data). Preview routes are noindex and not in the sitemap; the not-found catch-all returns HTTP 404 and `/home` is not a valid slug.

## 3. Primary keyword uniqueness check

All primary keywords in sections 2.1–2.3 are distinct. One intentional near-overlap: `/rent/website` vs `/services/web-development`. Separation by intent: rental = monthly subscription of a ready-made site ("on rent", "subscription"); web development = custom project build. Internal links between them are planned in the T-701 linking plan.

## 4. Navigation proposal (for Sharwan)

- **Header (max 6 items):** Services (dropdown: 9 services) · On rent · Pricing · Our work · About (dropdown: About, Careers, Blog, Opening event) · primary CTA button "Get a quote" → `/contact`.
- **Footer:** Services list · On rent products · Company (About, Careers, Blog, Opening event, Contact) · Legal (Privacy, Terms, Cookies) · language switcher (EN now; NE hidden until ready).
- **Sticky actions on mobile:** WhatsApp, call, get a quote.
- **Breadcrumbs** (visible and BreadcrumbList schema) on all pages deeper than level 1.
- Every service and rental page ends with: related case studies, pricing teaser (from the price collection), FAQ block, quote form.

## 5. Phase 2 (not built at launch; reserve the URL space)

| URL | Page |
|---|---|
| `/ne/...` | Nepali versions (~Feb 2027) |
| `/industries/retail`, `/industries/restaurants`, `/industries/pharmacy`, `/industries/education`, `/industries/tourism` | Industry landing pages |
| `/faq` | Standalone FAQ hub, only if Search Console shows FAQ-type queries not served by page blocks |
| `/services/seo-audit`, `/services/ux-audit`, `/services/code-audit` | Audit split, if search demand justifies |
| `/calculator` | Cost / ROI calculator |
| `/events`, `/events/[slug]` | Events and webinars section (`/opening-event` then redirects or is listed) |
| `/blog/category/[slug]` | Blog categories, once more than ~10 posts |
| `/partners`, `/docs`, `/portal` | Partners, documentation, client portal |

## 6. JSON-LD per template (answers to mahendra, templates-and-routes §3 and §13)

Full field mapping is in T-706 (`seo/schema-spec.md`, due Fri 13 Nov). Rules here are binding for T-301 now.

| Template | JSON-LD types | Notes |
|---|---|---|
| `home` | `Organization`, `WebSite` | `WebSite` without SearchAction (no site search at launch) |
| `services-hub`, `cases-list`, `blog-list` | `BreadcrumbList`, `ItemList` | ItemList lists the child URLs |
| `service` | `Service`, `BreadcrumbList`; `FAQPage` when faqs exist | `provider` = the Organization `@id`; `areaServed` = Nepal (and `Worldwide` on outstaffing) |
| `pricing` | `BreadcrumbList`, `FAQPage` | No `Offer` here (price lists are shown as tables, avoid duplicated markup) |
| `rent-hub` | `BreadcrumbList`, `FAQPage` | |
| `rent-product` | `Service` with one `Offer` per plan, `BreadcrumbList`, `FAQPage` | **Decision on mahendra's open item:** yes, `Offer` on rentals. `price` and `priceCurrency` are read from the CMS price collection (never typed in a page), `priceSpecification.unitText` = `MONTH`. Plans priced "from" or by quote get `Offer` without `price` only if allowed by the collection; otherwise omit `Offer` |
| `case` | `Article` (headline, datePublished, about) plus `BreadcrumbList` | **Decision:** use `Article`, not `CreativeWork`: Google recognises Article, and a case study is editorial content. No `Review` or rating markup unless a real, attributable testimonial exists |
| `article` | `BlogPosting`, `BreadcrumbList` | author `Person` or `Organization` |
| `careers-list` | `BreadcrumbList` | |
| `job` | `JobPosting`, `BreadcrumbList` | Needs title, description, datePosted, validThrough, hiringOrganization, jobLocation. Closed or expired: noindex and drop the markup |
| `event` | `Event`, `BreadcrumbList` | 1 Jan 2027; venue and time are TODO(roshan); set `eventAttendanceMode` and `eventStatus` |
| `about` | `Organization` (about), `BreadcrumbList` | Use one Organization `@id` across the site |
| `contact` | `ContactPage`, `BreadcrumbList` | |
| `legal` | `BreadcrumbList` | |
| `thank-you`, `error` | none | noindex |

**FAQPage question (mahendra open item 10):** ASSUMPTION, to verify. My understanding is that since August 2023 Google shows FAQ rich results only for well-known government and health sites, so our pages will not get the snippet. Markup is harmless and still describes the content to other engines and AI answer tools, but it earns no search appearance. Recommendation: keep `FAQPage` because the cost is near zero (generated from the same `faqs` field), do not promise rich results to Roshan, and do not write FAQs for markup's sake. I will re-check Google's current documentation (URL and date) in T-706.

## 7. Answers to mahendra's items (T-301 §13) and other open requests

| # | Item | Answer |
|---|---|---|
| 2 | Rule 5 wording | Done in v0.2: 301 or 308 |
| 3 | robots.txt thank-you | Done: no Disallow; noindex only |
| 4 | H1 on collection templates | Rule 7 above: `pages` and `services` use `heroHeading` (fallback `title`); `posts`, `cases`, `jobs`, `events` use `title` |
| 5 | Turnstile consent | My view: Turnstile is bot protection needed to deliver the form the visitor asked for, so it can be treated as strictly necessary under the usual reading, loaded on form focus. I am not a lawyer; this goes to Roshan through pm with the privacy review (ADR-036 re-check) |
| 6 | Conversion event | Fire `generate_lead` once on `/contact/thank-you` load (guard with sessionStorage flag per lead id), params `service`, `budget_band`, `form_kind`, `source` (first-party UTM). Consent-gated. Full list in T-706 `seo/analytics-events.md` |
| 8 | Blog pagination | None at launch (rule 8) |
| 10 | FAQPage worth it | See section 6 |
| rajaros 1 | `/faq` row | Removed |
| rajaros 2 | FITTIN forbidden-phrase list | Will deliver before Fri 11 Dec (not in this sprint) |
| neha | SEO field group, budget ranges, UTM before consent | Answers come with T-706 (Fri 13 Nov) |

## 8. Open questions

| # | Question | To | Needed by |
|---|---|---|---|
| 1 | Which 4–6 case studies, and are clients' names allowed public? | Roshan | Wed 25 Nov |
| 2 | Event venue and time for `Event` markup | Roshan | before event page copy |

Closed since v0.1: rental hub and child pages (approved ADR-029), service split (ADR-029), locale scheme (mahendra), standalone `/faq` (dropped ADR-029).

## Changelog

- v0.2 (2026-11-07, T-704): ADR-029 applied: `/faq` removed from table, nav and footer; merged web-development and custom-software confirmed; rental hub and children confirmed. Rule 5 now 301/308. robots.txt no longer disallows thank-you. Added H1 rule (7), pagination rule (8), JSON-LD table (section 6), answers to mahendra and rajaros (section 7). Locale scheme confirmed.
- v0.1 (2026-11-06, T-702): first draft.
