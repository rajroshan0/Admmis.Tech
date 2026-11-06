# Plan — T-201 Component inventory
Owner: satish · Date: 2026-11-06 · Due: Thu 12 Nov · Reviewer: hritik

## 1. Goal (in my own words)
One list of every component the launch site needs (UI primitives, layout, the 19 CMS blocks, helpers), each marked keep / change / new / drop against `docs/reference-fittin.md`, sized S/M/L, with the templates that use it, its `data` prop source, and its states. After this, Mahendra can compose pages and Neha knows which block shapes I need changed, without further meetings.

## 2. Inputs I read
`CLAUDE.md`, `docs/standards.md` (§2 folders, §5 theming), `docs/api/content-model.md` §6-7 (19 blocks), `docs/frontend/templates-and-routes.md` (block `data` + `headingLevel` contract, 10 compositions, islands §10), `docs/frontend/i18n.md` §7, `seo/sitemap.md` (nav, footer, closing sequence), `design/brand-directions/` (components and states), `docs/reference-fittin.md` (structure only), inbox items from sharwan, hritik, neha, mahendra, pm.

## 3. Approach
- Verdict meaning: keep = FITTIN structure carried over in our own design; change = same job, different shape for our scope; new = FITTIN has none; drop = out of launch scope (Phase 2 or not needed).
- Group by folder in `docs/standards.md` §2: `ui/`, `layout/`, `blocks/`, plus `forms/` entries owned by Mahendra (listed for completeness, not built by me).
- One row per component: folder, verdict, size, used by (templates), data source (CMS block / props / messages), states, client or server, notes.
- Separate section: the 19 blocks with the `data` type I will define (names only here; full TS types ship with the code, shape agreed with Neha) and what I need changed in §6 of the content model.
- Separate section: client islands, with a bytes justification per island; motion list (CSS only, no motion library at launch; justify if that changes).
- Build order (week 3-5) and complexity totals so PM can schedule.
- Alternative considered: one row per template. Rejected: components, not pages, are what get built.

## 4. Steps
1. Extract component list from the 19 blocks, 10 compositions, nav/footer rules, mobile sticky bar, consent banner, breadcrumbs, language switcher, forms shell.
2. Mark verdicts against FITTIN structure.
3. Map each to templates (from the §3 registry of the routes doc).
4. Add states and a11y notes; identify gaps vs content model and send to Neha as REQUEST.
5. Self-check: every one of the 19 blocks and every template appears; every `"use client"` has a reason.

## 5. Deliverables
| File | Content |
|---|---|
| `docs/frontend/component-inventory.md` | The inventory |
| `team/reports/T-201-component-inventory.md` | Report |

## 6. Acceptance criteria
- [ ] All 19 blocks listed, each with verdict, size, templates, data source, states
- [ ] All 19 templates / 10 compositions covered by at least one component
- [ ] Every client island justified; total JS risk noted against 150 KB
- [ ] Mahendra's 5 requests answered by section reference
- [ ] Open points listed with owner and date

## 7. Assumptions · Risks · Questions
- ASSUMPTION: final block list may shift after Sharwan's wireframes (T-603+); the inventory is v0.1 and carries a changelog.
- ASSUMPTION: no icon library; a small inline SVG set (about 20 icons) owned by me.
- RISK: wireframes arrive late, so sizes (S/M/L) are estimates from the three direction pages. Mitigation: re-size at wireframe review.
- QUESTION (hritik): OK to ship zero motion libraries at launch (CSS + one tiny IntersectionObserver hook)?

## 8. Estimate
1 session (about 4 h). Could grow if Sharwan's wireframes change the block set.
