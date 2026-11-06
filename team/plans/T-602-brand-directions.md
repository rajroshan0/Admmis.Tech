# Plan — T-602 Three brand directions incl. sari-model hero
Owner: sharwan · Date: 2026-11-06 · Due: Fri 13 Nov 12:00 MSK · Reviewer: pm

## 1. Goal (in my own words)
Give Roshan three clearly different, buildable brand directions for tech.admmis.org so Gate 1 can pick one. Each shows palette, type, logo use, a sari-model hero (desktop + 360 px) and one section, with AA contrast numbers.

## 2. Inputs I read
CLAUDE.md, my role file, ADR-005/009/013/020, BOARD, inbox. Not yet available: `seo/sitemap.md` (T-702), Roshan's hero files, ADMMIS brand files (Q18).

## 3. Approach
- One self-contained, responsive HTML page per direction. Desktop frame and a fixed 360 px frame use the same markup (container queries).
- Hero model is my own simple placeholder silhouette, labelled PLACEHOLDER. Replaced when Roshan's files arrive.
- Colours checked with a WCAG 2.2 contrast script; ratios printed on each page and in README.
- Fonts: free Google Fonts that include Devanagari; max 3-4 weights; a Nepali sample line is shown in every specimen.
- Tokens are written as CSS variables with the multi-brand structure Satish needs (ADR-013).
- Alternatives dropped: photographic moodboards (licensing + weight) — moodboards are built from colour, pattern and type only.

## 4. Steps
1. Palettes + contrast check. 2. Page generator and three pages. 3. README comparison + token tables. 4. Check sitemap once more, align the sample section. 5. Verify (contrast, 360 px render screenshot, Devanagari glyphs, no horizontal scroll). 6. Report + DONE to pm; HANDOFF to Satish (tokens) and Sudip.

## 5. Deliverables
| File | Content |
|---|---|
| `design/brand-directions/01-sindoor-studio.html` | Direction 1 |
| `design/brand-directions/02-himal-night.html` | Direction 2 |
| `design/brand-directions/03-gurans.html` | Direction 3 |
| `design/brand-directions/README.md` | Comparison, token values, recommendation |

## 6. Acceptance criteria
- [ ] Each page: idea, moodboard, palette + AA ratios, type pairing + Devanagari, logo application, hero desktop + 360, one section, do/don't, audience fit, component + state list
- [ ] All text pairs >= 4.5:1, UI >= 3:1
- [ ] No FITTIN look/assets; no invented facts (placeholders marked TODO(roshan))

## 7. Assumptions · Risks · Questions
- ASSUMPTION: sample section is "How we work + pricing path" until sitemap lands.
- ASSUMPTION: no ADMMIS colours known; directions are free of them; to be reconciled when Q18 files arrive.
- RISK: sitemap lands late -> section sample may need small change.
- QUESTION (Roshan via PM): does the ADMMIS parent brand constrain colours?

## 8. Estimate
1 session for build, 0.5 for verification.
