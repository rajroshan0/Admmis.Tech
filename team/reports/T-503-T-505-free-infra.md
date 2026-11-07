# Report — T-503, T-504, T-505
Owner: raj · Date: 2026-11-07 · Reviewer: hritik (T-503, T-504), pm (T-505)

## Delivered
| Task | File | State |
|---|---|---|
| T-505 | docs/runbooks/local-dev-mac.md | Done, Docker licence and download cited (read 2026-11-07) |
| T-504 | docs/runbooks/dns-cloudflare.md | Done. Recommends full move to Cloudflare Free |
| T-503 | docs/runbooks/infra-setup.md v0.2 (new section 0, old paid sections marked fallback) | Done, draft for hritik then Roshan |

## Verified vs not
- Verified (primary pages read 2026-11-07 via PM's filed notes): Docker thresholds and Apple silicon download; Cloudflare plan limits for subdomain (Enterprise) and partial (Business) setups, full-setup steps; Oracle A1 limits, home-region rule, 10 TB egress, 20% idle rule.
- UNVERIFIED and marked as such: Oracle card requirement and hold, Mumbai/Hyderabad availability, home-region change, whether Pay As You Go removes reclaim; Cloudflare rollback (my procedure, not Cloudflare's); R2 payment-method need; Bitwarden free sharing; other free hosts (not researched, no primary source).
- Nothing was installed, run against the app, or changed on any account or DNS.

## Decisions for Roshan (via PM)
1. Accept giving a card to Oracle (probably needed)? Else fallback Lightsail USD 12-24/mo.
2. ADR proposal text: infra-setup.md section 0.7.
3. Docker Desktop: confirm ADMMIS qualifies as a small business.
4. DNS Q17 answers (registrar, DNS provider, DNSSEC).

## Follow-ups
- Raj: add linux/arm64 build to the CI skeleton; Hritik to test sharp on arm64 musl.
- Raj: update ci/compose notes once ADR is approved; section 3 (accounts and 2FA) still lists paid tools, to be trimmed after approval.
- Risk: Oracle idle reclaim, residual MEDIUM (section 0.2).
