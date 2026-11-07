# Infrastructure setup runbook (T-501, T-503)

Owner: raj · Version: v0.2 DRAFT · 2026-11-07 (MSK) (v0.1 2026-11-06; v0.2 adds the USD 0 plan in section 0) · Reviewer: hritik · Approver: Roshan
Scope: hosting, DNS, Cloudflare, staging, monitoring, backups, 2FA, secrets for tech.admmis.org (ADR-015, ADR-017, ADR-027).

**Rules for this document.** Raj creates no accounts, buys nothing, changes no DNS (CLAUDE.md §3). Everything marked **[ROSHAN]** is done by Roshan. After he confirms, Raj verifies (section 15). Prices are USD, ex-tax, "at check date". Items marked `verify` could not be confirmed from a source.

Every section has: purpose, prerequisites, steps, how to verify, how to roll back.

---

## 0. v0.2 — USD 0 plan (T-503, ADR-037). READ THIS FIRST

Version v0.2 DRAFT · 2026-11-07 (MSK) · Reviewer: hritik · Approver: Roshan.
ADR-037 says: free services only until Roshan says otherwise. This section replaces the paid VPS plan of v0.1 for the first launch. Sections 2, 13 and 14 below are marked accordingly. Sections 4 to 12 still apply, with the changes listed in 0.5.

### 0.1 Free host near Nepal: Oracle Cloud Always Free (Ampere A1)

Source: https://docs.oracle.com/en-us/iaas/Content/FreeTier/resourceref.htm (read 2026-11-07, page shows no date).

| Fact | What Oracle's page says (summary) | Status |
|---|---|---|
| A1 compute | 1,500 OCPU-hours and 9,000 GB-hours per month, about **2 OCPU and 12 GB RAM in total**, 1 to 2 instances | Verified |
| Storage | 200 GB block storage in total including boot volumes, 5 backups. (Boot minimum is given as 47 GB in one place and 50 GB in another; page is inconsistent) | Verified |
| Outbound traffic | 10 TB per month free | Verified |
| Where | Always Free compute and block volumes only in the **home region** | Verified |
| Idle reclaim | Instances "may be reclaimed" if, over 7 days, CPU 95th percentile, network and memory (A1) are **all under 20%**. Whether Oracle stops or terminates is not stated | Verified |
| After the 30-day trial | Compute stays free "for the life of the account"; object storage is capped at 20 GB in Always-Free-only state and objects over the limit are deleted | Verified |
| Card needed at sign-up, and hold amount | The FAQ page returned HTTP 403 | **UNVERIFIED**. Assume a card is needed until proven otherwise |
| Mumbai or Hyderabad offered as home region to new sign-ups | Not confirmed | **UNVERIFIED** |
| Home region can be changed later | Not confirmed. Treat the home region as permanent | **UNVERIFIED** |
| Older figure of 4 OCPU / 24 GB | Seen in older third-party posts. Oracle's own page now says 2 / 12. We plan for 2 / 12 | Verified by page |

Note on cost vs ADR-037: a card on file is not spending, but Roshan must be comfortable giving a card to Oracle. Raj never enters card details. If a card is not acceptable, use the fallback in 0.3.

**Is 2 OCPU / 12 GB enough?** Yes. The app (Next.js standalone about 55 MB image part, Payload, Postgres 17, Caddy) needs roughly 1 to 2 GB of RAM at idle; production and staging as two compose projects on one host fit in 12 GB. Everything is below the 600/450 MB image ceiling set by Hritik.

### 0.2 The reclaim risk, stated honestly

A quiet brochure site WILL look idle. Memory under 20% of 12 GB means under about 2.4 GB, and a small app plus database uses less than that. If CPU, network and memory are all under 20% for 7 days, Oracle may reclaim the instance. That could mean downtime at the opening event on Fri 1 January 2027.

Mitigations, in order of preference:

| # | Mitigation | Cost | Status |
|---|---|---|---|
| 1 | Run staging and production on the same A1 instance and give Postgres a larger `shared_buffers` and the app a larger Node heap so memory use is genuinely above 20% (about 2.5 GB). The condition needs all three metrics low, so one honest metric above 20% prevents "idle" | 0 | Logic follows from Oracle's wording ("all"); effect UNVERIFIED in practice. Raj measures with `docker stats` after deploy |
| 2 | A scheduled job (systemd timer) doing real work: nightly encrypted backup, image prune, `pg_dump` verification restore, health checks. Adds CPU and network bursts | 0 | Helps, but p95 CPU under 20% stays likely, so do not rely on it alone |
| 3 | Do NOT run a fake CPU burner as a plan. It can breach Oracle's terms and wastes energy. If used, Roshan decides | 0 | Not recommended |
| 4 | Upgrade the Oracle account to "Pay As You Go" while staying inside Always Free limits (costs USD 0 if nothing paid is created). Commonly said to remove idle reclaim for the account | 0 but needs card | **UNVERIFIED**. Not stated on the page I read. Ask Oracle or read their reclamation policy before relying on it |
| 5 | Be rebuildable: all state is the Postgres dump and media in R2 (ADR-035). A new host plus `docker compose up` plus restore takes about 1 hour (runbook section 12). Uptime alerts tell us within 5 minutes | 0 | Design, Raj tests it in the monthly restore drill |
| 6 | Decision gate with a 7-day measurement before soft launch, see 0.6 | Fallback cost | Decision gate |

Residual risk: **MEDIUM**. Oracle can change Always Free terms or capacity at any time, and free capacity in a region can be unavailable when creating an instance (commonly reported by users, not verified by me).

### 0.3 Options compared

