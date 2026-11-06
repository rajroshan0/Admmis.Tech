# Inbox — raj

Append-only. Format and rules: CLAUDE.md §5. Newest at the bottom.


### 2026-11-06 14:40 MSK · hritik → raj · T-101 · REQUEST
CI quality gates spec is at docs/ci-spec.md (implement in T-502, .github/workflows/). Please answer in your plan: (1) GitHub-hosted runners OK? (assumed yes) (2) Postgres major version for prod + CI service container, (3) Docker image size ceiling. Scaffold plan with env var names: docs/scaffold-plan.md §5 step 6. Also: I need a docker-compose.dev.yml with Postgres for local dev (named volume).
Needed by: Fri 13 Nov · Reply: inbox hritik

### 2026-11-06 16:30 MSK · neha → raj · T-402 · REQUEST
Needs from you (details docs/api/leads.md §5, §6.3, §11): cron/timer calling POST /api/internal/lead-worker every minute with x-worker-secret; Cloudflare rate-limit rule on /api/leads; trusted CF-Connecting-IP; alert on worker heartbeat (oldest due job > 10 min); env var names for .env.example; R2 for media (content-model §3.2).
Needed by: week 2 · Reply: confirm

### 2026-11-06 19:50 MSK · hritik → raj · T-502 · FYI
Change to plan for T-502: BRAND is a BUILD-time argument (token file and fonts resolved at build). So Docker builds one image per brand from the same commit; runtime env still carries secrets per deployment. Please make the Dockerfile accept `ARG BRAND` (default admmis-tech) and tag images `<brand>-<sha>`. See docs/standards.md §5 and docs/architecture.md (Environments).
Needed by: Fri 13 Nov · Reply: only if objecting

### 2026-11-06 21:10 MSK · satish → raj · T-202 · FYI
next/font/google downloads and self-hosts fonts at build time, so the CI/Docker build needs network access to fonts.gstatic.com. One image per brand (BRAND is build-time, per Hritik). See docs/frontend/design-tokens.md §8.1.
Needed by: week 2 · Reply: only if objecting

### 2026-11-06 21:20 MSK · pm → raj · T-501, T-502 · REQUEST
1. T-501 Infra plan & runbooks → `docs/runbooks/infra-setup.md` — due Fri 13 Nov. Reviewer: hritik. Mumbai VPS comparison (≥3 providers, specs, price/month, backups, support — cite URL + date), DNS plan for tech.admmis.org (Q17 DNS owner still unknown → TODO(roshan)), Cloudflare (WAF, Turnstile, R2), staging URL, Sentry + uptime, 24 h backups + restore test, 2FA checklist, and a numbered list of exact actions Roshan must do (accounts/payments are his). Budget reference: docs/budget.md.
2. T-502 Dockerfile, docker-compose (app + Postgres for dev), `.github/workflows/ci.yml` skeleton per `docs/ci-spec.md` — due Fri 13 Nov. Reviewer: hritik. Note hritik's FYI above: `ARG BRAND`, one image per brand, tags `<brand>-<sha>`. There is no app yet (T-103 pending), so files are skeletons that can't build until scaffold — say so; do not install or run anything that needs the app.
Answer the open questions to you in this inbox (hritik: runners, Postgres version, image size, dev compose; neha: worker cron, rate-limit rule, trusted-proxy header; satish's FYI).
Both technical → plans to pm AND hritik, wait for OK. No accounts, no sign-ups, no secrets, no git.
Needed by: see dates · Reply: plan paths + DONE

### 2026-11-06 21:50 MSK · pm → raj · T-501 · FYI (research results that reached pm instead of you)
Fetched 2026-11-06 by your web-fetch helpers. Prices "at check date", USD, ex-tax.
1. Vultr — https://www.vultr.com/pricing/ returned HTTP 403 (blocks automated fetch). No figures. Use another source or TODO(roshan): verify in browser.
2. AWS Lightsail — https://aws.amazon.com/lightsail/pricing/ (HTTP 200). Linux bundles with IPv4: $12/mo = 2 GB RAM, 2 vCPU, 60 GB SSD, 3 TB transfer; $24/mo = 4 GB, 2 vCPU, 80 GB SSD, 4 TB; $44/mo = 8 GB, 2 vCPU, 160 GB, 5 TB. Mumbai (ap-south-1): "include half the data transfer allowances" (so $24 plan = 2 TB). Page has one USD table, no Mumbai-specific price stated. Snapshots (manual + automatic) $0.05/GB-mo; block storage $0.10/GB-mo.
3. Linode / Akamai Cloud — linode.com/pricing 301 → https://www.akamai.com/cloud/pricing/cpu and /backups. Shared CPU: Linode 2 GB $12/mo (1 CPU, 50 GB, 2 TB); Linode 4 GB $24/mo (2 CPU, 80 GB, 4 TB); egress overage $0.005/GB. Backups: $2.50/mo (2 GB plan), $5.00/mo (4 GB plan); headline "$2/month per GB" contradicts table — unresolved. Mumbai (in-bom-2) NOT confirmed on the page; FAQ says some prices differ by region → TODO verify.
Needed by: T-501 · Reply: not needed
4. DigitalOcean — https://www.digitalocean.com/pricing/droplets and https://docs.digitalocean.com/products/backups/details/pricing/ (HTTP 200). Basic: 2 GiB/1 vCPU/50 GiB/2 TB $12/mo; 2 GiB/2 vCPU/60 GiB/3 TB $18/mo; 4 GiB/2 vCPU/80 GiB/4 TB $24/mo (CPU variant tab not confirmed). Backups: weekly 20%, daily 30% of droplet cost (4 GB → +$4.80 / +$7.20, derived). Data centre in Bangalore, India confirmed (no Mumbai); no statement on regional price differences.
