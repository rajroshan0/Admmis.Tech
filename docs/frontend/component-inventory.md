# Component inventory — tech.admmis.org

Owner: satish · Task: T-201 · Version: v0.1.1 draft · 2026-11-06 · Reviewer: hritik
Inputs: `docs/standards.md` §2/§5, `docs/api/content-model.md` v0.2 §6-7, `docs/frontend/templates-and-routes.md` (T-301), `docs/frontend/i18n.md` §7, `seo/sitemap.md` §4, `design/brand-directions/` (3 directions), `docs/reference-fittin.md` (structure only).
Nothing here is installed or built. Sizes are estimates until Sharwan's wireframes (T-603+) arrive; the block list is final only after them (content-model open item 6).

## 1. How to read this

| Term | Meaning |
|---|---|
| Verdict | **keep** = FITTIN has the same job and we carry the structure over in our own design. **change** = same job, different shape or scope. **new** = FITTIN has nothing like it (our needs: NPR + USD, rental bands, Nepali, consent). **drop** = not at launch (Phase 2 or never) |
| Size | S = under half a day, M = half to 1.5 days, L = 2-3 days. Includes states, a11y, 360 px layout, a usage page, and a Nepali sample check |
| Client? | `no` = Server Component. `yes (why)` = needs `"use client"`; reviewer asks "why client?" (standards §3) |
| Used by | Templates from `docs/frontend/templates-and-routes.md` §3. Short names: home, svc-hub, service, pricing, rent-hub, rent-prod, cases, case, blog, article, careers, job, event, faq, about, contact, thanks, legal, error. "all" = every template |
| Owner | satish unless stated. `forms/` is Mahendra's; listed so nothing is missed |

### Counting compositions (reconciled with the routes doc)
`templates-and-routes.md` §3 lists these compositions: `block-page`, `hub`, `service`, `rental`, `case`, `article`, `job`, `event`, `thank-you`, `error`. That is **10 files including `error`; 9 of them compose CMS content**. I use exactly that count. The CMS keeps 19 template names; code has 10 compositions.

### Rules every component follows (from standards, role file)
1. Props only. No fetching, no `payload`, no `lib/server` imports.
2. Tokens only: colour, type, space, radius, shadow, motion come from `docs/frontend/design-tokens.md`. No hex, no arbitrary `[12px]` values.
3. No user-facing string in code. Fixed labels (for example "Close menu", "per month", currency names) arrive in a typed `labels` prop that `resolveBlocks()` fills from `src/messages/<locale>/` (ASSUMPTION, Mahendra to confirm; the alternative is each server component calling the message loader itself, which also works but makes the component harder to test).
4. Logical CSS properties (`ms-`, `ps-`, `text-start`). Long Nepali words wrap (`overflow-wrap: anywhere` on card text, no fixed-width text boxes).
5. States: default, hover, focus-visible, active, disabled, loading, error, as applicable. Hover never carries the only information (touch phones).
6. Each component ships with a usage page (`/dev/components`, dev-only route group, not in the sitemap) showing every state in EN and a Nepali sample.

## 2. Block contract

Every block in `components/blocks/<name>/` exports `<Name>Block` and its data type from `types.ts` (Hritik: `resolveBlocks()` imports the type). Shared signature:

```ts
export type BlockProps<D> = { data: D; headingLevel: 2 | 3 | 4; labels?: Record<string, string> }
// hero is the exception: it always renders the page h1 and takes no headingLevel
```

`resolveBlocks()` (Mahendra) turns CMS blocks into these shapes. Money arrives **already formatted** with `Intl` for the active locale; components never compute or format a price (ADR-014, standards §3).

Shared types (`components/blocks/shared-types.ts`):

```ts
export type Cta = { label: string; href: string; kind?: 'link' | 'whatsapp' | 'tel'; external?: boolean }
export type MediaData = {
  src: string; width: number; height: number; alt: string; decorative?: boolean
  blurDataUrl?: string; mobile?: { src: string; width: number; height: number } // optional waist/portrait crop
}
export type PriceView = {
  key: string; name: string
  amounts: { NPR: string | null; USD: string | null } // formatted, e.g. "NPR 100,000"; null when quoteOnly
  period?: string            // formatted label, e.g. "per month"
  quoteOnly?: boolean; features?: string[]; excludes?: string[]; highlight?: boolean
}
export type IconName = 'web' | 'mobile' | 'code' | 'ai' | 'test' | 'audit' | 'team' | 'megaphone' | 'event'
  | 'check' | 'arrow' | 'phone' | 'whatsapp' | 'mail' | 'pin' | 'clock' | 'calendar' | 'play' | 'quote' | 'menu' | 'close'
export type RichTextData = unknown // Payload Lexical state; renderer maps nodes, never raw HTML
```

