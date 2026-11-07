# Inbox — mahendra

Append-only. Format and rules: CLAUDE.md §5. Newest at the bottom.


### 2026-11-06 12:40 MSK · sudip → mahendra · T-301 · HANDOFF
Sitemap draft v0.1 is ready: seo/sitemap.md (URLs, 19 templates, parents, indexation, robots/sitemap.xml rules). For T-301/T-302 please confirm or change the locale scheme: I assumed EN unprefixed at root and NE under /ne/, same slugs in both. Page templates are listed per row; tell me if you want any merged.
Needed by: Thu 12 Nov · Reply: confirm locale scheme

### 2026-11-06 14:40 MSK · hritik → mahendra · T-101 · FYI
For T-302: constraints I set are in docs/standards.md §4 and docs/architecture.md (Routing and i18n). EN unprefixed, NE under /ne/, route group app/(site)/[locale]. next-intl is a candidate only; you pick the library and confirm the locale scheme. Template names follow seo/sitemap.md.
Needed by: Thu 12 Nov · Reply: only if objecting

### 2026-11-06 16:30 MSK · neha → mahendra · T-402 · HANDOFF
Lead API contract draft v0.1: docs/api/leads.md (schema in §2.1, form rules in §13). Also docs/api/content-model.md (pages, redirects, SEO group, template map §7). Please check form contract and tell me objections.
Needed by: Thu 12 Nov · Reply: only if objecting

### 2026-11-06 17:45 MSK · pm → mahendra · T-301, T-302 · REQUEST
1. T-301 Template & route map → `docs/frontend/templates-and-routes.md` — due Thu 12 Nov. Reviewer: hritik. Inputs: `seo/sitemap.md` (40 rows, 19 templates), `docs/api/content-model.md` v0.2 §7 (template-to-data map), `docs/standards.md` §2 (route groups `src/app/(site)/[locale]/`).
2. T-302 i18n architecture → `docs/frontend/i18n.md` — due Fri 13 Nov. Reviewer: hritik. Must confirm or change the locale scheme (EN unprefixed, NE under /ne/, shared English slugs) — sudip, neha and hritik all assume it. Devanagari fonts: see design/brand-directions/README.md.
Also read `docs/api/leads.md` §13 (form contract) — answer neha's questions in your inbox (thank-you redirect vs JSON, client idempotency key).
Both are technical → plans to pm AND hritik, wait for OK. Docs only, no scaffold/install, no git.
Needed by: see dates · Reply: plan paths + DONE

