# Design-token architecture (multi-brand theming) — tech.admmis.org

Owner: satish · Task: T-202 · Version: v0.1.1 draft · 2026-11-06 · Reviewer: hritik
Inputs: ADR-013, ADR-019, `docs/standards.md` §2/§5, `docs/frontend/i18n.md` §7, `docs/frontend/component-inventory.md`, `design/brand-directions/` (all three token tables), Hritik's review of the plan (2026-11-06), Mahendra's request 4.
This document defines **structure**. Values come from Sharwan after Gate 1 (Fri 13 Nov); the three directions appear only as examples and as the proof that the structure fits all of them. Nothing is installed or run. Tailwind-specific behaviour is marked **verify at scaffold** (T-103), as Hritik asked.

## 1. Goals and rules

1. A brand is **one folder** (`src/brands/<brand>/`): tokens, fonts, brand data. Changing the brand changes no component code.
2. Components use **semantic tokens only**. They never see a hex value, a raw palette name or a pixel size outside the scale.
3. Every brand must pass the same **contrast and completeness checks** before it can build (section 11).
4. Works for all three directions: light warm (Sindoor Studio), natively dark (Himal Night), serif editorial (Gurans), and for a rental client's custom palette.
5. Devanagari is a first-class case, not an afterthought (section 8).
6. Zero runtime theming cost: the brand is chosen at **build time**, there is no theme switcher, no brand JS, no flash.

## 2. The three layers

| Layer | What | Who may reference it | Lives in |
|---|---|---|---|
| **1. Primitive** | Raw values of one brand: palette steps (`--p-vermilion-600`), font families, the radius and shadow recipes it uses | Only layer 2 of the same brand | `src/brands/<brand>/tokens.css` (optional; a small brand may write values straight into layer 2) |
| **2. Semantic** | Role names that are the same in every brand: `--color-bg`, `--color-primary`, `--radius-card`, `--font-heading`, `--duration-base` | Components, via Tailwind utilities (`bg-bg`, `text-fg`, `rounded-card`) | Names and structure in `src/styles/tokens-base.css`; **values assigned per brand** in `src/brands/<brand>/tokens.css` |
| **3. Component** | A few tokens where a brand must change a component's structure, not just colour: `--button-weight`, `--card-border`, `--card-shadow`, `--hero-frame-radius` | The one component that owns it; default = a semantic token | Declared with defaults in the component's CSS; overridden in the brand file only when needed |

Rules:
- A component may use layers 2 and 3. Never layer 1 (a lint rule describes this, section 11).
- A new token is added to layer 3 first. It is promoted to layer 2 only when two or more components need it.
- Names describe **role, not value**: `--color-primary`, never `--color-red`. Brand names never appear in a token name or class.

## 3. Semantic token catalogue

Required = every brand must define it (the completeness check fails the build otherwise). "From S." = Sharwan's shared name from `design/brand-directions/README.md`.

### 3.1 Colour (required)

