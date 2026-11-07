# Plan T-307: service and rent routes (mahendra), 2026-11-07

Goal: routes /services, /services/[slug], /rent, /rent/[slug] from templates, EN only, static, data in message files shaped like the CMS fields.
Inputs: design/templates/service-spec.md, rent-spec.md, seo/briefs/*, T-207 report, home messages.
Approach: new message namespaces services.json and rent.json (SEO and hero fields from briefs); service list, card text, process, FAQ, pricing teaser and CTA reuse home.json. Pure view builders in src/lib/routes/. Data loader is the only part replaced by Payload later.
Deliverables: src/app/(site)/[locale]/{services,rent}/..., src/lib/routes/{services,rent}-view.ts, src/messages/en/{services,rent}.json, tests, report.
Acceptance: typecheck, lint, tests, build static, JS <= 144.3 KB, 360 px check, e2e green.
ASSUMPTIONS: pages without an SEO brief (custom-software, qa-testing, audit, offline-marketing, rent/ai-agent, rent/team) are noindex until their brief and copy exist. Price always "Request a quote" until pricing is approved.
Not built (no component or copy yet): Breadcrumbs, ChoiceList content, rental-plans content, rent-vs-buy table, quote form (CTA band to /contact instead).
