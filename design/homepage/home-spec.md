# Homepage design spec: ADMMIS.TECH (T-603)

Owner: sharwan · Version v1.0 · 2026-11-07 · Direction: Gate 1 pick, **Sindoor Studio layout in ADMMIS colours** (navy, orange, amber, green).
Visual mock: `design/homepage/home.html` (desktop 1280 and 360 px, same file; `home-preview.html` shows both side by side). Copy: `content/pages/home.md` (writer, status review). Logo: `design/logo/` (final files, see its README).
Builders: satish (tokens, components), mahendra (template). Every value below is final unless marked ASSUMPTION.

## 0. Decisions in one table

| Topic | Decision | Why |
|---|---|---|
| Section tones | Navy (`alt`): hero, On rent, Opening event, footer. Light (`bg`/`surface`): everything else. Orange band for the final CTA | Navy is the ADMMIS signboard colour; light body keeps text pages fast and readable on cheap phones |
| Orange `#F48221` | **Fill only**: primary button, CTA band, date tile, thin rules. **Never text on light** (2.47:1 on bg, 2.60:1 on white; fails even for large text). Orange text is allowed only on navy (6.16:1) | Computed, not guessed |
| Text on orange | Navy `#0A1F4A` (6.16:1). White on orange is 2.60:1 and is **forbidden** | |
| Amber `#F5AE44` | Decoration, badges with navy text (8.43:1), eyebrow text on navy, focus ring on navy. Never text on light (1.81:1) | |
| Green `#31907A` | Graphics and borders only (3.69:1 on bg). Text green is the darker `--success` `#1F6B58` (6.03:1) | |
| Links | Navy, bold, underlined (2 px). Colour is never the only cue | WCAG 1.4.1 |
| Primary button | Orange fill, navy label, 2 px navy border, hard offset shadow `4px 4px 0` (navy on light, amber on navy). This is the Sindoor "studio" signature | Offset shadow gives the orange fill a 15:1 edge on light backgrounds |
| One primary CTA per screen | Hero: "Get a quote" is primary, "See our services" is secondary (outline). Every other section has at most one primary button | |
| Header | White, not transparent, sticky, 1 px `--line` bottom border | One logo variant (light lockup) needed in the header; navy hero starts under it |
| Hero image | The AI model from Roshan, inside a peach arch (`#FFE3C4`) with an orange offset arch, amber sun and amber base bar. Photo is blended with `mix-blend-mode: multiply` so its white background disappears. A transparent cut-out is still preferred (see 3.2) | Files arrived 2026-11-06 (`design/inputs/female sari.jpeg`); no silhouette placeholder needed |

## 1. Tokens (final values)

Names are the existing Sindoor names (satish maps them to `--color-*`, see `docs/frontend/design-tokens.md` section 3). New tokens are marked **new**.

### 1.1 Page colours (default tone)

| Token | Value | Role |
|---|---|---|
| `--bg` | `#F7F9FD` | Page background (cool tint of the ADMMIS light blue-grey) |
| `--surface` | `#FFFFFF` | Cards, inputs, header, "surface" sections |
| `--ink` | `#0A1F4A` | Text, headings, borders, offset shadow. ADMMIS navy |
| `--muted` | `#445372` | Secondary text. ADMMIS slate |
| `--primary` | `#F48221` | Primary button fill, CTA band, date tile. ADMMIS orange. Fill only |
| `--onp` | `#0A1F4A` | Text on `--primary` |
| `--primary-hover` | `#FF9A3D` | Button hover fill (navy label still 7.6:1, see table) |
| `--primary-active` | `#D96F12` | Button pressed fill; button also moves `4px 4px` and loses its shadow |
| `--accent` | `#F5AE44` | Decoration, badges, sun, base bar. ADMMIS amber. Never text on light |
| `--on-accent` | `#0A1F4A` | Text on amber |
| `--line` | `#D7DEF0` | Hairlines, card borders, dividers. Decoration only; never an input edge. ADMMIS light blue-grey |
| `--line-strong` (**new**) | `#6B7A99` | Input, select, checkbox borders (4.09:1 on bg, 4.31:1 on surface) |
| `--green` (**new**) | `#31907A` | Icons, rules, case-card cover. Never text. ADMMIS green |
| `--focus` | `#2F6BEA` | Focus ring on bg and surface (4.52:1 / 4.76:1) and also on navy (3.37:1) |
| `--r` / `--r2` | `12px` / `18px` | Buttons, inputs, chips (`--r`); cards and panels (`--r2`). Pill (`999px`) only for chips and the hero arch |
| `--shadow-hard` (**new**, layer 3) | `4px 4px 0 var(--ink)` | Primary button, pricing box, dropdown. On navy it becomes `4px 4px 0 var(--accent)` |

