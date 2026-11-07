# BUG-004 Below 1024 px the menu button is shown without JavaScript but does nothing, so the main nav is unreachable

| Field | Value |
|---|---|
| Severity | S3 |
| Owner | satish |
| Found | 2026-11-07 by rajaros, T-802 |
| Build | commit 5fdd40a, production build, `next start` on port 3102 |
| Environment | Chrome, JavaScript disabled, 360 px. Also applies when the JS bundle fails on a weak connection. |
| Status | OPEN |

## Steps
1. Disable JS. 2. Open `/` at 360 px. 3. Tap the menu button.

## Expected
Header links reachable (progressive enhancement; our audience is cheap phones on weak networks) or the button hidden.

## Actual
The button is visible and inert; desktop nav is hidden below 1024 px; the panel stays closed. Visitor can still scroll the page and use footer links, so not a blocker. Fix idea: render the mobile nav as a `<details>` or show the links stacked until hydration.
