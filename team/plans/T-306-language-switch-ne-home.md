# Plan — T-306 Language switch and Nepali homepage
Owner: mahendra · Date: 2026-11-07 · Due: 19:00 MSK · Reviewer: hritik

## 1. Goal
`/` stays English; `/ne` serves the Nepali homepage; a plain-link switch (EN / नेपाली) in header and mobile menu; correct lang, canonical, hreflang; Devanagari font on NE only; static rendering and EN JS budget kept (<= 144.3 KB).

## 2. Approach
- Keep the typed loader (no next-intl now): the NE route needs only `src/messages/ne/*.json` and a loader entry; cost zero JS and static rendering is proven. T-304 still replaces the loader on Tue.
- Switch target: the OTHER locale's homepage on every page (the layout is static and cannot read the path; no other page has an NE version yet). Chosen as the simpler option; per-page targets arrive with the template routes.
- hreflang `en`, `ne`, `x-default` (EN URL) on the homepage only; canonical self per locale.
- Fonts: `latin.variable` on EN, both variables on NE, so no Devanagari @font-face on EN.
- Messages: `ne/home.json`, `ne/common.json` built from `content/pages/home.ne.md` by the same conversion as EN; missing keys fall back to EN through deepMerge.

## 3. Steps
1. Groundwork (done): ENABLED_LOCALES=en,ne in .env.example, hreflang in buildMetadata, languageItems helper, tests, props request to satish.
2. When home.ne.md lands: convert to ne/*.json, add loaders.
3. When LanguageSwitch lands: wire into Header, layout fonts, page translatedLocales.
4. Verify: build, both routes 200, no TODO text, JS, e2e plus 2 tests for /ne.

## 4. Dependencies
writer (home.ne.md, due 17:30), satish (LanguageSwitch + Header prop). ASSUMPTION: NE has no pages besides home, so `/ne/x` is 404 until then.
Roshan's local `.env` needs ENABLED_LOCALES=en,ne (I do not edit `.env`); I test with the variable in the shell.