### 1.2 Status colours (answers satish's findings 3 and 4a; replaces his proposals)

| Token | Value | Use |
|---|---|---|
| `--danger` | `#B3261E` | Error text and border on bg/surface (6.20 / 6.54:1). Same value as satish proposed |
| `--success` | `#1F6B58` | Success text and icon (6.03 / 6.36:1). Brand-green family, replaces satish's `#1E6B3A` |
| `--warning` | `#8A4B00` | Warning text on bg/surface (6.45 / 6.80:1). Pair with an amber badge or icon; never colour alone |
| `--alt-danger` | `#FF8A80` | Error text on navy (7.03:1) and on alt card (5.53:1) |
| `--alt-success` | `#7FD99A` | Success on navy (9.40) and alt card (7.38) |
| `--alt-warning` | `#F5AE44` | Warning on navy (8.43) |

Every status message needs an icon and words, not colour alone.

### 1.3 Alt (navy) section set (answers satish findings 2 and "Sindoor focus equals alt")

| Token | Value | Role |
|---|---|---|
| `--alt` | `#0A1F4A` | Section background (same navy as `--ink`; footer too) |
| `--onalt` | `#FFFFFF` | Text and headings (16.06:1) |
| `--alt-muted` | `#D7DEF0` | Secondary text (11.93 on alt, 9.37 on alt card) |
| `--alt-surface` | `#14306B` | Cards and inputs inside alt |
| `--alt-line-strong` | `#8C9CC4` | Input borders inside alt (5.86 on alt, 4.61 on alt card) |
| `--alt-primary` | `#F48221` | Button fill inside alt (6.16:1 against navy) |
| `--alt-onp` | `#0A1F4A` | Text on `--alt-primary` |
| `--alt-focus` | `#F5AE44` | Focus ring inside alt (8.43 on alt, 6.62 on alt card). `--focus` also passes there (3.37), so it is a stronger option, not a requirement |
| eyebrow, accents on navy | `--accent` `#F5AE44` | 8.43:1 |

### 1.4 CTA band (the orange final section)

Background `--primary`, text `--ink` (6.16:1), primary action is a **navy button** (`--ink` fill, white label 16:1, offset shadow `--accent`), secondary is an outline button (navy border and label). Focus ring inside the band is `--ink` (6.16:1 against orange). Token names: reuse `--ink` and `--primary`; no new tokens. Implemented as a `Section tone="band"` in satish's `Section`.

### 1.5 Computed contrast (script run 2026-11-07, WCAG 2.2 relative luminance; text needs 4.5:1, UI parts 3:1)

