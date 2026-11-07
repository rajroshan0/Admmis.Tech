# Plan / state note — T-803 Playwright + axe e2e for the homepage
Owner: rajaros · Date: 2026-11-07 · Status: PAUSED (resume Mon 9 / Tue 10 Nov, due Thu 12 Nov) · Reviewer: hritik

## What exists
- `playwright.config.ts`: production build only; `E2E_PORT` (default 3000), `E2E_BASE_URL` (staging, no server), `E2E_CHANNEL=chrome`, `E2E_WEBKIT=0`, `E2E_REUSE=1`. Projects: chromium, webkit.
- `tests/e2e/home.spec.ts`: 20 tests, all pass on Chromium (about 12 s). Covers structure, copy vs `content/pages/home.md`, links, layout at 360/768/1280, sticky bar, menu, FAQ, skip link, focus rings, reduced motion, axe WCAG 2.2 AA at 360 and 1280.
- `test.fail()` markers: BUG-001 (focus ring), BUG-003 (/faq link), BUG-009 (axe region). Remove each marker when the bug is fixed.
- Lint clean; `tests/e2e` is excluded from the project tsc, so I checked types with a standalone tsc call.
- Local run: `pnpm build`, then `E2E_PORT=3102 E2E_CHANNEL=chrome E2E_WEBKIT=0 pnpm test:e2e`.

## Next
1. After the fix round: re-test BUG-001..010, remove the `test.fail()` markers that now pass, shrink `FUTURE_ROUTES` as pages land.
2. Run WebKit (needs `playwright install webkit`, CI does this; ask PM before installing locally).
3. Add the Lighthouse median run to the report (3 runs, staging when available).
4. Lead-form and consent specs once Neha and Mahendra deliver them (not part of home).
5. Hritik review.
