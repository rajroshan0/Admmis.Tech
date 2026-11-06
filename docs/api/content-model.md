# CMS content model — ADMMIS.TECH

Owner: neha · Task: T-401 · Version: v0.2 draft · 2026-11-06 · Reviewer: hritik
Binding inputs: ADR-004 (all text localizable), ADR-005 (NPR + USD), ADR-007 (leads), ADR-013 (multi-brand), ADR-014 (one price source), ADR-006 (consent), `docs/standards.md`, `seo/sitemap.md` v0.1.
Status of numbers: size bands, prices and retention periods are **not approved** (Gate 1, Q16). They are data or config, never code.

## 1. Conventions (apply to every collection)

| Topic | Rule |
|---|---|
| Collection slugs | `camelCase` plural, as in `docs/architecture.md` |
| IDs | Payload default (serial int on Postgres). Public URLs never contain IDs |
| Localization | Every public text field has `localized: true`. Locales: `en` (default), `ne` (added ~Feb 2027, no migration). Fallback: if `ne` is empty, serve `en` |
| Slug | One `slug` per document, **not localized**, English, lowercase-hyphen ASCII (sitemap rule 1 and 3). Unique per collection. Locked after first publish unless the editor ticks "I understand the URL will change". A hook writes the old path into `redirects` when a published slug changes |
| Drafts | `versions: { drafts: true, maxPerDoc: 20 }` on all public content collections. Live preview URL set per collection. Scheduled publish enabled on `posts`, `jobs` |
| Revalidation | `afterChange` / `afterDelete` hook (only when `_status` is `published` or changes from it) calls `revalidateContent({ collection, slug })` in `src/lib/server/revalidate.ts`, which revalidates tags `collection:<slug>`, `doc:<collection>:<slug>` and tags of referencing pages. Payload never calls the frontend over HTTP |
| Arrays and blocks | **Never localized.** Blocks fields and arrays (`body`, `blocks`, `deliverables`, `process`, `includes`, `excludes`, `metrics`, `tags`, block arrays) are structure and are shared by all locales. Only the text fields inside them are `localized: true`. Nepali then reuses the English layout |
| Money | Integer **minor units** + ISO currency (`NPR`, `USD`). No floats. Formatting is done by the frontend with `Intl` |
| Rich text | Payload Lexical editor, restricted feature set (heading h2–h4, bold, italic, link, lists, quote, table, inline image from `media`). No raw HTML node. Output sanitised on render |
| SEO group | `seo` group on every public document (section 4). Defined once in `src/collections/fields/seo.ts` |
| Help text | Every field has a `label` and `admin.description` in plain English (the editors' language). Admin UI stays English; only content is localized |
| Brand (ADR-013) | No brand field in the model. Brand is a deployment setting (`BRAND` env, `src/brands/<brand>/`). Each client deployment has its own database |
| Required | "Required" means required to **publish**. Drafts may be incomplete |
| Timestamps | `createdAt`, `updatedAt` automatic. Dates in UTC ISO |
| Tests | Access rules, price hooks and slug/redirect hook have unit tests |

### 1.1 Shared field groups

| Group | Fields |
|---|---|
| `seo` | see section 4 |
| `cta` | `label` (text, localized, req), `kind` (select: `quote-form`, `whatsapp`, `phone`, `link`), `linkRef` (relation `pages` or text path for `link`), `variant` (select: primary, secondary) |
| `imageRef` | `image` (relation `media`, req). Alt text lives on the media document |
| `priceRef` | `price` (relation `pricing`, req). The only way a price enters any content |

## 2. Roles and access (summary)

Roles on `users.role`: `admin`, `editor`, `sales`. Deny by default. Full matrix in section 8.

| Role | Can |
|---|---|
| `admin` | Everything, incl. users, settings, hidden collections |
| `editor` | Create/edit/publish content collections, media, pages, settings text. **No access to `leads`**, `leadJobs`, `users` |
| `sales` | Read/update `leads` (status, notes, assignee), read content. Cannot publish content, cannot edit `pricing` |
| public (anonymous) | Read published documents via the frontend data layer only. Payload REST/GraphQL for content is **disabled** (`graphQL: false`, REST locked by access); the frontend uses the local API server-side |

## 3. Collections

Legend: Req = required to publish · Loc = localized · R = relation.

### 3.1 `users` (auth)
| Field | Type | Req | Loc | Notes |
|---|---|---|---|---|
| `email` | email | yes | no | login. Auth built in |
| `name` | text | yes | no | |
| `role` | select admin/editor/sales | yes | no | default `editor`. Only admin may change |
| 2FA | Payload auth plugin / TOTP | — | — | mandatory for all roles (ADR-017). Enforced by plugin; `TODO(hritik/raj)`: pick plugin in week 2 |
Used by: admin only. Access: admin manage; others read own record.

### 3.2 `media` (upload)
| Field | Type | Req | Loc | Notes |
|---|---|---|---|---|
| `file` | upload to R2 | yes | no | allowlist: `image/avif, image/webp, image/png, image/jpeg, image/svg+xml, video/mp4, video/webm, application/pdf`. Max 10 MB images, 50 MB video (config). SVG sanitised on upload |
| `alt` | text | yes unless `decorative` | **yes** | help: "Describe what the image shows for someone who cannot see it" |
| `decorative` | checkbox | — | no | if true, alt may be empty |
| `caption` | text | no | yes | |
| `credit` | text | no | no | photographer or "AI-generated (tool, date)" |
| `provenance` | textarea | no | no | for AI-generated hero: tool, prompt, date (architecture "Hero visual") |
| `focalPoint` | x/y | no | no | |
| `sizes` | generated | — | — | AVIF/WebP at 480, 768, 1280, 1920 + original |
Used by: all image/video fields. Access: read public (published use); create/update editor, admin; delete admin.

### 3.3 `serviceCategories`
| Field | Type | Req | Loc |
|---|---|---|---|
| `title` | text | yes | yes |
| `slug` | text unique | yes | no |
| `summary` | textarea (≤160) | no | yes |
| `order` | number | yes | no |
Used by: services hub grouping (e.g. Build, Grow, Rent). Launch may use one group; keep for scale.

### 3.4 `services` (9 at launch; template `service`)
URL: `/services/{slug}`. Hub `services-hub` lists them.
| Field | Type | Req | Loc | Notes |
|---|---|---|---|---|
| `title` | text | yes | yes | becomes H1 (keyword-map rule: H1 contains primary keyword) |
| `slug` | text unique | yes | no | |
| `category` | R `serviceCategories` | no | no | |
| `order` | number | yes | no | position in hub and nav |
| `icon` | select (fixed icon set) or R `media` | no | no | |
| `summary` | textarea ≤200 | yes | yes | card text, hub |
| `heroHeading`, `heroSubheading` | text | yes / no | yes | |
| `heroImage` | R `media` | no | no | |
| `body` | blocks[] (section 6) | yes | **no** (text fields inside blocks are localized) | ordered blocks. Same layout for every locale |
| `deliverables` | array of {`text` loc} | no | array no, text yes | "what you get" list |
| `process` | array of {`title` loc, `text` loc} | no | array no, text yes | steps |
| `pricingRefs` | R[] `pricing` (hasMany) | no | no | **ADR-014**: price teaser on page reads these. No numbers typed here |
| `relatedCases` | R[] `cases` | no | no | |
| `relatedServices` | R[] `services` | no | no | |
| `faqs` | R[] `faqs` | no | no | FAQ block + FAQPage schema |
| `showQuoteForm` | checkbox default true | — | no | page ends with quote form |
| `seo` | group | | | |
Used by: `service`, `services-hub`, home grid block, nav, footer, sitemap. Hooks: slug lock, revalidate, redirect.

### 3.5 `pricing` (**ADR-014: the one price source**)
No other collection or block stores an amount. Everything references a `pricing` document by relation.
| Field | Type | Req | Loc | Notes |
|---|---|---|---|---|
| `kind` | select `package` / `rental` / `hourly` | yes | no | drives validation |
| `name` | text | yes | yes | e.g. "Website on rent", "Landing page", "Senior engineer" |
| `key` | text unique | yes | no | stable machine key, e.g. `rent-website`, `hourly-senior-engineer`. Used by code/analytics. Locked after publish |
| `description` | textarea | no | yes | |
| `includes` | array of {`text` loc} | no | array no, text yes | what is included |
| `excludes` | array of {`text` loc} | no | array no, text yes | "not included" list (pricing-model §3) |
| `unit` | select `one-time` / `month` / `hour` / `person-month` | yes | no | must match kind (below) |
| `sizeBand` | select from config | rental only | no | `S`/`M`/`L`/`XL` from `src/config/size-bands.ts` (not DB enum) |
| `rentalProduct` | select `website` / `ai-agent` / `marketing` / `team` | rental only | no | maps to `/rent/*` pages |
| `role` | select from config (engineer, designer, QA, DevOps, prompt-engineer…) | hourly, and rental when `rentalProduct=team` | no | |
| `amounts` | array of {`currency` NPR/USD, `minorUnits` int ≥ 0} | yes | no | one row per currency, unique currency. NPR **and** USD required for public kinds unless `quoteOnly` |
| `quoteOnly` | checkbox | — | no | band XL: no amount, page shows "Request a quote" |
| `fromPrice` | checkbox | — | no | display "from …" |
| `setupFee` | array like `amounts` | no | no | rental setup (pricing-model §3) |
| `minTermMonths` | number | no | no | |
| `supportHours` | number | no | no | included support hours/month |
| `featured` | checkbox | — | no | highlight in table |
| `order` | number | yes | no | |
| `visibility` | select public / hidden | yes | no | hidden = not rendered anywhere |
| `seo` | none | | | not a page |
Validation hook (per Hritik): `rental` requires `sizeBand` and `rentalProduct`; `hourly` requires `role`; `unit` must match (`package`→`one-time`, `rental`→`month` or `person-month`, `hourly`→`hour`); `amounts` unique per currency; `quoteOnly` forbids amounts. Uniqueness: one rental doc per (`rentalProduct`, `sizeBand`) except `team`, unique per (`rentalProduct`, `role`).
Versions enabled (price history, no drafts-only editing mistakes; publish workflow). Revalidation hook revalidates every page that references the doc (tag `pricing:<key>`).
Used by: `pricing` page (tables), `rent-hub`, `rent-product`, service pages (teaser), `PricingTable` and `RentalPlans` blocks, contact form (size band choice list), CRM mapping.
Access: read public (published); create/update/publish admin only; sales read.

### 3.6 `cases` (template `case`, `cases-list`)
| Field | Type | Req | Loc | Notes |
|---|---|---|---|---|
| `title` | text | yes | yes | |
| `slug` | text unique | yes | no | |
| `client` | R `clients` | yes | no | |
| `clientNameVisible` | checkbox | yes | no | default false until client gives permission (sitemap open question 4) |
| `industry` | select from config | no | no | |
| `services` | R[] `services` | yes | no | cards on service pages |
| `summary` | textarea | yes | yes | |
| `cover` | R `media` | yes | no | |
| `challenge`, `solution`, `result` | richText | yes | yes | |
| `metrics` | array {`label` loc, `value` text loc} | no | array no, text yes | facts only, only real figures (CLAUDE.md "Truth") |
| `gallery` | R[] `media` | no | no | |
| `testimonial` | R `testimonials` | no | no | |
| `publishedAt` | date | yes | no | sort |
| `seo` | group | | | |
Used by: `/work`, `/work/{slug}`, `CaseCards` block, service pages.

### 3.7 `clients`
| Field | Type | Req | Loc |
|---|---|---|---|
| `name` | text | yes | no |
| `logo` | R `media` | no | no |
| `website` | text url | no | no |
| `showInLogoStrip` | checkbox | yes | no |
| `permissionConfirmed` | checkbox | yes | no |
| `order` | number | no | no |
Rule: a client appears on the public site only if `permissionConfirmed` is true. Used by `LogoStrip`, `cases`. Not a page.

### 3.8 `testimonials`
| Field | Type | Req | Loc |
|---|---|---|---|
| `quote` | textarea | yes | yes |
| `authorName` | text | yes | no |
| `authorRole` | text | no | yes |
| `client` | R `clients` | no | no |
| `photo` | R `media` | no | no |
| `permissionConfirmed` | checkbox | yes | no |
| `order` | number | no | no |
Rule: no invented testimonials (CLAUDE.md §8). Public only when `permissionConfirmed`. Used by `Testimonials` block, cases.

### 3.9 `posts` (template `article`, `blog-list`)
| Field | Type | Req | Loc | Notes |
|---|---|---|---|---|
| `title` | text | yes | yes | |
| `slug` | text unique | yes | no | |
| `excerpt` | textarea ≤200 | yes | yes | |
| `cover` | R `media` | yes | no | |
| `body` | richText | yes | yes | |
| `author` | R `teamMembers` | yes | no | |
| `tags` | array of {`text` loc} | no | array no, text yes | categories deferred (sitemap phase 2) |
| `relatedServices` | R[] `services` | no | no | internal links (keyword-map) |
| `publishedAt` | date | yes | no | scheduled publish |
| `readingMinutes` | number | no | no | computed by hook |
| `seo` | group | | | `articleSchema` auto |

### 3.10 `faqs`
| Field | Type | Req | Loc |
|---|---|---|---|
| `question` | text | yes | yes |
| `answer` | richText (short) | yes | yes |
| `topic` | select pricing/timelines/ownership/support/rent/general | yes | no |
| `order` | number | no | no |
Used by: `/faq` hub (grouped by `topic`), `FAQ` block on services/rent pages, FAQPage JSON-LD. FAQ answers contain **no prices** in v1; they link to `/pricing` instead (no custom Lexical node; revisit in phase 2). ADR-014 stays intact because no number is typed anywhere.

### 3.11 `teamMembers`
| Field | Type | Req | Loc |
|---|---|---|---|
| `name` | text | yes | yes |
| `role` | text | yes | yes |
| `bio` | textarea | no | yes |
| `photo` | R `media` | no | no |
| `links` | array {`type` select, `url`} | no | no |
| `showOnAbout` | checkbox | yes | no |
| `order` | number | no | no |
Used by: `about`, `posts.author`. Personal data: publish only with consent (TODO(roshan): which team members are public).

### 3.12 `jobs` (template `job`, `careers-list`)
| Field | Type | Req | Loc | Notes |
|---|---|---|---|---|
| `title` | text | yes | yes | |
| `slug` | text unique | yes | no | |
| `department` | select | yes | no | |
| `employmentType` | select full-time/part-time/contract/internship | yes | no | |
| `location` | text | yes | yes | e.g. Kathmandu |
| `remote` | select onsite/hybrid/remote | yes | no | |
| `description`, `requirements` | richText | yes | yes | |
| `applyMethod` | select email/link/form | yes | no | |
| `applyTarget` | text | yes | no | email address or URL (not a secret) |
| `validThrough` | date | no | no | JobPosting schema; page noindex after expiry |
| `status` | via drafts + `closed` checkbox | | | closed = noindex + "closed" banner |
| `seo` | group | | | JobPosting JSON-LD auto |
Applications at launch go by email/link; no applicant data stored in CMS (privacy). Revisit later.

### 3.13 `events` (template `event`)
Only one document at launch (opening event, `/opening-event`).
| Field | Type | Req | Loc |
|---|---|---|---|
| `title` | text | yes | yes |
| `slug` | text unique | yes | no |
| `startsAt`, `endsAt` | date | yes / no | no |
| `venue`, `address` | text | yes | yes |
| `online` | checkbox | — | no |
| `description` | richText | yes | yes |
| `agenda` | array {`time`, `title` loc, `speaker` R `teamMembers`} | no | partly |
| `registration` | select `form` / `link` / `none` | yes | no |
| `registrationLink` | text url | when `link` | no |
| `cover` | R `media` | no | no |
| `seo` | group | | |
`registration=form` posts to `/api/leads` with `source.kind=event` (see `docs/api/leads.md`), so registrants are leads.

### 3.14 `pages` (block-based; templates `home`, `rent-hub`, `rent-product`, `pricing`, `about`, `contact`, `faq`, `thank-you`, `legal`, `careers-list`, `cases-list`, `blog-list`, `services-hub`)
| Field | Type | Req | Loc | Notes |
|---|---|---|---|---|
| `title` | text | yes | yes | admin label and H1 default |
| `slug` | text unique | yes | no | path without locale; `home` = `/`. Nested path allowed one level (`rent/website`) |
| `template` | select (fixed list from sitemap) | yes | no | decides route component and which extra fields apply |
| `parent` | R `pages` | no | no | breadcrumbs |
| `blocks` | blocks[] (section 6) | yes | **no** (text fields inside blocks are localized) | layout is shared across locales |
| `rentalProduct` | select | when `template=rent-product` | no | page reads `pricing` docs where `rentalProduct` matches, all bands |
| `legalVersion` | text | when `legal` | no | shown on policy; linked to lead consent `policyVersion` |
| `indexable` | derived from `seo.noindex` | | | thank-you = noindex (sitemap row 37) |
| `seo` | group | | | |
List templates (`cases-list`, `blog-list`, `services-hub`, `careers-list`) get their items from the matching collection; the page only holds intro blocks and SEO.

### 3.15 `redirects`
| Field | Type | Req |
|---|---|---|
| `from` | text (path, no locale) | yes, unique |
| `to` | text path or URL | yes |
| `status` | select 301/302 default 301 | yes |
| `auto` | checkbox (created by slug hook) | — |
Read by Mahendra's `next.config`/middleware loader (cached, tag `redirects`). Access: admin, editor.

### 3.16 `leads` (PII, restricted) — full contract in `docs/api/leads.md`
| Field | Type | Notes |
|---|---|---|
| `name` | text | |
| `company` | text | |
| `email` | email | email or phone required |
| `phone` | text | normalised E.164 where possible |
| `service` | text key from config allowlist (`src/config/services.ts`), or `other` | what they asked about. Not a relation, so renaming or unpublishing a service never breaks old leads |
| `sizeBand` | select from config | optional |
| `budgetRange` | select from config | optional |
| `message` | textarea | |
| `locale` | select en/ne | |
| `formKind` | select contact/quote/rent/event/callback | which form |
| `pricingRef` | R `pricing` | if submitted from a plan "Get started" button |
| `source` | group: `utmSource`, `utmMedium`, `utmCampaign`, `utmTerm`, `utmContent`, `referrer`, `landingPath`, `pagePath` | |
| `consent` | group: `contactConsent` bool, `consentAt` date, `policyVersion` text | ADR-006 |
| `verification` | select `verified` / `unverified-turnstile-unavailable` / `rejected` | PM decision, see leads.md |
| `status` | select new/contacted/qualified/won/lost/spam | sales workflow |
| `assignee` | R `users` | |
| `notes` | array {`by` R users, `at`, `text`} | sales notes |
| `ipHash` | text | salted hash only, never raw IP |
| `userAgent` | text (truncated) | |
| `deliveries` | virtual: status per channel from `leadJobs` | shown in admin as read-only list |
| `crmId` | text | external id once pushed |
| `idempotencyKey` | text unique | client-generated UUID |
No localized fields (internal). No drafts. Retention: TODO(roshan). Field-level: `ipHash`, `userAgent`, `idempotencyKey` read-only for everyone.

### 3.17 `leadJobs` (outbox; hidden)
| Field | Type | Notes |
|---|---|---|
| `lead` | R `leads` | leadId only; no PII copy |
| `channel` | select email/chat/crm | |
| `status` | select pending/sending/sent/failed/dead | |
| `attempts` | number | |
| `nextAttemptAt` | date | |
| `lockedAt` | date | worker claim |
| `lastError` | text | no PII; provider error code/text only |
| `sentAt` | date | |
`admin.hidden: true` for editor and sales; visible to admin. Created only by server code. Design in `docs/api/leads.md`.

### 3.18a Internal tables (not Payload collections)
`leadRateLimits` (`keyHash`, `windowStart`, `count`), created by migration, used by the lead API (see `leads.md` §5). Not editable in admin. Raj: include in backups; the lead worker deletes expired rows daily.

### 3.18 `formOptions` (not a collection: lives in config)
Lists such as `sizeBand`, `budgetRange`, `industry`, department live in `src/config/*.ts` with English keys and **label keys** translated via `src/messages/`. Reason: used by zod validation on both sides; changing them is a code review, not an editor action. Budget range amounts are shown as text generated from `pricing`/config, never typed in content. (Open: Q on budget bands, section 10.)

## 4. SEO field group (`seo`)

On every public document (`services`, `cases`, `posts`, `jobs`, `events`, `pages`). Aligned with keyword-map rule: one H1, title starts with primary keyword, unique titles.
| Field | Type | Req | Loc | Notes |
|---|---|---|---|---|
| `metaTitle` | text ≤60 | no (falls back to `title` + site name) | yes | counter shown in admin; unique check hook warns on duplicate |
| `metaDescription` | textarea ≤160 | yes for P0/P1 pages (warn only) | yes | |
| `primaryKeyword` | text | no | no | editor reference, not rendered; validated against `seo/keyword-map.md` by Sudip |
| `ogImage` | R `media` | no | no | fallback: cover, then site default |
| `ogTitle`, `ogDescription` | text | no | yes | fallback to meta |
| `canonicalPath` | text | no | no | override; default self-canonical |
| `noindex` | checkbox | — | no | excluded from sitemap.xml too |
| `nofollow` | checkbox | — | no | |
| `schemaType` | select (auto by template; override rare) | no | no | JSON-LD built by Mahendra from document data |
| `breadcrumbTitle` | text | no | yes | short label |
Localized field rule: arrays and blocks are structure (not localized); only the text fields inside them are localized, so Nepali reuses the English layout.
Final field list: **TODO(sudip)** confirm against his schema spec (T-70x). `sitemap.xml` and `hreflang` are generated from data, not typed.

## 5. Globals

### 5.1 `siteSettings` (admin: edit; editor: edit text; sales: read)
| Field | Type | Loc | Notes |
|---|---|---|---|
| `siteName` | text | yes | |
| `tagline` | text | yes | |
| `logo` / `logoDark` / `favicon` | R `media` | no | brand default from `src/brands/<brand>/`, overridable |
| `header.items` | array {`label` loc, `type` page/service/custom/dropdown, `ref`, `children[]` one level} | yes | max 6 top items (sitemap §4) |
| `header.cta` | `cta` group | yes | "Get a quote" |
| `footer.columns` | array {`title` loc, `links[]` {`label` loc, `ref`}} | yes | |
| `footer.legalLinks` | array links | yes | privacy, terms, cookies |
| `footer.note` | text | yes | copyright line |
| `contacts.salesEmail` | email | no | **public** contact email only. The internal lead-alert address is an env var, not here |
| `contacts.phone`, `contacts.whatsapp` | text | no | TODO(roshan) Q11 |
| `contacts.address` | textarea | yes | TODO(roshan) Q11 |
| `contacts.hours` | text | yes | |
| `social` | array {`platform`, `url`} | no | |
| `stickyBar` | group: toggles for WhatsApp, call, quote | no | mobile sticky actions |
| `announcement` | group {`enabled`, `text` loc, `link`} | yes | top banner e.g. opening event |
| (analytics IDs) | not in the CMS | — | GA4, Meta Pixel and Clarity IDs are `NEXT_PUBLIC_*` env vars per deployment (Hritik, 2026-11-06). Loaded after consent only (ADR-006) |
| `defaultSeo` | `seo` group | yes | fallbacks, default OG image |
| `localesEnabled` | checkboxes en, ne | no | hides NE until ready (sitemap footer note) |
| `cookieBanner` | group texts | yes | consent banner copy, policy link |
| `thankYou` | group {`heading`, `text`, `whatsappLabel`} | yes | thank-you state after lead |
Anything secret (API keys, webhooks, alert emails) is **never** in a global. Env vars only.

### 5.2 `leadSettings` (admin only; global)
Non-secret operational switches: `alertsEnabled` (email, chat, crm), `autoReplyEnabled`, `dailyDigestEnabled`, `ctaWhatsAppFallbackText` (loc). Secrets stay in env.

## 6. Blocks (data shapes; Satish maps each to `components/blocks/*`)

Rules: shallow (max one nested array level), every text localized, no price numbers, no HTML. Each block has `blockType` (kebab-case slug below) and `blockName` (admin label). Components take props only (standards §2).

| Block `blockType` | Fields | Notes |
|---|---|---|
| `hero` | `eyebrow` loc, `heading` loc req, `subheading` loc, `primaryCta` cta, `secondaryCta` cta, `image` media, `imageAlt` via media, `variant` select (centered/split/model), `chips` array {`text` loc} (≤4) | Home hero uses `variant=model` for the sari visual (ADR-009). Heading is the page H1 |
| `services-grid` | `heading` loc, `intro` loc, `mode` select all/pick, `services` R[] (when pick), `limit` number | |
| `feature-list` | `heading` loc, `items` array {`icon`, `title` loc, `text` loc} | |
| `process-steps` | `heading` loc, `steps` array {`title` loc, `text` loc} | |
| `case-cards` | `heading` loc, `mode` latest/pick, `cases` R[], `limit` | |
| `pricing-table` | `heading` loc, `intro` loc, `kind` select package/hourly, `prices` R[] `pricing`, `showCurrencyToggle` bool, `quoteCta` cta | Renders NPR and USD from the referenced docs |
| `rental-plans` | `heading` loc, `rentalProduct` select, `showAllBands` bool, `highlightBand` select | Reads `pricing` where `kind=rental`. Band selector UI is the frontend's |
| `budget-guide` | `heading` loc, `rows` array {`label` loc, `price` R `pricing`} | pricing page "from NPR …" table; amounts from `pricing` only |
| `testimonials` | `heading` loc, `mode` all/pick, `items` R[] `testimonials` | only `permissionConfirmed` |
| `logo-strip` | `heading` loc, `clients` R[] (or all with `showInLogoStrip`) | only `permissionConfirmed` |
| `faq` | `heading` loc, `faqs` R[] or `topic` select | emits FAQPage JSON-LD |
| `cta-form` | `heading` loc, `text` loc, `formKind` select, `fields` config key (which optional fields show), `whatsappFallback` bool, `defaultService` R `services`, `defaultPricing` R `pricing` | form posts to `/api/leads`; shape in `leads.md` |
| `rich-text` | `content` richText loc, `width` select narrow/wide | legal, about |
| `video` | `heading` loc, `source` select upload/embed, `file` R media, `embedUrl` text (allowlist YouTube/Vimeo, privacy-enhanced), `poster` R media, `caption` loc | embed only loads after consent if third-party cookies |
| `stats` | `items` array {`value` text, `label` loc} | only verified facts |
| `team-grid` | `heading` loc, `members` R[] | |
| `jobs-list` | `heading` loc, `emptyText` loc | reads open `jobs` |
| `event-details` | none: reads `events` doc | |
| `contact-details` | `heading` loc | reads `siteSettings.contacts` |
| `banner` | `text` loc, `link` cta, `tone` select | |
Block lists per template are restricted in the `pages.blocks` field via `admin.condition` on `template` so editors only see valid blocks. TODO(satish): confirm final block list after Sharwan wireframes (T-603+).

## 7. Template → data map (all 19 sitemap templates)

| Template | Route | Data source | Blocks / collections used |
|---|---|---|---|
| `home` | `/` | `pages` | hero, services-grid, rental-plans (teaser), case-cards, testimonials, logo-strip, faq, cta-form |
| `services-hub` | `/services` | `pages` + `services` | services-grid, cta-form |
| `service` | `/services/{slug}` | `services` | its `body` blocks, `pricingRefs`, `relatedCases`, `faqs`, quote form |
| `pricing` | `/pricing` | `pages` + `pricing` | pricing-table, budget-guide, rental-plans teaser, faq, cta-form |
| `rent-hub` | `/rent` | `pages` + `pricing` | hero, rental-plans (all products), faq, cta-form |
| `rent-product` | `/rent/website` etc. | `pages` (`rentalProduct`) + `pricing` | hero, rental-plans (filtered), feature-list, faq, cta-form |
| `cases-list` | `/work` | `pages` + `cases` | case-cards (all) |
| `case` | `/work/{slug}` | `cases` | fields + related services, testimonial |
| `blog-list` | `/blog` | `pages` + `posts` | list from `posts` |
| `article` | `/blog/{slug}` | `posts` | body, author, related services |
| `careers-list` | `/careers` | `pages` + `jobs` | jobs-list |
| `job` | `/careers/{slug}` | `jobs` | |
| `event` | `/opening-event` | `events` + `pages` | event-details, cta-form |
| `faq` | `/faq` | `pages` + `faqs` | faq (by topic) |
| `about` | `/about` | `pages` + `teamMembers` | rich-text, stats, team-grid |
| `contact` | `/contact` | `pages` + `siteSettings` | contact-details, cta-form |
| `thank-you` | `/contact/thank-you` | `pages` + `siteSettings.thankYou` | noindex |
| `legal` | `/privacy` `/terms` `/cookies` | `pages` | rich-text |
| `error` | `/404` | `siteSettings` + `messages` | links from nav |
Generated, not CMS: `sitemap.xml` (from published, non-noindex docs), `robots.txt`.

## 8. Access matrix

C = create · R = read · U = update · D = delete · P = publish. `own` = own record. "pub" = anonymous read of **published** docs through the server data layer only (no open REST/GraphQL).

| Collection / global | admin | editor | sales | public |
|---|---|---|---|---|
| `users` | CRUD | R own, U own (name, password) | R own, U own | — |
| `media` | CRUD | C R U | R | pub (files via CDN) |
| `serviceCategories`, `services`, `cases`, `posts`, `jobs`, `events`, `pages`, `faqs` | CRUDP | CRUDP (D only own drafts) | R | pub |
| `clients`, `testimonials`, `teamMembers` | CRUDP | CRUDP | R | pub (only permission-confirmed) |
| `pricing` | CRUDP | R | R | pub |
| `redirects` | CRUD | CRU | R | pub (server only) |
| `leads` | R U D (D = delete after retention, audited) | **none** | R U (status, assignee, notes) no D | **none**; create only via `POST /api/leads` using server local API |
| `leadJobs` | R U | none | none | none |
| `siteSettings` | R U | R U (not `localesEnabled`) | R | pub (selected fields) |
| `leadSettings` | R U | none | R | none |
Implementation notes: access functions in `src/collections/access/*.ts` (`isAdmin`, `isEditorOrAdmin`, `isSalesOrAdmin`, `publishedOnly`), field-level access on `leads.ipHash`, `userAgent`. Lead PII fields never exposed in list `admin.defaultColumns` to non-sales. Unit tests for every cell above.

## 9. Editor experience

- Plain labels and help text for every field; counters on SEO fields; "preview" button opens draft in the real page (live preview + draft mode secret per env).
- Draft → publish; scheduled publish for posts/jobs; version history, restore.
- Publish revalidates affected pages in seconds (hook; tags in section 1). Pricing change revalidates every page that references it.
- Referential safety: deleting a document referenced elsewhere is blocked with a message (hook).
- Warnings, not blocks, for: missing `metaDescription`, alt text on decorative off, duplicate `metaTitle`.
- Nepali: when `ne` is added, admin shows a locale switcher; empty `ne` falls back to `en`; a "translation status" column on list views (empty NE field count).
- Seed script (`pnpm seed`): creates roles, config-driven pricing placeholders **marked draft**, empty page shells for all 40 sitemap rows. No invented prices, clients or testimonials.

## 10. Open questions and assumptions

| # | Item | To | By |
|---|---|---|---|
| 1 | ASSUMPTION: Payload Postgres adapter handles a non-localized blocks field with localized text fields inside (and non-localized arrays with localized text) without issue. Spike week 2 day 1; needs the installed app (T-103, after Gate 1). Fallback decision by Tue 17 Nov | neha / hritik | Mon 16 Nov |
| 2 | Editors cannot change prices (admin only, sales read). Treated as decided unless Roshan objects at Gate 1 | Roshan | Gate 1 |
| 3 | Size bands, prices, setup fees, minimum terms are **not approved** (Q16). Stored as data/config; XL = `quoteOnly` | Roshan | Fri 13 Nov |
| 4 | Budget range options for the quote form (labels, steps). Need Roshan's input or Sudip's benchmark | pm / sudip | Thu 19 Nov |
| 5 | Final SEO field list and JSON-LD per template | sudip | Fri 13 Nov |
| 6 | Final block list after wireframes | satish / sharwan | Fri 20 Nov |
| 7 | 2FA mechanism for Payload (plugin or custom TOTP) | hritik / raj | week 2 |
| 8 | Public contact data (phone, address) Q11 | Roshan | Fri 27 Nov |
| 9 | Which team members appear publicly | Roshan | Fri 27 Nov |
| 10 | Lead retention period, IP hash salt rotation | Roshan | Gate 1 |
| 11 | DECIDED: analytics IDs in env (`NEXT_PUBLIC_*`), not `siteSettings` | — | — |
| 12 | Industry list, departments: confirm values (config) | sudip / pm | week 2 |
| 13 | Service split (web-development vs custom-software) pending sitemap open question 2 | pm | Gate 1 |

## 11. Change control
This document is the contract for frontend (Satish blocks, Mahendra templates). Changes after review are appended to a changelog here and announced to satish, mahendra, sudip by inbox. Collection TypeScript types are generated (`pnpm generate:types`) once the app is scaffolded; this document remains the human-readable source.

### Changelog
- v0.1 (2026-11-06): first draft.
- v0.2 (2026-11-06, per Hritik review): blocks and arrays not localized (text inside is); FAQ price node dropped; analytics IDs to env; `leads.service` is a config text key; internal tables note; editors cannot change prices.
