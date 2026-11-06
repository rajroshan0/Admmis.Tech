# Report — T-201 Component inventory
Owner: satish · Date: 2026-11-06 · Status: DONE

## Delivered
| File | What it is |
|---|---|
| `docs/frontend/component-inventory.md` | v0.1: 20 blocks with exported `data` types, 17 UI primitives, 11 layout items, 10 template parts, dropped FITTIN features, islands and JS estimate, motion list, build order, requests |

## Acceptance criteria
- [x] All blocks listed with verdict, size, templates, data source, client/why, states (re-read file; 20 block rows numbered 1-20)
- [x] All templates covered: every composition in routes doc §3 has components (blocks, `PageHeader`, template parts, `ErrorPanel`, `ThankYouPanel`)
- [x] Every client island justified; JS budget table in v0.1.1 (runtime baseline measured at scaffold, island estimates, headroom TBD) after Hritik's must-fix
- [x] Mahendra's 5 requests answered: (1) `data` types in §3.1 and `headingLevel` in §2, (2) `cta-form` shell with `children`, (3) `Price` + `CurrencyToggle`, (4) answered in T-202, (5) `LanguageSwitcher` in §5
- [x] Open points with owner and date (§11)
- [x] Hritik nits: per-component `"use client"` reasons; `data` types exported from each block's `types.ts`; icons capped about 20 and server-rendered/sprite; no motion library, content visible without JS

## Decisions & assumptions made
- Composition count stated as the routes doc has it: 10 files including `error`, 9 composing CMS content.
- Found: content model §6 table has 20 rows (19 plus `banner`), not 19. Built for 20, question sent to Neha.
- ASSUMPTION: fixed labels arrive via a `labels` prop filled by `resolveBlocks()`; money and dates arrive preformatted.
- Proposals that replace islands Mahendra expected: `StickyActionBar` CSS-only; rental band selector CSS-only (radios + `:has()`), verify on low-end Android at scaffold.
- Sizes are estimates; the block list is final only after wireframes.

## Open issues / risks
- Effort sums to roughly 37 person-days if built serially (3 L, 17 M, ~36 S). Needs overlap with Mahendra on stubs and a cut order (in doc §10).
- `:has()` and native `<dialog>` behaviour on low-end Android WebView unverified (nothing installed yet).
- Icon set licence: TODO(satish).

## Handoffs
- → neha: 5 requests (doc §11 rows 1-5), incl. `banner` question and the 19/20 count.
- → mahendra: `data` types, `labels` approach, CSS-only sticky bar and band selector.
- → sharwan: confirm against wireframes, list of states needed.
- → hritik: review.

## Needs Roshan
- none
