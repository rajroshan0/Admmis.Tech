# Report — T-502 Dockerfile, compose, CI skeleton
Owner: raj · Date: 2026-11-06 · Status: PARTIAL (drafts complete; not finalised until hritik replies and T-103 lands)

## Delivered
| File | What it is |
|---|---|
| `Dockerfile` | multi-stage (deps, build, runner), Node 24 alpine pinned by digest, `ARG BRAND` (default admmis-tech), standalone output, non-root uid 10001, HEALTHCHECK on `/api/health` |
| `.dockerignore` | allows only `.env.example` and `.env.ci` into the context |
| `docker-compose.yml` | prod-like app + postgres:17 + Caddy, read-only app FS, cap_drop, loopback app port |
| `.github/workflows/ci.yml` | ci-spec jobs 1-10 with specified commands, timeouts, concurrency; image size ceiling check; GHCR push only on main/tags |
| `.github/workflows/deploy.yml` | jobs 11-12 skeleton, disabled unless `DEPLOY_ENABLED=true`, environment approval |
| `.github/actions/setup/action.yml`, `.github/dependabot.yml` | shared setup; weekly grouped updates |

## Acceptance criteria
- [x] YAML parses (Ruby YAML load of all workflow/compose files).
- [x] Every ci-spec job 1-10 present; all actions pinned by commit SHA, resolved with `gh api` on 2026-11-06 (versions in comments).
- [x] Base image digests fetched from Docker Hub 2026-11-06; no secrets; non-root; BRAND arg; tag scheme `<brand>-<sha>`.
- [ ] NOT verified: Docker build, compose up, workflow execution, actionlint. This machine has no Docker or actionlint and the app scaffold does not exist yet. The first CI run is the first real test.

## Decisions & assumptions made
- Answers sent to hritik: GitHub-hosted runners yes; Postgres 17; image ceiling 600 MB uncompressed (warn 450).
- Build needs network for next/font (satish's note); dummy env from `.env.ci` only exists in the build stage.
- `NEXT_PUBLIC_*` values are build args (non-secret by design).
- Dev compose and `.env.example` untouched (Hritik's in T-103).

## Open issues / risks
- TODO(hritik): `output: 'standalone'` and Payload tracing files; `.env.ci`; `scripts/check-bundle-size.mjs`, `scripts/check-static-routes.mjs`; pnpm 12 build-script approval for sharp (onlyBuiltDependencies); `lighthouserc.json`; Playwright `webServer` using `pnpm start`; script names per standards §14.
- RISK: read-only root FS may break Payload/Next writes; fallback is to drop `read_only` and keep tmpfs.
- Repo visibility affects free Actions minutes (private repo has a monthly cap).

## Handoffs
- → hritik: review file names, env names, script names. → neha: worker is a host systemd timer, not a container.
- → rajaros: e2e job contract in `ci.yml` job `e2e`.

## Needs Roshan
Nothing now. Later: enable deploy (`DEPLOY_ENABLED`), create GitHub environments, branch protection, after the first push.

## Next step
Waiting for hritik's message that T-103 landed (`docker-compose.dev.yml`, `.env.example`, `.env.ci`, `next.config.ts`, `scripts/`, `lighthouserc.json`, `playwright.config.ts`). Then:
1. Align `Dockerfile` and `ci.yml` with the real script names, env names and `output: 'standalone'` (check whether Payload needs `outputFileTracingIncludes`); use the lockfile and pnpm build-script allow-list as committed.
2. Take ownership of `docker-compose.dev.yml` (Postgres 17, same major as CI and production); check that `docker-compose.yml` env names match `.env.example`.
3. Re-run YAML parse; request a first CI run on a branch (Roshan pushes) and the first real image build; record the image size against the 600 MB ceiling; fix what breaks (watch the read-only root FS).
4. Update this report to DONE and message pm.

## Update after hritik review (2026-11-06)
Applied his items 1,2,3,5,6 (see inbox). Remaining: item 4 audit fix (hritik), migrations on deploy (hritik to PM), first CI run and Docker build (Roshan pushes). Status stays PARTIAL until the first CI run.
