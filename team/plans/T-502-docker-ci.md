# Plan — T-502 Dockerfile, compose, CI skeleton
Owner: raj · Date: 2026-11-06 · Due: Fri 13 Nov · Reviewer: hritik

## 1. Goal (in my own words)
Container and pipeline files ready the day the T-103 scaffold lands: a multi-stage Node 24 Dockerfile producing a small non-root image per brand (ARG BRAND), a prod-like compose (app + Postgres, plus scheduler for the lead worker), `.dockerignore`, and `.github/workflows/ci.yml` implementing docs/ci-spec.md jobs 1-10, plus a deploy workflow skeleton (jobs 11-12, disabled until Roshan approves).

## 2. Inputs I read
docs/ci-spec.md, docs/scaffold-plan.md (§4-§5), docs/standards.md §5, docs/architecture.md, inbox asks (hritik 14:40 and 19:50, satish, neha), ADR-024, ADR-027.

## 3. Approach
- Dockerfile stages: `deps` (pnpm fetch/install, frozen lockfile) -> `build` (ARG BRAND, build with dummy env, `output: standalone`) -> `runner` (node:24-alpine, non-root uid 10001, read-only friendly, HEALTHCHECK on /api/health). Base images pinned by tag + digest (checked 2026-11-06).
- Build needs network to fonts.gstatic.com (satish): fine on CI and on the build host.
- Secrets never baked in: only non-secret build args; `NEXT_PUBLIC_*` are build-time by Next design, passed as build args from non-secret values.
- CI: GitHub-hosted ubuntu-latest, actions pinned by commit SHA (resolved via GitHub API 2026-11-06), least-privilege `permissions`, concurrency cancel, timeouts per ci-spec §6.
- Dev compose: Hritik writes `docker-compose.dev.yml` (Postgres only); I own it after. I do not touch it before T-103 lands, to avoid clashes. My `docker-compose.yml` is prod-like and distinct.
- Alternative considered: build on the VPS. Rejected: slower, larger attack surface; CI builds and the VPS only pulls (registry choice in T-501: GHCR, free).

## 4. Steps
1. Draft files with TODO(raj)/TODO(hritik) markers where they depend on the scaffold (script names, standalone path).
2. Validate: YAML parse with Python; no Docker or actionlint on this machine, so no build or lint of workflows (stated in report).
3. Wait for hritik OK on file names, env var names, script names before finalising; adjust after T-103.
4. Report.

## 5. Deliverables
| File | Content |
|---|---|
| `Dockerfile` | multi-stage, ARG BRAND, non-root, healthcheck |
| `.dockerignore` | |
| `docker-compose.yml` | prod-like: app, postgres, worker-cron |
| `.github/workflows/ci.yml` | jobs per ci-spec |
| `.github/workflows/deploy.yml` | staging/production skeleton, manual approval, disabled |
| `.github/dependabot.yml` | weekly grouped, ci-spec §6 |
| `team/reports/T-502-docker-ci.md` | Report |

## 6. Acceptance criteria
- [ ] Files parse (YAML); every ci-spec job 1-10 present with the specified command and timeout
- [ ] No secrets; non-root; pinned bases; HEALTHCHECK; BRAND arg; tag scheme `<brand>-<sha>`
- [ ] Clear list of what is untested (no Docker here, no app yet)
- [ ] Answers to hritik (runners, Postgres, image size) and neha/satish in inbox

## 7. Assumptions · Risks · Questions
- ASSUMPTION: answers: GitHub-hosted runners yes; Postgres 17; image size ceiling 600 MB uncompressed (Payload + sharp is heavy; revisit after first real build, warn at 450 MB).
- ASSUMPTION: scripts in package.json match standards §14 (`lint`, `format:check`, `typecheck`, `test`, `build`, `test:e2e`); `scripts/check-bundle-size.mjs` and `scripts/check-static-routes.mjs` exist.
- RISK: untested images until Docker is available (CI is the first real build) -> first CI run on a branch after Roshan pushes.
- QUESTION (hritik): `output: 'standalone'` set in next.config.ts? Does Payload need extra files copied into standalone (`outputFileTracingIncludes`)? Is the repo private (affects free minutes)?

## 8. Estimate
~1 session, plus 0.5 to adapt after scaffold.
