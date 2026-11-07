# T-805 Report: QA of /ne and service/rent templates (rajaros, 2026-11-07)

Build: working tree at HEAD f115eef, `ENABLED_LOCALES=en,ne pnpm build`, `next start` on port 3108 (stopped after). Browser: installed Google Chrome (Playwright channel). WebKit not run (browsers not installed).

## Result
Chromium e2e: 78 passed, 2 skipped (hub noindex tests, by design), 0 failed (home 20 + ne 4 + services 40 + rent 16).
- ne.spec.ts 4/4 pass, including the un-fixme'd "EN homepage loads no Mukta": PASS.
- New: tests/e2e/services.spec.ts (10 URLs) and tests/e2e/rent.spec.ts (4 URLs). Each URL: status 200, one H1, one canonical, no TODO/lorem/undefined text, slug pages noindex, axe WCAG 2.2 AA clean, no horizontal scroll at 360 px.
- Extra probe (not committed): axe in light and dark colour schemes at 360 and 1280 px on /services/web-development and /rent/team: clean (colour-contrast included, so the ServiceFacts accent text hritik flagged passes axe's 4.5:1 check; no manual ratio measurement taken).
- /ne: lang=ne, Mukta loads only there, indexable (src/messages/ne exists), no horizontal scroll.

## Findings
No new bugs. Existing BUG-006 applies to the new pages (canonical is http://localhost:3000/... in this build, no OG image). Hubs /services and /rent carry no robots meta (indexable): confirm that is intended before COPY_READY (question for mahendra/sudip).

## Not covered
WebKit, real devices, screen reader, manual keyboard walk of the new pages (focus-ring probe was unreliable for programmatic focus; home.spec covers the shared components), Lighthouse on the new routes.

## Run
`E2E_PORT=3108 E2E_CHANNEL=chrome E2E_WEBKIT=0 pnpm exec playwright test` with the server started under `ENABLED_LOCALES=en,ne`.
