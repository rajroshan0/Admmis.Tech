# Template and route map — tech.admmis.org

Owner: mahendra · Task: T-301 · Version: v0.1 draft · 2026-11-06 · Reviewer: hritik
Inputs: `seo/sitemap.md` v0.1, `docs/api/content-model.md` v0.2 (§3.14, §6, §7), `docs/api/leads.md` v0.2, `docs/standards.md`, `docs/architecture.md`.
Locale handling is in `docs/frontend/i18n.md` (T-302). Every path below is written without locale; the locale prefix is added by `src/lib/routes` (EN: none, NE: `/ne`).
Nothing here is installed or run. Version-specific framework behaviour is marked **verify at scaffold** (T-103).

## 1. Principles

1. **One template, many pages.** Fixed number of route files; new CMS pages need no code.
2. **Pages fetch, blocks render.** A route loads its document through `lib/server` functions (Neha), resolves block references into props (`resolveBlocks`, §5), then renders. Blocks and UI never fetch (standards §2).
3. **Nothing user-facing is typed in code.** Text comes from the CMS or `src/messages/` (T-302). Prices come only from `pricing` documents (ADR-014). No price literal in any template.
4. **Static first.** Every public route is statically generated and revalidated by tag when Payload publishes (§7). Draft preview, in its own route group, is the only dynamic path. Rule and CI check in §7.
5. **One H1 per page, logical headings** (§9).

## 2. Route files

All under `src/app/(site)/[locale]/`. Route group `(site)` is public; Payload admin is a separate group (`(payload)`), so its JS never counts against the public budget.

| File | Matches | Notes |
|---|---|---|
| `layout.tsx` | all | `<html lang>`, fonts, header, footer, sticky mobile bar, consent island, i18n provider (subset of messages). Validates `locale`; `dynamicParams = false` so a disabled locale is a 404 |
| `page.tsx` | `/` | loads `pages` doc with slug `home` |
| `[...slug]/page.tsx` | any other `pages` doc: `/services`, `/pricing`, `/rent`, `/rent/website`, `/work`, `/about`, `/contact`, `/contact/thank-you`, `/faq`, `/careers`, `/blog`, `/privacy`, `/terms`, `/cookies` | joins `slug[]` with `/`, max 2 segments (else 404), loads `pages` by slug, dispatches on `doc.template` (§3). Unknown slug: redirects lookup, then `notFound()` |
| `services/[slug]/page.tsx` | `/services/{slug}` | `services` collection, template `service`. More specific than the catch-all, so it wins in Next routing |
| `work/[slug]/page.tsx` | `/work/{slug}` | `cases`, template `case` |
| `blog/[slug]/page.tsx` | `/blog/{slug}` | `posts`, template `article` |
| `careers/[slug]/page.tsx` | `/careers/{slug}` | `jobs`, template `job` |
| `opening-event/page.tsx` | `/opening-event` | `events` doc with slug `opening-event` plus its `pages` shell if any; template `event`. Flat URL on purpose (sitemap row 29). Phase 2 adds `events/[slug]` |
| `not-found.tsx` | all unmatched | template `error` (404). Returns HTTP 404 |
| `error.tsx` | runtime errors | template `error` (500), client component, strings from messages |
| `src/app/global-error.tsx` | root failures | static import of `en` error messages (no provider available there) |
| `src/app/sitemap.ts`, `src/app/robots.ts` | `/sitemap.xml`, `/robots.txt` | §8 |
| `src/app/(preview)/preview/…` | draft preview | separate dynamic group, see §7 |
| `_templates/*.tsx` | not routes | private folder: one file per composition (§3) |

Why a catch-all instead of one file per URL: 14 of the `pages` URLs would otherwise be near-identical files. Why four collection routes: they need collection-specific data, static params and JSON-LD.

`/404` in the sitemap is not a real URL. Requesting `/404` simply returns the not-found page with status 404.

## 3. Template registry (all 19 sitemap templates)