| | A. Oracle Always Free A1 (recommended for now) | B. Other free hosts | C. Cheapest paid fallback: AWS Lightsail Mumbai |
|---|---|---|---|
| Cost / month | USD 0 | USD 0 | 2 GB plan USD 12; 4 GB plan USD 24 (+ about 4 snapshots). Prices checked 2026-11-06, see section 2 |
| RAM / CPU | 12 GB / 2 OCPU Arm (Ampere), arm64 image needed | Not verified. Free tiers I know of are small (about 1 GB class VMs) or sleep when idle | 2 GB: 2 vCPU. 4 GB: 2 vCPU |
| Near Nepal | Mumbai or Hyderabad if offered as home region (UNVERIFIED) | Not verified | Mumbai confirmed |
| Reliability | Medium: no SLA I have seen, reclaim rule, capacity risk | Low to medium | High, with SLA and support plans |
| Reclaim / sleep policy | Idle reclaim, see 0.2 | Sleep on idle is common on free PaaS tiers; not suitable for a Postgres + Payload site | None |
| Docker Compose + Postgres fit | Yes, a full VM | Often no (PaaS, managed DB expiry) | Yes |
| Card needed | Probably (UNVERIFIED) | Varies | Yes |
| Lock-in / exit | Low (plain Ubuntu + compose) | Medium | Low |
| Verdict | Use it, with 0.2 mitigations and the decision gate | Not evaluated in depth: **no primary source read on 2026-11-07**. Candidates to check later: Google Cloud e2-micro Always Free, other VM free tiers. Do not plan on them | Fallback if Oracle is refused, reclaimed or fails the 15 Dec test |

Arm note (A): the Dockerfile and CI must build `linux/arm64` (Oracle A1 is Ampere Arm). Hritik's note: sharp on musl is untested. Raj adds a `docker buildx --platform linux/arm64` job to the CI skeleton and Hritik tests sharp on arm64 musl; if it fails, use a Debian slim base for the runtime image.

### 0.4 The free stack (ADR-037)

| Need | Service | USD |
|---|---|---|
| Host | Oracle Always Free A1, one VM, `docker compose` for production and staging (separate projects, ports and databases) | 0 |
| DNS, CDN, WAF, rate limit, Turnstile, R2 | Cloudflare Free (DNS move per `docs/runbooks/dns-cloudflare.md`). R2 free tier; Cloudflare may require a payment method on file for R2 (UNVERIFIED, v0.1 said verify) | 0 |
| Reverse proxy and HTTPS | Caddy, automatic Let's Encrypt, or Cloudflare Origin Certificate | 0 |
| Code, CI, images | GitHub Free, Actions, GHCR | 0 |
| Errors | Sentry Developer plan, server-side only (ADR-033) | 0 |
| Uptime | Free monitor, 5-minute checks (D3). 1-minute checks in the role file are a paid feature; we accept 5 minutes | 0 |
| Alerts | Slack free + email | 0 |
| Passwords | Bitwarden free. TODO(raj): check what the free plan allows for sharing items with Raj (not read). Fallback: Roshan enters secrets on the server himself | 0 |
| Backups | Encrypted dumps to R2 (within 10 GB free tier) plus a copy to Roshan's Mac once a week. Oracle block-volume backups: 5 free | 0 |
| Cost calculator (Phase 2) | Static, no host needed | 0 |

### 0.5 What changes in sections 4 to 12

| Section | Change |
|---|---|
| 2, 13 | Paid Lightsail plan is the **fallback**, not the plan. Staging is a second compose project on the same VM |
| 4 DNS | Use `docs/runbooks/dns-cloudflare.md`. On Free the whole of admmis.org must move (subdomain delegation is Enterprise only; partial setup is Business or Enterprise) |
| 6 Staging | `staging.tech.admmis.org` on the same VM, Cloudflare Access (free limits UNVERIFIED) or basic auth |
| 7 Hardening | Oracle VM: also set the Oracle Security List to open only 22, 80, 443 (or only Cloudflare IP ranges for 80/443); Ubuntu arm64 |
| 9 Lead worker | systemd timer every minute, unchanged. It also counts as the activity job in 0.2 #2 |
| 11 Monitoring | 5-minute checks; also alert when `docker stats` shows memory under 20% for 5 days (reclaim early warning) |
| 12 Backups | Unchanged (ADR-035). Add Oracle idle-reclaim recovery drill to the first monthly restore test |

### 0.6 Decision gate

Soft launch target is Mon 14 Dec 2026 (`team/RELEASE-PLAN.md`). The Oracle VM must therefore run a **7-day measurement ending Fri 11 Dec**: CPU p95, network, memory. If all three were under 20% in that window and mitigations 1 and 4 are not accepted, or if Oracle did not give us a Mumbai or Hyderabad home region, switch to fallback C (about USD 12 to 24 per month, new ADR, Roshan approves) before 14 Dec.

### 0.7 ADR proposal text (for PM to number)

> **ADR-04x (proposed, raj).** Hosting for launch: **Oracle Cloud Always Free, Ampere A1 (2 OCPU, 12 GB), in India (Mumbai or Hyderabad, whichever is offered as home region)**, one VM running production and staging as separate Docker Compose projects. Cost USD 0. Reasons: complies with ADR-037; enough RAM for the stack; Docker Compose portable to any VPS. Risks accepted: Oracle idle-reclaim rule (CPU p95, network and memory all under 20% over 7 days), no confirmed SLA, free capacity can vanish, a card is probably required. Mitigations: runbook section 0.2. Exit: AWS Lightsail Mumbai 2 or 4 GB (USD 12 to 24 per month) if the 7-day measurement in 0.6 fails or Oracle refuses the account. Changes ADR-017 hosting detail ("VPS in Mumbai") to "free VM in India, Mumbai preferred". Docker images must build for linux/arm64.

### 0.8 Exact actions for Roshan at USD 0 (replaces section 14)

Do them in this order. Hand secrets to Raj only through the agreed vault, never chat.

