# Plan — T-601 "AT" logo, 3 concepts
Owner: sharwan · Date: 2026-11-06 · Due: Fri 13 Nov 12:00 MSK · Reviewer: pm

## 1. Goal (in my own words)
Three AT monogram/combination-mark concepts that sit inside the ADMMIS family (ADR-020), each working on light and dark, at 32 px favicon size, and next to the ADMMIS logo.

## 2. Inputs I read
ADR-020, CLAUDE.md, PM request. Missing: ADMMIS logo, colours, fonts (Q18, asked of Roshan).

## 3. Approach
Geometric constructions on a 64 x 64 grid, built from simple paths so they stay sharp at 32 px. Three ideas: Peak (Himal + shared crossbar), Tile (container that can match the ADMMIS family), Knockout (solid peak with T cut out). Lockups use a stand-in "ADMMIS" wordmark.

## 4. Steps
1. Construct marks. 2. Light/dark/mono variants + lockups as SVG, PNG previews via rsvg-convert. 3. `design/logo/index.html` showing all contexts + rationale. 4. Verify at 32 px and 16 px. 5. Report.

## 5. Deliverables
`design/logo/concept-{1,2,3}-*.svg` (mark, mark-dark, lockup, lockup-dark), `design/logo/png/`, `design/logo/index.html`.

## 6. Acceptance criteria
- [ ] 3 concepts x (light, dark, 32 px, beside ADMMIS) + rationale
- [ ] Everything dependent on ADMMIS marked ASSUMPTION

## 7. Assumptions · Risks · Questions
- ASSUMPTION: ADMMIS wordmark is a stand-in (bold geometric sans, text) until the real file arrives. Colours are my own.
- RISK: real ADMMIS logo may force a different shape language -> concepts are re-checked on arrival; status stays PARTIAL until then.
- QUESTION (Roshan via PM): ADMMIS brand files (Q18).

## 8. Estimate
1 session.
