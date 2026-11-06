# Report — T-202 Design-token architecture
Owner: satish · Date: 2026-11-06 · Status: DONE

## Delivered
| File | What it is |
|---|---|
| `docs/frontend/design-tokens.md` | v0.1: 3 layers, full semantic catalogue, file layout, Tailwind v4 mapping, tone scopes, example values for 3 directions plus a `_test` brand, Devanagari and per-locale fonts, dark-mode decision, rental-client procedure and boundaries, guardrails, requests |

## Acceptance criteria
- [x] Layers, names, file layout, Tailwind mapping with example (sections 2, 3, 5, 6; re-read on disk)
- [x] Works for all three directions plus a second theme (section 7 table; `_test` ratios computed with a script, 2026-11-06)
- [x] Rental-client procedure and boundaries (section 10)
- [x] Dark mode decision with reasons (section 9; Hritik approved)
- [x] `:lang(ne)` and `fonts.ts` per locale (section 8; answers Mahendra request 4)
- [x] Contrast and completeness checks defined with a pair list (section 11)
- [x] Hritik's nits: `@brand/tokens.css` alias, `@theme inline` marked verify, lint rule described only, icons (inventory), approved fonts only, `color-scheme` per brand

## Decisions & assumptions made
- Findings in the three directions (section 4), all computed: `--line` is 1.23-1.65:1 so it cannot be an input border (added `line-strong`); Sindoor `--focus` equals its `--alt` (ring invisible on alt); Himal teal on its light alt is 1.72:1; Sindoor vermilion on its dark alt is 2.85:1 (added `alt-*` set); no error/success colours anywhere (proposed).
- Body leading for Devanagari 1.75 (Mahendra 1.6-1.75, Sharwan sample 1.8). Sharwan to confirm.
- Hero frame is a `brand.ts` option, not a token; four frames live in the hero component.
- ASSUMPTION (from PM): rental clients choose fonts from a curated list; TODO(roshan) Q16.

## Open issues / risks
- Tailwind v4 `@theme` with `var()` values and `@theme inline` behaviour not verified (nothing installed). Marked verify at scaffold.
- Final token set may differ after Gate 1; the semantic layer absorbs renames.
- `next/font` self-hosting needs network at build (Raj).

## Handoffs
- → sharwan: section 4 findings and missing values.
- → mahendra: `fonts.ts` contract and `:lang(ne)` rules.
- → hritik: review; alias, scripts, lint enforcement, `@theme inline` checks at scaffold.
- → raj: build-time fonts; one image per brand.

## Needs Roshan
- Confirm curated rental-client font list (Q16), via PM.