| # | Action | Time | Gives Raj | USD / month |
|---|---|---|---|---|
| 1 | Answer **Q17**: who runs DNS for admmis.org; registrar login; is DNSSEC on. Then follow `docs/runbooks/dns-cloudflare.md` | 1 h hands-on | confirmation | 0 |
| 2 | Turn on **2FA** on GitHub; confirm repo visibility; invite Raj as collaborator (Write) | 10 min | repo access | 0 |
| 3 | Create a free **Bitwarden** account with 2FA (check what the free plan allows for sharing with Raj) | 15 min | — | 0 |
| 4 | Create a free **Cloudflare** account with 2FA (before DNS step 1) | 10 min | — | 0 |
| 5 | Decide: is giving a **card to Oracle** acceptable (Raj never enters it)? If yes, create an **Oracle Cloud** account with 2FA, choose home region **India South (Mumbai)** or Hyderabad **(permanent, UNVERIFIED that it can be changed)**; then I give exact VM steps (Ubuntu 24.04 arm64, `VM.Standard.A1.Flex`, 2 OCPU, 12 GB, 100 GB boot, SSH key = public keys only, no password login) | 30 min | public IP, console access for Raj (IAM, limited) | 0 |
| 6 | In Cloudflare after the DNS move: Turnstile widgets, R2 buckets and tokens, WAF and rate-limit rules (section 5) | 40 min | tokens via vault | 0 |
| 7 | Create **Sentry** (Developer plan) + 2FA; project `admmis-tech`; give the DSN | 10 min | DSN | 0 |
| 8 | Create a free **uptime monitor** (5-minute checks) + 2FA | 15 min | — | 0 |
| 9 | Create **Slack** channels `#alerts-prod`, `#alerts-staging` with incoming webhooks; tell PM the alert email | 10 min | webhooks | 0 |
| 10 | GitHub environments `staging` and `production` (reviewer: Roshan), Actions secrets Raj lists, branch protection from `docs/ci-spec.md` §5 after the first push | 20 min | — | 0 |
| 11 | Approve the ADR in 0.7 and the retention policy (ADR-035 already approved) | 5 min | OK to PM | 0 |

Total cost: **USD 0 per month**. Roshan's time: about 3.5 hours. Items 1, 4, 5 unlock the most. If Oracle is refused or fails, section 0.6 applies and the cost becomes USD 12 to 24 per month: that is a new decision.

---

## 1. Target architecture (one picture)

```
Visitor (Nepal / world)
   │  HTTPS
Cloudflare (proxy, WAF, cache, rate limit, Turnstile)   ← DNS for tech.admmis.org
   │  HTTPS (Full strict, Cloudflare Origin CA cert), only Cloudflare IPs allowed on 443
VPS Mumbai ── Caddy (reverse proxy, TLS)
               └─ app container  (Next.js + Payload, image <brand>-<sha> from GHCR, non-root)
               └─ postgres:17 container (named volume, not exposed)
   systemd timers on the host: lead-worker (every 1 min), backup (daily 02:30 UTC)
   │
Cloudflare R2: media bucket · backup bucket (encrypted dumps)
Sentry (errors) · Uptime monitor (1 min) · Slack + email alerts
```

Environments (identical image per brand, different runtime env):

| Env | URL | Branch | VPS | Deploy |
|---|---|---|---|---|
| production | `https://tech.admmis.org` | `main` (tag) | prod VPS | manual approval by Roshan |
| staging | `https://staging.tech.admmis.org` | `staging` / `main` after CI | staging VPS | automatic after CI (enabled only after Roshan approves) |
| local | `http://localhost:3000` | any | developer machine | `pnpm dev` + `docker-compose.dev.yml` (Postgres only) |

Images are built **in CI** (GitHub Actions) and pushed to GHCR (GitHub Container Registry, private package). The VPS only pulls; it never builds. Tag scheme `<brand>-<sha>` (ADR-027).

---

## 2. VPS provider comparison (PAID FALLBACK since ADR-037; v0.1 data from 2026-11-06)

Requirement (ADR-017): VPS in Mumbai region, new accounts, 2FA, backups every 24 h. Need: about 2 vCPU / 4 GB RAM for production (Next.js + Payload + Postgres + Caddy), 2 GB for staging.

Checked 2026-11-06 by Raj's fetch helpers. Source URLs in the last column.

| | AWS Lightsail | DigitalOcean | Linode (Akamai Cloud) | Vultr |
|---|---|---|---|---|
| India location | **Mumbai (ap-south-1) confirmed** | **Bangalore** confirmed; **no Mumbai** | Mumbai (in-bom-2) **not confirmed** on pricing page → verify | page blocked automated fetch (HTTP 403) → verify |
| 2 GB plan | $12/mo: 2 vCPU, 60 GB SSD, 3 TB transfer | $12/mo: 1 vCPU, 50 GiB, 2 TB | $12/mo: 1 vCPU, 50 GB, 2 TB | verify |
| 4 GB plan | **$24/mo: 2 vCPU, 80 GB SSD, 4 TB** | $24/mo: 2 vCPU, 80 GiB, 4 TB | $24/mo: 2 vCPU, 80 GB, 4 TB | verify |
| Mumbai price/transfer | Page states Mumbai includes **half** the transfer (4 TB plan → 2 TB); no Mumbai-specific price stated → confirm at checkout | n/a (Bangalore); no regional price statement | FAQ says some prices differ by region → verify | verify |
| Backups | Snapshots (manual + automatic) **$0.05/GB-month**; 80 GB disk ≈ $4/mo | Weekly 20% / daily 30% of droplet price (4 GB: +$4.80 weekly / +$7.20 daily, derived) | $2.50/mo (2 GB), $5.00/mo (4 GB) from table; the page headline "$2/month per GB" contradicts the table → unresolved | verify |
| Support | `verify` (AWS Basic support level; paid plans for technical cases) | `verify` | `verify` | `verify` |
| Sources (checked 2026-11-06) | aws.amazon.com/lightsail/pricing/ | digitalocean.com/pricing/droplets · docs.digitalocean.com/products/backups/details/pricing/ | akamai.com/cloud/pricing/cpu · /backups (linode.com/pricing redirects there) | vultr.com/pricing/ (403) |

Not researched: Indian providers (for example E2E Networks). Not recommended without research; listed so nobody thinks they were ruled out on evidence.

### Recommendation (PROPOSED, needs Roshan's OK)

