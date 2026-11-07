# T-207 Template components (satish), 2026-11-07

Status: DONE, with listed gaps.

Built (all server components, no client JS, no hard-coded copy):
- hero variant `plain` + `aside` slot (HeroBlock)
- ServiceFacts, Callout, Price (ui); icons minus, info, alert added
- ChoiceListBlock (new), RentalPlansBlock (band radio card + plan card, CSS-only via `:has()`, in components.css)
- FeatureListBlock variants `cards`, `checklist` (dash marker), unique heading ids (was a fixed id, a duplicate-id bug with two lists per page)
- Price fallback: no amount shows the caller's label ("Price on request" / "Quote only"), never 0
- Props handed to mahendra: team/inbox/mahendra.md

T-107 nit: tokens-base.css fallback now `var(--font-devanagari, system-ui)`; `test.fixme` removed in tests/e2e/ne.spec.ts (rajaros's file, pm-approved; not run, needs a browser run by rajaros).

Verified: vitest 42/42 pass (new: src/components/blocks/templates.test.tsx), `next build` passes, prettier clean.
Not green, not mine: `tsc` errors in src/collections/fields/helpers.ts and src/migrations/index.ts; eslint error in src/collections/hooks/revalidate.ts (neha).
JS budget: no route uses the new components yet and none has "use client", so First Load JS is unchanged (143.8 KB); re-measure after T-307.

Gaps: CurrencyToggle (amounts shown as NPR + USD together), Breadcrumbs, stacked Table, Nepali stacked-table rule, 360 px visual check of new blocks (no route renders them yet; do in T-307).
