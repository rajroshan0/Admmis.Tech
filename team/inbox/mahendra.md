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
