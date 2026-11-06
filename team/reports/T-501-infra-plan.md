# Report — T-501 Infrastructure plan and runbooks
Owner: raj · Date: 2026-11-06 · Status: DONE (draft v0.1, awaiting hritik review and Roshan decisions)

## Delivered
| File | What it is |
|---|---|
| `docs/runbooks/infra-setup.md` | Runbook: architecture, VPS comparison + recommendation, accounts + 2FA checklist, DNS plan, Cloudflare, staging, server hardening, deploy, lead-worker scheduler, secrets, monitoring, backups + restore test, cost, 12 numbered Roshan actions, verification plan |
| `infra/Caddyfile`, `infra/deploy.sh`, `infra/cloudflare-ips.sh` | Reverse proxy, restricted-key deploy script with rollback, firewall helper |
| `infra/backup/backup.sh`, `infra/systemd/{backup,lead-worker}.{service,timer}` | Daily encrypted backup to R2; every-minute worker tick |

## Acceptance criteria
- [x] 4 VPS options with specs/price/backups/support and sources (URL + 2026-11-06). Support level and Vultr/Linode-Mumbai figures are `verify`/TODO(roshan), not guessed.
- [x] DNS plan with options A/B/C; Q17 is TODO(roshan).
- [x] Cloudflare: proxy, Full strict, HSTS, WAF, rate limit, Turnstile, R2, caching.
- [x] Staging URL `staging.tech.admmis.org` behind Cloudflare Access; Sentry, 1-min uptime, worker and backup heartbeats.
- [x] Backup design (7/4/3 PROPOSED) and 7-step monthly restore test.
- [x] 2FA checklist and numbered Roshan list (about 3 h total).
- [x] No secrets in any file. Shell scripts syntax-checked with `bash -n`. Not run (no servers).

## Decisions & assumptions made
- Recommendation: AWS Lightsail Mumbai, prod 4 GB ($24) + staging 2 GB ($12) + prod snapshots (about $4) = about $40/month, top of the budget line.
- Postgres 17 everywhere; GHCR registry; Caddy + Cloudflare Origin CA cert; backups encrypted with age (private key only in Bitwarden); retention via R2 lifecycle rules.
- FINDING: Cloudflare Free allows **one** rate-limiting rule, path-only (docs checked 2026-11-06). The role standard asks for rules on `/api/leads` and `/admin`. Plan: the one rule on `/api/leads`; `/admin` protected by Cloudflare Access + Payload 2FA/login throttle. Pro plan would give 2 rules (price `verify`).
- ASSUMPTION: Ubuntu 24.04 LTS at purchase (verify); `TRUSTED_PROXY=cloudflare` env name proposed to Neha.

## Open issues / risks
- Mumbai price on Lightsail not stated by the source; Roshan confirms at checkout.
- 1-minute uptime checks probably need a paid tier (verify); start free.
- Cloudflare Access free limits, Sentry free limits, R2 object versioning not verified.
- Nothing has been built or applied anywhere; no Docker, no accounts.

## Handoffs
- → hritik: review `docs/runbooks/infra-setup.md` (esp. sections 5, 7, 8, 12).
- → neha: confirm `/api/health` field for oldest due job age, R2 env names, `TRUSTED_PROXY`; worker scheduler is host systemd timer (section 9).
- → pm: second VPS for staging inside budget? Section 14 is the list for Roshan.

## Needs Roshan
Section 14 actions 1-12. Decisions: VPS provider/cost (about $40/month), retention 7/4/3, DNS option, Q17.
