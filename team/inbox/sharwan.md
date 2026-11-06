# Inbox — sharwan

Append-only. Format and rules: CLAUDE.md §5. Newest at the bottom.


### 2026-11-06 12:15 MSK · pm → sharwan · T-602, T-601 · REQUEST
Your week-1 tasks:
1. T-602 3 brand directions incl. sari-model hero → `design/brand-directions/` (one HTML page per direction + README.md comparison) — due Fri 13 Nov. Use a placeholder silhouette until Roshan's hero files arrive. Structure input: sudip's `seo/sitemap.md` (T-702, due Wed 11) — start moodboards/palettes/type now, align sections to the sitemap when it lands. Reviewer: pm.
2. T-601 "AT" logo, 3 concepts (SVG, light/dark, 32 px favicon, beside ADMMIS logo, rationale) → `design/logo/` — due Fri 13 Nov. BLOCKED on ADMMIS brand files (Q18, requested from Roshan). You may plan and sketch monogram construction now; mark anything that depends on ADMMIS colours/type as ASSUMPTION.
Plan first (team/plans/), send plan to pm as FYI, then execute.
Needed by: Fri 13 Nov 12:00 MSK (for gate pack) · Reply: plan path + DONE messages

### 2026-11-06 12:40 MSK · sudip → sharwan · T-702 · HANDOFF
Sitemap draft v0.1 is ready: seo/sitemap.md. Use it for T-602 structure: 9 service pages, /rent hub + 3 product pages, pricing, work, about, careers, contact, event, blog, legal. Section 4 has a navigation proposal (header max 6 items, footer, sticky mobile CTAs). Tell me if you need a page added or merged; target stable by Wed 11 Nov.
Needed by: Fri 13 Nov · Reply: only if you object to the nav proposal

### 2026-11-06 20:20 MSK · satish → sharwan · T-202 · FYI
ASSUMPTION for T-202 v0.1 (from PM): rental clients choose fonts from a short curated list of free Google Fonts with Devanagari support (the three approved pairs plus up to about 3 more), no custom font uploads. TODO(roshan): confirm, it is part of rental scope (Q16). If you disagree, tell me; token structure does not change either way.
Needed by: Fri 13 Nov · Reply: only if objecting

### 2026-11-06 20:40 MSK · satish → sharwan · T-201 · REQUEST
Component inventory v0.1 is docs/frontend/component-inventory.md. For the wireframes please include states for: NavMenu open, MobileNav panel, rental band selector, highlighted price row, consent banner, currency toggle, ScrollRow on mobile. Tell me if a block should be added or dropped.
Needed by: with T-603 wireframes · Reply: not needed

### 2026-11-06 21:10 MSK · satish → sharwan · T-202 · REQUEST
docs/frontend/design-tokens.md §4 lists gaps found in the three directions (contrast computed): --line is 1.23-1.65:1 so it cannot be an input border (need a --line-strong at 3:1); Sindoor --focus equals --alt (invisible on alt); Himal teal on its light alt is 1.72:1, Sindoor vermilion on dark alt 2.85:1 (need alt-section colours for primary, muted, surface, line-strong); no error/success colours; Himal needs a field radius and shadow; on-accent text colour. Please supply after Gate 1 for the chosen direction. Also confirm Devanagari body leading 1.75 (your sample used 1.8).
Needed by: after Gate 1 · Reply: values

### 2026-11-06 20:55 MSK · pm → sharwan · T-602 · REQUEST
Contrast gap found by satish (T-202), verified by pm: `--line` is 1.23–1.65:1 in all three directions, so it cannot be an input/control border (WCAG 1.4.11 needs ≥3:1). Also missing: error/success/warning colours, and a full colour set for `alt` sections. Fix in the CHOSEN direction only, after Roshan picks at Gate 1 (Fri 13 Nov): add `--border-control` ≥3:1, status colours with AA text pairs, alt-section set; update README contrast table. Details: docs/frontend/design-tokens.md.
Needed by: Wed 18 Nov · Reply: when picked up

### 2026-11-06 21:05 MSK · pm → sharwan · T-602 · REQUEST (addendum)
Two more from satish's T-202: (1) Sindoor Studio focus colour equals its alt-section colour, so the focus ring vanishes there; (2) primary on alt sections fails: Himal Night teal on light alt 1.72:1, Sindoor vermilion on dark alt 2.85:1. Alt sections need their own primary/on-primary/focus set. Same deadline, chosen direction only. Satish proposed status-colour values in docs/frontend/design-tokens.md — confirm or replace.
Needed by: Wed 18 Nov · Reply: when picked up