| Pair | Foreground | Background | Ratio | Need | Result |
|---|---|---|---|---|---|
| Body text on page | `--ink` #0A1F4A | `--bg` #F7F9FD | 15.23:1 | 4.5:1 | pass |
| Body text on card/surface | `--ink` #0A1F4A | `--surface` #FFFFFF | 16.06:1 | 4.5:1 | pass |
| Secondary text on page | `--muted` #445372 | `--bg` #F7F9FD | 7.31:1 | 4.5:1 | pass |
| Secondary text on surface | `--muted` #445372 | `--surface` #FFFFFF | 7.70:1 | 4.5:1 | pass |
| Secondary text on line-tint chip | `--muted` #445372 | `--line` #D7DEF0 | 5.72:1 | 4.5:1 | pass |
| Primary button label | `--onp` #0A1F4A | `--primary` #F48221 | 6.16:1 | 4.5:1 | pass |
| Primary button label, hover | `--onp` #0A1F4A | `--primary-hover` #FF9A3D | 7.60:1 | 4.5:1 | pass |
| Primary button label, pressed | `--onp` #0A1F4A | `--primary-active` #D96F12 | 4.77:1 | 4.5:1 | pass |
| Badge / amber chip label | `--on-accent` #0A1F4A | `--accent` #F5AE44 | 8.43:1 | 4.5:1 | pass |
| Link text (navy, underlined) on page | `--ink` #0A1F4A | `--bg` #F7F9FD | 15.23:1 | 4.5:1 | pass |
| Error text on page | `--danger` #B3261E | `--bg` #F7F9FD | 6.20:1 | 4.5:1 | pass |
| Error text on surface | `--danger` #B3261E | `--surface` #FFFFFF | 6.54:1 | 4.5:1 | pass |
| Success text on page | `--success` #1F6B58 | `--bg` #F7F9FD | 6.03:1 | 4.5:1 | pass |
| Success text on surface | `--success` #1F6B58 | `--surface` #FFFFFF | 6.36:1 | 4.5:1 | pass |
| Warning text on page | `--warning` #8A4B00 | `--bg` #F7F9FD | 6.45:1 | 4.5:1 | pass |
| Warning text on surface | `--warning` #8A4B00 | `--surface` #FFFFFF | 6.80:1 | 4.5:1 | pass |
| Input / control border on page | `--line-strong` #6B7A99 | `--bg` #F7F9FD | 4.09:1 | 3:1 | pass |
| Input / control border on surface | `--line-strong` #6B7A99 | `--surface` #FFFFFF | 4.31:1 | 3:1 | pass |
| Focus ring on page | `--focus` #2F6BEA | `--bg` #F7F9FD | 4.52:1 | 3:1 | pass |
| Focus ring on surface | `--focus` #2F6BEA | `--surface` #FFFFFF | 4.76:1 | 3:1 | pass |
| Focus ring on alt (navy) | `--focus` #2F6BEA | `--alt` #0A1F4A | 3.37:1 | 3:1 | pass |
| Green icon / graphic on page | `--green` #31907A | `--bg` #F7F9FD | 3.69:1 | 3:1 | pass |
| Green graphic on alt | `--green` #31907A | `--alt` #0A1F4A | 4.13:1 | 3:1 | pass |
| Primary fill edge vs alt (button on navy) | `--primary` #F48221 | `--alt` #0A1F4A | 6.16:1 | 3:1 | pass |
| Navy shadow edge of primary button on page | `--ink` #0A1F4A | `--bg` #F7F9FD | 15.23:1 | 3:1 | pass |
| Text on alt | `--onalt` #FFFFFF | `--alt` #0A1F4A | 16.06:1 | 4.5:1 | pass |
| Secondary text on alt | `--alt-muted` #D7DEF0 | `--alt` #0A1F4A | 11.93:1 | 4.5:1 | pass |
| Text on alt card | `--onalt` #FFFFFF | `--alt-surface` #14306B | 12.61:1 | 4.5:1 | pass |
| Secondary text on alt card | `--alt-muted` #D7DEF0 | `--alt-surface` #14306B | 9.37:1 | 4.5:1 | pass |
| Eyebrow / accent text on alt | `--accent` #F5AE44 | `--alt` #0A1F4A | 8.43:1 | 4.5:1 | pass |
| Orange text (numbers, eyebrow) on alt | `--alt-primary` #F48221 | `--alt` #0A1F4A | 6.16:1 | 4.5:1 | pass |
| Alt primary button label | `--alt-onp` #0A1F4A | `--alt-primary` #F48221 | 6.16:1 | 4.5:1 | pass |
| Alt input border on alt card | `--alt-line-strong` #8C9CC4 | `--alt-surface` #14306B | 4.61:1 | 3:1 | pass |
| Alt input border on alt | `--alt-line-strong` #8C9CC4 | `--alt` #0A1F4A | 5.86:1 | 3:1 | pass |
| Alt focus ring on alt | `--alt-focus` #F5AE44 | `--alt` #0A1F4A | 8.43:1 | 3:1 | pass |
| Alt focus ring on alt card | `--alt-focus` #F5AE44 | `--alt-surface` #14306B | 6.62:1 | 3:1 | pass |
| Error text on alt | `--alt-danger` #FF8A80 | `--alt` #0A1F4A | 7.03:1 | 4.5:1 | pass |
| Error text on alt card | `--alt-danger` #FF8A80 | `--alt-surface` #14306B | 5.53:1 | 4.5:1 | pass |
| Success text on alt | `--alt-success` #7FD99A | `--alt` #0A1F4A | 9.40:1 | 4.5:1 | pass |
| Success text on alt card | `--alt-success` #7FD99A | `--alt-surface` #14306B | 7.38:1 | 4.5:1 | pass |
| Warning text on alt | `--alt-warning` #F5AE44 | `--alt` #0A1F4A | 8.43:1 | 4.5:1 | pass |
| CTA band text | `--ink` #0A1F4A | `--primary (band bg)` #F48221 | 6.16:1 | 4.5:1 | pass |
| CTA band dark button label | `white` #FFFFFF | `--ink (button)` #0A1F4A | 16.06:1 | 4.5:1 | pass |
| CTA band dark button vs band | `--ink` #0A1F4A | `--primary (band bg)` #F48221 | 6.16:1 | 3:1 | pass |
| CTA band focus ring (navy) | `--ink` #0A1F4A | `--primary (band bg)` #F48221 | 6.16:1 | 3:1 | pass |
| Footer link text on alt | `--onalt` #FFFFFF | `--alt` #0A1F4A | 16.06:1 | 4.5:1 | pass |

