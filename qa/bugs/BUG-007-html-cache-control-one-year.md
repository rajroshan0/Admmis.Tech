# BUG-007 Home HTML is sent with `cache-control: s-maxage=31536000` (one year at the edge)

| Field | Value |
|---|---|
| Severity | S3 |
| Owner | raj (Cloudflare), hritik (Next config) |
| Found | 2026-11-07 by rajaros, T-802 |
| Build | commit 5fdd40a, production build, `next start` on port 3102 |
| Environment | `curl -I` on the production build. |
| Status | OPEN |

## Steps
A deploy or CMS edit shows on the site within minutes (or the cache is purged on deploy).

## Expected
The static page response has `s-maxage=31536000`. If Cloudflare is set to respect origin headers for HTML, visitors can see a stale home page after a deploy for up to a year unless the cache is purged. Not a bug on localhost. Raj to add a purge-on-deploy step or a Cloudflare cache rule, and add it to the launch checklist.

## Actual

