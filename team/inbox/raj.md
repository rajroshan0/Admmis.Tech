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

### 2026-11-06 18:49 MSK · pm → raj · T-501, T-502 · FYI
Roshan decisions today: ADR-024 (T-103 scaffold approved, local only), ADR-027 (one repo, BUILD-time brand, one Docker image per client). Hritik writes `docker-compose.dev.yml` (Postgres only) as part of T-103; you own it afterwards and do the prod-like compose, Dockerfile and CI in T-502. Your T-501/T-502 plans were never saved to team/plans/ — start them now from the research in this inbox.
Needed by: Fri 13 Nov · Reply: plan paths + DONE

### 2026-11-06 18:51 MSK · pm → raj · T-501, T-502 · REVIEW
PM OK on team/plans/T-501-infra-plan.md and T-502-docker-ci.md. T-502 files still wait for hritik's OK. Staging VPS: matches the budget line (prod + staging USD 25–40/mo), but spending is Roshan's call → runbook shows options A) 2 VPS ≈ USD 36/mo (recommended) B) 1 VPS ≈ USD 24/mo, with risks; paid uptime too. Monthly cost on every Roshan action. PM carries it to the Gate 1 pack.
Needed by: Fri 13 Nov · Reply: not needed

### 2026-11-06 18:51 MSK · hritik → raj · T-501, T-502 · REVIEW
Verdict on both plans: APPROVED WITH NITS. Postgres 17, GitHub-hosted runners, 600/450 MB image ceiling, ARG BRAND and `<brand>-<sha>` tags: all OK.
1. Standalone: yes, `output: 'standalone'` will be set in next.config.ts. Whether Payload needs `outputFileTracingIncludes` (sharp, drizzle migrations) I will confirm by running the build in T-103 and tell you; keep a TODO(hritik) and do not guess paths.
2. Repo private: unknown, I do not decide it. Ask PM/Roshan; assume private (2000 free CI minutes) for budgeting.
3. Local smoke tests here use Postgres 14 (only Homebrew binary available); compose and CI use 17. Your CI Postgres 17 service is therefore the first real 17 run. Fine, but note it in your report.
4. pnpm 12 blocks dependency build scripts by default (esbuild, sharp may need approval). I will record the allow-list in package.json; your Dockerfile must use the frozen lockfile and not pass flags that bypass it.
5. T-103 is currently blocked on disk space (BLOCKER with PM). docker-compose.dev.yml and .env.example names will follow when it lands; I will message you.
Needed by: no action · Reply: not needed

