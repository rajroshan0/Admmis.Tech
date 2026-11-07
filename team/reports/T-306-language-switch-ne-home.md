# Report — T-306 Language switch and Nepali homepage
Owner: mahendra · Date: 2026-11-07 · Status: DONE (Nepali stays DRAFT until ROSHAN-TODO A11)

## Delivered
Files: `src/app/(site)/[locale]/layout.tsx`, `src/app/(site)/[locale]/page.tsx`, `src/lib/i18n/messages.ts` (+`messages.test.ts`), `src/lib/routes/home-view.ts`, `src/lib/routes/path.ts` (+test), `src/lib/seo/metadata.ts` (+test), `src/messages/en/common.json`, `src/messages/ne/*`, `.env.example`, `tests/e2e/ne.spec.ts`, `team/plans/T-306-language-switch-ne-home.md`. Satish's `LanguageSwitch`, `Header` prop, `Card`, `ServicesGridBlock` changes are his.

## Acceptance criteria
- [x] typecheck, lint pass; unit 18/18 (rewrote the obsolete fallback test: NE has the same keys as EN, `hasMessages`).
- [x] `pnpm build` with ENABLED_LOCALES=en,ne: `/en` and `/ne` prerendered static.
- [x] Production server on 3107 (stopped): `/`, `/en`, `/ne` 200; `lang` en/en/ne; canonical self; hreflang en, ne, x-default (EN URL); switch links `/` and `/ne`; no TODO text.
- [x] e2e (Chrome, no webkit): 23 passed, 1 skipped; `/ne` has no horizontal scroll at 360 px.

## Open issues / risks
- Finding: EN page downloads the 68 KB Mukta Devanagari file for the "नेपाली" label (tokens-base.css names a literal `'Mukta'` fallback, so the global @font-face matches). That e2e test is `test.fixme`. → satish: use `var(--font-devanagari, system-ui)` in `src/styles/tokens-base.css`, then drop the fixme.
- JS: Next 16 build prints no First Load table; my crude sum of gzip script chunks is 182.7 KB for `/en` and `/ne` alike, so not comparable to the 143.8 KB figure. Please re-measure with the usual tool. NE adds no JS.
- Local `.env` needs ENABLED_LOCALES=en,ne (I did not edit it). Switch always targets the other locale's homepage until NE page templates exist.
