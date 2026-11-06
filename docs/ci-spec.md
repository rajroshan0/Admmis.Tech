# CI Quality Gates — Specification

Owner: hritik (rules) with raj (implementation in `.github/workflows/`) · Task: T-101 · Version: v0.1 · 2026-11-06
Raj implements this in T-502. Where this spec and a workflow differ, the spec wins; send a `REQUEST` to change it.

## 1. Principles
- Merge to `main` requires every required job green. No manual bypass.
- Fast feedback first: cheap jobs run before expensive ones; independent jobs run in parallel.
- Hosted GitHub runners (`ubuntu-latest`) are the default assumption. Question to raj: any reason for self-hosted?
- Node version read from `.nvmrc`; pnpm from `packageManager`. Cache the pnpm store and `.next/cache`.
- Secrets only from GitHub Actions secrets; CI never prints env values. Pull-request builds from forks get no secrets.

## 2. Jobs

| # | Job | Runs | Command | Fails when | Required |
|---|---|---|---|---|---|
| 1 | `install` | every push/PR | `pnpm install --frozen-lockfile` | lockfile out of date | yes |
| 2 | `lint` | after 1 | `pnpm lint` (ESLint `--max-warnings 0`, includes jsx-a11y) and `pnpm format:check` | any warning/error | yes |
| 3 | `typecheck` | after 1 | `pnpm typecheck` | any TS error | yes |
| 4 | `unit` | after 1 | `pnpm test` (Vitest) with coverage report | failing test. Coverage is reported, not gated at launch | yes |
| 5 | `audit` | after 1 | `pnpm audit --prod --audit-level=high` | high or critical vuln in prod deps | yes |
| 6 | `build` | after 2-4 | `pnpm build` with dummy non-secret env from `.env.ci` | build error; missing `.env.example` key vs `env.ts` schema | yes |
| 7 | `bundle-budget` | after 6 | script reads `.next` build manifest, sums gzip first-load JS per public route | any content route > **150 KB** gzip | yes |
| 8 | `e2e` | after 6 | start app + Postgres service container, `pnpm test:e2e` (Playwright, Chromium + WebKit; axe checks) | failing test or new axe violation | yes |
| 9 | `lighthouse` | after 6 | `lhci autorun` on built app, routes below, mobile preset | thresholds below | yes (warn-only for first week after scaffold) |
| 10 | `docker` | after 6 on `main` and release tags | `docker build` (no push on PRs) | build fails; image > size set by raj | yes on `main` |
| 11 | `deploy-staging` | after all, push to `main` | raj's deploy workflow | — | needs Roshan approval to enable (CLAUDE.md §3) |
| 12 | `deploy-production` | manual, tag only | raj's deploy workflow with environment protection | — | Roshan approves each run |

## 3. Lighthouse CI

- Tool: `@lhci/cli` 0.16.0 (checked 2026-11-06), 3 runs per URL, median used.
- Preset: mobile, simulated Slow 4G throttling, 4x CPU slowdown (Lighthouse mobile defaults).
- Routes at launch: `/`, `/services/web-development` (service), `/pricing`, `/rent`, `/contact`, `/blog/<fixture>`. Add routes as templates land.
- Assertions (all `error` level):

| Metric | Threshold |
|---|---|
| `categories:performance` | ≥ 0.90 |
| `largest-contentful-paint` | ≤ 2500 ms |
| `cumulative-layout-shift` | ≤ 0.1 |
| `total-blocking-time` | ≤ 200 ms |
| `categories:accessibility` | ≥ 0.95 |
| `categories:seo` | ≥ 0.95 |
| `categories:best-practices` | ≥ 0.95 |

- Run against the production build with seeded fixture content, not against live data. Consent banner state: not accepted (the realistic first visit).
- Results uploaded as a job artifact; PR gets a summary comment (read-only token, no secrets).
- Lighthouse on a CI runner is noisy. If a route fails by < 3 points in one run, rerun once; two consecutive failures block. Real-device checks (low-end Android) remain a Rajaros task and are not replaced by this job.

## 4. Bundle budget script
`scripts/check-bundle-size.mjs` (hritik, written during scaffold): reads `.next/app-build-manifest.json` / build output, gzips each route's first-load JS, prints a table, exits non-zero when any public content route exceeds 150 KB. Excluded from the budget: `/admin` and Payload routes. The script prints the five largest chunks on failure to speed up debugging.

## 5. Branch protection (settings are Roshan's to apply, GitHub settings need his approval)
Required status checks: `lint`, `typecheck`, `unit`, `audit`, `build`, `bundle-budget`, `e2e`, `lighthouse` (after warm-up), `docker` (on main). Require 1 approving review (Hritik), linear history (squash), no force-push, no deletion of `main`, dismiss stale reviews on new commits.

## 6. Pipeline hygiene
- Concurrency group per branch; cancel superseded runs.
- Job timeouts: lint/typecheck 10 min; build 15 min; e2e 20 min; lighthouse 15 min.
- Dependabot (or Renovate) weekly, grouped, security updates immediate: proposals only, merged through the normal PR path.
- Actions pinned by commit SHA, not tags. Minimal `permissions:` (default `contents: read`).
- Flaky test policy: one retry in Playwright; a test retried 3 times in a week is fixed or removed by its owner.

## 7. Evidence for the Definition of Done
A task report links the CI run (or states local command output) for lint, typecheck, unit, build, plus Lighthouse numbers for UI tasks.

## 8. Open questions

| # | Question | To | By |
|---|---|---|---|
| 1 | GitHub-hosted runners acceptable, or any need for self-hosted? | raj | Fri 13 Nov |
| 2 | Postgres version and service-container image for `e2e` | raj | Fri 13 Nov |
| 3 | Docker image size ceiling | raj | Fri 13 Nov |
| 4 | Staging URL for post-deploy Lighthouse run | raj / Roshan | Gate 2 |

## 9. Static-route check
The `build` job parses the Next build output and fails if any public content route (`(site)`; excluded: `/api/*` and the `(preview)` route group) is dynamic (server-rendered per request) instead of static/ISR. Owner: hritik writes `scripts/check-static-routes.mjs` at scaffold.
