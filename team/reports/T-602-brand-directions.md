# Report — T-602 Three brand directions incl. sari-model hero
Owner: sharwan · Date: 2026-11-06 · Status: DONE (pending real hero files and Q18; see issues)

## Delivered
| File | What it is |
|---|---|
| `design/brand-directions/01-sindoor-studio.html` | Direction 1 |
| `design/brand-directions/02-himal-night.html` | Direction 2 |
| `design/brand-directions/03-gurans.html` | Direction 3 |
| `design/brand-directions/README.md` | Comparison, recommendation, decisions needed |

## Acceptance criteria
- [x] Each page has idea, moodboard, palette + AA ratios, type + Devanagari sample, logo application, hero desktop + 360 px, one section, do/don't, audience fit, components + states (rendered in headless Chrome, all sections visually checked)
- [x] Contrast computed by script (WCAG formula): all text >= 4.5:1, UI >= 3:1; marigold in D1 flagged decoration-only
- [x] Nav and section aligned to `seo/sitemap.md` v0.1
- [x] No FITTIN look/assets; placeholders marked

## Decisions & assumptions made
- ASSUMPTION: ADMMIS parent colours/fonts unknown (Q18); directions are independent of them.
- ASSUMPTION: sample copy, Nepali sample line, client logo slots are placeholders.
- Recommendation: Direction 1 (README).

## Open issues / risks
- Model silhouette is a crude placeholder; crops and frames must be re-tuned on Roshan's files (due Wed 11 Nov).
- Not tested on a real low-end Android or screen reader (Rajaros to review accessibility). Focus rings shown in states strip only; nav dropdown and mobile menu open states not designed yet (wireframe task).
- Fonts load from Google CDN in demos only.

## Handoffs
- -> pm: Gate 1 pack input.  -> satish: token tables per page, same token names across directions.  -> sudip: nav applied as proposed.  -> rajaros: please review contrast and focus.

## Needs Roshan
- Pick direction 1-3; ADMMIS brand files; hero model files.