The CMS keeps 19 names (needed by editors and by Sudip's rows). In code they share 9 compositions, so no sitemap or CMS merge is requested.

| Template | Composition (`_templates/…`) | Data source | Blocks / extra data | JSON-LD (proposal, Sudip confirms) | Index |
|---|---|---|---|---|---|
| `home` | `block-page` | `pages` | hero (model variant), services-grid, rental-plans (teaser), case-cards, testimonials, logo-strip, faq, cta-form | `Organization` + `WebSite` | Y |
| `services-hub` | `hub` | `pages` + `services` | intro blocks, services-grid (all, by category), cta-form | `BreadcrumbList`, `ItemList` | Y |
| `service` | `service` | `services` | `body` blocks; extras: `deliverables`, `process`, `pricingRefs` (price teaser), `relatedCases`, `relatedServices`, `faqs`, quote form when `showQuoteForm` | `Service`, `BreadcrumbList`, `FAQPage` if faqs | Y |
| `pricing` | `block-page` | `pages` + `pricing` | pricing-table, budget-guide, rental-plans teaser, faq, cta-form | `BreadcrumbList`, `FAQPage` | Y |
| `rent-hub` | `rental` | `pages` + `pricing` | hero, rental-plans (all products), faq, cta-form | `BreadcrumbList`, `FAQPage` | Y |
| `rent-product` | `rental` | `pages` (`rentalProduct`) + `pricing` | hero, rental-plans (filtered), feature-list, faq, cta-form | `Service` (+ `Offer` per plan: **open**, Sudip), `BreadcrumbList` | Y |
| `cases-list` | `hub` | `pages` + `cases` | case-cards (all) | `BreadcrumbList`, `ItemList` | Y |
| `case` | `case` | `cases` | challenge/solution/result rich text, metrics, gallery, testimonial, related services | `Article`-like (`CreativeWork`: **open**, Sudip), `BreadcrumbList` | Y |
| `blog-list` | `hub` | `pages` + `posts` | all posts, newest first (no pagination at launch) | `BreadcrumbList`, `ItemList` | Y |
| `article` | `article` | `posts` | body, author, tags, related services | `BlogPosting`, `BreadcrumbList` | Y |
| `careers-list` | `hub` | `pages` + `jobs` | jobs-list (open jobs) | `BreadcrumbList` | Y |
| `job` | `job` | `jobs` | description, requirements, apply method | `JobPosting`, `BreadcrumbList`. Closed or past `validThrough`: `noindex` | Y while open |
| `event` | `event` | `events` (+ `pages`) | event-details, cta-form (`formKind=event`) | `Event`, `BreadcrumbList` | Y |
| `faq` | `block-page` | `pages` + `faqs` | faq grouped by `topic` | `FAQPage`, `BreadcrumbList` | Y |
| `about` | `block-page` | `pages` + `teamMembers` | rich-text, stats, team-grid | `Organization` (about), `BreadcrumbList` | Y |
| `contact` | `block-page` | `pages` + `siteSettings` | contact-details, cta-form | `ContactPage`, `BreadcrumbList` | Y |
| `thank-you` | `thank-you` | `pages` + `siteSettings.thankYou` | heading and WhatsApp button (§6) | none | **N** |
| `legal` | `block-page` (narrow) | `pages` | rich-text | `BreadcrumbList` | Y (low priority) |
| `error` | `error` | `siteSettings` + messages | links from nav | none | **N**, status 404/500 |

Compositions: `block-page`, `hub`, `service`, `rental`, `case`, `article`, `job`, `event`, `thank-you`, `error` — that is 10 files including `error`; 9 compose CMS content.

Each registry entry is `{ component, load(ctx), jsonLd(doc, ctx), indexDefault }` in `_templates/registry.ts`. A template name missing from the registry fails the build (exhaustive `switch` on the template union), so an editor can never publish a page that has no renderer.

Rules shared by all compositions:
- Common shell: breadcrumbs (visible and JSON-LD) on every page deeper than level 1, then the template body, then, per sitemap §4, the closing sequence on service and rental pages: related cases, price teaser, FAQ, quote form. The closing sequence comes from document fields, not from copy in code.
- A template renders only blocks allowed for it. Disallowed blocks log a build warning and are skipped.
- Unknown `blockType` renders nothing in production and throws in development.

## 4. URL → route map (every launch-scope sitemap row)

Row numbers are from `seo/sitemap.md` v0.1.

| # | URL | Template | Route file | Collection | Static params source | Notes |
|---|---|---|---|---|---|---|
| 1 | `/` | `home` | `page.tsx` | `pages` (`home`) | fixed | |
| 2 | `/services` | `services-hub` | `[...slug]` | `pages` + `services` | `pages` slugs | |
| 3 | `/pricing` | `pricing` | `[...slug]` | `pages` + `pricing` | `pages` slugs | tags `pricing:*` |
| 4 | `/rent` | `rent-hub` | `[...slug]` | `pages` + `pricing` | `pages` slugs | |
| 5 | `/work` | `cases-list` | `[...slug]` | `pages` + `cases` | `pages` slugs | |
| 6 | `/about` | `about` | `[...slug]` | `pages` + `teamMembers` | `pages` slugs | |
| 7 | `/contact` | `contact` | `[...slug]` | `pages` + `siteSettings` | `pages` slugs | |
| 8 | `/faq` | `faq` | `[...slug]` | `pages` + `faqs` | `pages` slugs | sitemap open Q5: may drop |
| 9–17 | `/services/{slug}` ×9 | `service` | `services/[slug]` | `services` | `services` slugs | |
| 18–20 | `/rent/website`, `/rent/ai-agent`, `/rent/team` | `rent-product` | `[...slug]` | `pages` + `pricing` | `pages` slugs | if PM rejects child pages these 3 `pages` docs are simply not created; no code change |
| 21–26 | `/work/{slug}` ×4–6 | `case` | `work/[slug]` | `cases` | `cases` slugs | |
| 27 | `/careers` | `careers-list` | `[...slug]` | `pages` + `jobs` | `pages` slugs | |
| 28 | `/careers/{slug}` | `job` | `careers/[slug]` | `jobs` | open `jobs` slugs | closed job stays reachable, `noindex` |
| 29 | `/opening-event` | `event` | `opening-event/page.tsx` | `events` | fixed | |
| 30 | `/blog` | `blog-list` | `[...slug]` | `pages` + `posts` | `pages` slugs | pagination §7 |
| 31–33 | `/blog/{slug}` ×3 | `article` | `blog/[slug]` | `posts` | `posts` slugs | |
| 34–36 | `/privacy`, `/terms`, `/cookies` | `legal` | `[...slug]` | `pages` | `pages` slugs | `/cookies` also hosts the consent settings island |
| 37 | `/contact/thank-you` | `thank-you` | `[...slug]` | `pages` | `pages` slugs | `noindex`, not in sitemap.xml |
| 38 | `/404` | `error` | `not-found.tsx` | — | — | status 404 |
| 39 | `/sitemap.xml` | generated | `src/app/sitemap.ts` | all | — | §8 |
| 40 | `/robots.txt` | generated | `src/app/robots.ts` | — | — | §8 |

Check: rows 1–40 are all present (rows 9–17, 18–20, 21–26, 31–33, 34–36 grouped). Every one of the 19 templates in §3 is used by at least one row, except `error` which is the 404/500 renderer.

## 5. Data layer needed from Neha (`src/lib/server/content/*`, tagged and cached)

Signatures are requests, not a contract until Neha agrees. All take `locale` and return plain serialisable data (not Payload documents) shaped for the templates. `fallbackLocale` is applied inside.

| Function | Returns | Tags |
|---|---|---|
| `getPage(locale, slugPath, { draft })` | `pages` doc or `null` | `collection:pages`, `doc:pages:<slug>` |
| `getService / getCase / getPost / getJob / getEvent (locale, slug, { draft })` | doc or `null` | `collection:<c>`, `doc:<c>:<slug>` |
| `listServices / listCases / listJobs (locale, opts)`, `listPosts (locale, { page, pageSize })` | items for hubs | `collection:<c>` |
| `getServicesByIds / getCasesByIds / getFaqs({ ids or topic }) / getTestimonials / getClients / getTeamMembers`, `getPricing({ kind, rentalProduct, keys })` | the referenced docs a block needs (pricing with all currencies and `amounts` rows) | tags of each doc, `pricing:<key>` |
| `getSiteSettings(locale)` | header, footer, contacts, announcement, `defaultSeo`, `thankYou`, `cookieBanner` | `global:siteSettings` |
| `getBreadcrumbTrail(locale, template, doc)` | `[{ title, path }]` | via pages |
| `getRedirect(path)` | `{ to, status }` or `null` | `redirects` |
| `listIndexable()` | `[{ collection, path, updatedAt, translatedLocales }]` for sitemap | all collection tags |
| `translatedLocales` (computed field on every localized doc) | `['en']` now, `['en','ne']` when NE complete | — |

`resolveBlocks(locale, blocks)` is **mine** (Hritik, 2026-11-06): `src/lib/routes/resolve-blocks.ts`, server-only. It calls the typed, depth-limited functions above and maps each block to a ready-to-render `data` prop, which keeps blocks free of fetching while `rental-plans` still needs a query. The pure mapping logic is unit-tested with fixtures. Satish defines each block's `data` prop type. Neha supplies the queries only. The row for `resolveBlocks` in the table above is therefore not a Neha function; it lists what the function needs to reach.

## 6. Forms (answers to Neha, `docs/api/leads.md` §13)

Components in `src/components/forms/` (mine): `LeadForm` (client island) with kinds `contact`, `quote`, `rent`, `event`. `callback` is not shown at launch. The `cta-form` block (Satish) is a layout shell that renders `LeadForm`.

**Answers to Neha**
1. **Thank-you redirect vs JSON: JSON plus client navigation.** The form needs JavaScript anyway (Turnstile, validation), so it posts with `fetch` and reads the JSON. On `201`/`200`, the client navigates to the locale-prefixed `next.redirect`. Neha keeps the response exactly as in §2.2. No native form redirect, no 303.
2. **Idempotency key: client generated, kept in `sessionStorage`** (Hritik, 2026-11-06). `crypto.randomUUID()` on first mount, stored under `lead-idem:<formKind>` (a random id, no PII), reused on every retry of the same submission and after a page reload, removed after a `201`/`200`. A reload during a retry therefore cannot create a second lead. If the visitor edits the message after a failed attempt and re-sends with the same key and the first attempt had in fact been stored, the server returns the replay of the first lead; that is the intended idempotent behaviour.
3. **Conversion event:** fired once, on the thank-you page, after consent, not on submit (a fire-and-navigate event can be lost, and firing in both places double-counts). Before navigating the form writes `{ leadId, formKind, service, utm, whatsapp }` (opaque id, no PII) to `sessionStorage` key `lead-success`. The thank-you page reads it, renders the `formKind` variant, and fires the event only if `leadId` is not already in the `lead-events-fired` list in `sessionStorage`, then adds it. A refresh re-renders the same page and does not recount. A direct visit without the key shows the generic state and fires nothing. If consent is given later on the same page, the event fires then (once). **Sudip** confirms event name and parameters. **Neha** updates leads.md §13.6 (it still says fire on 201) and §13.1 (key stored per form kind).
4. **Turnstile:** script is loaded by the form on first focus or when it scrolls into view, never on page load. ASSUMPTION: treated as strictly necessary security (not consent-gated); the privacy policy and cookie page name it; Raj allows `challenges.cloudflare.com` in the CSP. **Sudip / Roshan confirm.** Tokens expire, so the widget is reset on expiry callback and on `captcha_failed`.
5. **State kept on every error** (field values, consent tick). On 5xx or network error: message from the `fallback` flags, WhatsApp and phone buttons, retry with the same key.
6. **Accessible errors:** every input has a visible label, `aria-invalid`, `aria-describedby` to the message; on submit with errors, focus moves to an error summary that links to each field; success and sending states use `role="status"`; the honeypot is `aria-hidden`, `tabindex=-1`, `autocomplete=off`. Autocomplete tokens: `name`, `email`, `tel`, `organization`. Targets at least 44 px.
7. **Shared schema:** `src/lib/schemas/lead.ts` (zod). The client validates on blur and submit with the same schema; message keys from the schema map to `src/messages/<locale>/forms.json`.
8. **No form library.** One small hook (`useLeadForm`) over zod. Alternative: react-hook-form; rejected to save bundle size and a dependency (standards §10).
9. **Bundle:** `LeadForm` is a client island; on content pages it is loaded lazily (visible-on-scroll wrapper reserving its height to avoid CLS). On `/contact` it loads eagerly. Sizes measured at scaffold against the 150 KB budget (zod included); **verify at scaffold**.
10. **WhatsApp (ADR-007):** number and prefilled text come from `siteSettings.contacts` and `leadSettings.ctaWhatsAppFallbackText`; link `https://wa.me/<number>?text=…`. Number is TODO(roshan) Q11.

**Thank-you page:** `noindex`, no breadcrumbs JSON-LD, heading and text from `siteSettings.thankYou`, WhatsApp button when `next.whatsapp` was true (read from the same `sessionStorage` object).

## 7. Rendering, caching, revalidation

| Topic | Rule |
|---|---|
| Static params | each route exports `generateStaticParams` from the data layer, for enabled locales only |
| New content | `dynamicParams = true` on collection routes: a slug published after build is generated on first request, then cached |
| Revalidation | Payload `afterChange`/`afterDelete` hooks call `revalidateContent` in-process (Neha, content-model §1). No HTTP webhook. Pages read data through tagged cache functions, so one tag revalidates every locale |
| Pricing change | tag `pricing:<key>` revalidates every page that renders that price |
| Header/footer change | tag `global:siteSettings` revalidates all pages. Acceptable: the site has about 40 pages |
| Time-based safety | a long fallback `revalidate` (24 h) on every route in case a hook is missed |
| Static rule | **No `cookies()`, `headers()`, `draftMode()` or `searchParams` in any `(site)` layout or page.** They make a route dynamic and CI fails the build (`docs/ci-spec.md` §9). Locale comes from the `[locale]` param with `setRequestLocale(locale)` in every layout and page. Query strings (UTM) are read in client islands only |
| Draft preview | because `(site)` cannot call `draftMode()`, preview lives in a separate dynamic route group `src/app/(preview)/preview/[locale]/[collection]/[...slug]/page.tsx` (mine) that renders the same templates with `draft: true` passed to the data functions. It is `noindex`, no-store, and protected by the Payload preview secret/auth (Neha). Payload live-preview URLs point here |
| `loading.tsx` | **not used** on page routes: a streaming shell would send HTTP 200 before a `notFound()`/redirect decision. Use `Suspense` only inside blocks |
| Blog list | `?page=2` would need `searchParams` (forbidden above). **Decision: no pagination at launch (3 articles).** Phase 2 adds path-based pages when there are 12+ posts |
| Next 16 API details | tag-revalidation function signature, caching directive (`"use cache"` vs `unstable_cache`) and `cacheComponents`: **verify at scaffold** with Hritik; the design above is independent of which is used |

## 8. SEO output

Implemented in `src/lib/seo/` (mine). Inputs are the document's `seo` group (content-model §4) with fallbacks from `siteSettings.defaultSeo`.

| Output | Rule |
|---|---|
| `generateMetadata` | one helper `buildMetadata(doc, ctx)` for every route |
| Title | `seo.metaTitle` else `title`, plus site name suffix from the brand; no manual suffix in titles; unique-title check is Neha's CMS warning |
| Description | `seo.metaDescription`, else template summary field (`summary`, `excerpt`); never empty on P0/P1 pages (warn in build) |
| Canonical | `seo.canonicalPath` else self; absolute URL on `NEXT_PUBLIC_SITE_URL` host (`https://tech.admmis.org`); query strings never in the canonical |
| hreflang | `alternates.languages`: one entry per locale in `translatedLocales`, plus `x-default` = EN URL. With only EN enabled, emit no `hreflang` (a lone self-reference is noise). An untranslated NE page: `noindex`, self canonical, no `hreflang`, not in the sitemap (i18n.md §5) |
| Open Graph / Twitter | `ogTitle`/`ogDescription` else meta; image `seo.ogImage`, else cover, else brand default. `og:locale` per locale. No generated OG images at launch |
| Robots | `noindex`/`nofollow` from `seo` group; forced `noindex` for `thank-you`, draft previews, closed jobs, non-production hosts |
| Breadcrumbs | trail from `getBreadcrumbTrail`; labels `seo.breadcrumbTitle` else `title`; rendered by Satish's `Breadcrumbs` component and as `BreadcrumbList` |
| JSON-LD | `JsonLd` server component: `JSON.stringify` then escape `<`, `>`, `&`, U+2028 and U+2029 as unicode escapes (conditions in standards §8), rendered as one `<script type="application/ld+json">`. Builders in `lib/seo/jsonld/*` take document data, not HTML. Unit-tested for escaping. Types per §3. Final fields: Sudip's schema spec (**TODO(sudip)**) |
| `sitemap.ts` | from `listIndexable()`: published, not `noindex`, with `lastModified`; `alternates.languages` for each translated locale; excludes thank-you |
| `robots.ts` | production: allow all, `Disallow: /admin`, `/api`; sitemap URL. Non-production: `Disallow: /` and `noindex` meta. See open question 3 about the thank-you line |
| 404 | `not-found.tsx`, HTTP 404, `noindex`; links to home, services, contact from nav data |
| 500 | `error.tsx` and `global-error.tsx`; no stack traces; Sentry report; WhatsApp/phone shown |
| Redirects | when a slug is not found: `getRedirect(path)`; a hit calls `permanentRedirect` (HTTP 308) or `redirect` (307), a miss calls `notFound()` so the status is a real 404. 308 is permanent like 301 for search engines; sitemap rule 5 says "301 only"; Hritik accepted 308 (2026-11-06); **Sudip to reword sitemap rule 5 to "301/308"**. Locale prefix preserved. Fixed rules: `/en/…` to unprefixed (i18n.md), trailing slash stripped |
| Query strings | `?utm_*` and similar never create new URLs: canonical is the clean URL |

## 9. Headings and accessibility rules per template

- **One `h1`.** Block pages: the `hero` block heading is the `h1`; if a page has no `hero` block, the template renders the document `title` as a visible `h1` (legal pages, thank-you).
- Collection templates: `h1` = `title` (content-model §3.4: "title becomes H1"). `heroHeading` is then shown as a lead paragraph, not a second heading. **Open: Sudip/Neha confirm, because `heroHeading` and `title` both exist.**
- All other blocks start at `h2`; the block renderer passes `headingLevel`. No skipped levels. An automated check counts `h1` in the e2e suite (Rajaros).
- Landmarks: `header`, `nav` (labelled), `main#main` with a skip link first, `footer`. Breadcrumb `nav` labelled.
- Tables (pricing, `excludes` lists) use real `table`/`th scope`; the currency toggle is a labelled button group with `aria-pressed`, and both currencies are in the HTML (toggle switches a `data-currency` attribute, no flash, crawlable). NPR default.
- Every route tested at 360 px width; all interactive targets keyboard-operable; visible focus (tokens: Satish).

## 10. Client-side islands (the only `"use client"` pieces on public pages)

| Island | Why |
|---|---|
| Mobile nav / dropdowns | disclosure state |
| Language switcher | none while only EN is enabled (not rendered) |
| Sticky mobile action bar | scroll/visibility |
| Consent banner + analytics loader | ADR-006 |
| `LeadForm` (+ Turnstile) | interaction |
| Currency toggle | switches attribute |
| Rental band selector | UI state |
| Thank-you reader | reads `sessionStorage`, fires event |

Everything else is Server Components. Reviewer asks "why client?" per standards §3.

## 11. Requests and handoffs

| To | Request |
|---|---|
| neha | §5 functions (typed, depth-limited, tagged); `translatedLocales`; `heroHeading` vs `title` H1 rule; update leads.md §13.1 (key kept in `sessionStorage`) and §13.6 (event fires on the thank-you page, deduped by `leadId`); preview route (§7) |
| satish | each block receives a `data` prop and a `headingLevel`; `LeadForm` is mine and plugged into `cta-form`; currency toggle approach for `pricing-table` (both currencies in DOM); `Breadcrumbs`, `Header` language switcher slot |
| sudip | merge answer (none needed); JSON-LD table §3 to confirm; redirect status 301/308; robots thank-you line; event name for the conversion; Turnstile consent stance; blog pagination decision |
| hritik | scaffold checks (global not-found with two root layouts, routing file name, cache API). Folders and `JsonLd` carve-out already approved |
| rajaros | test list §12 |

## 12. Test cases (for Rajaros)

1. Every URL in §4 returns 200 (or 404 for `/404`), has exactly one `h1`, one canonical, and the expected template marker (`data-template`).
2. `/services/does-not-exist` returns HTTP 404 with the not-found page; `/404` returns 404.
3. A slug change in the CMS leaves a working redirect (308) from the old URL.
4. Publishing a price change updates `/pricing`, `/rent`, `/rent/website` and service teasers within the revalidation window, with NPR and USD.
5. `/contact/thank-you` is `noindex`, absent from `sitemap.xml`; no conversion event without consent; one event with consent; none on reload.
6. Form: valid submit → thank-you; double click → one lead; server 5xx keeps data and shows WhatsApp/phone; keyboard-only submit; error summary receives focus.
7. Closed job page: `noindex` plus "closed" banner.
8. JSON-LD on each template validates against the types in §3 and contains no `</script>` injection from CMS text.
9. Staging host serves `Disallow: /` and `noindex`.
10. Disabled locale: `/ne/anything` returns 404 and no `hreflang` is emitted.
11. Build output shows every `(site)` route as static/ISR (CI check, ci-spec §9). The preview route is the only dynamic one.
12. Form idempotency: reload during a failed submit, resend: one lead.

## 13. Open questions

| # | Question | To | By |
|---|---|---|---|
| 1 | Block `data` prop types and the §5 query list | neha / satish | Wed 18 Nov |
| 2 | Reword sitemap rule 5 to "301/308" (Hritik accepted 308) | sudip | Thu 12 Nov |
| 3 | Drop `Disallow: /contact/thank-you` from robots.txt (a disallowed page cannot show its `noindex`); keep `noindex` only | sudip | Thu 12 Nov |
| 4 | `h1` rule for collection templates: `title` or `heroHeading` | sudip / neha | Thu 12 Nov |
| 5 | Turnstile treated as strictly necessary (no consent gate) | sudip / roshan via pm | Fri 20 Nov |
| 6 | Conversion event name and parameters, fired on thank-you page | sudip | Fri 13 Nov |
| 7 | JSON-LD per template (`Offer` on rentals, `CreativeWork` for cases) | sudip | Fri 13 Nov |
| 8 | Blog pagination: none at launch (3 posts); path-based pages in phase 2 | sudip | Thu 12 Nov |
| 9 | Global not-found with two root layouts; routing file name; cache API in Next 16 | hritik (scaffold) | T-103 |
| 10 | Whether FAQ rich results are still worth `FAQPage` markup (Google narrowed FAQ rich results in 2023; **verify current policy** before relying on it). Markup stays harmless | sudip | Fri 13 Nov |

## Changelog
- v0.1 (2026-11-06): first draft.
- Review 2026-11-06 (hritik): APPROVED WITH NITS. For v0.2 by Fri 20 Nov: catch-all returns 404 or 308 to `/` for slug `home`; negative-cache unknown paths through the same tags; state that `(preview)` is a third root layout, no-store, auth-checked before reading draft data; measure zod bundle cost at scaffold; fix the "9 compositions" wording.
