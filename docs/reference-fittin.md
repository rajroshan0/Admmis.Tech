# Reference analysis: fittin.ru (Nov 2026)

Observed by inspecting the public site in a browser (scripts, headers, network calls). Used only as a structural reference.

## How their site is built
- Static HTML files on nginx (HTTP/2, gzip). No framework, no CMS, ~100 hand-edited landing pages.
- Header/mega-menu injected by JavaScript (`header-include.js`) on every page.
- CSS split into critical + deferred; Service Worker caches fonts, CSS and logo.
- Lead forms: JavaScript POSTs to `bill-go.fittin.ru/send-telegram-message`, which sends the lead to a Telegram group. No database or CRM step on the site.
- Analytics: Yandex Metrika only (Webvisor session recording, goals per page).
- News block: widget from their own content API (`ainews-back.fittin.ru`).
- Heavy SEO: many niche service pages, large JSON-LD schema blocks.

## What their company says it uses for client products
Flutter, Python/Django, Docker, MySQL, S3, Elasticsearch, Redis, PostgreSQL, MongoDB, Sentry, GitLab, GitHub Actions, CodeMagic, Yandex Cloud, Google Cloud, AWS ("О нас" page). This is their product stack, not their website's.

## Their pricing model (`/tariffs` redirects to `/tariffs-a`, which suggests an A/B test)
- **PRO:** 170,000 ₽/month subscription + 625,000 ₽ one-time integration (client's team does integrations); up to 30 days.
- **PRO+:** 190,000 ₽/month + 835,000 ₽ one-time (FITTIN does integrations); up to 30 days.
- **Individual:** negotiated after an audit.
- **Time & Materials:** from 2,625 ₽/hour for custom work.
- Their pitch: a ready modular platform rented as a subscription + setup fee, framed against marketplace commissions.

## What we keep
Many service landing pages from one template · case studies with measurable results · visible pricing models (fixed vs hourly) · strong schema/SEO · fast static pages.

## What we do better
CMS instead of hand-edited files · leads stored in a database before any notification · no secrets in client-side JS · pinned dependency versions · consent-based analytics · multilingual from the start.
