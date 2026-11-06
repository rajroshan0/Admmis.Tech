# Plan — T-103 App scaffold

Owner: hritik · Date: 2026-11-06 · Status: FYI to PM (approved in advance via docs/scaffold-plan.md and ADR-024)

## Goal
A local, runnable Next.js 16 + Payload 3 + Tailwind 4 app that follows `docs/scaffold-plan.md` §5 and `docs/standards.md` §2, with pnpm, `.env.example`, `docker-compose.dev.yml` (Postgres only), README "Getting started". No deploy, no accounts, no git.

## Inputs
CLAUDE.md, docs/scaffold-plan.md, docs/standards.md, docs/decisions.md (ADR-024, 027), PM brief in inbox.

## Approach
Follow scaffold-plan §5 steps 1-8, then the smoke tests of step 10. Payload `(payload)` route group is copied from the official blank template at 3.93.0 (not hand-written). Verify against a throwaway Homebrew Postgres 14 on port 54329 in /private/tmp; stop it afterwards.

## Deliverables
package.json, pnpm-lock.yaml, .nvmrc, tsconfig.json, next.config.ts, eslint.config.mjs, prettier.config.mjs, postcss.config.mjs, vitest.config.ts, src/** skeleton, `.env.example`, docker-compose.dev.yml, README §6, .gitignore update, team/reports/T-103-scaffold.md.

## Acceptance
typecheck, lint, test pass; dev serves `/`, `/admin`, `/api/health`; build succeeds; first-load JS for `/` recorded; server-only negative test; dev server and temp Postgres stopped.

## Assumptions
ASSUMPTION: Node 24.22.2 installed user-level via nvm; pnpm via corepack. Playwright/lhci installed as devDeps (per plan) but browsers not downloaded (disk 2.4 GB free).

## Risks
Disk space (stop at <1 GB free). Version incompatibilities: fall back per scaffold-plan §6 and record.

## Estimate
Half a day.
