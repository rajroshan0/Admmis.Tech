# Report: T-603 Homepage design spec
Owner: sharwan · 2026-11-07 · Status: DONE (review by pm; satish and mahendra build from it)

## Delivered
| File | What |
|---|---|
| `design/homepage/home-spec.md` | Final tokens (names unchanged, new ones marked), computed contrast table (46 pairs, 0 fails), typography, section-by-section layout at 360 and 1280, text limits, states, motion, performance, components, assumptions |
| `design/homepage/home.html` | Static mock, self-contained (fonts from Google Fonts for preview), writer's current copy, sticky bar, mobile menu, FAQ, reduced-motion CSS |
| `design/homepage/home-preview.html` | 360 and 1280 px side by side |
| `design/homepage/assets/hero-sari-preview.jpg` | Provisional 563 x 1000 JPEG (75 KB) made from Roshan's file, mock only |

## Key decisions
- Navy hero, On rent, Event and footer; light body; orange CTA band. Orange is fill only (2.47:1 as text on light); text on orange is navy (6.16:1). Primary button = orange + navy label + hard offset shadow.
- Fixes owed: `--line-strong` `#6B7A99` (4.09:1), status colours with alt pairs, full `alt-*` set, `--focus` `#2F6BEA` valid on bg and navy, `--alt-focus` amber. Devanagari body leading 1.75 confirmed.
- Fonts: Montserrat variable (latin) + Mukta 400/700 (devanagari, only on NE pages): 3 files.
- Hero uses Roshan's real model image (it arrived 2026-11-06) on an arch, blended with multiply; no silhouette needed.

## Verification
- Contrast: Python WCAG 2.2 script, 46 pairs, all pass (table in spec 1.5).
- Mock opened in headless Chrome at 1280 and 360 px (iframe emulation): no horizontal overflow, sections read correctly; fixed 4th case-card width bug, compact mobile cards, scroll padding.
- Not done: real-device test, screen reader pass (rajaros), Nepali text render (no NE copy yet).

## Assumptions / questions
See spec section 8. For Roshan: (1) is `design/inputs/admmis.tech logo.png` the official ADMMIS.TECH logo? (2) transparent cut-outs of the model; (3) original ADMMIS vector/colours if they exist.

## Handoff
Satish: tokens + component notes (spec 1, 3, 7). Mahendra: section order, content keys, limits (spec 3). Writer: limits sent 10:40 MSK.