Known non-passes, by design: orange text on light (2.47:1), amber text on light (1.81:1), white on orange (2.60:1), `--line` on bg (1.28:1, decoration only). None is used for text or controls.

## 2. Typography

Fonts (max 4 files; this uses 3 and keeps 1 in reserve):

| File | Use | Loads |
|---|---|---|
| Montserrat variable, `latin` subset, wght axis 400 to 700 | All Latin text: headings, body, UI | Preload, `font-display: swap` |
| Mukta 400, `devanagari` subset | Nepali body | Only when `:lang(ne)`; not loaded on EN pages |
| Mukta 700, `devanagari` subset | Nepali headings, buttons | Same |

Stack for both heading and body: `Montserrat, Mukta, system-ui, ... , sans-serif`. Latin glyphs come from Montserrat; Devanagari glyphs fall through to Mukta, so mixed text works in either language. Self-host through `next/font` (no Google request at runtime). Weights used: 400 body, 600 nav/chips, 700 headings/buttons/labels. Montserrat is wide: do not use 800.

| Style | 360 px (below 768) | 768 px | 1024 px and up | Weight | Notes |
|---|---|---|---|---|---|
| Display (H1) | 36 / 1.12 | 44 / 1.10 | 56 / 1.08 | 700 | tracking -0.01em; one per page |
| H2 | 28 / 1.20 | 32 / 1.20 | 40 / 1.15 | 700 | tracking -0.01em |
| H3 | 20 / 1.30 | 22 / 1.30 | 22 / 1.30 | 700 | case-card and mobile list titles 17 to 18 |
| Lead | 17 / 1.55 | 19 / 1.55 | 19 / 1.55 | 400 | hero sub, section intros |
| Body | 16 / 1.65 | 16 / 1.65 | 16 / 1.65 | 400 | never below 16 |
| Card text | 15 / 1.55 | 15 / 1.55 | 15 / 1.55 | 400 | cards only |
| Small | 14 / 1.5 | 14 / 1.5 | 14 / 1.5 | 400 | footer legal, notes |
| Eyebrow | 13 / 1.3, uppercase, +0.08em | same | same | 700 | uppercase and tracking only for Latin (`:lang(ne)`: no uppercase, no tracking) |
| Button | 16 / 1 | 16 / 1 | 16 / 1 | 700 | min height 48 px (44 in header and sticky bar are met by 44 to 48) |
| Nav | 15 / 1 | | 15 / 1 | 600 | |

Devanagari (`:lang(ne)`, Mukta): sizes +1 px on body and card text (17 and 16), display and H2 sizes unchanged. Line heights: body and small **1.75** (confirmed, answers satish; my brand sample used 1.8, 1.75 is fine), H3 1.4, H2 and display 1.35. No uppercase, no letter-spacing, no italic. Allow 30% longer strings (limits in section 3).

## 3. Layout

Grid: container `72rem` (1152 px) max, side gutter 16 px (360) / 24 px (768) / 32 px (1280). Section vertical padding `clamp(3rem, 8vw, 6rem)` (48 px at 360, 96 px from 1200). Gap between cards 16 px (360 to 1023), 24 px (1024 up). Spacing scale 4 px steps (4, 8, 12, 16, 20, 24, 32, 48, 64). Breakpoints 640 / 768 / 1024 / 1280 (Tailwind defaults). Touch targets at least 44 px (all buttons 48, nav 44, sticky bar 48).

Section order, tone and block mapping (satish `components/blocks/`):

| # | Section | Tone | Block / component | Copy key (`content/pages/home.md`) |
|---|---|---|---|---|
| 0 | Header | surface | `Header` `NavMenu` `MobileNav` `Logo` | header |
| 1 | Hero | alt | `hero` variant `model` | hero |
| 2 | Services | bg | `services-grid` | services |
| 3 | On rent | alt | `feature-list` (3 items) with a `Button` | rent |
| 4 | Why us | bg | `feature-list` (4 items) | whyUs |
| 5 | Process | surface | `process-steps` | process |
| 6 | Our work | bg | `case-cards` (`ScrollRow` below 1024) | work |
| 7 | Pricing teaser | surface | `PriceTeaser` (satish may build from `rental-plans`) | pricingTeaser |
| 8 | Opening event | alt | `banner`/event teaser (own small layout, 1 use) | event |
| 9 | FAQ | bg | `faq` (`Accordion`) | faq |
| 10 | Final CTA | band (orange) | `cta-form` without form slot | finalCta |
| 11 | Footer | alt | `Footer` | footer |
| 12 | Sticky bar (mobile) | surface | `StickyActionBar` | stickyBar |

