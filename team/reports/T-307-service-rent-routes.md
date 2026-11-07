# T-307 Service and rent routes (mahendra), 2026-11-07

Status: DONE with listed gaps.

Built: /services, /services/[slug] (9), /rent, /rent/[slug] (3), all static, EN only (/ne/* is 404; the switch still points at the NE homepage).
- Data: src/messages/en/{services,rent}.json (SEO and hero fields from seo/briefs) plus home.json (cards, process, FAQ, pricing teaser, CTA). Views: src/lib/routes/{services,rent,section-pages}-view.ts. Only the loaders change when the CMS arrives.
- Templates: src/app/(site)/[locale]/{services,rent}/..., helpers in _templates/. Metadata and canonical via src/lib/seo/page-metadata.ts. H1 = heroHeading, fallback card title. Price always "Request a quote" (Price component, no numbers).
- ASSUMPTION: pages with no SEO brief (custom-software, qa-testing, audit, offline-marketing, rent/ai-agent, rent/team) are noindex until brief and copy exist. Each page shows a "More detail is coming soon" Callout in place of body copy.

Verified: tsc clean (excluding neha's helpers.ts and migrations errors), eslint clean on my files, vitest 48/48, prettier clean, build: all routes static. JS 143.7 KB gz per page (async chunks, noModule excluded), no increase over home. 360 px: no horizontal overflow, one H1, no duplicate ids on service, rent and hub. E2E: 23 pass, 1 fail (ne.spec: /ne absent because local .env has ENABLED_LOCALES=en; .env.example has en,ne; not caused by this task). Servers stopped.

Gaps: no Breadcrumbs component (none added); ChoiceList content, rental-plans block, rent-vs-buy table, groups on the hub grid (ServicesGridBlock has fixed heading ids, so one grid for all 9), quote form (closing CtaBand links to /contact?service=slug) wait for copy, components or pricing approval. Hub price text-only. JSON-LD not yet added to these pages.
