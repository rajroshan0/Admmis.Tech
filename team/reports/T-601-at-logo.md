# Report: T-601 ADMMIS.TECH logo (redone from Roshan's logo)
Owner: sharwan · Updated 2026-11-07 · Status: DONE. Earlier AT concepts and the first signboard-emblem redraw are superseded.

## Source and method
Roshan's own logo `design/inputs/admmis.tech logo.png` (1254 x 1254), per the PM redirect. **This is a redraw of a PNG, not an original vector.** Geometry (hexagon, A, swoosh, circuit lines, orange node, ring, nodes, ring dots) was measured from the pixels and rebuilt as clean paths; the wordmark and ring text are Montserrat ExtraBold and Space Mono Bold outlines converted to paths and fitted to the measured letter boxes. The signboard emblem is a colour reference only.

## Delivered (`design/logo/`)
| File | Use | Size |
|---|---|---|
| `admmis-tech-badge.svg`, `-dark.svg` | Full badge with ring text | 12 KB |
| `admmis-tech-lockup.svg`, `-dark.svg` | Compact lockup (mark + ADMMIS / TECH), header and footer | 2.9 KB |
| `admmis-tech-mark.svg`, `-dark.svg` | Hexagon + A, no wordmark | 1 KB |
| `favicon.svg` | Navy tile, hexagon + A + swoosh + node | 0.9 KB |
| `png/`, `index.html`, `README.md` | Exports, showcase, which files are final | |

## Verification
All SVGs parse as XML and render in rsvg and Chrome. Badge compared visually with the source: geometry and ring layout match closely. Lockup checked at 150 px width (34 px high) and in the home mock header; favicon checked at 160 and 32 px.

## Differences from the source
- Navy and orange use the site tokens (`#0A1F4A`, `#F48221`); the PNG is about `#072051` and `#FB920A`.
- Wordmark and ring text are close matches, not the original letterforms (no font data in the PNG).
- Favicon drops the circuit lines (illegible at 32 px). Badge is 12 KB (above the 10 KB target) because of the ring text; the header assets are far smaller.
- TECH in the compact lockup is about 7 px tall at the 34 px header height: do not go below 32 px.

## Question for Roshan
Does a vector original of this logo exist (SVG, AI, CDR, Canva)? If so, I replace these files with it.
