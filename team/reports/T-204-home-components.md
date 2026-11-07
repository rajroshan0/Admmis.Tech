# Report — T-203 Tokens and fonts, T-204 Home components
Owner: satish · Date: 2026-11-07 · Status: done, review pending (hritik)

## What was built
- Tokens: `src/styles/{globals,tokens-base,base,components}.css`, `src/brands/admmis-tech/tokens.css` (values from home-spec §1), Tailwind 4 `@theme static`, shadows `@theme inline static`. Tone scopes `alt` and `band` in `base.css`. Base and components CSS sit in CSS layers so utilities win.
- Fonts: `src/brands/admmis-tech/fonts.ts` (Montserrat variable latin; Mukta 400/700 devanagari with `preload: false`). Applied on `<html>` by mahendra (`fontVariables`). The build self-hosts them (build passed).
- UI: Button/LinkButton, Container, Section (bg/surface/alt/band), SectionHeader, Card/CardLink/IconTile, Icon (inline SVG, 21 names).
- Layout: Header (+ `MobileNav` client island), Footer, MobileStickyBar, Logo.
- Blocks: HeroBlock, ServicesGridBlock, RentCardsBlock, FeatureListBlock, ProcessStepsBlock, CaseCardsBlock, PricingTeaserBlock, EventTeaserBlock, FaqBlock (native details), CtaBandBlock. Types in `blocks/*/types.ts`, exported from `blocks/index.ts`.
- Assets: `public/images/hero-model.webp` (640x800, 22 KB, 4:5 crop head to waist), `public/brand/admmis-tech-lockup{,-dark}.svg`.
- Mahendra swapped page.tsx and layout.tsx to these components during the session.

## Checks (2026-11-07 about 10:55 MSK)
| Check | Result |
|---|---|
| `pnpm typecheck` | pass |
| `pnpm lint` | pass, 0 warnings |
| `pnpm test` | 13 of 13 pass |
| `pnpm build` | pass; `/en` static |
| First Load JS `/en` (`scripts/check-bundle-size.mjs`) | **143.8 KB gzip of 150**. Baseline was 136.2, so +7.6 KB (MobileNav plus next/image client code). Over my 5 KB target, under the cap |
| Horizontal scroll at 360 px | none (scrollWidth 360; only the hero sun overflows and is clipped) |
| Mobile menu | opens (aria-expanded true, scroll locked); Escape closes and focus returns to the button |
| Screenshots | `team/reports/assets/home-360.png`, `home-1280.png` (full page) |

## Deviations from the spec
1. Pricing teaser has no price box (no approved prices, ADR-025); an `aside` slot exists.
2. Header nav is flat (no dropdowns): mahendra's contract has flat items.
3. Event tile needs `dateParts` from mahendra, else it shows the date label. Venue and time are optional and omitted.
4. Case cards have no tag or result line (no data). Hero chips are supported but not passed.
5. FAQ renders strings only; rich-text answer renderer is a TODO.
6. `@brand` alias does not exist yet: `globals.css` imports the brand path directly (TODO(hritik)).
7. Sticky bar shows only "Get a quote" (WhatsApp and phone are TODO(roshan)).

## Not done
Contrast script for token pairs, `_test` second theme, `/dev/components` usage page, Devanagari check on real Nepali text, test on a real low-end Android (Rajaros).

## Update 2026-11-07 (hritik nits, after commit 630c6fe)
1. Skip link: new `SkipLink` in `src/components/layout/` (tokens only: `bg-fg`, `text-bg`, `rounded-button`); mahendra swapped it into `layout.tsx`.
2. Hero `quality={80}` prop dropped (no `images.qualities` config needed, so no change to hritik's `next.config.ts`).
3. Footer logo is `loading="lazy"` (`Logo` has a `lazy` prop); the header logo stays eager.
4. Logo: final Sharwan lockups copied to `public/brand/` (now 437x100); header 34 px high on mobile, 40 px from 768 px.
Checks: typecheck, lint, test (13/13), build pass. First Load JS `/en` 143.8 KB gzip of 150 (unchanged). Screenshots `home-360.png` and `home-1280.png` re-taken; 360 px scrollWidth 360, no overflow. I stopped only the server I started on port 3101.

## Update 2026-11-07 (T-204-fix, QA bugs)
| Bug | Fix |
|---|---|
| BUG-001 | Case card no longer clips: `overflow-hidden` removed from the card (cover has its own rounded top), scroll-row top padding 8 px so the ring fits. e2e marker removed, test passes |
| BUG-004 | Without JS the menu button is hidden and the links show as a row under the header (`<noscript>`, zero JS added) |
| BUG-008 | Footer grid: Contact column is 1.7fr at 1024 px and up, full row from 768 to 1023; `overflow-wrap: anywhere` only on the contact link. Email is one line at 1280 (19 px high) |
| BUG-009 | Sticky bar content is in a `<nav>`; optional `label` prop (mahendra may add a localized label, not required) |
| BUG-010 (mine) | `public/favicon.ico` (32 px PNG in ICO, `/favicon.ico` returns 200) and `public/apple-touch-icon.png`. The 404 page stays with mahendra |
| BUG-005 | Not built. For Sprint 2: needs a nested nav data shape from mahendra (`nav: {label, href, children?}[]`) and a small `NavMenu` client island (about 0.8 KB) |
Markers for BUG-001 and BUG-009 removed in `tests/e2e/home.spec.ts`. BUG-003 stays marked (mahendra's footer link).
Checks: typecheck, lint, test 13/13, build pass; e2e (`E2E_PORT=3103 E2E_CHANNEL=chrome E2E_WEBKIT=0`): 20 passed. First Load JS `/en` 143.8 KB gzip (unchanged). Stopped only the servers I started.

## Update 2026-11-07 (BUG-002b, hritik request)
`fetchPriority="high"` added to the hero `<Image>` (`quality` was already dropped). Built HTML check on a production server (port 3106, stopped): both the `<link rel="preload" as="image">` and the `<img>` carry `fetchpriority="high"` (the `low` one on the page is the lazy footer logo). typecheck, lint, test 13/13, build pass; First Load JS `/en` 143.8 KB gzip (unchanged).
