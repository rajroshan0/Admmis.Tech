# BUG-005 Header nav has no Services / About dropdowns that the design spec requires

| Field | Value |
|---|---|
| Severity | S3 |
| Owner | satish (build), sharwan (confirm) |
| Found | 2026-11-07 by rajaros, T-802 |
| Build | commit 5fdd40a, production build, `next start` on port 3102 |
| Environment | Chrome 1280 and 360 px. |
| Status | OPEN |

## Steps
1. Open `/` at 1280 px. 2. Hover or press Enter on "Services" and "About".

## Expected
Spec 3.1: Services dropdown (9 links), About dropdown (About us, Careers, Blog), and mobile panel with expandable `details` rows.

## Actual
Both are plain links to `/services` and `/about`. The 9 services are reachable from the page body and footer, so this is a gap against the spec, not a broken flow. If this is an accepted day-1 cut, record it in the sprint plan so Roshan is not surprised.
