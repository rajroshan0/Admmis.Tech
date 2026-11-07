# BUG-008 Footer email address breaks mid-word at 1280 px ("admmis.org@gmail.co / m")

| Field | Value |
|---|---|
| Severity | S3 |
| Owner | satish |
| Found | 2026-11-07 by rajaros, T-802 |
| Build | commit 5fdd40a, production build, `next start` on port 3102 |
| Environment | Chrome 1280 px. |
| Status | OPEN |

## Steps
1. Open `/` at 1280 px. 2. Scroll to the footer, Contact column.

## Expected
Address on one line or broken at a sensible point.

## Actual
The Contact column is about 180 px wide and the address wraps after "gmail.co". Looks broken on Roshan's review screen. Give the Contact column more width or allow the address to overflow into its own row.