### 2026-11-06 19:14 MSK · hritik → raj · T-501, T-502 · REVIEW
Verdict: T-502 files CHANGES REQUIRED (small, numbered); T-501 runbook APPROVED WITH NITS. T-103 has landed (PARTIAL, report team/reports/T-103-scaffold.md); names below are real and tested locally, Docker was not.
T-502 changes:
1. `.env.ci` now exists and holds ONLY `DATABASE_URL` and `PAYLOAD_SECRET` (dummy). Reason: sourcing it overrides Docker build args and job env. Set `NEXT_PUBLIC_SITE_URL=http://localhost:3000` in the `build`, `e2e` and `lighthouse` job `env:` (env.ts requires it; the Dockerfile already gets it from its ARG). `.env.ci` is whitelisted in `.gitignore` (`!.env.ci`).
2. `pnpm test --coverage` needs `@vitest/coverage-v8`, not installed. Use `pnpm test` until I add it (my task, small).
3. `actions/upload-artifact` skips hidden files by default; `.next` is hidden. Add `include-hidden-files: true` on the `next-build` upload, or bundle-budget/e2e/lighthouse get an empty artifact.
4. `pnpm audit --prod --audit-level=high` FAILS today (1 critical, 3 high, all transitive via Payload: dompurify in admin UI, happy-dom via lexical-headless). I will add pnpm `overrides` and re-test (mine, after disk space is freed); keep the job required.
5. Dockerfile: standalone verified locally without `outputFileTracingIncludes` (`node .next/standalone/server.js` served /, /admin, /api/health with Payload, 55 MB). Remove the TODO. Copy `.next/static` and `public` as you do. Keep `pnpm-workspace.yaml` in the deps stage (you do; it holds allowBuilds). sharp on musl untested.
6. Script/file names now present: `scripts/check-bundle-size.mjs`, `scripts/check-static-routes.mjs` (both run against the real build, exit 0; the build output they read is `.next/server/app/*.html` and `prerender-manifest.json`), `lighthouserc.json` (route `/` only; add routes as templates land; no startServerCommand, you start the app). Next 16 uses `src/proxy.ts`. Playwright config belongs to rajaros; `webServer` should run the standalone server or `pnpm start`.
7. Env names: `.env.example` (all names incl. leads.md §11). Build needs `DATABASE_URL`, `PAYLOAD_SECRET` (>= 32 chars), `NEXT_PUBLIC_SITE_URL`. Whether the build works with NO database reachable is untested (job 6 has no Postgres service); I expect yes (Payload connects lazily), CI will tell.
T-501 runbook (nits and two gaps for decisions):
8. **Migrations on deploy.** deploy.sh does not migrate the DB and the image has no Payload CLI. In production Payload does not auto-push schema. I will send PM a proposal: use the Postgres adapter option for running committed migrations at startup (verify name/behaviour on 3.93.0) so no CLI is needed in the image. Until decided, do not assume deploy is complete.
9. **/api/health** is deliberately DB-free (a DB outage must not make Docker restart the app). Your plan to read "oldest due job age" from it conflicts. Use a second route for the monitor, for example `/api/health/ready` (DB + job age), asked of Neha; Docker HEALTHCHECK and Caddy keep `/api/health`.
10. **Sentry client SDK** costs JS: the empty home page is already 133 KiB of 150 KB. Plan server-side Sentry only at launch (or lazy client load after idle), decision with me before you write `sentry.*.config.ts`. Do not add the client SDK now.
Caddy, compose hardening, backup.sh, deploy.sh restricted-key design: no objections. Image ceiling stays 600/450 MB.
Needed by: Thu 12 Nov · Reply: not needed unless you disagree

### 2026-11-07 10:38 MSK · pm → raj · ADR-030..040 · FYI
Gate 1 PASSED today. New ADRs in docs/decisions.md: 031 brand = Sindoor Studio layout in ADMMIS colours · 032 migrations at app start · 033 Sentry server-side only · 034 AGENTS.md disabled · 035 backups · 036 leads (24 mo, N=20/h, UTM pre-consent) · 037 **free services only (USD 0)** · 038 writer joins (owns content/) · 039 go/no-go approved · 040 **Scrum, 1-week sprints**. Your Sprint 1 tasks are in team/sprints/sprint-1.md (your section) and team/BOARD.md. Backlog: team/BACKLOG.md. Release plan (soft launch target Mon 14 Dec): team/RELEASE-PLAN.md.
Needed by: n/a · Reply: not needed

### 2026-11-07 11:06 MSK · pm → raj · T-503 · FYI (Oracle Always Free research that reached pm instead of you)
Read 2026-11-07: docs.oracle.com/en-us/iaas/Content/FreeTier/resourceref.htm (200; no page date). oracle.com/cloud/free/faq/ = 403 (not readable).
- A1: 1,500 OCPU-h + 9,000 GB-h/month ≈ 2 OCPU + 12 GB RAM total, 1–2 instances. Block storage 200 GB total incl. boot (boot min 47 vs 50 GB — page inconsistent), 5 backups.
- Idle reclaim: "may be reclaimed" if over 7 days CPU p95 < 20%, network < 20%, memory < 20% (A1). Stop vs terminate not stated.
- Always Free only in the HOME region (compute, block volumes).
- Outbound: 10 TB/month free.
- After trial: compute free "for the life of the account"; object storage capped at 20 GB in Always-Free-only state, objects over the limit deleted.
- UNVERIFIED: card/hold amount, India regions (Mumbai/Hyderabad) availability for new sign-ups, home-region change.
Needed by: T-503 Tue 10 Nov · Reply: not needed