| Token | Tailwind utility | From S. | Role |
|---|---|---|---|
| `--color-bg` | `bg-bg` | `--bg` | Page background |
| `--color-surface` | `bg-surface` | `--surface` | Cards, inputs |
| `--color-fg` | `text-fg` | `--ink` | Body text, headings |
| `--color-muted` | `text-muted` | `--muted` | Secondary text (4.5:1 on bg and surface) |
| `--color-primary` | `bg-primary`, `text-primary` | `--primary` | Primary button fill, links |
| `--color-on-primary` | `text-on-primary` | `--onp` | Text on primary |
| `--color-accent` | `bg-accent` | `--accent` | Decoration and highlights. **Never text** (Sindoor marigold is 1.77:1) |
| `--color-on-accent` | `text-on-accent` | new | Text placed on an accent fill (banner "notice", badge) |
| `--color-line` | `border-line` | `--line` | Decorative dividers, card hairlines. Not for input edges |
| `--color-line-strong` | `border-line-strong` | **new** | Input and control borders, 3:1 on bg and surface (WCAG 1.4.11). See finding in section 4 |
| `--color-alt` | `bg-alt` | `--alt` | Alternate section background |
| `--color-on-alt` | `text-on-alt` | `--onalt` | Text on alt |
| `--color-focus` | `outline-focus` | `--focus` | Focus ring on bg and surface (3:1) |
| `--color-danger` | `text-danger`, `border-danger` | new | Error text and borders (4.5:1 on bg and surface) |
| `--color-success` | `text-success` | new | Success text and icon (4.5:1) |
| `--color-alt-muted` | `text-alt-muted` | new | Secondary text on alt |
| `--color-alt-surface` | `bg-alt-surface` | new | Cards and inputs inside an alt section (the `cta-form` sits on alt) |
| `--color-alt-line-strong` | `border-alt-line-strong` | new | Input borders inside alt (3:1 on alt-surface) |
| `--color-alt-danger` | `text-alt-danger` | new | Error text inside alt (4.5:1 on alt and alt-surface). The page `danger` fails there: Himal `#FF8A80` on its light alt is 2.11:1 |
| `--color-alt-success` | | new | Success text inside alt |
| `--color-alt-primary` | | new | Button fill inside alt. Needed because the page primary often fails on alt (Himal teal on its light alt; Sindoor vermilion on its dark alt) |
| `--color-alt-on-primary` | | new | Text on `alt-primary` |

Optional with defaults in `tokens-base.css` (a brand may override):

| Token | Default | Why |
|---|---|---|
| `--color-primary-hover` | `color-mix(in srgb, var(--color-primary) 88%, var(--color-fg))` | Mixing toward the text colour darkens on light brands and lightens on dark ones, so one rule fits all. Computed 2026-11-06: Sindoor `#A52F1E` (6.94:1 with white), Himal `#44D7C6` (9.57:1 with its dark text), Gurans `#103A2C` (12.62:1) |
| `--color-primary-active` | same with 76% | Pressed state; computed ratios 8.07, 10.11, 13.11 |
| `--color-alt-focus` | `var(--color-on-alt)` | Sindoor's `--focus` equals its alt colour (invisible on alt), so alt sections get their own ring colour |
| `--color-scrim` | `color-mix(in srgb, var(--color-fg) 60%, transparent)` | Mobile menu backdrop |

Disabled controls use the same tokens at reduced emphasis; WCAG exempts inactive components from contrast, so there is no `disabled` colour token.

### 3.2 Typography

| Token | Role | Example (Sindoor Studio) |
|---|---|---|
| `--font-heading`, `--font-body` | Families. Stacks end with system Devanagari fallbacks (section 8) | Poppins / Hind |
| `--weight-display` | Display and H2 | 700 |
| `--weight-h3` | H3 | 600 |
| `--weight-strong` | Bold in body, labels | 600 |
| `--text-display`, `--text-h2`, `--text-h3`, `--text-lead`, `--text-body`, `--text-small` | Size. Mobile value in the theme; the base file raises them at 768 px (`@media`) | display 36 px (mobile) and 56 px (desktop); H2 28 / 38; H3 20 / 22; lead 17 / 19; body 16; small 14 |
| `--leading-display`, `--leading-h2`, `--leading-h3`, `--leading-body`, `--leading-small` | Unitless line height, Latin | 1.15, 1.15, 1.25, 1.6, 1.6 |
| `--leading-*-ne` | Devanagari line height, applied by `:lang(ne)` (section 8) | 1.35, 1.35, 1.4, 1.75, 1.75 |
| `--tracking-heading` | Letter spacing for headings | -0.01em |
| `--eyebrow-transform` | `uppercase` or `none` | `none` |

Weight tokens are deliberately **not** in Tailwind's `--font-weight-*` namespace: that namespace generates `font-<name>` utilities, which would collide with the family utilities `font-heading` / `font-body` (Hritik). They are applied in `base.css` element rules and the `Heading` component, not as utilities.