`IconName` is a closed list of 21 (cap about 20, Hritik d); Neha makes `feature-list.icon` and `services.icon` selects from it.

## 3. The 20 CMS blocks (`components/blocks/`)

| # | Block | Verdict | Size | Used by | Data source | Client? | States and notes |
|---|---|---|---|---|---|---|---|
| 1 | `hero` | change | L | home, rent-hub, rent-prod (+ pages that add it) | `hero` block | no. Image is a server `next/image`, `priority`, `sizes` set, width/height fixed | Variants centered / split / **model** (sari visual, ADR-009: arch/frame shapes from tokens, image masked by CSS). Heading is the page h1. Hero image is the LCP element: preloaded, no lazy, no entrance animation. Mobile crop via `image.mobile`. Chips (≤4) wrap. Static under reduced motion (decor shapes may drift with `transform`, off for reduced) |
| 2 | `services-grid` | keep | M | home, svc-hub | `services` docs via resolveBlocks | no | Card per service: icon, title, 1-2 line summary, link. 1 col at 360 px, 2 at 640, 3 at 1024. Hover lifts (transform only). Focus on the whole-card link |
| 3 | `feature-list` | keep | S | rent-prod, service | block | no | Icon + title + text items; icon decorative (`aria-hidden`). 1/2/3 columns |
| 4 | `process-steps` | keep (FITTIN 5-step process, our wording) | S | service, home | block | no | Real `<ol>`, numbered by CSS counter. Horizontal on desktop, vertical on mobile |
| 5 | `case-cards` | change (no filters at launch) | M | home, cases, case (related) | `cases` docs | no | Cover, client name only if permission, 1 verified metric. Missing cover: token-coloured placeholder. Skeleton state for the dev page. Metrics only when `value` is a verified fact |
| 6 | `pricing-table` | **new** (FITTIN tariffs: one currency) | L | pricing | `pricing` docs (`kind=package/hourly`) | **yes, one tiny leaf** `CurrencyToggle`: sets `data-currency` on the nearest `[data-price-scope]` (the `<html>` by default so every price on the page switches together) | Both currencies are in the HTML (crawlable); CSS shows the one selected by `data-currency`; NPR default. Real `<table>` with `th scope`. Toggle is a labelled group of two real radio/buttons with `aria-pressed`. Choice is not persisted (persisting would flash). Highlight state for a recommended row. `quoteOnly` rows show the quote CTA, never a number. Mobile: table becomes stacked rows (CSS), not horizontal scroll |
| 7 | `rental-plans` | **new** | L | home (teaser), pricing (teaser), rent-hub, rent-prod | `pricing` where `kind=rental` | no (CSS-only). Size-band selector = radio group + `:has()`; all bands in the DOM; works without JS. **Verify at scaffold** on low-end Android WebView; fallback is a tiny client leaf | Per product: band selector (micro / small / medium / large; XL = quote), plan card with price (both currencies), includes list, CTA. Shows `highlightBand` selected by default. Same currency mechanism as #6. States: band checked, focus-visible on radio, quoteOnly |
| 8 | `budget-guide` | **new** ("from NPR …" table) | S | pricing | `pricing` refs | no | Two-column table, label + "from" price, both currencies. Same `Price` component |
| 9 | `testimonials` | keep | M | home, case | `testimonials` (permission-confirmed only) | no | Scroll-snap row on mobile (`ScrollRow`), grid on desktop. Quote, name, role/company, optional photo. If none confirmed the block renders nothing (no placeholder at launch) |
| 10 | `logo-strip` | keep (without awards, per Truth rule) | S | home | `clients` (permission-confirmed only) | no | Greyscale logos, alt = client name. Renders nothing if empty |
| 11 | `faq` | keep | M | home, pricing, rent-hub, rent-prod, faq, service | `faqs` | no. Native `<details name=…>` accordion (no JS) | Answers are rich text. Open state via `[open]`. Focus ring on `<summary>`. The block exposes the plain-text question/answer list so Mahendra's JSON-LD builder reads the same data |
| 12 | `cta-form` | change | M | home, pricing, rent-hub, rent-prod, event, contact, service | block + `siteSettings` | no (shell). Renders Mahendra's `LeadForm` as `children` | Layout shell: heading, text, form slot, WhatsApp/phone fallback buttons beside the form. Surface uses `alt` section tone. Loading/error states live inside `LeadForm` (Mahendra) |
| 13 | `rich-text` | keep | M | about, legal | block | no | Sanitised Lexical renderer (`ui/RichText`). `width` narrow (65ch) / wide. Headings inside content start at the block's `headingLevel` |
| 14 | `video` | new | M | optional blocks on service / about | block | **yes** `VideoFacade`: poster + play button; loads iframe or `<video>` on click (and only after consent when the provider sets cookies) | States: poster, loading, playing, consent-required (message + "accept" link to cookie settings), error. No autoplay. Caption as `<figcaption>` |
| 15 | `stats` | keep | S | about | block | no | Large value + label. No count-up animation (verified facts only, and no JS) |
| 16 | `team-grid` | change (FITTIN leadership with quotes) | M | about | `teamMembers` (only those marked public) | no | Photo, name, role, optional short bio. Photo fallback = initials on token colour |
| 17 | `jobs-list` | new | S | careers | `jobs` (open) | no | Row per job: title, department, location, type, link. Empty: `emptyText` plus general-application CTA |
| 18 | `event-details` | new | M | event | `events` doc | no | Date/time (preformatted with timezone label, NPT), venue, map link, agenda list, registration CTA. Past event: "archive" state, CTA hidden. Print-friendly |
| 19 | `contact-details` | new | S | contact | `siteSettings.contacts` | no | Phone / email / WhatsApp / address / hours as a `<dl>`; each phone/email a real `tel:`/`mailto:` link; empty values omitted (Q11 pending) |
| 20 | `banner` | new | S | any | block | no | Tones from tokens (info / promo / notice); link optional. Full-width strip above header when used as announcement. Dismiss not offered (no JS, no cookie) |

