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