Sizes are `rem` (user font-size setting is respected). Brand file may not add sizes; it may change the values of these tokens within the same names (so the page rhythm stays predictable). Body is never below 16 px.

### 3.3 Shape, depth, space, layout

| Token | Role |
|---|---|
| `--radius-button`, `--radius-field`, `--radius-card`, `--radius-chip` | Sharwan's `--r` and `--r2` map to button and card. Himal Night has a pill button (999 px) but needs a normal field radius, which is why `--radius-field` is separate and required |
| `--shadow-card`, `--shadow-raised` | Flat, soft or hard-offset. Sindoor `6px 6px 0 var(--color-fg)`; Gurans none (hairline rules); Himal: TODO(sharwan) |
| `--border-width`, `--border-width-strong` | Hairline (1 px) and emphasised (2 px) |
| `--focus-ring-width`, `--focus-ring-offset` | Same in all three directions: 3 px, 3 px. Applied by one `:focus-visible` rule in `base.css`. It is an `outline` (never a box-shadow) so it stays visible in forced-colors mode |
| `--spacing` | Tailwind spacing base, 0.25 rem. The default numeric scale is kept (`p-4`, `gap-6`). Structure, not brand, so it is not themed |
| `--space-section`, `--space-gutter` | Section vertical rhythm `clamp(3rem, 8vw, 6rem)`; page gutter 16 px mobile, 24 px at 768 px |
| `--container`, `--container-prose` | 72 rem and 65 ch |
| `--target-min` | 44 px minimum touch target (every direction specifies 44) |
| Breakpoints | Tailwind defaults (640 / 768 / 1024 / 1280). Design starts at 360 px. **Not themed**: layout structure is the same for every brand |

### 3.4 Motion

| Token | Value | Rule |
|---|---|---|
| `--duration-fast`, `--duration-base`, `--duration-slow` | 120 ms, 200 ms, 400 ms | Brands may retune (a calm brand slows them) within 100-600 ms |
| `--ease-standard`, `--ease-out` | `cubic-bezier(0.2, 0, 0, 1)`, `cubic-bezier(0, 0, 0.2, 1)` | |
| `--motion-distance` | 12 px | Fade-up and slide distance |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` in `base.css` sets all durations to `0.01ms` and `--motion-distance` to `0` | One kill switch for every component; components cannot forget it |

Only `transform` and `opacity` are ever animated (component inventory §9). No colour or layout transition tokens exist on purpose.

### 3.5 Layering

`--z-sticky-bar: 30`, `--z-header: 40`, `--z-menu: 50`, `--z-consent: 60`. Structural, not themed.

## 4. Findings from the three directions (for Sharwan, via inbox)

1. **`--line` cannot be an input border.** Computed 2026-11-06: Sindoor `#E3D9CB` on `#FBF6EF` is 1.30:1, Himal `#2A3B5C` on `#0B1424` is 1.65:1, Gurans `#D9DFD3` on `#F6F4EC` is 1.23:1. Form-field edges need 3:1 (WCAG 2.2 1.4.11). So `--color-line-strong` is added. Quick default if Sharwan has no value: reuse `--color-muted` (all three pass 6.7:1 or better) and refine later.
2. **Alt sections need their own set.** Sindoor's `--focus` (`#1B1A2E`) equals its `--alt`, so the ring disappears; Himal's `--primary` (teal) on its light `--alt` (`#F3F6FB`) is 1.72:1; Sindoor's vermilion on its dark alt is 2.85:1. Hence the `alt-*` tokens. The `cta-form` block lives on alt, so inputs there need `alt-surface` and `alt-line-strong`.
3. **Error and success colours are missing** from all directions. I propose `danger` `#B3261E` for Sindoor (6.08:1 on bg, 6.54 on surface) and Gurans (5.94 / 6.54) and `#FF8A80` for Himal (8.07 / 6.96); `success` `#1E6B3A` on light brands (6.52 / 6.03). Sharwan to confirm or replace.
4. **Hero frame is structure, not colour** (arch + sun, glow circle + chips, tall frame + offset block). It is a per-brand option, not a token (section 10).
4a. **Error and success inside alt.** Computed: Himal `#FF8A80` on its light alt `#F3F6FB` is 2.11:1, so `alt-danger` is needed. Proposals: Himal alt (light) `alt-danger #B3261E` (6.03:1), `alt-success #1E6B3A` (6.02:1); dark alts (Sindoor `#1B1A2E`, Gurans `#0F3D2E`, `_test` `#0B2B2B`) `alt-danger #FF8A80` (7.46, 5.33, 6.60 on alt; 5.02 on `_test` alt-surface) and `alt-success #7FD99A` (9.96, 7.12, 8.82; 6.71 on `_test` alt-surface). Sharwan to confirm.
5. Body line height for Devanagari: Sharwan's sample uses 1.8, Mahendra asked for about 1.6-1.75. I use **1.75**. Sharwan to confirm.