### 2026-11-06 18:45 MSK · hritik → mahendra · T-301, T-302 · REVIEW
Plans: APPROVED WITH CHANGES. Start both. Your six questions:
1. Locale scheme unchanged (EN unprefixed, NE `/ne/`, shared English slug): YES.
2. next-intl, as-needed, detection off, ENABLED_LOCALES as the single switch: YES. Add ENABLED_LOCALES to `lib/env.ts` (I added it to the scaffold env list); it is a deploy-time setting (static params), say so. Pass it to client islands via props, not a public env. Bundle cost is checked at scaffold, as you said.
3. Routes ([locale]/page.tsx, one [...slug] catch-all, 4 collection routes, opening-event): YES. Catch-all must call notFound() for unknown paths after the redirects lookup so the status is a real 404. No loading.tsx on these routes, agreed.
4. New folders components/forms, lib/routes, _templates: APPROVED, already added to docs/standards.md §2. Forms use Satish's ui/ primitives; no own styling system.
5. JsonLd carve-out: APPROVED, with conditions now in standards §8: single component, input only from typed builders, JSON.stringify, escape < > & U+2028 U+2029, unit test with a </script> payload, lint exception for that one file.
6. At scaffold I will check: global not-found with two root layouts, and the Next 16 name of the routing file. Plan for 404 meanwhile: the catch-all calls notFound(), rendered by (site)/[locale]/not-found.tsx; globalNotFound only matters for URLs outside every group, so it is a polish item.
Changes required:
A. (T-302) Untranslated NE page: do not combine noindex with canonical-to-EN (conflicting signals). Serve it with noindex, SELF canonical, and no hreflang entry, until `translatedLocales` includes ne.
B. (T-301) resolveBlocks(): you own it, in `src/lib/routes/` (server-only, calls Neha's lib/server queries; pure mapping logic is unit-tested). Neha supplies typed, depth-limited data functions. Tell her the list in the doc.
C. (T-301) Redirects: 308 via permanentRedirect is accepted (search engines treat it like 301). Tell Sudip so sitemap rule 5 wording is adjusted (his file).
D. (T-301) Form answers: conversion event on the thank-you page is OK, but it must fire once only: dedupe by leadId in sessionStorage (refresh must not recount). Ask Neha to update leads.md §13.6, which says fire on 201. Idempotency key: keep it in sessionStorage per formKind (no PII), not memory only, so a page reload during a retry does not create a second lead.
E. (T-301) State a rule and a test: no cookies()/headers()/searchParams in (site) layouts or pages; I added a CI static-route check (ci-spec §9) that will fail otherwise.
F. (T-302) Devanagari: EN pages must not download Devanagari font files; NE pages still need Latin for brand names. Verify with the network panel at scaffold and put it in the test list for Rajaros.
Needed by: docs per your dates · Reply: not needed

### 2026-11-06 19:20 MSK · hritik → mahendra · T-301, T-302 · REVIEW
Deliverables read in full. T-301 templates-and-routes.md: APPROVED WITH NITS. T-302 i18n.md: APPROVED WITH NITS. Required changes A-F from my plan review are all in. None of the nits blocks; fold them into v0.2 when convenient (before Fri 20 Nov so Satish and Neha build on them).
T-301 nits:
1. The catch-all can serve the `pages` doc with slug `home` at `/home`, a duplicate of `/`. Make the catch-all return 404 (or 308 to `/`) for slug `home`.
2. Unknown URLs go through getPage + getRedirect on every request (bots probe random paths). Make the null results cached through the same tags (negative cache) and ask Raj for a short Cloudflare TTL on 404s. Add one line to §7.
3. `(preview)` is a third root layout: it needs its own html/body, no-store, noindex, auth check before any draft data is read. State that the static-route CI check excludes it (I added that to ci-spec §9).
4. §6 item 9: zod in the client bundle may be sizable. Measure at scaffold; if it threatens the 150 KB budget, evaluate zod's lighter entry point before dropping shared schemas. Do not change anything now.
5. §3 wording: "9 compositions" vs a list of 10 files; say "9 content compositions plus error".
T-302 nits:
1. With `ENABLED_LOCALES=en`, `/ne/services` falls into the catch-all as slug `ne/services`. It ends in 404 by luck. Add an explicit guard: if the first segment is a known locale code that is not enabled, 404.
2. §7: next/font loaders must be declared at module scope with literal options; only their use is conditional by locale. Tell Satish so the brand `fonts.ts` is written that way, and check at scaffold that EN pages emit no Devanagari preload.
3. Lint rules (§3.1, §2.2): `react/jsx-no-literals` from eslint-plugin-react and a `no-restricted-syntax` selector for hard-coded `href="/..."` are the likely options; I decide at scaffold (verify the plugin works with ESLint 10 first).
4. Add a switch-on checklist step 0 note: Payload `localization` must list `ne` from the very first migration, so February needs no schema migration (scaffold plan step 5 does this; Neha confirms).
Good calls worth naming: thank-you-page conversion with dedupe, sessionStorage idempotency key, no auto-detect, `translatedLocales` gate, no `loading.tsx`.
Needed by: v0.2 Fri 20 Nov · Reply: not needed

### 2026-11-06 20:40 MSK · satish → mahendra · T-201 · HANDOFF
Answers to your REQUEST items 1,2,3,5 are in docs/frontend/component-inventory.md: block `data` types §3.1 and `BlockProps` §2; `cta-form` takes your LeadForm as children (#12); `Price` + tiny CurrencyToggle writing data-currency (#6); LanguageSwitcher props as you asked (§5). Item 4 (:lang(ne), fonts) comes in design-tokens.md Fri 13 Nov.
Please confirm: (a) fixed UI labels arrive in a `labels` prop filled by resolveBlocks from src/messages, money/dates preformatted with Intl; (b) StickyActionBar is CSS-only so your scroll island is not needed; band selector CSS-only too.
Needed by: Fri 13 Nov · Reply: only if objecting

### 2026-11-06 21:10 MSK · satish → mahendra · T-202 · HANDOFF
Your request 4 is answered in docs/frontend/design-tokens.md §8: fonts.ts exports { latin, devanagari } (module-scope next/font loaders, each with a CSS variable); the locale layout adds devanagari variables only when locale is ne; the font stack gives every variable a fallback (an undefined var() without one breaks the declaration). :lang(ne) rules: heading leading at least 1.35, body 1.75, letter-spacing normal, no uppercase, no font-synthesis.
Needed by: Fri 20 Nov · Reply: only if objecting

### 2026-11-06 18:49 MSK · pm → mahendra · ADR-024..029 · FYI
New ADRs in docs/decisions.md: 024 scaffold approved (hritik starts now), 025 only admins change prices, 026 auto-reply email to leads, 027 build-time brand / one image per client, 028 rental fonts from approved list, 029 sitemap (no /faq at launch, 3 rental pages, custom-software page). Update your docs in your next v0.2 where they touch these.
Needed by: your v0.2 dates · Reply: not needed

### 2026-11-06 19:17 MSK · hritik → mahendra · T-103 · FYI
Scaffold is running (report: team/reports/T-103-scaffold.md). JS budget baseline: an EMPTY home page is already 133 KiB (136.2 KB gzip, 6 chunks, modern browsers) of the 150 KB limit: about 14 KB headroom for everything else. Measure with `node scripts/check-bundle-size.mjs` after `pnpm build`. Consequences: no motion library, no client SDKs, islands only where unavoidable, scope any next-intl client provider to the smallest namespace (fallback in i18n.md §2.3 may be needed). Run the check before you hand over any UI task and put the number in your report.
Also: Next 16 routing file is src/proxy.ts (confirmed); it holds a minimal rewrite so / serves [locale]=en. Replace it with next-intl. Top-level not-found with two root layouts is not done (needs your spike).
Needed by: no action · Reply: not needed

### 2026-11-07 10:50 MSK · writer → mahendra · T-1002 · HANDOFF
Homepage copy is ready for review: content/pages/home.md. Sections in page order: header, hero, services (9 cards), rent (3), whyUs (4 points), process (4 steps), work (4 cases), pricingTeaser, event, faq (6), finalCta, footer, stickyBar. Each line is `field: text`; field names map 1:1 to message keys (e.g. home.hero.headline, home.services.cards[0].title). Common labels: content/microcopy.md. Voice guide: content/voice-and-tone.md.
Fields starting with `TODO(roshan)` must not be shown on the site; render them hidden or as a dev placeholder until Roshan answers (PAN, phone, WhatsApp number, case results, event venue/time, 3 FAQ answers).
Needed by: 14:00 MSK · Reply: only if a length does not fit your layout

### 2026-11-07 10:38 MSK · pm → mahendra · ADR-030..040 · FYI
Gate 1 PASSED today. New ADRs in docs/decisions.md: 031 brand = Sindoor Studio layout in ADMMIS colours · 032 migrations at app start · 033 Sentry server-side only · 034 AGENTS.md disabled · 035 backups · 036 leads (24 mo, N=20/h, UTM pre-consent) · 037 **free services only (USD 0)** · 038 writer joins (owns content/) · 039 go/no-go approved · 040 **Scrum, 1-week sprints**. Your Sprint 1 tasks are in team/sprints/sprint-1.md (your section) and team/BOARD.md. Backlog: team/BACKLOG.md. Release plan (soft launch target Mon 14 Dec): team/RELEASE-PLAN.md.
Needed by: n/a · Reply: not needed

### 2026-11-07 10:45 MSK · sharwan → mahendra · T-603 · HANDOFF
Homepage design is final: design/homepage/home-spec.md (section order and block mapping in section 3; copy keys map to content/pages/home.md), visual mock design/homepage/home.html. Hero image is Roshan's model (design/inputs/female sari.jpeg): needs a 640 px WebP at most 60 KB and a waist-up mobile crop; use priority, explicit width and height. Pending TODO(roshan) items (venue/time, FAQ answers 2, 4, 6, phone, WhatsApp, PAN, case results) must not render as placeholders: hide the row or question until the value exists (spec 3.7 to 3.12). Sticky bar links: wa.me and tel need Roshan's numbers.
Needed by: build starts about 14:00 MSK today · Reply: only questions

### 2026-11-07 10:50 MSK · satish → mahendra · T-204 · HANDOFF
Components are in src/components/{ui,layout,blocks} (barrels: index.ts in each). Swap list: layout.tsx adds `className={fontVariables}` on <html> (from @/brands/admmis-tech/fonts) and imports Header/Footer/MobileStickyBar from @/components/layout; page.tsx imports the ten *Block components from @/components/blocks (HeroBlock, ServicesGridBlock, RentCardsBlock, FeatureListBlock, ProcessStepsBlock, CaseCardsBlock, PricingTeaserBlock, EventTeaserBlock, FaqBlock, CtaBandBlock), data = your view objects. HERO_IMAGE = { src: '/images/hero-model.webp', width: 640, height: 800 }. Event: please add dateParts { day, month, year } to the view. Types: components/blocks/*/types.ts and index.ts.
Needed by: today 14:00 MSK · Reply: tell me when swapped

### 2026-11-07 10:58 MSK · sharwan → mahendra · T-601 · FYI
Logo files changed (vectorised from Roshan's own logo): header uses design/logo/admmis-tech-lockup.svg, width 148 and height 34 at mobile, 40 px high desktop. Favicon: design/logo/favicon.svg plus png/favicon-32.png and png/apple-touch-icon-180.png. Hero image: AVIF/WebP about 600 px, fetchpriority high (home-spec.md 3.2).
Needed by: no action · Reply: not needed

### 2026-11-07 10:58 MSK · hritik → mahendra · T-104 · REVIEW
Verdict APPROVED WITH NITS, no must-fixes. Full list in team/reports/T-104-home-review.md (mahendra section): 308 /en/x to /x in T-304, JSON-LD still missing, direct brand imports TODO, NEXT_PUBLIC_SITE_URL set in CI. JS budget allocation for consent (3 KB), language switch (0.5 KB), forms (0 KB on /) is in the report: please follow it.
Needed by: Gate 2 · Reply: not needed

### 2026-11-07 11:00 MSK · sudip → mahendra · T-301 · HANDOFF
Answers to your point 4 are in seo/sitemap.md v0.2, sections 1 (rules 5, 7, 8), 2.6 (robots, thank-you), 6 (JSON-LD per template, Offer on rentals, Article for cases, FAQPage kept) and 7 (conversion event, Turnstile view). Key: H1 = heroHeading (fallback title) for pages and services, title for posts/cases/jobs/events; robots.txt Disallow only /admin and /api; no blog pagination at launch. Full schema fields come Fri 13 Nov in seo/schema-spec.md.
Needed by: n/a · Reply: objections only

### 2026-11-07 11:20 MSK · writer → mahendra · T-1002 · HANDOFF
Home copy fix round (sudip T-707 review). Keys changed in content/pages/home.md, please sync src/messages/en/*.json:
- meta description (front-matter metaDescription), new text, 136 chars
- home.hero.eyebrow: "Software development company, Nepal"
- home.hero.headline: "Software, apps and AI built in Nepal" (pending Roshan; alternative "Software development company in Nepal" is in an HTML comment)
- home.services.title: "Software development and marketing, in one team"
- home.whyUs.points[2].text: WhatsApp mention removed
- home.footer.columns[2].links: "FAQ /faq" REMOVED (no /faq at launch)
- NEW keys home.services.cards[0..8].linkLabel (descriptive link/aria label for each service card; card title unchanged)
Needed by: your next sync · Reply: not needed

### 2026-11-07 11:45 MSK · writer → mahendra · T-1004 · HANDOFF
Nepali homepage draft is ready: content/pages/home.ne.md. Same sections, same keys and same link values as content/pages/home.md (fix round 1). Links have no /ne prefix; add the locale in the router. Front-matter has `locale: ne`, Nepali title (48 chars) and meta (137 chars). Status review; Roshan's native proofread is required (ADR-041), so do not mark it final.
Language switch + Nepali microcopy: content/microcopy.md (sections "Nepali" and "language switch"). Labels: "English" / "नेपाली" (each in its own language, same in every locale), aria "Change language" / "भाषा परिवर्तन गर्नुहोस्". Please set lang="en" / lang="ne" on each switch link.
Layout: Nepali runs longer. Longest fields vs English: hero.subheadline, card texts (up to about 1.5x characters), CTA labels hero.ctaSecondary, event.ctaLabel, finalCta.ctaSecondary (about 1.6x). Check 360 px wrap and Devanagari line-height.
TODO(roshan) fields are the same as in English; keep them hidden.
Needed by: your /ne wiring · Reply: only if a length breaks the layout

### 2026-11-07 15:52 MSK · sharwan → mahendra · T-604a · HANDOFF
Template specs ready: design/templates/service-spec.md (service, services hub) and rent-spec.md (rent hub, rent product): section order, tone rule by visible index, states, quote/rent form fields, price-on-request fallback. Mocks: service.html, rent.html.
Needed by: Mon 9 Nov · Reply: only if a field or limit is a problem

### 2026-11-07 17:10 MSK · satish → mahendra · T-207 · HANDOFF
Template components are in (all server components, 0 client JS). Import from `@/components/blocks` and `@/components/ui`. Every string comes from you; money arrives already formatted. Types: src/components/blocks/*/types.ts.
- `HeroBlock` data `{variant:'plain', eyebrow?, heading, subheading?, primaryCta?, secondaryCta?}` + optional `aside={<ServiceFacts/>}`. No image. Tone default `alt`.
- `ServiceFacts({label, title, rows:{label:string; value?:ReactNode}[]})` (ui). Rows without value are dropped; no rows = renders nothing. Price row value: `<Price prefix="From" amount="NPR 25,000" secondary="USD 190" quoteLabel="Price on request"/>`; with no `amount` it shows `quoteLabel` (never 0). Same `Price` for quote-only (`quoteLabel="Quote only"`).
- `FeatureListBlock` data adds `variant?: 'rule'(default) | 'cards' | 'checklist'`, `marker?: 'check'|'dash'`, `listLabel?: string` (checklist), item `{title, text?, icon?, href?}` (`text` is now optional; `href` only in `cards`). Heading ids are now generated, so several lists per page are fine.
- `ChoiceListBlock` data `{eyebrow?, heading, intro?, items:{question, label, href}[]}`.
- `Callout({title, tone?: 'info'|'important', children?})` (ui), `role="note"`.
- `RentalPlansBlock` data `{eyebrow?, heading, intro?, legend, help?, selectedLabel, priceFallback, quoteOnlyLabel, inclusionsLabel, pricePrefix?, selectedId? (from ?plan=), plans:{id, label, sub?, title, price?:{amount, secondary?, unit?}, quoteOnly?, setupText?, inclusions:string[], supportText?, cta}[]}`. Radio selection works without JS (up to 6 plans). Currency toggle is NOT built: pass `amount` + `secondary` (NPR + USD shown together).
- Not built (not in this task): Breadcrumbs, Table stacked, rich-text, cta-form slot, LeadForm, PriceTeaser aside box (PricingTeaserBlock already takes `aside`; use `<Price/>` in it).
- Tone rule stays yours (alternate bg/surface). Tell me if a field limit breaks a layout.
Needed by: T-307 · Reply: only if a prop is a problem

### 2026-11-07 MSK · neha → satish · T-406 · HANDOFF
Collections are in src/collections/ (types in src/payload-types.ts). Service and rent fields match the design specs section 5 names. Icons use your 21-name list. Block shapes: Pages.ts. Details: docs/api/content-model.md v0.3 changelog.
Needed by: n/a · Reply: only if objecting

### 2026-11-07 17:25 MSK · satish → mahendra · T-207 · FYI
Price fallback label is "Request a quote" (pm, per updated specs). Pass it as `quoteLabel` on `<Price/>` and as `priceFallback` in RentalPlansData, from messages, not hard-coded. Keep the ServiceFacts "Starts from" row: give it `<Price quoteLabel=.../>` so it stays visible without a price. "Price on request" in my earlier handoff was only an example string.
Needed by: T-307 · Reply: not needed

### 2026-11-07 15:57 MSK · pm → mahendra · T-307 · FYI
neha's T-406 fix: when you later swap your file loader for the CMS, read pages with findPublished (always depth 0) and resolve relations (FAQs, pricing) only through resolvePublished, never with depth > 0. See src/lib/server/content.ts.
Needed by: CMS swap · Reply: not needed

### 2026-11-07 17:00 MSK · writer → mahendra · T-1003 · HANDOFF
Service copy is in content/pages/services.md (hub) and content/pages/services/{web-development,ai-agents,mobile-app-development,outstaffing,digital-marketing}.md. Fields follow design/templates/service-spec.md section 5, one per line as `field: text`, so they paste 1:1 into src/messages/en/services.json. Lines containing TODO(roshan) are unconfirmed: show the fallback or hide the field, never publish the TODO text. Extra sections not in the spec (industries, channels, how-it-works, compare table, AI examples) are optional: build them only if the template supports them. Lines that say "use home.md ..." reuse home entries.
Needed by: when routes are ready · Reply: not needed

### 2026-11-07 18:35 MSK · sudip → mahendra · T-708 · FYI
FAQ JSON-LD rule (hritik T-110 nit) is in seo/sitemap.md §6, "FAQPage emission rule": emit FAQPage only from the page's own faqs field; a FAQ block shared across pages gets markup on one canonical page only (hub or /pricing), never identical question sets on several URLs.
Needed by: before T-307 copy wiring · Reply: not needed

### 2026-11-07 19:00 MSK · writer → mahendra · T-1003b / T-1005 · HANDOFF
More copy ready, same `field: text` format. Services: content/pages/services/{custom-software,qa-testing,audit,offline-marketing}.md. Rent: content/pages/rent.md (rent-hub, fields per design/templates/rent-spec.md 5.1) and content/pages/rent/{website,ai-agent,team}.md (rent-product, 5.2). Plans and prices are not in the copy: render them from the CMS, with "Request a quote" as the fallback. Lines with TODO(roshan) are unconfirmed: hide or use the fallback, never publish the TODO text. Also: the 6 earlier service files and the hub are now status: reviewed, and their three metas changed (mobile, marketing, outstaffing): re-paste those.
Needed by: when routes are ready · Reply: not needed
