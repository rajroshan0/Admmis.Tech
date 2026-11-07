# BUG-006 No og:image, so shared links show no preview; canonical and og:url point to localhost

| Field | Value |
|---|---|
| Severity | S3 |
| Owner | mahendra (meta), raj (build env) |
| Found | 2026-11-07 by rajaros, T-802 |
| Build | commit 5fdd40a, production build, `next start` on port 3102 |
| Environment | Page source of `/`. |
| Status | OPEN |

## Steps
1. View source of `/`. 2. Look at `og:*`, `twitter:*` and canonical.

## Expected
`og:image` (the spec names the badge for the OG image), absolute canonical on the real domain.

## Actual
`twitter:card=summary_large_image` with no image, no `og:image`. `canonical` and `og:url` are `http://localhost:3000/` because `NEXT_PUBLIC_SITE_URL` is not set at build (hritik review nit 5; raj to set it in CI and Docker). Lead channels are WhatsApp and Facebook, where the preview matters. `og:locale` is `en_US`; consider `en_NP` (low priority).
