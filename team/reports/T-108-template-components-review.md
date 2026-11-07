# T-108 Review: template components (T-207, satish)
Reviewer: hritik · 2026-11-07 · Verdict: **APPROVED WITH NITS** (no must-fix)

Scope: blocks (hero plain/aside, feature-list variants, choice-list, rental-plans), ui (Callout, Price, ServiceFacts, Icon), components.css, tokens-base.css. Not run by me: build, tests (satish reports 42/42 and a green build; neha's tsc/eslint errors excluded).

## Checklist
- Correct: Price never shows 0 (falls back to caller label); ServiceFacts omits empty rows; ids via `useId` fix the duplicate-id bug; selected band falls back to the first plan.
- A11y: native radio group in fieldset+legend, input is `sr-only` (not display:none) so keyboard and arrow keys work, `:focus-visible` ring on the label; Callout meaning is icon+title, not colour only; icons aria-hidden. No-JS: nothing needs JS (zero `use client` in the new files), all plans stay in DOM and reading order.
- i18n: no hard-coded copy; all labels are props. Wrapping, no truncation, `inset-inline-end` used (RTL/Devanagari safe). `var(--font-devanagari, system-ui)` fix is in, as agreed in T-107.
- Perf: no new JS; First Load JS unchanged by construction (re-measure after T-307 renders them).

## Nits (can go with T-307)
1. The selected plan changes border 1px to 2px: a small layout shift on click. Use a constant 2px transparent border or `outline`/`box-shadow` only.
2. Band choice is visual only. Screen reader users get no "selected" cue on the plan cards (`.plan-badge` is display:none until selected, and nothing links radio to card). Either add `aria-describedby`-style text or state in the legend help text that plans are all listed below. Browsers without `:has()` simply show all cards unhighlighted: acceptable, keep that fallback.
3. `!text-accent` (important) in ServiceFacts: use a proper class. Check accent #f5ae44 on the surface tone in the alt scope reaches 4.5:1 (text, 14 px). Not computed by me.
4. The `:nth-child` selector list is capped at 6 bands; add a build-time max (zod `max(6)`) in the data layer so a 7th plan cannot silently lose its highlight.
5. e2e Mukta test is un-fixme'd but not run: rajaros must run it in a browser before Gate. The ChoiceList and RentalPlans need the 360 px check in T-307.