## 5. File layout

```
src/
├─ styles/
│  ├─ globals.css         the only stylesheet imported by the root layout (order matters, see below)
│  ├─ tokens-base.css     @theme: declares every token NAME and Tailwind namespace; no brand values
│  └─ base.css            element defaults, :focus-visible, :lang(ne), reduced motion, tone scopes
└─ brands/
   ├─ admmis-tech/        default brand (the approved direction after Gate 1)
   │  ├─ tokens.css       layer 1 (optional) + layer 2 assignments + layer 3 overrides
   │  ├─ fonts.ts         next/font loaders: { latin, devanagari }
   │  ├─ brand.ts         name, logo and required `logoOnDark` (for alt sections and dark footers), themeColor, heroFrame, locales, default SEO (Neha/Mahendra consume)
   │  └─ README.md        what changed from the default and who approved it
   ├─ _test/              second theme used by CI (section 9); never deployed
   └─ <client>/           one folder per rental client (section 10)
```

`globals.css` import order (cascade does the theming, so order is the mechanism):

```css
@import "tailwindcss";
@import "./tokens-base.css";   /* @theme: names, namespaces, defaults for optional tokens */
@import "@brand/tokens.css";   /* :root { --color-bg: …; } overrides, same custom-property names */
@import "./base.css";          /* uses only tokens */
```

`@brand/tokens.css` is a **stable alias** resolved at build time by Hritik's `scripts/select-brand.mjs` from env `BRAND` (default `admmis-tech`; Hritik generates it as a CSS file); the same applies to `@brand/fonts` and `@brand/brand`. I write against the alias only. Consequence agreed with Hritik: **one Docker image per brand**; switching brand at runtime is not possible and not needed (standards §5, architecture).

## 6. Tailwind mapping (v4, CSS-first, no `tailwind.config.js`)

`tokens-base.css` (sketch; names are final, syntax checked at scaffold):

```css
@theme {
  --color-*: initial;               /* remove Tailwind's default palette: bg-red-500 cannot exist */
  --color-bg: #ff00ff;              /* magenta placeholder: real values come from the brand file */
  --color-surface: …;
  /* … every name from §3.1 … */
  --radius-card: …;
  --shadow-card: …;
  --text-body: 1rem;  --text-body--line-height: var(--leading-body);
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
}
```

