# Plan — T-501 Infrastructure plan and runbooks
Owner: raj · Date: 2026-11-06 · Due: Fri 13 Nov · Reviewer: hritik

## 1. Goal (in my own words)
One document, `docs/runbooks/infra-setup.md`, that lets Roshan create every account and server in minutes, with no guessing: which VPS (with a sourced comparison), DNS and Cloudflare setup, staging, monitoring, backups with a restore test, 2FA checklist, and a numbered list of exact actions that are his. I create nothing myself (CLAUDE.md §3). After he confirms, I verify.

## 2. Inputs I read
CLAUDE.md, my role file, inbox (pm research results 2026-11-06, hritik/neha/satish asks), docs/ci-spec.md, docs/budget.md, docs/decisions.md (ADR-015, 017, 027), docs/architecture.md (Environments), docs/api/leads.md (§5, §6.3, §11), docs/open-questions.md (Q17).

## 3. Approach
- Single runbook, one section per topic, each with: purpose, prerequisites, exact steps, verify, roll back (role standard).
- VPS: compare Lightsail, DigitalOcean, Linode/Akamai, Vultr using pm's fetched data. Vultr and Linode Mumbai are not confirmed from sources, so they are marked TODO(roshan) verify, not guessed.
- Topology: production VPS + separate small staging VPS (isolation, simple rollback), Caddy reverse proxy with Cloudflare Origin CA cert, Docker compose, images built in CI and pulled (no builds on the server).
- Backups: nightly pg_dump + media check to R2, encrypted with `age`, retention 7 daily / 4 weekly / 3 monthly (PROPOSED), monthly restore test written as a runbook.
- Alternatives considered: single VPS for both environments (cheaper, but staging load can hurt production; rejected unless budget forces it), managed Postgres (cost, out of budget).

## 4. Steps
1. Research gaps (R2, Cloudflare free-plan limits, Sentry, uptime) cited with URL + date, or marked "verify".
2. Write infra-setup.md sections 1-14.
3. Write supporting config under `infra/` (Caddyfile, backup script, worker timer) referenced by the runbook.
4. Self-review against acceptance criteria; send to hritik for review.
5. Report; after Roshan confirms each action, verify and record.

## 5. Deliverables
| File | Content |
|---|---|
| `docs/runbooks/infra-setup.md` | The runbook |
| `infra/Caddyfile`, `infra/backup/backup.sh`, `infra/systemd/*` | Config referenced by it (no secrets) |
| `team/reports/T-501-infra-plan.md` | Report |

## 6. Acceptance criteria
- [ ] >= 3 VPS options with specs, price, backups, support, each with URL + check date; recommendation with reasons
- [ ] DNS plan with Q17 as TODO(roshan)
- [ ] Cloudflare: proxy, WAF, rate limits (/api/leads, /admin), Turnstile, R2, caching, HSTS
- [ ] Staging URL decided; Sentry + uptime (1 min) + worker heartbeat alert
- [ ] Backup design + monthly restore test steps
- [ ] 2FA checklist; numbered Roshan action list with cost per action
- [ ] No secrets or real account data in any file

## 7. Assumptions · Risks · Questions
- ASSUMPTION: Postgres 17 for local, CI, staging, production (my answer to hritik).
- ASSUMPTION: staging = `staging.tech.admmis.org`, protected by Cloudflare Access (free) so it is not public/indexed.
- RISK: Mumbai price on Lightsail not stated on the page -> Roshan checks at checkout; budget has headroom (USD 25-40 planned, recommendation 36).
- RISK: free Cloudflare plan limits (rate-limit rules, WAF) -> verify in dashboard; fallback is app-level limits (neha's DB counters).
- RISK: 1-minute uptime checks may need a paid plan -> start with free 5-minute, decide on paid with PM (under USD 300/month rule).
- QUESTION (Roshan, via PM): Q17 who controls DNS for admmis.org.
- QUESTION (PM): is a second VPS for staging approved within the USD 25-40 line?

## 8. Estimate
~1.5 sessions. Longer if Roshan wants Vultr/Linode verified.
