# BUG-010 `/favicon.ico` returns 404 and unknown URLs show the plain Next.js 404 page

| Field | Value |
|---|---|
| Severity | S4 |
| Owner | mahendra |
| Found | 2026-11-07 by rajaros, T-802 |
| Build | commit 5fdd40a, production build, `next start` on port 3102 |
| Environment | curl on the production build. |
| Status | OPEN |

## Steps
1. Request `/favicon.ico`. 2. Request `/does-not-exist`.

## Expected
Icon found (older browsers, crawlers and some in-app browsers ask for it); a branded 404 with a way back.

## Actual
`/favicon.ico` 404 (only `/icon.svg` exists; the design has `favicon-32.png` and `apple-touch-icon-180.png`). The 404 page is the unstyled Next default, black on white or white on black by colour scheme. Expected to be a Sprint 2 template, listed so it is not forgotten.
