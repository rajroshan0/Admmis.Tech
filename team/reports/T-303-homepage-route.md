# Report — T-303 Homepage route
Owner: mahendra · 2026-11-07 · Reviewer: hritik

## Status
DONE. Swapped to satish's components (`@/components/blocks`, `@/components/layout`, fonts) at 11:0x MSK; `_placeholders/` deleted. `home-view.ts` now uses `Cta` from `@/components/ui`; event date tile parts come from `event.dateIso` (new data key in home.json) via `dateParts()`.

## Delivered
- `src/messages/en/home.json`, `common.json` (keys 1:1 with `content/pages/home.md` and microcopy)
- `src/lib/i18n/config.ts`, `messages.ts` (+ test): typed loader standing in for next-intl (T-304); message files do not change when next-intl replaces it
- `src/lib/routes/path.ts`, `home-view.ts` (+ test), `src/lib/seo/metadata.ts` (+ test)
- `src/app/(site)/[locale]/layout.tsx` (lang, skip link, header, main, footer, sticky bar, viewport), `page.tsx` (10 sections, generateMetadata), `src/app/icon.svg` (from `design/logo/favicon.svg`)
- `team/plans/T-303-homepage-route.md`

## Checks (2026-11-07 10:45 MSK)
| Check | Result |
|---|---|
| typecheck, lint, format:check | pass |
| test | pass (13 tests) |
| build | pass; `/en` is SSG; no dynamic APIs |
| First Load JS (`scripts/check-bundle-size.mjs`) | 143.8 KB gzip, 8 files (budget 150), after the swap |
| `curl :3100/` | 200; one h1; 10 sections; footer; `<html lang="en">`; title, canonical, OG, icon present; no "TODO" text |

## Left out on purpose (TODO(roshan), not shown)
Case results (4), event venue and time, FAQ items 2, 4, 6 (answers pending, so 3 of 6 FAQs show), WhatsApp link (final CTA secondary and sticky bar WhatsApp), phone (footer, sticky Call), address, registration and PAN, social links. Sticky bar shows only "Get a quote".

## Notes
- Dev proxy still serves `/en` as 200 (spec: 308 to `/`); fixed in T-304.
- Canonical uses `NEXT_PUBLIC_SITE_URL` (localhost:3000 in `.env`).
- Contract with satish: `team/inbox/satish.md` (2026-11-07 10:50). It asks for card `cta`, a `CtaBand` block and string FAQ answers.
- I stopped the dev server I started; port 3100 is free.

## T-303-fix round (2026-11-07, due 16:30)
- Messages synced with the writer's HANDOFF (11:20): meta, hero.eyebrow/headline, services.title, whyUs Nepal line, footer without /faq, `services.cards[n].linkLabel`. `linkLabel` is passed in the services view items; ServiceItem has no such field yet, so ASK satish to use it as the card link's accessible name.
- BUG-003: test.fail marker removed in `tests/e2e/home.spec.ts`. I also updated the meta description regex there to the new copy (the old text no longer exists); Rajaros please confirm. The `/faq` skip in the link test is now dead code.
- BUG-006: `public/og-default.png` (1200x630, navy `#0a1f4a` + dark lockup, 20 KB), `og:image` and `twitter:image` in `buildMetadata`, apple-touch-icon link (`/apple-touch-icon.png`, 180 px, already in public/). og:url and canonical already use NEXT_PUBLIC_SITE_URL; they show localhost:3000 until Hritik sets it in CI/Docker.
- BUG-010: `(site)/[locale]/not-found.tsx` (LinkButton, Container, strings in `common.notFound.*`) plus `[...slug]/page.tsx` that calls notFound(). Needed so unknown URLs reach the branded page with the site layout and a real 404. I removed `dynamicParams = false` from the locale layout, because it also blocked the catch-all; the layout still calls notFound() for a disabled locale (`/ne` is 404 until switch-on). Limitation: not-found gets no params, so the copy is EN only until T-304 solves locale for not-found.
- Sticky bar: `stickyBar.navLabel` ("Quick actions") passed as `label`.
- Checks: typecheck, lint, test (13), build pass. First Load JS `/en` 143.8 KB gzip, 8 files. e2e (chrome, own server on 3105): 20 passed. curl on the production server: /en/nope, /nope/a, /xx are 404 with the branded page; `/ne` 404; `/` 200.
