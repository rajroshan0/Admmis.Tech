# T-107 Review: EN/नेपाली switch (T-306 mahendra, T-206 satish)
Reviewer: hritik · 2026-11-07 · Verdict: **APPROVED WITH NITS** (no must-fix before commit)

## Checklist
- Correct: switch renders only with 2+ enabled locales; hrefs from `pathFor`; `html lang` per locale; hreflang en, ne, x-default (EN URL) and self canonical verified in served HTML for /en and /ne.
- A11y: `nav` with label, `lang` + `hrefLang` on links, `aria-current="true"` on current, `min-h-11 min-w-11` (44 px), works with no JS, also in the no-JS fallback row.
- i18n: labels come from `common.languages`; NE key set equals EN (unit test). No hard-coded strings in components.
- Fast: LanguageSwitch is a server component. Both pages static.
- Tests: unit and e2e present; the Mukta e2e is `test.fixme` (see item 2).

## 1. JS budget: holds, no JS added
Method as in T-104 (sum gzip of the `<script async>` chunks in the served HTML, excluding the `noModule` polyfill), production build with ENABLED_LOCALES=en,ne, build newer than all sources:
`/en` = `/ne` = **143,767 bytes = 143.8 KB**, identical to the baseline (limit 144.3 KB, hard budget 150). Mahendra's 182.7 KB included the polyfill and non-async chunks, so it was not comparable. Server stopped.

## 2. Mukta on EN pages: not a must-fix
It costs EN visitors one 68 KB font request, lazy and only for the "नेपाली" glyphs, not render-blocking and not in the JS budget. Fix (`var(--font-devanagari, system-ui)` in `src/styles/tokens-base.css` lines 59 and 62) goes with satish's next task, together with removing the `fixme`. Must land before the launch performance check.

## Nits
1. `noindex` is derived from `hasMessages(locale,'home')`, so the draft NE homepage becomes indexable as soon as `ne` is in ENABLED_LOCALES. Production must keep `ENABLED_LOCALES=en` until ROSHAN-TODO A11 (native proofread). Raj/pm: note this in the deploy runbook.
2. Switch always links to the other locale's homepage (documented in `languageItems`). Revisit when NE inner pages exist, otherwise it is a trap on inner pages.
3. `.env.example` changed; local `.env` still `en` only, so e2e needs the env override.
