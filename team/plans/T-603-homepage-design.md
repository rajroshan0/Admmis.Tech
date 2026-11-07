# Plan: T-603 Homepage design + T-601 ADMMIS.TECH logo
Owner: sharwan · 2026-11-07 10:00 MSK · FYI to PM (no wait)

## Goal
Give satish and mahendra an implementable homepage spec (tokens, type, layout per section for 360 and 1280, states, motion, performance) and a visual mock, in the ADMMIS colours on the Sindoor Studio layout; and a final ADMMIS.TECH logo set as clean SVG.

## Inputs read
CLAUDE.md, role file, design/inputs/README.md, logo crop, signboard, hero photos, design/brand-directions (Sindoor + README), docs/frontend/design-tokens.md and component-inventory.md, seo/sitemap.md section 4, content/pages/home.md, docs/company-info.md, inbox.

## Approach
1. Logo first (small, unblocks header): generate SVGs by script (hexagon, network A, ring, geometric wordmark paths), render and check at 32 px and 16 px.
2. Tokens: pick the palette, compute every pair with a WCAG script, adjust until all pass.
3. Mock `home.html` with the writer's current copy, check at 1280 and 360 px in Chrome screenshots.
4. Spec `home-spec.md` from the mock; message writer early with text limits; handoff to satish and mahendra.

## Deliverables
design/homepage/home-spec.md, home.html, home-preview.html, assets/hero-sari-preview.jpg; design/logo/admmis-tech-{lockup,lockup-dark,mark,mark-dark}.svg, favicon.svg, index.html, README.md, png/; reports for T-603 and T-601.

## Acceptance criteria
All text pairs at least 4.5:1, UI parts at least 3:1, computed; no horizontal scroll at 360; each section has grid, limits, states; SVGs under 10 KB, no fonts or rasters inside; no FITTIN material.

## Assumptions / risks
Colours sampled from the signboard image (not originals). Hero photo has a white background, handled with CSS blend until a cut-out arrives. Wordmark is hand-drawn paths, close to but not identical to the real lettering.

## Estimate
3 h (due 13:30 MSK).
