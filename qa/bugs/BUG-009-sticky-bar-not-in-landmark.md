# BUG-009 axe best-practice "region": mobile sticky action bar is outside any landmark

| Field | Value |
|---|---|
| Severity | S4 |
| Owner | satish |
| Found | 2026-11-07 by rajaros, T-802 |
| Build | commit 5fdd40a, production build, `next start` on port 3102 |
| Environment | Chrome 360 px, axe-core 4.14 (wcag2a, 2aa, 21, 22, best-practice). |
| Status | OPEN |

## Steps
1. Run axe on `/` at 360 px.

## Expected
No violations.

## Actual
One moderate `region` finding on `.z-30` (the fixed bottom bar). 1280 px: no violations. Lighthouse accessibility is 100 so it is not a gate item. Fix: give the bar a `<nav aria-label="Quick actions">`.