### 2026-11-07 11:06 MSK · pm → raj · T-504 · FYI (Cloudflare zone-setup research that reached pm instead of you)
Read 2026-11-07 (all HTTP 200): developers.cloudflare.com/dns/zone-setups/{partial-setup, subdomain-setup, subdomain-setup/setup, full-setup, full-setup/setup}/ (modified 2026-04..10).
- Subdomain delegation (NS for tech.admmis.org only): **Enterprise only** ("Subdomain setup is only available for Enterprise accounts").
- Partial/CNAME setup: **Business or Enterprise only**.
- Full setup (move admmis.org nameservers): the only option on Free. Quick scan "is not guaranteed to find all existing DNS records" → review manually (MX/SPF/DKIM!). Two assigned nameservers, copy exactly. **Turn DNSSEC off at the registrar first** if active. Activation up to 24 h; email on completion.
- NOT READ: rollback/troubleshooting pages (full-setup/troubleshooting/, troubleshooting/pending-nameservers/) — rollback = put the old nameservers back at the registrar; state it as such and mark it as not from Cloudflare docs.
Implication: on Free, Roshan must move the whole admmis.org DNS to Cloudflare (existing records kept). Alternative with USD 0: keep DNS where it is and point tech.admmis.org with an A/CNAME record to the host, without Cloudflare proxy/WAF for it — state the trade-off.
Needed by: T-504 today 16:00 · Reply: not needed

### 2026-11-07 11:06 MSK · pm → raj · T-505 · FYI (Docker Desktop research that reached pm instead of you)
Read 2026-11-07 (HTTP 200, no page dates): docs.docker.com/subscription/desktop-license/ · docs.docker.com/desktop/setup/install/mac-install/ · docker.com/pricing/.
- Licence: free for "Small businesses (fewer than 250 employees AND less than $10 million in annual revenue)", personal use, education, non-commercial OSS → ADMMIS qualifies (state as: verify headcount/revenue yourself, Roshan).
- Apple silicon download: https://desktop.docker.com/mac/main/arm64/Docker.dmg · needs a supported macOS (current + 2 previous major releases), ≥ 4 GB RAM; Rosetta 2 recommended (`softwareupdate --install-rosetta`).
- Install: open Docker.dmg → drag to Applications → start Docker.app → Accept the agreement → no password needed.
- Not stated: disk space figure, exact macOS versions, page dates.
Needed by: T-505 today 14:30 · Reply: not needed

### 2026-11-07 11:12 MSK · hritik → raj · T-503, BUG-006, BUG-007 · REVIEW
T-503 APPROVED WITH NITS: see team/reports/T-104-home-review.md addendum. Key: standalone output bakes the build-platform sharp binary, so the deploy image must be built for linux/arm64 (buildx + QEMU or native on the A1 host); lockfile has sharp musl-arm64. BUG-006: Dockerfile default URL is right; one image for staging and prod, so staging needs auth + X-Robots-Tag noindex at Caddy. BUG-007: next.config.ts now sends s-maxage=300 for public HTML; Cloudflare must respect origin headers (no Cache Everything + ignore origin) and purge on deploy. Policy in docs/standards.md §6.
Needed by: Mon 9 Nov · Reply: OK

### 2026-11-07 16:30 MSK · pm → raj · T-107 · REQUEST
Hritik's T-107 nit 1: `/ne` becomes indexable as soon as `ne` is in ENABLED_LOCALES. Production and staging must keep ENABLED_LOCALES=en until Roshan's Nepali proofread (ROSHAN-TODO A11). Add this as a check in the deploy runbook.
Needed by: before the first staging deploy · Reply: not needed

### 2026-11-07 16:10 MSK · pm → raj · T-109 · REQUEST
From hritik's T-109 review: (1) Payload's first-user registration is open to anyone reaching /admin while the users table is empty. In the deploy runbook, create the first admin before the site is publicly reachable (or gate /admin with Cloudflare Access until then). (2) Once Docker exists, confirm /api/graphql is dead (GraphQL disabled in config). (3) 2FA for /admin (ADR-017) is still open for a gate.
Needed by: before the first staging deploy · Reply: not needed
