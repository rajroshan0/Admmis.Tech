# Brand directions (T-602) — comparison for Gate 1

Owner: sharwan · 2026-11-06 · Open each `.html` in a browser. Each page: moodboard, palette + AA ratios, type + Devanagari, logo application, hero (desktop + 360 px) with **placeholder** sari model, one section, components + states, do/don't, audience fit.

| | 1. Sindoor Studio | 2. Himal Night | 3. Gurans |
|---|---|---|---|
| File | `01-sindoor-studio.html` | `02-himal-night.html` | `03-gurans.html` |
| Idea | Warm, bold, human studio | Premium engineering / AI partner | Editorial, established agency |
| Mood | Light, vermilion + marigold | Dark navy, teal + gold | Cream, forest green + gurans pink |
| bg / ink | #FBF6EF / #1B1A2E | #0B1424 / #EAF0FA | #F6F4EC / #14221C |
| CTA (text on it) | #B8321C (#FFF, 5.98:1) | #2DD4BF (#06201C, 9.16:1) | #0F3D2E (#FFF, 12.16:1) |
| Accent | #F2B01E, decoration only | #F5C451 | #C21E56 (5.28:1 on bg) |
| Headings / body | Poppins 700, 600 / Hind 400, 600 | Mukta 700 / Mukta 400 | Noto Serif (+ Deva) 600 / Noto Sans (+ Deva) 400, 600 |
| Font weight cost | 4 files | 2 files (lightest) | 4 families, ~4 files, subset needed |
| Devanagari | Yes, both | Yes, native one family | Yes, Noto (full) |
| Hero frame | Vermilion arch + marigold sun | Teal-glow circle + UI chips | Tall framed image + pink offset block |
| Shape language | 12 px radius, hard offset shadow | Pill buttons, 20 px glass cards | 6 px radius, hairline rules |
| Suggested logo | Concept 3 Knockout | Concept 1 Peak | Concept 2 Tile |
| Strength | Local, warm, approachable, easiest re-skin | Strongest "tech/AI", B2B and international | Premium, supports higher prices, most distinctive voice |
| Risk | Can read "retail/food" if red overused | Less approachable for small shops; dark forms need care | Less "tech"; heaviest fonts |
| Fit: Nepali SMEs | Excellent | Good | Good |
| Fit: international | Good | Excellent | Very good |

## Contrast (computed, WCAG 2.2)
All text pairs >= 4.5:1 and UI parts >= 3:1 in all three; full tables on each page. The one exception is by design: Sindoor Studio marigold (#F2B01E) is 1.77:1 on its background, so it is decoration only and never text.

## Recommendation
**Direction 1 or 3 for the Nepali SME buyer, Direction 2 if international and rental/AI buyers matter most.** If forced to pick one: **Direction 1 Sindoor Studio**, because it is the warmest and most local, performs best on low-end phones (light theme, flat colour), and re-skins for rental clients by changing two variables. Roshan to decide; no vague feedback needed, just a number 1-3, or "1 with the palette of 3".

## Decisions needed from Roshan (via PM)
1. Pick a direction (or a mix).
2. Does the ADMMIS parent brand constrain colours or fonts? (Q18 files)
3. Hero model files (PNG >= 2000 px, 2-3 poses): needed to replace the silhouette and fine-tune frames and crops.

## Notes
- Silhouette is my own simple placeholder, labelled in every hero. Nothing is copied from FITTIN.
- Sample copy, Nepali line and client-logo slots are placeholders (TODO(roshan), copywriter, native review).
- Nav and card links follow `seo/sitemap.md` v0.1 section 4 (5 items + "Get a quote"; /rent/website, /rent/ai-agent, /rent/team). Mobile sticky bar (WhatsApp / call / quote) goes into wireframes, T-603+.
- Token names are identical across directions (`--bg --surface --ink --muted --primary --onp --accent --line --alt --onalt --focus --r --r2`) so Satish can build one theme structure (ADR-013); a rental brand = another value set.
- Fonts load from Google Fonts in these demos; production should self-host (performance, privacy).