How the values reach the utilities:
- A `@theme` variable becomes a real CSS custom property on `:root` and a utility (`bg-surface` emits `background-color: var(--color-surface)`). The brand file, imported later, re-declares the same `--color-surface` on `:root`; the cascade picks the brand value. No JS, no per-brand CSS bundle: the build contains only the selected brand.
- Names in `@theme` get a deliberately **ugly placeholder default** (magenta for colours) so a token the brand forgot shows up as an obvious failure, and the completeness check (section 11) fails the build before it ships.
- **Verify at scaffold:** whether `@theme static` is needed so unused theme variables are still emitted to `:root` (tokens that no utility uses yet must still be present for components that read them with `var()`).
- **Verify at scaffold (Hritik b):** whether `@theme inline` is required in two places. (1) Font variables: `next/font` creates `--font-heading-latin` on `<html>`; a theme entry `--font-heading: var(--font-heading-latin), …` probably needs `inline` so the utility resolves where the variable exists. (2) Derived tokens (`primary-hover`, tone scopes): a `color-mix()` that references `var(--color-primary)` is resolved where it is declared, so a **scoped** override of `--color-primary` (the alt tone below) must also re-declare the derived tokens. I wrote the tone scope that way; if `inline` is needed it simplifies.
- Keep Tailwind's spacing, breakpoint and `font-size` defaults except where the catalogue names a token.

### Tone scopes (`data-tone`)

`Section` accepts `tone="default" | "surface" | "alt"`. For `alt`, `base.css` remaps the semantic tokens for everything inside, so child components need no props:

```css
[data-tone="alt"] {
  --color-bg: var(--color-alt);              --color-fg: var(--color-on-alt);
  --color-muted: var(--color-alt-muted);     --color-surface: var(--color-alt-surface);
  --color-line-strong: var(--color-alt-line-strong);
  --color-primary: var(--color-alt-primary); --color-on-primary: var(--color-alt-on-primary);
  --color-focus: var(--color-alt-focus);
  --color-danger: var(--color-alt-danger);   --color-success: var(--color-alt-success);
  /* re-declare derived tokens here (hover, active, scrim) */
}
```

This is why the `cta-form` and a dark footer work in every brand without a second set of components.

## 7. Example values (illustrative; final values: Sharwan, after Gate 1)

Light = Sindoor Studio, Dark = Himal Night, Serif = Gurans (hex from the direction pages; "TODO" = not specified in the direction, see section 4).

| Token | Sindoor Studio | Himal Night | Gurans | `_test` brand |
|---|---|---|---|---|
| bg | `#FBF6EF` | `#0B1424` | `#F6F4EC` | `#FFFFFF` |
| surface | `#FFFFFF` | `#14223B` | `#FFFFFF` | `#F2F7F7` |
| fg | `#1B1A2E` | `#EAF0FA` | `#14221C` | `#0B2B2B` |
| muted | `#585568` | `#A5B3CC` | `#4F5E56` | `#42605F` |
| primary / on-primary | `#B8321C` / `#FFFFFF` | `#2DD4BF` / `#06201C` | `#0F3D2E` / `#FFFFFF` | `#006D77` / `#FFFFFF` |
| accent / on-accent | `#F2B01E` / TODO | `#F5C451` / TODO | `#C21E56` / TODO | `#E29578` / `#0B2B2B` |
| line | `#E3D9CB` | `#2A3B5C` | `#D9DFD3` | `#CFE0E0` |
| line-strong | TODO (muted) | TODO | TODO | `#6B8C8B` |
| alt / on-alt | `#1B1A2E` / `#FBF6EF` | `#F3F6FB` / `#0B1424` | `#0F3D2E` / `#F6F4EC` | `#0B2B2B` / `#FFFFFF` |
| focus | `#1B1A2E` | `#F5C451` | `#C21E56` | `#0B2B2B` |
| radius-button / card | 12 px / 18 px | 999 px / 20 px | 6 px / 4 px | 8 px / 12 px |
| radius-field | TODO (12 px) | TODO (12 px) | TODO (6 px) | 8 px |
| shadow-card | `6px 6px 0 var(--color-fg)` | TODO | none (hairline `border-line`) | `0 1px 2px` soft |
| heading / body font | Poppins / Hind | Mukta / Mukta | Noto Serif / Noto Sans (+ Devanagari) | system stack |
| color-scheme | light | **dark** | light | light |
| hero frame (brand.ts) | `arch` | `glow-circle` | `offset-frame` | `plain` |