**AWS Lightsail, Mumbai (ap-south-1).**
1. It is the only option in the comparison where a **Mumbai** data centre is confirmed by the source (ADR-017 says Mumbai; DigitalOcean's nearest is Bangalore).
2. Same 4 GB / 2 vCPU / 80 GB price point as the others ($24).
3. Daily automatic snapshots are a built-in second backup layer on top of our own encrypted dumps (section 12).
4. Upgrade path inside AWS if a rental client needs more.

Layout and cost:

| Item | Plan | USD/month |
|---|---|---|
| Production VPS | Lightsail 4 GB (2 vCPU, 80 GB) | 24 |
| Staging VPS | Lightsail 2 GB (2 vCPU, 60 GB) | 12 |
| Automatic snapshots, production only (80 GB × $0.05) | | ≈ 4 |
| R2 (media + backups, within 10 GB free tier at first) | | 0 |
| **Total** | | **≈ 40** (upper edge of budget line USD 25-40, `budget.md` §3) |

**DECISION for Roshan (D-1): staging layout.** Both fit the budget line "VPS Mumbai, production + staging USD 25-40/month" (`budget.md` §3). Only Roshan approves the spend (CLAUDE.md §3).

| | A) Two VPS (Raj recommends) | B) One 4 GB VPS for both |
|---|---|---|
| Cost / month | ≈ USD 36 (24 + 12), ≈ 40 with production snapshots | ≈ USD 24, ≈ 28 with snapshots |
| Isolation | Staging load or a bad deploy cannot touch production | Shared CPU and RAM: a staging build or test can slow or crash production |
| Memory | 4 GB for production alone, comfortable | Two Payload instances + two Postgres on 4 GB is tight; OOM risk |
| Security | Separate hosts, separate firewalls and keys | One host holds both; compromise of staging reaches production |
| Rollback / experiments | Safe to test OS and Docker upgrades on staging first | Upgrades are tested on the live host |
| Saves | | ≈ USD 12/month (≈ USD 144/year) |

Reasons for A: a brochure site that is the agency's shop window and the base for paid rentals should not share a host with its test copy; USD 12/month is small against one avoidable outage. B is acceptable only as a temporary saving, and can be upgraded to A later by creating the second VPS (about 1 hour).

Fallback if Roshan prefers another provider: Linode 4 GB with Mumbai confirmed in the browser, or DigitalOcean Bangalore. Everything below works on any Ubuntu VPS; only section 7 step 1 changes.

**TODO(roshan): in the browser, confirm (a) the Mumbai price at checkout, (b) Lightsail support level, (c) optionally Vultr and Linode Mumbai availability.**

---

## 3. Accounts needed and 2FA checklist

**2FA is mandatory on every account (ADR-017).** Use an authenticator app or a hardware key. SMS only as a last resort. Save recovery codes in Bitwarden (a shared "ADMMIS.TECH infra" collection, access: Roshan, Raj).

| # | Account | Who owns | Cost | 2FA enabled? (tick) | Recovery codes in Bitwarden? |
|---|---|---|---|---|---|
| 1 | Bitwarden (Teams) | Roshan | ≈ $40/mo (budget.md) | ☐ | ☐ |
| 2 | GitHub (org/repo rajroshan0/Admmis.Tech) | Roshan | free | ☐ | ☐ |
| 3 | AWS (for Lightsail). Use a root account with 2FA, then an IAM admin user; never use root daily | Roshan | per use | ☐ | ☐ |
| 4 | Cloudflare | Roshan | free plan | ☐ | ☐ |
| 5 | Sentry | Roshan | free plan | ☐ | ☐ |
| 6 | Uptime monitor (section 11) | Roshan | free / low | ☐ | ☐ |
| 7 | Slack workspace (alerts) | Roshan | free | ☐ | ☐ |
| 8 | Registrar / DNS host of `admmis.org` (Q17) | Roshan | existing | ☐ | ☐ |
| 9 | Payload admin users (app level, built by Neha) | each editor | free | ☐ | n/a |
| 10 | Email provider for leads (Resend or Brevo; named in privacy policy) | Roshan, after Q10 | free tier | ☐ | ☐ |

Rules: unique password per account from Bitwarden (20+ chars); Raj gets least privilege (invite Raj as a member, not owner); no shared logins; a leaver is removed the same day.

---

## 4. DNS plan for tech.admmis.org

**Purpose.** Point `tech.admmis.org` to the production VPS through Cloudflare with the least risk to the existing `admmis.org`.

**Prerequisite: Q17 (who controls DNS for `admmis.org`) is unanswered. TODO(roshan).** Two ways:

| Option | What changes | Risk | Recommendation |
|---|---|---|---|
| **A. Delegate only the subdomain** to Cloudflare: add NS records for `tech` at the current DNS host pointing to Cloudflare's name servers (needs a Cloudflare plan that supports subdomain/partial setup, `verify`) | Only `tech.admmis.org` | Lowest for the main site; Cloudflare free plan may not support it (`verify`) | Use only if confirmed |
| **B. Move whole zone `admmis.org` to Cloudflare** (free): copy ALL existing records first, then change name servers at the registrar | Everything on `admmis.org` | Mail (MX/SPF/DKIM) or website outage if a record is missed | Fine if done carefully: export + compare + do it off-hours |
| **C. Keep DNS where it is**, add one record `tech` → CNAME/A (grey cloud, no Cloudflare proxy) | One record | Loses WAF, rate limit, Turnstile-in-front, caching | Not acceptable for production; OK as a temporary staging check |

Record set (final state, in Cloudflare):

| Name | Type | Value | Proxy |
|---|---|---|---|
| `tech` | A | production VPS public IPv4 `<PROD_IP>` | Proxied (orange) |
| `tech` | AAAA | only if the VPS has IPv6; else omit | Proxied |
| `staging.tech` | A | staging VPS IPv4 `<STAGING_IP>` | Proxied |
| `tech` | CAA | `0 issue "digicert.com"` and `0 issue "letsencrypt.org"` (Cloudflare edge certs) | DNS only |
| SSH | do not publish a hostname; connect by IP | | |

Mail records for `admmis.org` stay untouched. Any email sending for leads (SPF/DKIM for the provider) is added in a separate step after Q10.

How to verify: `dig +short tech.admmis.org` returns Cloudflare IPs (not the VPS IP); `curl -I https://tech.admmis.org` returns `server: cloudflare`.
Roll back: set the `tech` record back or delete it; TTL is 5 min (Auto) in Cloudflare. For option B rollback: restore name servers at the registrar (keep the old values in Bitwarden before the change).

---

## 5. Cloudflare setup

**Prerequisites:** Cloudflare account with 2FA (account 4), DNS plan decided (section 4).

Steps (all [ROSHAN] unless he gives Raj a scoped API token later):

