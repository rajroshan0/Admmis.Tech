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