Count: content model §6 (and the PM brief) say "19 blocks", but the §6 table has **20 rows** (the 19 above plus `banner`). I build all 20. **QUESTION to Neha**: is `banner` a block, or only `siteSettings.announcement` (templates doc §5 already reads an announcement from settings)? Proposal: keep `banner` as a block for in-page notices and let the global announcement come from `siteSettings`; both render the same `Banner` component. Neha to fix the "19" wording in the content model.

### 3.1 `data` types (exported from each block's `types.ts`)

```ts
export type HeroData = { eyebrow?: string; heading: string; subheading?: string; primaryCta?: Cta; secondaryCta?: Cta
  image?: MediaData; variant: 'centered' | 'split' | 'model'; chips?: string[] }
export type ServicesGridData = { heading?: string; intro?: string
  items: { href: string; title: string; summary: string; icon?: IconName }[] }
export type FeatureListData = { heading?: string; items: { icon?: IconName; title: string; text: string }[] }
export type ProcessStepsData = { heading?: string; steps: { title: string; text: string }[] }
export type CaseCardsData = { heading?: string
  items: { href: string; title: string; client?: string; summary?: string; cover?: MediaData; metric?: { value: string; label: string } }[] }
export type PricingTableData = { heading?: string; intro?: string; kind: 'package' | 'hourly'
  rows: PriceView[]; showCurrencyToggle: boolean; quoteCta?: Cta }
export type RentalPlansData = { heading?: string; product: 'website' | 'ai-agent' | 'team'
  bands: { id: string; label: string; plan: PriceView; includes: string[]; quoteOnly?: boolean }[]
  defaultBandId: string; showCurrencyToggle: boolean }
export type BudgetGuideData = { heading?: string; rows: { label: string; price: PriceView }[] }
export type TestimonialsData = { heading?: string; items: { quote: string; name: string; role?: string; company?: string; photo?: MediaData }[] }
export type LogoStripData = { heading?: string; clients: { name: string; logo: MediaData; href?: string }[] }
export type FaqData = { heading?: string; items: { id: string; question: string; answer: RichTextData }[] }
export type CtaFormData = { heading: string; text?: string; whatsapp?: Cta; phone?: Cta }   // form passed as children
export type RichTextBlockData = { content: RichTextData; width: 'narrow' | 'wide' }
export type VideoData = { heading?: string; source: 'upload' | 'embed'; fileUrl?: string; embedUrl?: string
  poster?: MediaData; caption?: string; needsConsent: boolean }
export type StatsData = { items: { value: string; label: string }[] }
export type TeamGridData = { heading?: string; members: { name: string; role: string; bio?: string; photo?: MediaData }[] }
export type JobsListData = { heading?: string; emptyText: string; jobs: { href: string; title: string; department?: string; location: string; type: string }[] }
export type EventDetailsData = { title: string; dateLabel: string; timeLabel: string; venue?: string; address?: string; mapUrl?: string
  agenda?: { time: string; text: string }[]; summary?: string; registerCta?: Cta; isPast: boolean }
export type ContactDetailsData = { heading?: string
  items: { kind: 'phone' | 'email' | 'whatsapp' | 'address' | 'hours'; label: string; value: string; href?: string }[] }
export type BannerData = { text: string; link?: Cta; tone: 'info' | 'promo' | 'notice' }
```