`_test` brand ratios (computed 2026-11-06, WCAG relative luminance): fg/bg 15.06, muted/bg 6.84, muted/surface 6.33, on-primary/primary 6.08, primary/bg 6.08, primary/surface 5.62, on-accent/accent 6.31, line-strong/bg 3.65, line-strong/surface 3.38, focus/bg 15.06, on-alt/alt 15.06, danger `#B3261E`/bg 6.54, success `#1E6B3A`/bg 6.52, alt-primary `#E29578`/alt 6.31 with on-alt-primary `#0B2B2B` 6.31, alt-muted `#B9D0CF`/alt 9.31, alt-line-strong `#7FA8A7`/alt-surface 4.40, alt-danger `#FF8A80`/alt 6.60 and /alt-surface 5.02, alt-success `#7FD99A`/alt 8.82 and /alt-surface 6.71.

This table is the **proof of multi-brand**: four different value sets (light warm, dark, serif editorial, teal) fill the same names; no component changes. The `_test` brand is also what Rajaros and CI render to catch hard-coded colours: a component that still shows Sindoor colours under `BRAND=_test` fails visual review.

## 8. Typography, Devanagari and fonts

### 8.1 Per-locale font loading (answer to Mahendra, request 4)

`src/brands/<brand>/fonts.ts` exports two arrays; loaders are declared at **module scope** (a `next/font` requirement, and Hritik's i18n nit):

```ts
// shape only; real families come from the chosen direction
const headingLatin = Poppins({ subsets: ['latin'], weight: ['600', '700'], display: 'swap', variable: '--font-heading-latin' })
const bodyLatin    = Hind({ subsets: ['latin'], weight: ['400', '600'], display: 'swap', variable: '--font-body-latin' })
const headingDeva  = Poppins({ subsets: ['devanagari'], weight: ['600', '700'], display: 'swap', preload: false, variable: '--font-heading-deva' })
const bodyDeva     = Hind({ subsets: ['devanagari'], weight: ['400', '600'], display: 'swap', preload: false, variable: '--font-body-deva' })
export const fonts = { latin: [headingLatin, bodyLatin], devanagari: [headingDeva, bodyDeva] }
```

- The locale layout (Mahendra) puts `fonts.latin` variables on `<html>` for **every** locale and `fonts.devanagari` variables **only when `locale === 'ne'`**. EN pages therefore request no Devanagari file. The Devanagari loaders also set `preload: false`, so no layout can emit a `<link rel=preload>` for them on EN pages (Hritik); NE pages still load the files when Devanagari glyphs are rendered. The network test stays as proof. Test: network panel at scaffold (i18n.md §11 item 4).
- The stack in the theme must give every variable a fallback, because an undefined `var()` without one makes the whole declaration invalid:
  `--font-body: var(--font-body-latin, system-ui), var(--font-body-deva, "Noto Sans Devanagari"), "Nirmala UI", Mangal, system-ui, sans-serif;`
  On EN pages `--font-body-deva` is undefined, so the browser uses the named local Devanagari fonts only if it ever needs a Devanagari glyph (no download).
- Self-hosted through `next/font` (downloaded at build, served from our origin): needs network access in the build environment (**Raj to confirm for CI/Docker**). `display: swap`, subset, `adjustFontFallback` where supported.
- Weight discipline: Himal 2 files, Sindoor 4, Gurans about 4 families. File count is part of the direction choice (Sharwan's table) and counts against the 150 KB / LCP budget.

### 8.2 `:lang(ne)` rules (`base.css`)

```css
:lang(ne) {
  --leading-display: var(--leading-display-ne);   --leading-h2: var(--leading-h2-ne);
  --leading-h3: var(--leading-h3-ne);             --leading-body: var(--leading-body-ne);
  --leading-small: var(--leading-small-ne);
  --tracking-heading: normal;                      /* tracking breaks conjuncts */
  --eyebrow-transform: none;                       /* no case in Devanagari */
  letter-spacing: normal;
  font-synthesis: none;                            /* no faux bold or italic */
}
```

Defaults for the `-ne` tokens live in `tokens-base.css` so a brand need not set them: display and H2 1.35, H3 1.4, body and small **1.75**. Headings are at least 1.3 (Mahendra), body inside 1.6-1.75. A brand may raise them, not lower them (completeness check). Components set text with these tokens only, so a Nepali page needs no extra component CSS.

### 8.3 Layout safety for long words
Text containers use `overflow-wrap: anywhere` in cards, tables and buttons, never fixed widths or `white-space: nowrap` on translatable text; buttons grow in height, not clip. The usage page shows every component with a long Nepali compound word at 360 px (checked by Rajaros).

## 9. Dark mode decision

**Decision (approved by Hritik, 2026-11-06): no user-toggled dark mode at launch.**

| Option | Verdict | Reason |
|---|---|---|
| User toggle / follow `prefers-color-scheme` | **No** | Doubles contrast checks for every brand, needs a pre-hydration script to avoid a flash (JS and LCP cost), and none of the three directions was designed for two schemes |
| Brand is natively dark (Himal Night) | **Yes, supported** | It is just another value set. The brand file sets `color-scheme: dark`, so form controls, scrollbars and autofill match |
| Add a scheme toggle later | Possible without component changes | Tokens are semantic: add `[data-theme="dark"]` re-assignments to a brand file and a toggle. Revisit when a client asks (not before) |

Each brand file sets `color-scheme` (`light` or `dark`) on `:root`, and `brand.ts` exports `themeColor` for the `<meta name="theme-color">`.

## 10. Brand boundaries and rental-client procedure

### 10.1 What a brand may change

| Change | Where | Cost |
|---|---|---|
| Colours, radii, shadows, border widths, type scale values, motion speed | `tokens.css` | tokens only |
| Fonts | `fonts.ts` + stack in `tokens.css` | tokens only; **approved list only** (below) |
| Logo, name, theme colour, default locales, hero frame style, default SEO | `brand.ts` and `public/brands/<brand>/` | config only |
| Hero frame | `heroFrame: 'arch' \| 'glow-circle' \| 'offset-frame' \| 'plain'` (the four frames exist in the `hero` component; they read only tokens) | config only |
| Copy, images, prices, pages, nav and footer content | CMS (client's own database, standards §5) | content only |
| A new hero frame, a new component, different layout or breakpoints | code in the repo | **not** a brand change: goes through Hritik, may trigger the fork question in standards §5 (open point, Gate 3) |

### 10.2 Onboarding a rental client (checklist for the runbook)
1. Copy `src/brands/_test/` to `src/brands/<client>/`.
2. Fill the required tokens of section 3 (colours from the client's logo; Sharwan or the client picks).
3. Pick fonts from the **approved list**.
4. Add the logo SVG and set `brand.ts`.
5. Run the brand check: `BRAND=<client> pnpm check:brand` (completeness plus contrast, section 11). Fix until it passes.
6. Build the image with `BRAND=<client>` (one image per brand), deploy with that client's database.
7. Review the usage page under the new brand at 360 px, in EN and a Nepali sample.

**ASSUMPTION (v0.1, from PM, 2026-11-06):** rental clients choose fonts from a short curated list of free Google Fonts that include Devanagari (the three approved pairs plus up to about 3 more), with no custom uploads. Reason: each extra family costs bytes and Devanagari coverage (Hritik: approved pairs only at first). **TODO(roshan)** confirm; it is part of the rental scope (Q16). Sharwan informed by inbox.

## 11. Guardrails

### 11.1 Hex/px rule (description only, Hritik c)
In `src/components/**`, forbid colour literals (`#fff`, `rgb()`, `hsl()`, named colours), Tailwind arbitrary values for colour or size (`bg-[#…]`, `text-[13px]`, `w-[37px]`), and Tailwind default palette classes (`bg-red-500`; already impossible because `--color-*: initial`). Allowed: the semantic utilities, the numeric spacing scale, and `var(--token)` references. Layers 1 and 2 files are exempt (they are where values live). Hritik chooses the enforcement tool at scaffold. Exceptions need a comment `// token-exception: <reason>` and reviewer sign-off.

### 11.2 Completeness check
A script reads `@brand/tokens.css` and fails when a required token (section 3) is absent from the brand file (detection is by absence, not by comparing with a value), is set to the placeholder magenta, or a `-ne` leading is lower than the minimums in 8.2.

### 11.3 Contrast check (spec for Hritik's `ci-spec`, Hritik f)
`scripts/check-brand-contrast.mjs` (name proposed) reads the resolved tokens of the selected brand and fails the build below the minimum. Pair list:

| # | Foreground | Background | Min |
|---|---|---|---|
| 1-4 | fg, muted | bg, surface | 4.5 |
| 5 | primary (links, outline buttons) | bg, surface | 4.5 |
| 6 | on-primary | primary, primary-hover, primary-active | 4.5 |
| 7 | on-accent | accent | 4.5 |
| 8 | line-strong | bg, surface | 3 |
| 9 | focus | bg, surface, primary | 3 |
| 10 | danger, success | bg, surface | 4.5 |
| 11 | on-alt, alt-muted | alt, alt-surface | 4.5 |
| 12 | alt-primary | alt | 4.5 |
| 13 | alt-on-primary | alt-primary | 4.5 |
| 14 | alt-line-strong | alt-surface, alt | 3 |
| 15 | alt-focus | alt | 3 |
| 16 | alt-danger, alt-success | alt, alt-surface | 4.5 |

Accent is never tested as text because it is never text (rule). The check mixes `color-mix(in srgb …)` itself (about 15 lines). A second job runs the same list against `_test` so the script itself is tested. Axe-based page checks stay with Rajaros.

### 11.4 Visual check
Playwright screenshots of the usage page under `BRAND=_test` (Rajaros) catch any component that ignores tokens: it would keep the default brand's look.

## 12. Requests and open questions

| # | To | Item | By |
|---|---|---|---|
| 1 | sharwan | Findings in section 4: add `line-strong`, `alt-*` set, `danger`, `success`, `on-accent`, `radius-field`, shadows for Himal; confirm Devanagari body leading 1.75 | after Gate 1 |
| 2 | sharwan | Which of the three hero frames survive the chosen direction; frame styles must read only tokens | after Gate 1 |
| 3 | mahendra | Confirm `fonts.ts` contract (8.1) and that the locale layout adds Devanagari variables for `ne` only | Fri 20 Nov |
| 4 | hritik | `@brand/*` alias via `select-brand.mjs`; contrast and completeness scripts (11.2-11.3); enforcement for 11.1; `@theme inline` points (section 6) | scaffold, T-103 |
| 5 | raj | `next/font` needs network at build; one image per brand | week 2 |
| 6 | rajaros | `_test` brand renders and the 360 px / long-Nepali-word checks | week 3 |
| 7 | roshan (via pm) | Rental-client font list is curated (10.2) | Q16 |

## Changelog
- v0.1.1 (2026-11-06, Hritik must-fixes): weight tokens renamed out of the Tailwind font namespace (`--weight-*`); Devanagari loaders `preload: false`; `alt-danger` and `alt-success` added with contrast pair 16. Nits applied: generated alias file, `@theme static` verify, detection by absence, `logoOnDark`, outline focus ring. Rest in v0.2 (Fri 20 Nov).
- v0.1 (2026-11-06): first draft. Applies Hritik's review: `@brand/tokens.css` alias, `@theme inline` marked verify, lint rule described not tooled, icons server-rendered, approved font pairs only, `color-scheme` per brand.