Tone rhythm: alt, bg, alt, bg, surface, bg, surface, alt, bg, band, alt. No two navy sections touch except band then footer (orange between).

### 3.0 Common section header (`SectionHeader`)
Eyebrow (13 px, `--muted`, on navy `--accent`) + H2 + optional intro (Lead, `--muted`; on navy `--alt-muted`). Max width 52rem, left aligned, margin below 32 px (48 px from 1024). Eyebrow text is never the only heading.

### 3.1 Header
| | 360 px | 1280 px |
|---|---|---|
| Height | 64 px | 72 px |
| Content | Logo lockup (height 28 px, link, `aria-label="ADMMIS.TECH home"`), burger button 48 x 48 (right) | Logo lockup 34 px; nav right-aligned; "Get a quote" primary button 44 px tall at the end |
| Nav items (5 + CTA, max 6 per sitemap) | In `MobileNav` | Services (dropdown, 9 links) · On rent · Pricing · Our work · About (dropdown: About us, Careers, Blog, FAQ) · Get a quote |
| Label limit | 14 characters per nav item, 16 for CTA | same |
| Behaviour | Sticky, white, border-bottom 1 px `--line` | same |
Notes: nav text 15/600; hover: 3 px orange underline grows from the left (transform only); current page: underline stays and `aria-current="page"`. Dropdown panel: white, 2 px navy border, `--r2`, hard shadow, min width 300 px (220 for About), items 44 px tall, opens on click/Enter (button with `aria-expanded`), also on hover for pointers; Esc closes. Burger visible below 1024 px.

States: **NavMenu** closed / open / item hover / item focus / current. **MobileNav**: full panel from below the header to the bottom (`inset: header 0 0 0`), white, scrolls inside, body scroll locked; rows 52 px, 18/700, 1 px `--line` between; Services and About are `details` rows with chevron (rotates 180 deg), children 16/600 with 16 px indent; "Get a quote" full-width button at the end (24 px above). Burger icon swaps to close icon; `aria-expanded`, `aria-controls`, `aria-label` swaps; focus trap, Esc closes and returns focus to the burger. Panel animation: opacity 0 to 1 and translateY(-8px) to 0, 200 ms.

### 3.2 Hero (alt tone)
| | 360 px | 1280 px |
|---|---|---|
| Layout | One column: text, then image stage | Two columns 1.1fr / 0.9fr, gap 48 px, text vertically centred, image aligned to the bottom edge of the hero |
| Padding | top 32, bottom 0 (image sits on the section bottom) | top 64, bottom 0 (text gets 64 bottom) |
| Eyebrow | 13 px, amber, uppercase | same |
| H1 | 36/1.12, max **8 words**, about 40 characters (3 lines max) | 56/1.08, 2 to 3 lines |
| Sub (Lead) | 17 px, `--alt-muted`, max 25 words / 150 characters, max width 34rem | 19 px |
| CTAs | Stacked full width, 16 px gap: primary then secondary (48 px tall each) | Side by side, 16 px gap, each at least 200 px wide |
| Chips (optional, max 4) | Wrap, 32 px tall, `--alt-surface`, 1 px `--alt-line-strong`, 14/600. Text from the service names | same |
| Image stage | Width 100% (max 360), aspect 4:5 | Max width 460 px, aspect 4:5, right-aligned |

Stage construction (all CSS, no extra images): (1) orange arch (`--primary`) offset 14 px right and down, radius `999px 999px 0 0`; (2) amber sun circle (`--accent`), 30% of stage width, top right, partly outside the arch; (3) peach arch `#FFE3C4` with the model image, `object-fit: cover; object-position: 50% 0`; photo blended with `mix-blend-mode: multiply` so its white background becomes the peach; (4) amber base bar 10 px tall across the bottom. The model is cropped head to waist at every width. Mobile crop: `hero.image.mobile` = waist-up crop (see inventory request 2).
Image rules (performance): **LCP element**; `priority`, no lazy, no entrance animation; max 640 px wide, WebP, **at most 60 KB** (the provisional JPEG in `design/homepage/assets/` is 75 KB at 563 x 1000, for the mock only); explicit width and height (no layout shift); alt text from copy `hero.imageAlt`. Ask Roshan for a **transparent PNG cut-out** (already in the open request); with a cut-out, drop `mix-blend-mode`, keep the arch colour, and the model may break the arch top slightly. Fallback if the image is missing: the arch and sun shapes stay (CSS only), with the sari silhouette from `design/brand-directions/01-sindoor-studio.html` as an inline SVG.
The mock shows a "PROVISIONAL IMAGE" label on the stage: **remove in production**.
States: image loading (arch visible with peach background, no flash), buttons per section 4.

