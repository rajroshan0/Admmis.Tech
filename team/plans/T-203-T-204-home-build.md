# Plan — T-203 Tokens and fonts, T-204 Home components
Owner: satish · Date: 2026-11-07 · Due: 2026-11-07 17:30 MSK · Reviewer: hritik (FYI to pm)

## 1. Goal (in my own words)
Roshan runs `pnpm dev --port 3100` at 20:00 and sees the real homepage in the ADMMIS brand (Sindoor Studio layout in navy, orange, amber, green). Tokens and fonts are done once, in the multi-brand architecture, so the next brand is a token file. Components take every string as a prop.

## 2. Inputs I read
CLAUDE.md, my inbox (mahendra props contract, writer and sharwan handoffs), `design/homepage/home-spec.md` and `home.html`, `docs/frontend/design-tokens.md`, `docs/standards.md`, `src/lib/routes/home-view.ts`, the placeholders.

## 3. Approach
- Tailwind 4 `@theme static` in `src/styles/tokens-base.css` declares every name with magenta placeholders; `src/brands/admmis-tech/tokens.css` (unlayered, later in the cascade) supplies values. Shadows use `@theme inline static` so they read the tone-scoped colours.
- Tone scopes (`data-tone` alt and band) in `base.css` remap semantic tokens; components take no colour props.
- `base.css` and `components.css` are imported into CSS layers so utilities always win.
- Server components everywhere except `MobileNav` (disclosure: Escape, focus trap, focus return). FAQ is native `<details>`. Panel content is passed as children, so it stays out of the client bundle.
- Hero image: 640x800 WebP (4:5, head to waist) in `public/images/`, `next/image` with `preload`, aspect-ratio stage, multiply blend on the peach arch.
- Fonts: Montserrat variable latin (`next/font/google`, build-time self-host), Mukta 400/700 devanagari with `preload: false`.
- ASSUMPTION: `@brand` alias does not exist yet, so globals.css imports the brand path directly (marked TODO(hritik)).
- ASSUMPTION: pricing teaser has no price box (no approved prices, ADR-025); an optional `aside` slot exists.
- Decision for Hritik: the header uses the light lockup on the white header and the dark lockup in the navy footer, as home-spec §3.1 says.

## 4. Steps
Tokens and base CSS; fonts; UI primitives; layout; ten blocks; asset prep; message mahendra to swap; verify (typecheck, lint, test, build, JS size, screenshots at 360 and 1280); report.

## 5. Deliverables
`src/styles/*`, `src/brands/admmis-tech/{tokens.css,fonts.ts,brand.ts}`, `src/components/{ui,layout,blocks}/**`, `public/images/hero-model.webp`, `public/brand/*.svg`, report `team/reports/T-204-home-components.md`.

## 6. Acceptance criteria
- [ ] typecheck, lint, test, build pass
- [ ] First Load JS for `/` stays under 150 KB (additions under about 5 KB)
- [ ] No horizontal scroll at 360 px; matches mock at 360 and 1280
- [ ] Focus visible, contrast per spec §1.5, reduced motion honoured, no hard-coded copy
- [ ] Hero is the LCP element, no layout shift, no "PROVISIONAL IMAGE" label

## 7. Risks
- JS budget (136.2 KB baseline) -> client JS only in MobileNav.
- next/font needs network at build -> check; fallback is a local font file.

## 8. Estimate
About 6 hours.