1. Add site (zone) per section 4. Plan: **Free**.
2. SSL/TLS → mode **Full (strict)**. Edge: **Always Use HTTPS** on, **Minimum TLS 1.2**, **Automatic HTTPS Rewrites** on.
3. SSL/TLS → Origin Server → **Create Certificate** (RSA, 15 years) for `tech.admmis.org, staging.tech.admmis.org`. Download cert and key; store the key in Bitwarden; hand to Raj through Bitwarden (never in chat or repo). Raj installs it on the VPS (section 7).
4. **HSTS**: SSL/TLS → Edge Certificates → HSTS: max-age 6 months, no subdomains, no preload at first. Raise to 12 months and consider preload after launch week is stable (preload is hard to undo).
5. **WAF**: Security → WAF → Managed rules: enable what the Free plan provides (Cloudflare Free Managed Ruleset). `verify` exact list in dashboard.
6. **Rate limiting.** Free plan: **1 rate-limiting rule**, expression fields limited to path (Cloudflare docs, checked 2026-11-06: developers.cloudflare.com/waf/rate-limiting-rules/). So:
   - Rule 1 (the single Free rule): `URI Path starts with /api/leads` → **10 requests per 1 min per IP, action Block, duration 10 min** (Free plan period options include 10 s and 1 min). This protects the lead form (Neha's request; app has its own DB limits of 5 / 10 min as second line).
   - `/admin` (the role asks for a rate limit here too): **not possible as a second rule on Free**. Protect it instead by: Payload login throttling + mandatory 2FA (Neha), and optionally **Cloudflare Access** (free up to 50 users, `verify`) in front of `/admin*` so only team emails can even reach the login page. PROPOSED: enable Access before launch. Alternative: Pro plan ($25/mo, 2 rules, `verify` price) = not needed.
7. **Block internal route** from the public: Security → WAF → Custom rules: `URI Path starts with /api/internal/` → Block. The lead-worker timer calls the app on `127.0.0.1` on the VPS, never through Cloudflare, so this does not affect it (Neha's contract, `docs/api/leads.md` §6.3).
8. **Turnstile** (free, up to 20 widgets, 10 hostnames per widget, Cloudflare docs checked 2026-11-06): Turnstile → Add widget "tech-admmis-prod" hostnames `tech.admmis.org`; second widget "tech-admmis-staging" for `staging.tech.admmis.org` and `localhost` (test). Store **secret keys in Bitwarden**; give the **site key** (public) and secret to Raj for env files via Bitwarden. Env names: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`.
9. **Caching** (Rules → Cache Rules):
   - `/_next/static/*` → Eligible, Edge TTL 1 year, Browser TTL 1 year (content-hashed files).
   - `/_next/image*` → Eligible, respect origin headers.
   - Media on R2 custom domain (step 10): cache 1 month.
   - Never cache: `/api/*`, `/admin*`. HTML: **bypass** at launch (Next sends its own cache headers; revisit with Hritik for ISR HTML caching after launch).
10. **R2** (Storage): create buckets `admmis-tech-media` (public via custom domain `media.tech.admmis.org` or Cloudflare-managed `r2.dev` for dev only) and `admmis-tech-backups` (private). Free tier: 10 GB-month storage, 1 M class A, 10 M class B operations, egress free (developers.cloudflare.com/r2/pricing/, checked 2026-11-06). Create **two API tokens**: (a) app token, Object Read & Write on media bucket only; (b) backup token, Object Read & Write on backups bucket and Read on media bucket. Store in Bitwarden. Env names for the app (Hritik's scaffold plan): `R2_ACCOUNT_ID`, `R2_BUCKET`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` (Neha confirms final names).
    Backups bucket lifecycle rules (retention, section 12): prefix `daily/` delete after 8 days; `weekly/` after 35 days; `monthly/` after 100 days.
11. **Trusted client IP.** The VPS firewall only accepts 443 from Cloudflare IP ranges (section 7), so `CF-Connecting-IP` can be trusted. Env proposal for Neha: `TRUSTED_PROXY=cloudflare` (on staging and prod; unset locally). Neha reads the IP only from `CF-Connecting-IP` when set.
12. **Security headers.** Set by the app (`next.config.ts`, Hritik). Cloudflare only adds HSTS.
13. Staging: Cloudflare Access policy "staging": allow team emails only (so staging is neither public nor indexed); also `X-Robots-Tag: noindex` from Caddy on staging.

Verify: `curl -sI https://tech.admmis.org | grep -i -E 'server|strict-transport'`; submit 11 requests in a minute to `/api/leads` from a test machine and see 429/403 on the 11th (Raj does this after the lead API exists); `curl -i https://tech.admmis.org/api/internal/lead-worker` returns 403 from Cloudflare.
Roll back: pause the rule or set the proxy to DNS-only for the record (WAF off, site still works); delete the custom rule; certificate mode can be set to Full (not strict) temporarily if the origin cert breaks.

---

## 6. Staging

- URL: `https://staging.tech.admmis.org` behind Cloudflare Access (section 5 step 13). Lighthouse in CI for the staging URL (ci-spec §8 Q4) needs an Access **service token**; Raj adds it as a GitHub secret (`CF_ACCESS_CLIENT_ID`, `CF_ACCESS_CLIENT_SECRET`) after Roshan creates the token. Until then CI Lighthouse runs against the local build, as in ci-spec §3.
- Own Postgres, own R2 bucket prefix or bucket (`admmis-tech-media-staging`), own Turnstile widget, own Sentry environment tag `staging`, no real lead notifications (providers `log`, ADR default in `docs/api/leads.md` §11).
- Same image as production for the same brand and commit; only runtime env differs.

---

## 7. Server provisioning and hardening (production and staging)

**Purpose.** A hardened Ubuntu LTS VPS. **Prerequisites:** [ROSHAN] has created the VPS (section 14 actions 4-5) with SSH key login and sent the IP in Bitwarden. Raj then runs these steps over SSH (Raj needs SSH access: Roshan adds Raj's public key, and Raj records the commands in the report). If Roshan prefers to run them himself, the commands are copy-paste.

Steps (as root first, then as `deploy`):

1. **Create VPS:** Ubuntu 24.04 LTS (`verify` current LTS at purchase), region Mumbai, plan per section 2, enable **IPv4**, add **only** Raj's and Roshan's SSH public keys (generate keys per person; private keys stay on their machines).
2. **Users:** `adduser deploy`; add keys to `/home/deploy/.ssh/authorized_keys`; `usermod -aG docker deploy` after Docker install (note: docker group = root-equivalent; keep that user for deploys only).
3. **SSH hardening** (`/etc/ssh/sshd_config.d/10-hardening.conf`): `PermitRootLogin no`, `PasswordAuthentication no`, `KbdInteractiveAuthentication no`, `PubkeyAuthentication yes`, `AllowUsers deploy raj roshan`, `MaxAuthTries 3`, `X11Forwarding no`. Test a second SSH session before closing the first. Reload `sshd`.
4. **Firewall (ufw):** default deny incoming; allow `22/tcp`; allow `443/tcp` **only from Cloudflare IP ranges** (published at cloudflare.com/ips; script `infra/cloudflare-ips.sh` refreshes monthly); no port 80 (Cloudflare "Always Use HTTPS" handles it). Also set the same rules in the Lightsail firewall (second layer). Optionally restrict 22 to known IPs later.
5. **fail2ban:** `apt install fail2ban`; enable `sshd` jail (maxretry 4, bantime 1 h).
6. **Unattended security updates:** `apt install unattended-upgrades`; enable `Unattended-Upgrade::Automatic-Reboot "false"` (Raj schedules reboots; kernel updates need a planned reboot, runbook note) and alert by email on failure.
7. **Docker:** install Docker Engine from Docker's official apt repo (not snap). `/etc/docker/daemon.json`: `{"log-driver":"json-file","log-opts":{"max-size":"10m","max-file":"5"},"no-new-privileges":true,"live-restore":true}`.
8. **Time:** `timedatectl set-timezone UTC`; `chrony` running.
9. **Swap:** 2 GB swapfile on the 4 GB VPS (protects against OOM during Next start).
10. **Directory layout:** `/opt/admmis/` (compose file, `Caddyfile`, `certs/`, `.env.production` mode 600 owned by deploy, `backups/` scratch). Origin cert and key go to `/opt/admmis/certs/` mode 600.
11. **Compose and Caddy:** copy `docker-compose.yml` and `infra/Caddyfile` from the repo to `/opt/admmis/` (the deploy script does this, section 8).
12. **GHCR pull token:** a GitHub fine-grained token with `read:packages` only, `docker login ghcr.io` as `deploy`. Stored in Bitwarden.
13. **systemd timers** from `infra/systemd/` (lead worker every minute, backup daily). Install and enable (section 9, 12).
14. **Snapshots:** production only: enable Lightsail automatic snapshots (daily).

Verify (Raj): `ssh root@IP` refused; `ssh -o PasswordAuthentication=yes deploy@IP` refused; `ufw status verbose`; `nmap -Pn -p- IP` from outside shows only 22 (443 filtered to non-Cloudflare); `docker info | grep -i 'logging driver'`; `unattended-upgrade --dry-run`; `fail2ban-client status sshd`.
Roll back: Lightsail snapshot restore or destroy the instance (nothing else depends on it before launch). SSH lockout recovery: Lightsail browser SSH console.

---

## 8. Deploy mechanism

- CI builds `ghcr.io/rajroshan0/admmis-tech:<brand>-<sha>` (`.github/workflows/ci.yml`, job `docker`; push only on `main`/tags).
- `deploy.yml` (skeleton, disabled until Roshan approves, ci-spec jobs 11-12) connects by SSH as `deploy` with a **dedicated deploy key** whose `authorized_keys` entry is restricted: `command="/opt/admmis/deploy.sh",no-port-forwarding,no-agent-forwarding,no-pty`. The script (`infra/deploy.sh`) takes only the image tag, validates it with a regex, pulls, runs `docker compose up -d`, waits for the health check, and rolls back to the previous tag if unhealthy.
- Production: environment `production` in GitHub with required reviewer Roshan (a GitHub settings change, so [ROSHAN]).
- **Open (Hritik to propose to PM): database migrations on deploy.** `deploy.sh` does not migrate and the image has no Payload CLI. Until decided, deploy is not complete; the likely answer is committed migrations run at app start by the Postgres adapter. No change to `deploy.sh` until then.
- Release note: the previous tag is stored in `/opt/admmis/.previous-tag`. Manual rollback: `./deploy.sh <old-tag>`.

Verify: `curl -s https://tech.admmis.org/api/health` shows the build SHA (hritik's scaffold step 7). Roll back: as above.

---

## 9. Lead-worker scheduler (Neha's request)

Contract (`docs/api/leads.md` §6.3): `POST /api/internal/lead-worker` with header `x-worker-secret: $WORKER_SECRET`, every minute.

- Implementation: systemd timer `infra/systemd/lead-worker.timer` (every minute, `OnUnitActiveSec=60s`, `AccuracySec=1s`) → `lead-worker.service` runs `curl --fail --max-time 50 -X POST -H "x-worker-secret: $WORKER_SECRET" http://127.0.0.1:3000/api/internal/lead-worker`. The secret comes from `EnvironmentFile=/opt/admmis/.env.production` (mode 600), never on the command line in the repo.
- Why systemd not a cron container: failed runs are visible in `journalctl`, no extra container, no extra image.
- Heartbeat alert: uptime monitor (section 11) checks `/api/health`; Neha exposes the age of the oldest due job on `/api/health/ready` (field name `TODO(neha)`); alert when > 10 min. Until the field exists, the monitor only checks 200 OK.
- Public path is blocked in Cloudflare (section 5 step 7).

Verify: `systemctl list-timers | grep lead-worker`; `journalctl -u lead-worker -n 5`. Roll back: `systemctl disable --now lead-worker.timer` (leads still try once through `after()`).

---

## 10. Secrets handling

- Source of truth: **Bitwarden** shared collection. Runtime: `/opt/admmis/.env.production` (mode 600, owner deploy) created by hand from Bitwarden at first setup; changes done by Raj, logged in the vault item notes.
- CI: **GitHub Actions secrets** (repository or environment level). Production secrets only in the `production` environment (needs approval).
- `.env.example` (Hritik/T-103) lists names only. CI uses `.env.ci` with dummy non-secret values.
- Rotation: any secret that was pasted into chat or a file by mistake is treated as leaked and rotated. Schedule: review all secrets every 6 months and at team changes.
- Names expected so far (from `scaffold-plan.md` §5, `docs/api/leads.md` §11): `DATABASE_URL`, `PAYLOAD_SECRET`, `BRAND` (build-time), `ENABLED_LOCALES`, `NEXT_PUBLIC_SITE_URL`, `SITE_URL`, `R2_*`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `IP_HASH_SALT`, `WORKER_SECRET`, `LEAD_*`, `SENTRY_DSN`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_CLARITY_ID`, proposed `TRUSTED_PROXY`, `BACKUP_*` (host only). Note `NEXT_PUBLIC_*` values are **embedded in the client JS at build time**, so they must be public IDs only.

---

## 11. Monitoring and alerts

| What | Tool | Setting | Alert to |
|---|---|---|---|
| Server-side errors (client SDK only after Hritik's decision: the empty home page already uses 133 of 150 KB JS) | **Sentry** (free Developer plan `verify` limits; Team plan paid if needed) | Next.js server SDK only at launch, or client SDK lazy-loaded after idle; `beforeSend` scrubs bodies, headers, cookies, user data (Hritik/Raj in `sentry.*.config.ts`); environments `production`, `staging`; only DSN as env | Slack + email |
| Uptime | HTTP monitor, **every 1 min** on `https://tech.admmis.org/` and `/api/health` | 1-minute interval may need a paid tier on common free monitors (`verify`: UptimeRobot, Better Stack). Start with the free interval (commonly 3-5 min). A paid plan for 1-minute checks is a spend decision for Roshan (D-2); price `verify` | Slack + email |
| Lead worker heartbeat | monitor on `/api/health/ready` (checks DB + oldest due job age; route to be added by Neha, requested). `/api/health` stays DB-free for Docker and Caddy so a DB outage does not restart the app | alert if oldest due job > 10 min | Slack + email |
| Backup heartbeat | monitor "heartbeat/cron" URL pinged by `backup.sh` after success | alert if no ping for 26 h | Slack + email |
| TLS certificate | uptime tool check; origin cert valid 15 years, Cloudflare edge auto-renews | alert at 14 days | email |
| Host | Lightsail console metrics: CPU, network; alarm on CPU > 80% for 10 min `verify` | | email |
| Disk | `df` check in backup script; alert (non-zero exit) if > 80% | | via backup heartbeat |

Slack: channel `#alerts-prod` and `#alerts-staging`; incoming webhook URL is a secret (Bitwarden), and an email group alias (TODO(roshan): which address).

Verify: stop the app container on staging, confirm an alert arrives within 3 minutes; trigger a test Sentry error from staging. Roll back: pause monitors.

---

## 12. Backups and restore test (ADR-017: every 24 h)

**Design.**
- **PostgreSQL:** `pg_dump -Fc` from the Postgres container, daily 02:30 UTC (08:15 NPT, low traffic), encrypted with **age** using a **public key stored on the server**; the **private key lives only in Bitwarden** (and printed offline by Roshan). A server compromise therefore cannot read old backups.
- **Media:** media is stored in R2 (not on the VPS disk). Daily `rclone copy` (copy, not sync, so an accidental delete is not propagated) from the media bucket to `backups/media-mirror/`. R2 object versioning is not relied on (`verify` availability).
- **Upload:** to R2 bucket `admmis-tech-backups`: always `daily/`; on Sundays also `weekly/`; on day 1 of the month also `monthly/`. Lifecycle rules (section 5 step 10) do the pruning, so no deletion code is in the script.
- **Retention (PROPOSED, needs Roshan's OK):** 7 daily, 4 weekly, 3 monthly.
- **Second layer:** Lightsail daily snapshot (production).
- **Alert:** success ping after upload; no ping for 26 h → alert.
- **Size estimate:** DB dumps are small (megabytes) for a brochure/CMS site; 14 objects plus media mirror fit the free 10 GB tier at launch.

Script: `infra/backup/backup.sh`; units `infra/systemd/backup.service` and `backup.timer`.

**Monthly restore test** (first Tuesday of the month, 30 minutes, Raj; Roshan gets a short result note). Done on a throwaway machine or the staging VPS, never over production:

1. Pull the newest `daily/` dump from R2 with the backup token.
2. `age -d -i <private key from Bitwarden> dump.age > dump.pgc`.
3. Start an empty `postgres:17` container; `pg_restore --no-owner --clean --if-exists -d app dump.pgc`.
4. Check: tables exist; `SELECT count(*)` for `leads`, `pages`, `users` is plausible vs production (compare with yesterday's counts logged by the backup script); newest lead timestamp is within 26 h.
5. Start the staging app image against the restored database; `/api/health` is 200 and `/admin` login works.
6. Restore one media file from `media-mirror/` and open it.
7. Record in `docs/runbooks/restore-log.md`: date, dump name, size, time to restore (RTO measured), counts, result, problems. A failed test is a P1 for Raj.

Expected targets (PROPOSED): RPO ≤ 24 h (daily dump), RTO ≤ 2 h (new VPS + restore + DNS).

**Disaster recovery sketch (new VPS):** create VPS → section 7 → restore dump (step 3 above) → set `.env.production` from Bitwarden → `deploy.sh <last tag>` → point Cloudflare A record to the new IP.

Roll back (the backup system itself): `systemctl disable --now backup.timer`; nothing else depends on it.

---

## 13. Cost summary of the PAID fallback (v0.1). Current plan costs USD 0, see section 0

| Item | USD |
|---|---|
| VPS production 4 GB + staging 2 GB + production snapshots | ≈ 40 |
| Cloudflare Free, Turnstile, R2 within free tier, GHCR (private packages: free allowance `verify`), Sentry Developer | 0 |
| Uptime monitor with 1-min checks | 0 to low, `verify` |
| Bitwarden Teams (budget.md) | ≈ 40 |
| Slack, GitHub | 0 |

---

## 14. SUPERSEDED paid-plan actions (v0.1). Use section 0.8 instead

Do them in this order. Each says what you give Raj, and how (always Bitwarden, never chat).

| # | Action | Time | Gives Raj | USD / month |
|---|---|---|---|---|
| 1 | Answer **Q17**: who controls DNS for `admmis.org` (registrar name, who has login). Decide DNS option A/B/C (section 4) | 10 min | decision | 0 |
| 2 | Create **Bitwarden Teams** account, enable 2FA, create collection "ADMMIS.TECH infra", invite Raj as member (≈ $40/mo) | 15 min | invite | ≈ 40 |
| 3 | Turn on **2FA** on GitHub; confirm repo `rajroshan0/Admmis.Tech` (private?) and invite Raj as collaborator with Write access | 10 min | repo access | 0 |
| 4 | Create **AWS account** (root + 2FA + billing alert at USD 50), create IAM admin user, create **Lightsail** instance in **Mumbai**, Ubuntu 24.04 LTS, 4 GB plan, SSH key = Raj's and Roshan's public keys only, name `admmis-prod`, then attach a **static IP**, enable **daily automatic snapshot** | 25 min | IP, console access for Raj (IAM user with Lightsail access only) | 24 + ≈ 4 snapshots (option A or B) |
| 5 | Create the second Lightsail instance, 2 GB, `admmis-staging`, static IP | 10 min | IP | 12 (option A only; skip under option B) |
| 6 | Create **Cloudflare** account + 2FA; add the zone per section 4 (after step 1). Do the settings in section 5 steps 1-9, 13 (about 40 min), or invite Raj as Administrator limited to this zone (preferred, least privilege) | 40 min | none, or invite | 0 (Free plan) |
| 7 | In Cloudflare: **R2** → enable (payment method required by Cloudflare even for free tier `verify`), create the 2 buckets and the 2 API tokens (section 5 step 10); **Turnstile** widgets (step 8); **Origin Certificate** (step 3) | 25 min | tokens, keys, cert via Bitwarden | 0 within free tier (R2 needs a payment method on file) |
| 8 | Create **Sentry** account + 2FA, project `admmis-tech` (Next.js), copy DSN | 10 min | DSN | 0 (Free plan) |
| 9 | Create an **uptime monitor** account (Better Stack or UptimeRobot), 2FA, create monitors per section 11 once Raj sends the URL list; decide free interval vs paid 1-min plan | 20 min | none | 0 free interval; paid 1-min plan = D-2, price `verify` |
| 10 | Create **Slack** workspace channels `#alerts-prod`, `#alerts-staging`, an incoming webhook for each, tell PM which email receives alerts | 10 min | webhook URLs (Bitwarden) | 0 |
| 11 | In GitHub: create GitHub environments `staging` and `production` (reviewer: Roshan), add Actions secrets Raj lists (section 8), apply branch protection from `docs/ci-spec.md` §5 (**after the first push**, which is also Roshan's) | 20 min | none | 0 |
| 12 | Decide **D-1** (two VPS ≈ $36-40/mo, or one VPS ≈ $24-28/mo), **D-2** (free 5-min uptime checks, or paid 1-min plan), and approve the **retention policy** (7 daily / 4 weekly / 3 monthly) | 5 min | OK to PM | decisions D-1, D-2, retention |

Monthly total at launch: about USD 40 (A) or 28 (B) for servers, plus Bitwarden ≈ 40. Total: about 3 hours of his time. Items 4-5 are the first ones that unlock work (server hardening, first deploy). Items 6-7 need item 1.

---

## 15. Raj's verification after Roshan confirms

| After action | Raj checks |
|---|---|
| 4-5 | SSH works with keys only; section 7 steps and verify commands; screenshot-free evidence pasted in the report |
| 6-7 | `dig`, `curl -I` header checks (section 5 verify); R2 test upload with the backup token; origin cert installed and `Full (strict)` returns 200 |
| 8-10 | Test Sentry event, test alert in Slack, simulated outage |
| 11 | CI first run on a branch; production job blocks until approval |
| first backup | object in `daily/`, heartbeat ping received; then the first restore test within one week |

---

## 16. Open questions / TODO list

| # | Item | Owner |
|---|---|---|
| 1 | TODO(roshan): Q17 DNS owner and option | Roshan |
| 2 | TODO(roshan): verify Lightsail Mumbai price, support level; optionally Vultr, Linode Mumbai | Roshan |
| 3 | TODO(roshan): alert email address / group | Roshan |
| 4 | D-1 and D-2 decisions (PM carries to the Gate 1 pack) | Roshan |
| 5 | TODO(neha): new route `/api/health/ready` with oldest due job age; confirm R2 env names; `TRUSTED_PROXY` semantics | Neha |
| 6 | TODO(hritik): confirm `output: 'standalone'` and health route response shape | Hritik |
| 7 | verify: Free plan Cloudflare Access limit, Sentry free limits, uptime plans, Ubuntu LTS at purchase | Raj |
| 8 | Privacy policy must name processors: Cloudflare, Sentry, hosting, email provider, chat tool, CRM (leads.md §10) | Sudip / PM |

## Sources
- Oracle Always Free resources: https://docs.oracle.com/en-us/iaas/Content/FreeTier/resourceref.htm (read 2026-11-07, no page date). Oracle FAQ https://www.oracle.com/cloud/free/faq/ returned HTTP 403, not read.
- Cloudflare zone setups: see `docs/runbooks/dns-cloudflare.md` (read 2026-11-07).

Checked 2026-11-06 (v0.1):

- https://aws.amazon.com/lightsail/pricing/
- https://www.digitalocean.com/pricing/droplets · https://docs.digitalocean.com/products/backups/details/pricing/
- https://www.akamai.com/cloud/pricing/cpu · https://www.akamai.com/cloud/pricing/backups
- https://www.vultr.com/pricing/ (HTTP 403 to automated fetch; no figures used)
- https://developers.cloudflare.com/r2/pricing/ (page updated Oct 30, 2026)
- https://developers.cloudflare.com/waf/rate-limiting-rules/ (Free: 1 rule, path field)
- https://developers.cloudflare.com/turnstile/plans/ (Free: 20 widgets, 10 hostnames per widget; page updated Aug 14, 2026)
