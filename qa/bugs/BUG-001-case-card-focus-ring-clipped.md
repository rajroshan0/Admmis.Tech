# BUG-001 Keyboard focus ring is invisible on the four Our work case cards

| Field | Value |
|---|---|
| Severity | S2 |
| Owner | satish |
| Found | 2026-11-07 by rajaros, T-802 |
| Build | commit 5fdd40a, production build, `next start` on port 3102 |
| Environment | Chrome 1280 and 360 px (Playwright, Chrome stable). Same CSS at every width. |
| Status | OPEN |

## Steps
1. Open `/`.
2. Press Tab until focus reaches "Telegram AI agent for data entry" (about 24 Tab presses at 1280).
3. Look at the card.

## Expected
A visible 3 px ring around the card (spec section 4: Card link focus = outline on card; WCAG 2.4.7 Focus Visible, 2.4.11 Focus Not Obscured).

## Actual
No ring is drawn. Computed style shows the stretched link's `::after` has `outline: 3px solid rgb(47,107,234)`, but `CaseCardsBlock.tsx` gives the `Card` `overflow-hidden`, which clips the outline (offset 3 px, outside the box). A keyboard user cannot see which of the four cards is focused. The services grid and rent cards are not affected (ring visible, checked). Fix idea: move `overflow-hidden` to the cover only, or use an inset ring on the card (`outline-offset: -3px`). Evidence: screenshot of focus state kept in QA scratch, same cards at 360 px.
