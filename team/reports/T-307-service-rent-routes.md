# T-307 Service and rent routes (mahendra), 2026-11-07

Status: DONE with listed gaps.

Built: /services, /services/[slug] (9), /rent, /rent/[slug] (3), all static, EN only (/ne/* is 404; the switch still points at the NE homepage).
- Data: src/messages/en/{services,rent}.json (SEO and hero fields from seo/briefs) plus home.json (cards, process, FAQ, pricing teaser, CTA). Views: src/lib/routes/{services,rent,section-pages}-view.ts. Only the loaders change when the CMS arrives.
- Templates: src/app/(site)/[locale]/{services,rent}/..., helpers in _templates/. Metadata and canonical via src/lib/seo/page-metadata.ts. H1 = heroHeading, fallback card title. Price always "Request a quote" (Price component, no numbers).
- ASSUMPTION: pages with no SEO brief (custom-software, qa-testing, audit, offline-marketing, rent/ai-agent, rent/team) are noindex until brief and copy exist. Each page shows a "More detail is coming soon" Callout in place of body copy.

Verified: tsc clean (excluding neha's helpers.ts and migrations errors), eslint clean on my files, vitest 48/48, prettier clean, build: all routes static. JS 143.7 KB gz per page (async chunks, noModule excluded), no increase over home. 360 px: no horizontal overflow, one H1, no duplicate ids on service, rent and hub. E2E: 23 pass, 1 fail (ne.spec: /ne absent because local .env has ENABLED_LOCALES=en; .env.example has en,ne; not caused by this task). Servers stopped.

Gaps: no Breadcrumbs component (none added); ChoiceList content, rental-plans block, rent-vs-buy table, groups on the hub grid (ServicesGridBlock has fixed heading ids, so one grid for all 9), quote form (closing CtaBand links to /contact?service=slug) wait for copy, components or pricing approval. Hub price text-only. JSON-LD not yet added to these pages.

## T-307-fix (hritik T-110 must-fix)
- `indexable` now comes only from `COPY_READY` in src/lib/routes/section-pages.ts (empty sets, so all 9 service and 3 rent pages are noindex). Flip a slug in when its writer copy is synced and the placeholder is removed. Hub pages stay indexable (no placeholder).
- Later nits (not done): type views from payload-types with findPublished/resolvePublished at the CMS swap; no identical FAQPage JSON-LD on all 9 pages; sitemap must exclude noindex pages.

## T-308 Copy sync (mahendra), 2026-11-07
- Synced content/pages/services.md, services/*.md (9), rent.md, rent/*.md (3) into src/messages/en/{services,rent}.json by a one-off script (not committed). Shape: src/lib/routes/page-copy.ts. Placeholder callout removed. New: PageBlocks/PageTail in _templates/, hub choice list.
- TODO(roshan) rule applied strictly: a field or list item containing TODO text is dropped whole, so some lists are shorter than the copy (e.g. benefits 2 of 4, rent hub "meaning" 1 of 3, rent exit callout and 3 FAQs). No TODO text in any page (test and grep).
- COPY_READY.services = web-development, ai-agents, mobile-app-development, outstaffing, digital-marketing; the 4 P1 pages and all 3 rent pages stay noindex. Hubs indexable.
- Not rendered: compare tables, plans, hub groups, cases (none approved), second process block (launchSteps; ProcessStepsBlock has a fixed heading id), WhatsApp links, JSON-LD (none emitted; FAQPage rule respected by emitting none). Lists with fewer than 2 items are skipped. rent/ai-agent and team now have 3 cards, so the 4-card question is moot.
- Verified: tsc and eslint clean, vitest 48/48, build static, JS 143.7 KB, 360 px on ai-agents, rent/ai-agent, both hubs: no overflow, one H1, no duplicate ids. Full e2e not re-run.

## T-308b
- COPY_READY.services now has all 9 slugs (sudip T-709); rent product pages stay noindex. The rent hub stays indexable as before (sudip T-709 says noindex too: pm to decide; one-line change in rent-view.ts plus rent.spec.ts).
- Rent metas, rent/website H1 and hero sub synced from T-1005-fix. Updated tests/e2e/services.spec.ts (all 9 indexable). tsc, eslint, vitest 48/48 and build pass.
- /rent hub made noindex (pm decision, sudip T-709); rent.spec.ts updated; services+rent e2e 56 passed (Chromium).