Sharing these three files with Neha so that the CMS block and the component agree in writing (role standard). Differences between these and content-model §6 are in section 11 (requests).

## 4. UI primitives (`components/ui/`)

| Component | Verdict | Size | Used by | Client? | States and notes |
|---|---|---|---|---|---|
| `Button` (primary / secondary / ghost; renders `<a>` when `href`) | change | S | all | no | default, hover, active, focus-visible (3 px ring, `--focus`), disabled (`aria-disabled`, no pointer), loading (spinner, `aria-busy`). Min height 44 px. Shape (pill / 12 px / 6 px) comes from `--radius-button` |
| `TextLink` (inline and arrow link) | keep | S | all | no | underline by default, hover thicker, focus ring; external adds visually hidden "opens in new tab" label |
| `Field` (label + hint + error + control slot) | new | S | forms | no | wires `id`, `aria-describedby`, `aria-invalid`; error text uses colour plus icon plus text, never colour alone |
| `Input`, `Textarea`, `Select` (native) | new | S | forms | no | default, hover, focus, disabled, error, readonly. 16 px minimum font (no iOS zoom). `autocomplete` passes through |
| `Checkbox`, `Radio` | new | S | forms, rental-plans | no | custom visual on native input, 24 px target |
| `Card` (+ `CardLink` for whole-card links) | keep | S | many | no | default, hover (lift), focus-within, loading skeleton. Radius `--radius-card`; shadow style from tokens (hard offset / soft / none, per brand) |
| `Badge` / `Chip` | keep | S | hero, cards | no | static only |
| `Icon` + sprite (21 icons) | new | M | all | no. Server components or one `<svg><use>` sprite; unused icons never reach the client | decorative by default; `label` prop for meaningful icons. Hand-drawn or open-licence set, **TODO(satish)** record the licence |
| `Media` (wrapper over `next/image`) | keep | S | all | no | requires `width`, `height`, `alt` (or `decorative`), `sizes`; `priority` only for the LCP image; blur placeholder; aspect-ratio box prevents CLS |
| `Heading` | new | S | all | no | takes `level` (the block's `headingLevel`), styled independently of level |
| `Section` (+ `Container`) | new | S | all | no | `tone`: default / surface / alt (alt = `--alt`/`--onalt`), vertical spacing scale, max width token |
| `SectionHeader` (eyebrow, heading, intro) | new | S | blocks | no | eyebrow is text, never the only heading |
| `Accordion` (`<details name>`) | keep | S | faq | no | closed / open / focus; chevron rotates with `transform` |
| `Table` | new | S | pricing blocks | no | semantic; stacked layout below 640 px by CSS |
| `Price` | **new** | S | pricing, rental-plans, budget-guide, service teaser | no | renders both currency strings in `<span data-cur="NPR">`/`<span data-cur="USD">`, CSS shows the active one; `quoteOnly` renders the quote label instead. Takes `PriceView`, no math |
| `SegmentedControl` | new | S | currency toggle, band selector | the currency variant uses the one client leaf (#6) | radio-based; keyboard arrows; checked and focus states |
| `ScrollRow` (scroll-snap) | change (replaces FITTIN-style sliders) | S | testimonials, case-cards on mobile | no | CSS scroll-snap, no JS, no autoplay; focusable region with label. Chosen over a carousel library (bytes, a11y) |
| `RichText` (Lexical renderer) | new | M | rich-text, faq, article, case, job | no | maps nodes to semantic HTML; no `dangerouslySetInnerHTML`; links get `rel` rules; images via `Media`. Unknown node: renders children, logs in dev |
| `Skeleton` | keep | S | dev page, Suspense inside blocks | no | `opacity` pulse only, static under reduced motion |
| `Reveal` + `useReveal` (see §9 motion) | new | S | below-the-fold blocks | yes (one shared observer, about 0.4 KB) | content visible before and without JS |
| `Prose` (typography wrapper for rich content) | new | S | rich text | no | `:lang(ne)` leading rules apply |

## 5. Layout (`components/layout/`)

| Component | Verdict | Size | Used by | Client? | Notes |
|---|---|---|---|---|---|
| `Logo` (mark + wordmark; light / dark / on-brand) | new | S | header, footer | no | from `brand.ts`; SVG inline; link to `/` with accessible name |
| `Header` | change (5 items + "Get a quote", sitemap §4) | M | all | no (shell) | sticky not required; contains `NavMenu`, `MobileNav`, `LanguageSwitcher`, CTA |
| `NavMenu` (desktop dropdowns: Services, About) | change | M | all | **yes**: disclosure buttons with `aria-expanded`, Escape and outside click close | Link items are server-rendered inside; works as plain links if JS fails (dropdown parents also link to their hub) |
| `MobileNav` | change | M | all | **yes**: open/close, focus trap, restore focus, body scroll lock | Full-height panel; 44 px targets; closes on route change. Dialog semantics via `<dialog>` where supported (verify at scaffold) |
| `Footer` | change | M | all | no | Services list, rent products, company, legal, language switcher slot, contact line from `siteSettings` |
| `StickyActionBar` (WhatsApp / call / quote, mobile only) | new | S | all | **no**: always visible via CSS `position: fixed`, so Mahendra's "scroll/visibility" island is not needed. **Proposal to Mahendra** | Hidden at 768 px and up; adds bottom padding to `<main>` so it never covers content; respects safe-area inset. Hides on `/contact` where the form is the action (prop) |
| `Breadcrumbs` | new | S | every page deeper than level 1 | no | `<nav aria-label>` + `<ol>`; last item `aria-current="page"`; JSON-LD is Mahendra's, from the same trail |
| `SkipLink` | new | S | all | no | first focusable element, visible on focus |
| `LanguageSwitcher` | new | S | header, footer | no (plain links) | props `items: { href; lang; label; current }[]`; `hreflang`/`lang` on each link; not rendered when under 2 locales (Mahendra's request 5) |
| `AnnouncementBar` | = `Banner` | S | all | no | same component as block #20 |
| `ConsentBanner` (visual only) | new | S | all | **yes** (Mahendra's logic, ADR-006) | I supply markup and states (initial, preferences, saved); Mahendra owns storage and loaders. Does not cover the sticky bar or the form (stacks above it) |

## 6. Template parts (`components/blocks/parts/`, presentational, composed by Mahendra's templates)

These are not CMS blocks. The data comes straight from the collection doc (`service`, `case`, `post`, `job`).

| Component | Verdict | Size | Used by | Client? | Notes |
|---|---|---|---|---|---|
| `PageHeader` (h1 = `title`, lead, breadcrumbs slot) | new | S | hubs, legal, collection templates, thanks | no | used when a page has no `hero` (templates doc §9) |
| `DeliverableList` | keep (FITTIN service template) | S | service | no | check list, `<ul>` |
| `PriceTeaser` | **new** | M | service, case | no | 1-3 `PriceView` rows with "see all prices" link; both currencies |
| `RelatedLinks` (cards of related services / cases / posts) | keep | S | service, case, article | no | reuses `Card` |
| `MetricList` | change (FITTIN metrics lacked baseline) | S | case | no | value + label + optional baseline/period line so a number is never bare |
| `Gallery` (static responsive grid; no lightbox) | change | S | case | no | lightbox dropped (JS, a11y); images open full size in a new tab |
| `ArticleMeta` + `AuthorBox` | new | S | article | no | date via `<time>`, reading time if given |
| `JobFacts` + `ApplyBox` | new | S | job | no | closed state banner (noindex is Mahendra's) |
| `ErrorPanel` | new | S | error | no (500 uses the `error.tsx` client wrapper, Mahendra) | links from nav data, WhatsApp/phone |
| `ThankYouPanel` | new | S | thanks | no. The `sessionStorage` reader is Mahendra's island | variants by `formKind`; WhatsApp button |

## 7. Forms (`components/forms/`, Mahendra), for completeness

`LeadForm` (+ Turnstile widget, error summary, fields wiring) is Mahendra's, built on `Field`, `Input`, `Textarea`, `Select`, `Checkbox`, `Button`. I deliver those primitives first (week 3) so the form can start. `cta-form` only supplies the shell around it (block #12).

## 8. Dropped, deferred, and FITTIN features not carried over

| FITTIN feature | Verdict | Why |
|---|---|---|
| ROI calculator, cost calculator | drop (Phase 2 `/calculator`) | not in launch scope (sitemap §5, timeline) |
| Quiz with virtual strategist | drop | out of scope; our sari model could become this persona later |
| Webinars, reels, share buttons | drop | Phase 2 |
| Awards strip and diploma lightbox | drop | we have no awards; the Truth rule forbids inventing them. Lightbox also costs JS |
| Partners grid and "become a partner" | drop | Phase 2 |
| Product cards for AI SaaS products | change | covered by `rental-plans` and service pages |
| Case list filters (type × industry) | drop at launch | 4-6 cases; add filter chips when there are 12+ |
| Cookie banner relaying | n/a | ours follows ADR-006 |
| Header injected by JavaScript | drop | ours is server-rendered |
| Dialog / modal, toast, tooltip | drop | no launch need; native `<dialog>` for MobileNav only |
| Carousel library | drop | `ScrollRow` (CSS scroll-snap) instead |
| Dark-mode toggle | drop | decision in `design-tokens.md` (no toggle at launch; a brand may be natively dark) |

## 9. Client islands (my part) and JS risk

Mahendra's island list (`templates-and-routes.md` §10) is the reference. Mine, with the reason:

| Island | Why client | Est. gzip | Note |
|---|---|---|---|
| `NavMenu` | disclosure state, Escape, outside click | about 0.8 KB | links render server-side |
| `MobileNav` | open/close, focus trap and restore, scroll lock | about 1.2 KB | |
| `CurrencyToggle` | writes `data-currency` | under 0.3 KB | no persistence |
| `VideoFacade` | loads media on click | about 0.6 KB | only on pages with the block |
| `ConsentBanner` (visual) | state | with Mahendra's logic | |
| `Reveal` observer | entrance motion | about 0.4 KB | optional, see below |

### JS budget for a content page (content pages: under 150 KB gzip first-load JS, standards §6)

All numbers are **estimates**. Hritik owns the final allocation after the first measurement at scaffold (T-103).

| Item | Estimate (gzip) | Status |
|---|---|---|
| Next.js and React runtime baseline | measured at scaffold (expected to be the larger share of the budget) | not measured |
| Satish islands: `NavMenu` | about 0.8 KB | estimate |
| Satish islands: `MobileNav` | about 1.2 KB | estimate |
| Satish islands: `CurrencyToggle` (pricing pages only) | under 0.3 KB | estimate |
| Satish islands: `VideoFacade` (pages with the block only) | about 0.6 KB | estimate |
| Satish islands: `Reveal` observer (optional) | about 0.4 KB | estimate |
| Shared with Mahendra: `ConsentBanner` logic and analytics loader | TBD, Mahendra | not estimated |
| Mahendra: `LeadForm` + zod + Turnstile loader (lazy on content pages) | TBD, Mahendra (zod size to be measured) | not estimated |
| Mahendra: thank-you reader (thank-you page only) | TBD | not estimated |
| **Remainder (headroom)** | TBD at scaffold = 150 KB minus all rows above | not known |

My islands total about 3.3 KB if every one loads on the same page; typical content page about 2.0 KB (`NavMenu`, `MobileNav`, `Reveal`). This is only my share, not the page total. Everything else, including the accordion, the rental band selector, scroll rows and the sticky bar, is server HTML plus CSS.

### Motion (animation list)
Only `transform` and `opacity`; all wrapped for `prefers-reduced-motion: reduce` (then none).

| Where | Effect | Mechanism |
|---|---|---|
| Buttons, cards | hover lift 2-4 px, press scale | CSS transition |
| Accordion chevron, nav dropdown, mobile panel | rotate / fade / slide | CSS transition |
| Blocks below the fold | fade-up 12 px once | CSS scroll-driven animation (`animation-timeline: view()`) inside `@supports`, so unsupported browsers simply show the final state; otherwise `Reveal` (one shared `IntersectionObserver`) adds a class only to elements that are not yet in the viewport at mount. Default state is always fully visible (Hritik: no `opacity: 0` waiting on a hook) |
| Hero | nothing on the image or text; decor shapes (arch, sun) may drift slowly | CSS, off under reduced motion; the LCP element is never animated in |

No motion library at launch (approved by Hritik, 2026-11-06). If one is ever wanted, I propose it with its gzip size and what CSS cannot do.

## 10. Build order and effort

| Phase (suggested) | Components | Size sum (approx.) |
|---|---|---|
| A. Foundations (week 3) | tokens wiring, `Button`, `TextLink`, `Field`/`Input`/`Textarea`/`Select`/`Checkbox`, `Icon`, `Media`, `Heading`, `Section`, `Card`, `Badge`, `Skeleton`, `Logo`, `SkipLink` | 14 S + 1 M |
| B. Shell (week 3) | `Header` (`NavMenu`, `MobileNav`), `Footer`, `Breadcrumbs`, `LanguageSwitcher`, `StickyActionBar`, `Banner`, `ConsentBanner` visual | 4 M + 4 S |
| C. Core blocks (week 4) | `hero` (L), `services-grid`, `feature-list`, `process-steps`, `faq`, `cta-form`, `rich-text` + `RichText`, `case-cards` | 1 L + 4 M + 3 S |
| D. Price blocks (week 4-5) | `Price`, `Table`, `pricing-table`, `rental-plans`, `budget-guide` | 2 L + 3 S |
| E. Remaining blocks and parts (week 5) | testimonials, logo-strip, stats, team-grid, jobs-list, event-details, contact-details, video, template parts | 4 M + 10 S |

Rough total: 3 L (about 8 days), 17 M (about 17 days), about 36 S (about 12 days). That is more than one person-month at face value, so two things protect the date: (1) S/M items overlap with Mahendra building page templates against stubs, (2) if time is short the cut order is `video`, `team-grid` image polish, `Gallery`, `event-details` print styles, then `ScrollRow` (stack instead). **PM to confirm** Mahendra can start templates on stubs from week 3.

## 11. Requests and open questions

| # | To | Item | By |
|---|---|---|---|
| 1 | neha | Make `feature-list.icon` and `services.icon` selects from the 21-name `IconName` list (section 2) | Thu 19 Nov |
| 2 | neha | `hero.image` needs optional `mobile` crop (Sharwan: waist crop for the model); media must return `width`, `height`, `blurDataUrl` | Thu 19 Nov |
| 3 | neha | `banner.tone` values: info / promo / notice. Is `banner` a block, or only `siteSettings.announcement`? (section 3) | Thu 19 Nov |
| 4 | neha | `pricing` docs need `features[]` and `excludes[]` (localized) and a `highlight` flag; `rental-plans` bands need `includes[]` per band | Thu 19 Nov |
| 5 | neha | `logoStrip` clients: supply a logo usable in greyscale (SVG or transparent PNG) plus `name` | Thu 19 Nov |
| 6 | mahendra | Confirm the `labels` prop approach (rule 3) and that `resolveBlocks()` formats money and dates with `Intl` before the component sees them | Fri 13 Nov |
| 7 | mahendra | Proposal: `StickyActionBar` as CSS-only (no island); band selector as CSS-only | Fri 13 Nov |
| 8 | sharwan | Confirm component list against wireframes; states for NavMenu open, MobileNav, band selector, price highlight, consent banner | with T-603 wireframes |
| 9 | hritik | `:has()` radio selector on low-end Android WebView: acceptable with a client fallback if it fails the device test? | scaffold |
| 10 | rajaros | Device list for the usage page (360 px, low-end Android), keyboard walkthrough per component | week 3 |

## Changelog
- v0.1 (2026-11-06): first draft.
- v0.1.1 (2026-11-06, Hritik must-fix): JS budget table replaces the single "3.3 KB of 150 KB" line. Other review nits are scheduled for v0.2 (Fri 20 Nov).