### 3.3 Services (bg)
Grid of 9 `services-grid` cards. 360 px: **one column, compact row card** (icon tile 48 px left, title and text right, padding 16, gap 16). 640 px: 2 columns, vertical card. 1024 px: 3 columns, gap 24, padding 24 (3 x 3, nothing orphaned). Card: `--surface`, 1 px `--line`, radius `--r2`; icon tile 48 x 48 navy with amber icon (26 px, decorative `aria-hidden`); title H3, text 15 px `--muted`. Whole card is a link (title link stretched over the card via `::after`); no "learn more" text on the card. Below the grid: centred text link "See all services" with arrow.
Limits: title 22 characters; text 16 words / 100 characters (writer's `services.cards[8]` is slightly over; 3 lines at 360 px is the layout limit); intro 25 words.
States: default; hover (card lifts 3 px, transform only); focus-within (3 px `--focus` outline offset 3 px on the card); active (no lift).

### 3.4 On rent (alt)
3 cards (`--alt-surface`, 1 px `--alt-line-strong`, padding 24). 360 px: one column, vertical cards, gap 16. 768 px up: 3 columns, gap 24. Icon tile amber with navy icon. Title H3 white, text `--alt-muted`. Below: one primary button "See plans on rent" centred (the section's single primary action). Limits: title 22 characters, text 18 words / 110 characters.
States: as 3.3 with `--alt-focus` ring. Whole card links to `/rent/website`, `/rent/ai-agent`, `/rent/team`.

### 3.5 Why us (bg)
4 `feature-list` items. 360 px: compact row cards like 3.3 (icon left). 640 px: 2 x 2. 1024 px: 4 columns. Card has a 6 px top rule in (in order) orange, amber, green, navy: decoration. Not links (no hover lift). Limits: title 28 characters (2 lines at 4 columns), text 20 words / 120 characters. Icons: check, code, pin, calendar.

### 3.6 Process (surface tone, white)
4 steps as a real `<ol>`, numbers by CSS counter in navy circles 48 px (white 20/700). 360 px: vertical list, number left, 2 px `--line-strong` connector line between circles. 1024 px: 4 columns, number above, horizontal connector line from each circle to the next. Title H3 (limit 18 characters), text 15 px `--muted` (18 words / 110 characters). No hover, no links.

### 3.7 Our work (bg)
4 `case-cards`. 360 px: horizontal `ScrollRow`, scroll-snap start, card width 82% of the screen (peek of the next card shows it scrolls), gutter-aligned (`scroll-padding-inline` = gutter). 640 px: card width 46%. 1024 px: 4-column grid, no scrolling. Card: cover 16:10 (CSS only: navy / green / orange / slate token colours, a 56 px outline icon, translucent circle) - no photos until Roshan supplies screenshots and permission; tag chip (12/700, `--line` fill, navy text); title H3 at 17 px (limit 45 characters, 2 to 3 lines); text 15 px (16 words / 100 characters); result line at the bottom, separated by a dashed rule (limit 40 characters; **only a verified number with its unit**, otherwise omit the line - the mock shows "Result: pending" as a TODO marker, remove it in production). Whole card is a link to `/work`. Below: text link "See our work". When a case has no cover the token-coloured cover stays.
States: hover lift 3 px; focus-within ring; scroll-snap row has no arrows (swipe; the row is keyboard-scrollable via `tabindex="0"` on the scroller only if cards are not links; they are, so no tabindex).

### 3.8 Pricing teaser (surface tone, white)
2 columns from 1024 px (text left, price box right, gap 64, vertically centred); one column below (text, then box). Left: eyebrow, H2, Lead text (35 words / 220 characters max), two buttons: primary "See pricing", secondary "Get a quote". Right: `Price` box on `--bg` with 2 px navy border, `--r2`, hard shadow: `SegmentedControl` NPR / USD (44 px tall; selected = navy fill, white text), then 3 price rows (product name left, price right, 1 px `--line` between, 14 px row padding). **No numbers in this design**: price cells are grey skeleton bars; the `Price` component fills them from the CMS only after Roshan approves the price list (open question). States: segmented control default / selected / focus / hover; `data-currency` toggles all prices on the page.

### 3.9 Opening event (alt)
360 px: stacked: date tile, eyebrow, H2, Lead, 3 fact rows (date, venue, time with 24 px amber icons), primary button "See event details". 1024 px: three columns: date tile (132 px wide) | text | decorative hexagon emblem (220 px, white outline, green lines, amber nodes; `aria-hidden`). Date tile: orange fill, navy text, "01" 56/700, "JAN" and "2027" 15/700, 2 px orange border, hard shadow amber `6px 6px 0`; `role="img"` with the full date as label. Venue and time are `TODO(roshan)`: the fact row is **omitted** until the event doc has them (never show "TBD" publicly). After 1 Jan 2027 the section switches to the "archive" state of `event-details` (CTA hidden, text "Thank you for joining us" - writer to supply).
Limits: title 6 words, text 20 words / 120 characters, each fact 40 characters.

### 3.10 FAQ (bg)
6 questions (`Accordion`, native `<details name>`: one open at a time, first open by default). Column max width 52rem, left aligned. Item: `--surface`, 1 px `--line`, radius `--r`, margin 12 px; summary min height 56 px, 16/700, chevron right (20 px, rotates 180 deg in 200 ms); open: 2 px navy border, answer 16 px `--muted`, padding 0 20 20 20. Limits: question 70 characters (2 lines at 360), answer 45 words / 280 characters. Pending answers (`TODO(roshan)`) must not ship: hide the question until its answer is confirmed.
States: closed / hover (summary background `--bg`) / focus (3 px ring on the summary) / open.

### 3.11 Final CTA band (orange)
360 px: stacked: H2 (max 8 words, 22ch wide), text (20 words), buttons stacked full width (52 px tall): navy "Get a quote", outline "Chat on WhatsApp" with WhatsApp icon. 1024 px: two columns (text left, buttons right, both 220 px+ wide, side by side). Section padding as all sections. This is the only primary action on its screen. The `cta-form` form slot is not used on home (the quote page has the form).

### 3.12 Footer (alt)
Content from `docs/company-info.md` only. Top: lockup (dark, 32 px high) + about line (20 words max) in the first column; columns Services (9 links), On rent (3), Company (6), Legal (3), Contact (`<dl>`: address, phone, email, main website; empty values omitted; phone and WhatsApp are `tel:` and click-to-chat links). 360 px: about spans both columns, then 2-column grid of link lists. 768 px up: 6 columns (`1.4fr 1fr 1fr 1fr 1fr 1.3fr`). Column titles 14/700 uppercase amber (not uppercase for Nepali). Links white 15 px, min height 36 px (the list rows touch, use 44 px on mobile), hover underline. Bottom row: 1 px `--alt-line-strong` rule, copyright left, small links or registration right. **Not shown until Roshan confirms**: PAN (12 digits on file, expected 9), registration line, phone, social links, language switcher (hidden until Nepali launches). Address shows "Janaki Chowk, Janakpurdham-3, Nepal" once confirmed for ADMMIS.TECH.

### 3.13 Sticky action bar (below 768 px only)
Fixed bottom, 3 equal-height buttons (48 px) with 8 px gap, white background, 1 px `--line` top border, soft upward shadow, safe-area padding. WhatsApp and Call: outline buttons (white, 2 px navy border, icon + label, 14/700). "Get a quote": primary orange, 1.5x wider. Body gets 72 px bottom padding so nothing is hidden. Hidden when the mobile menu is open and when a text field has focus (keyboard up), CSS-only where possible (`:has()` is not needed; mahendra decides). Labels max 10 characters. Links: WhatsApp `https://wa.me/<number>` (TODO(roshan): number), `tel:` (TODO(roshan)), `/contact`.

## 4. States for shared parts

| Part | Default | Hover | Focus-visible | Active | Disabled |
|---|---|---|---|---|---|
| Primary button | orange, navy label, 2 px navy border, shadow 4/4 | `--primary-hover`, moves -1/-1 | 3 px `--focus` ring, offset 3 | `--primary-active`, moves 4/4, shadow 0 | 50% opacity, `not-allowed` (WCAG exempts disabled) |
| Secondary button | transparent, 2 px navy border, navy label | `--line` fill | same | same as hover | 50% |
| Text link | navy, bold, underline 2 px | underline 4 px | ring | | |
| Card link | see 3.3 | lift 3 px | outline on card | | |
| Input (forms, not on home) | `--surface`, 2 px `--line-strong`, radius `--r` | border navy | 3 px ring | | greyed |
| Chip | 32 px, static | none | none (not interactive) | | |
| On alt | same, buttons: orange fill, border orange, shadow amber, secondary = white border and label | `--alt-surface` fill | `--alt-focus` ring | | |

Focus style: `outline: 3px solid var(--focus); outline-offset: 3px` on every interactive element (also keeps working in forced-colours mode). Inside alt: `--alt-focus`; inside the orange band: `--ink`.

## 5. Motion (minimal)

Allowed: hover lift on cards (translateY -3 px, 200 ms), button press (translate 4/4), accordion chevron rotate (200 ms), nav underline scale, mobile panel fade (200 ms), optional `Reveal` fade-up (opacity 0 to 1 and translateY 12 px, 400 ms, below the fold only, once). Only `transform` and `opacity`. Easing `cubic-bezier(0.2, 0, 0, 1)`. Hero: **no entrance animation** (LCP). No autoplay, no parallax, no scroll-jacking. `prefers-reduced-motion: reduce`: all durations 0.01 ms, no lift, no reveal distance, smooth scroll off (the mock includes this rule).

## 6. Performance notes

- Hero is the only large image: one 640 px WebP at most 60 KB. Everything else is CSS, SVG or text: case covers, the arch, sun, hexagon, icons.
- Icons: one inline SVG sprite, 21-name list from the component inventory; this page uses 19. About 3 KB.
- Fonts: 3 files (above), `swap`, preload only the Latin variable file. Nepali files not loaded on EN pages.
- No carousel library (scroll-snap CSS only), no accordion JS (`<details>`), no animation library. JS on this page: `MobileNav` (about 1.2 KB), `NavMenu` (about 0.8 KB).
- Logo: SVG lockup under 2 KB, inline or `<img>`; set width and height to avoid layout shift. Favicon SVG 0.8 KB plus 32 and 180 px PNGs.
- Layout shift: reserve the hero stage with `aspect-ratio`; set explicit image sizes; card heights come from content, not images.
- Section CSS is plain and flat: no blur, no backdrop-filter, no big shadows (only the 4 px hard offsets). Fine on low-end Android.
- Contrast and focus were checked by computed numbers (above). Rajaros should verify at 200% zoom and on a 360 px device.

## 7. Components used and their states (alignment with `docs/frontend/component-inventory.md`)

`Header`, `NavMenu`, `MobileNav`, `Logo`, `SkipLink`, `Button` (primary/secondary), `TextLink`, `Card` + `CardLink`, `Badge`/`Chip`, `Icon` sprite, `Media`, `Heading`, `Section` + `Container` (tones: default / surface / alt / **band** new), `SectionHeader`, `Accordion`, `Price`, `SegmentedControl`, `ScrollRow`, `Footer`, `StickyActionBar`, blocks `hero`, `services-grid`, `feature-list`, `process-steps`, `case-cards`, `PriceTeaser`, `faq`, `cta-form`, `banner`/event teaser.
Answers to satish's request (T-201): states shown in this spec for NavMenu open, MobileNav panel, price segmented control (currency), ScrollRow on mobile. Not on the homepage: consent banner, highlighted price row, rental band selector (they belong to the pricing and rent wireframes, next task). New items for satish: `Section tone="band"`, the 4/4 hard shadow as a layer-3 token, the compact row layout of `services-grid` and `feature-list` below 640 px, `--line-strong`, `--green`, status and `alt-*` tokens.

## 8. Assumptions and open items

1. ASSUMPTION: ADMMIS colours were sampled from the signboard image, not from original files; if Roshan has the originals, hex values may shift by a few units and the contrast table must be re-run (`design/homepage/` has no script; rerun the ratios from section 1.5).
2. ASSUMPTION: Montserrat variable latin as one file is available from Google Fonts with a `wght` axis (it is, as of 2026-11); satish confirms size at scaffold.
3. ASSUMPTION: the hero photo may be shown on a peach arch with multiply blending. A transparent cut-out would look cleaner and is still requested from Roshan (2 to 3 poses, 2000 px tall). `female coat with bg. clean it.jpeg` and `male.jpeg` are also in `design/inputs/` and are not used on the homepage.
4. There is also `design/inputs/admmis.tech logo.png`, an AI-made ADMMIS.TECH logo (circle with ring text and a hexagon A with circuit lines). I redrew the **signboard** emblem as instructed (PM brief); question to Roshan: is the new image the official ADMMIS.TECH logo? If yes, the lockup and favicon change.
5. TODO(roshan) items shown as markers in the mock and to be hidden in production if still open: case-study results, event venue and time, FAQ answers 2, 4, 6, phone number, WhatsApp number, PAN and registration line, social links.
6. No prices on the home page until the price list is approved.

