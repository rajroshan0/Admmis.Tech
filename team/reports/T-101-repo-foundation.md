# Report — T-101 Repo foundation
Owner: hritik · Date: 2026-11-06 · Status: DONE (v0.1 drafts; standards formally due Wed 11 Nov, scaffold plan and CI spec Fri 13 Nov, all delivered early)

## Delivered
| File | What it is |
|---|---|
| `docs/standards.md` | Toolchain, folder structure, boundaries, coding/i18n/theming/perf/a11y/security/testing rules, commit + branch + PR + review policy, Definition of Done detail, fixed script names |
| `docs/scaffold-plan.md` | Pinned versions with source and date, dependency justifications, 11 ordered steps (not run), smoke tests, fallbacks |
| `docs/ci-spec.md` | 12 jobs, Lighthouse CI thresholds, bundle budget script, branch protection, hygiene, open questions for Raj |
| `docs/architecture.md` | Appended "Technical architecture" section: layers, caching, routing/i18n, theming, pricing, lead pipeline in code, environments, risks |
| `team/plans/T-101-repo-foundation.md` | Approved plan |

## Acceptance criteria
- [x] Every top-level folder has an owner and purpose (standards §2 and table below)
- [x] Standards cover role-file items; no ADR contradicted. Checked against ADR-003/004/006/007/013/014/017/019 by re-reading
- [x] Scaffold commands ordered and self-contained. Not executed by design (PM instruction)
- [x] CI spec states tool, threshold and failure behaviour per gate
- [x] Versions carry source and date: `npm view <pkg> version` and `nodejs.org/dist/index.json`, 2026-11-06. Payload peer range for Next checked via `npm view @payloadcms/next peerDependencies`
- [x] Only my own files edited

## Decisions & assumptions made
- PM direction applied: rental reuse is ONE repo, brand per deployment via `src/brands/<brand>/` + env `BRAND`. Forks left as an OPEN POINT in standards §5, not decided.
- Node 24 LTS and no-monorepo are written as PROPOSED (PM putting both to Roshan).
- TypeScript pinned to 5.9.3 rather than npm `latest` 7.0.2: compatibility of 7.x with Payload/Next/ESLint is unverified. ASSUMPTION; first thing tested at scaffold.
- ASSUMPTION: locale scheme EN unprefixed / NE `/ne/` (from sitemap), Mahendra confirms in T-302.
- ASSUMPTION: GitHub-hosted runners (asked Raj).
- I do not rely on `create-payload-app` flags (not verified); the scaffold copies only the `(payload)` route group.
- Commit format fixed as `T-### type(scope): summary`.
- Hritik's own code is reviewed by Neha or Satish (new rule, standards §12).

## Open issues / risks
- pnpm 12.18.0 / ESLint 10.14.0 are registry "latest" at check date; their fit with Next 16 and Node 24 is untested until scaffold. Fallbacks in scaffold plan §6.
- Lighthouse on shared CI runners is noisy; policy of one rerun is in the CI spec. Real-device checks stay with Rajaros.
- The scaffold itself (a new task, suggested ID T-103) is not yet on BOARD and needs Roshan's go-ahead, since it installs packages.

## Handoffs
- → raj: `docs/ci-spec.md`, scaffold env var names; questions in `team/inbox/raj.md` (runners, Postgres version, image size, dev compose).
- → neha, satish, mahendra: constraints for T-401/T-402, T-202, T-302 appended to their inboxes.
- → pm: proposed ownership table below; please apply to CLAUDE.md §7 and create T-103 (scaffold).

## Proposed CLAUDE.md §7 ownership table (replaces the table; PM applies)

| Path | Owner |
|---|---|
| `team/BOARD.md`, `docs/progress-log.md`, `docs/decisions.md`, `docs/open-questions.md`, `README.md`, `docs/gates/gate-1.md` and other gate packs | pm (decisions only after Roshan approves) |
| `docs/architecture.md`, `docs/standards.md`, `docs/scaffold-plan.md`, `docs/ci-spec.md`, `docs/gates/gate-*-tech-review.md`, `package.json`, `pnpm-lock.yaml`, `.nvmrc`, `tsconfig.json`, `eslint.config.mjs`, `prettier.config.mjs`, `next.config.ts`, `vitest.config.ts`, `.env.example`, `src/lib/env.ts`, `scripts/` | hritik |
| `design/` (brand, logo, wireframes, UI kit specs) | sharwan |
| `src/components/`, `src/styles/`, `src/brands/`, `docs/frontend/design-tokens.md`, `docs/frontend/component-inventory.md`, animations | satish |
| `src/app/(site)/`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/not-found.tsx`, `src/lib/i18n/`, `src/lib/seo/`, `src/lib/analytics/`, `src/messages/`, form UI, `docs/frontend/templates-and-routes.md`, `docs/frontend/i18n.md` | mahendra |
| `src/collections/`, `src/globals/`, `src/blocks-config/`, `src/payload.config.ts`, `src/app/(payload)/` (generated, change only via Neha), `src/app/api/`, `src/lib/server/`, `src/lib/schemas/` (shared with mahendra for form schemas: Neha owns the file, Mahendra requests changes), `docs/api/` | neha |
| `infra/`, `Dockerfile`, `docker-compose*.yml`, `.dockerignore`, `.github/workflows/`, `lighthouserc.json`, `.env.ci`, `docs/runbooks/` (CI quality rules in `docs/ci-spec.md` co-owned with hritik) | raj |
| `seo/` (keywords, sitemap, page briefs, schema and analytics specs) | sudip |
| `qa/`, `tests/e2e/`, `playwright.config.ts` | rajaros |
| `public/` | satish (assets), sharwan supplies sources |
| `src/**/*.test.ts` unit tests | the owner of the code under test |
| `team/plans/`, `team/reports/` | each person their own files |
| `team/inbox/*` | append only, by anyone |

Note: the `src/` tree is created by the scaffold step, not before.

## Needs Roshan
- ADR approval: Node 24 LTS; no monorepo (PM already raising).
- Go-ahead for the scaffold (installs packages) after Gate 1.
- Later, apply GitHub branch protection (ci-spec §5).
