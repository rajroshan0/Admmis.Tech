# Plan — T-202 Design-token architecture for multi-brand theming
Owner: satish · Date: 2026-11-06 · Due: Fri 13 Nov · Reviewer: hritik

## 1. Goal (in my own words)
Define how colour, type, spacing, radius, shadow and motion values flow from a brand file to Tailwind classes, so ADMMIS.TECH and any rental client are the same components with a different token file (ADR-013). Structure now; values from Sharwan after Gate 1. Must work for all three brand directions, including the dark one.

## 2. Inputs I read
As T-201, plus `design/brand-directions/README.md` and the token tables of all three directions, hritik's note (Tailwind v4 `@theme`, `src/brands/<brand>/tokens.css`, env `BRAND`), mahendra's `:lang(ne)` and per-locale font request.

## 3. Approach
- Three layers: **primitive** (raw palette and scales, per brand) -> **semantic** (role names: `--color-bg`, `--color-primary`...; the only layer components may use) -> **component** (optional, e.g. `--button-radius`, only where a brand must deviate).
- Sharwan's 13 names (`--bg --surface --ink --muted --primary --onp --accent --line --alt --onalt --focus --r --r2`) are the brand-facing contract; I map them to the semantic names, so his pages and my code stay traceable. Extra semantic tokens added where the three directions differ (shadow style, heading font, pill vs square buttons, border width).
- Tailwind v4: semantic tokens declared in `@theme` in a shared base file as `var()` references to brand values, so classes like `bg-surface`, `text-fg`, `rounded-card` exist while values come from the brand file.
- Brand selection: `BRAND` env picks `src/brands/<brand>/tokens.css` at build time (one CSS import resolved in the root layout); no runtime switching, no flash. Fonts in `brands/<brand>/fonts.ts`.
- Dark mode: a decision, not a default. Proposal: no user-toggled dark mode at launch; a brand may be dark natively (Himal Night). Tokens are semantic so adding `[data-theme=dark]` later is a file change. Rationale: halves contrast QA, no flash script, JS budget.
- Proof of multi-brand: a second theme (`test-brand`) in the architecture doc, plus a contrast-check procedure (script spec for Rajaros / CI).
- Alternatives considered: Style Dictionary / token JSON pipeline (rejected: extra build step and dependency for 1 team and 3 brands; CSS is the source of truth); runtime theming by CSS class per brand (rejected: ships all brands' CSS).

## 4. Steps
1. Define layers, naming rules and the full token list (colour, type, space, radius, shadow, border, z-index, breakpoints, motion, focus).
2. Map Sharwan's 13 tokens and the three directions' values as examples.
3. Tailwind mapping and brand file layout; `:lang(ne)` rules; font loading per locale.
4. Brand onboarding steps for a rental client (checklist, what is allowed to change, what is not).
5. Guardrails: lint rule proposal (no hex or px outside the brand/base files), contrast tests, visual regression idea.
6. Self-check against acceptance criteria; send REVIEW request.

## 5. Deliverables
| File | Content |
|---|---|
| `docs/frontend/design-tokens.md` | Architecture |
| `team/reports/T-202-design-tokens.md` | Report |

## 6. Acceptance criteria
- [ ] Layers, token names and file layout defined; Tailwind mapping shown with an example
- [ ] Works for all three directions (table of their values as examples) and a second test theme
- [ ] Rental-client brand procedure and boundaries (tokens only vs needs code)
- [ ] Dark mode decision with reasons
- [ ] `:lang(ne)` and per-locale fonts specified (Mahendra's request 4)
- [ ] Contrast and CI checks defined

## 7. Assumptions · Risks · Questions
- ASSUMPTION: Tailwind v4 `@theme` with `var()` values behaves as documented; verify at scaffold (T-103).
- RISK: Sharwan's final token set differs from the 13 names. Mitigation: semantic layer absorbs renames.
- RISK: Gurans (serif headings, 6 px radius, hairlines) needs per-brand structure tokens beyond colour. Mitigation: component-layer tokens listed.
- QUESTION (hritik): confirm no user-toggled dark mode at launch.
- QUESTION (sharwan): do rental clients get their own fonts, or only the three approved pairs?

## 8. Estimate
1 session (about 4 h), after T-201.
