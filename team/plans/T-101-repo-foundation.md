# Plan — T-101 Repo foundation
Owner: hritik · Date: 2026-11-06 · Due: Wed 11 Nov (standards) / Fri 13 Nov 12:00 MSK (scaffold plan + CI spec) · Reviewer: pm → Roshan

## 1. Goal (in my own words)
Give every engineer one written answer to "where does my code go and how do I write it", before they write code. Deliver the repo structure, coding standards, scaffold plan (exact commands, run later), CI quality-gate spec for Raj, and an updated architecture doc. Done = Neha, Satish, Mahendra, Raj can start T-202/T-302/T-502 without asking me a structural question.

## 2. Inputs I read
CLAUDE.md, role file, BOARD, inbox, docs/architecture.md, ADR-003/004/006/007/013/014/017/019, seo/sitemap.md (locale assumption: EN at root, NE under `/ne/`; templates: home, services-hub, service, pricing, rent-hub, rent-product, cases-list, faq, about, contact...).

## 3. Approach — decisions I will propose (each becomes an ADR only after Roshan approves)

| # | Proposal | Why | Alternative rejected |
|---|---|---|---|
| P1 | **Single Next.js app, Payload embedded**, no monorepo (no Turborepo/nx) | ADR-003: one codebase, one deploy. Rental reuse (ADR-013/019) is done by **forking/templating the repo + brand config**, not by a package workspace. Fewer moving parts for a 8-week build | pnpm workspaces monorepo: adds tooling cost with no launch benefit |
| P2 | **Route groups**: `src/app/(site)/[locale]/...` public site, `src/app/(payload)/` admin + REST/GraphQL, `src/app/api/` custom routes (leads) | Payload 3 requires its own group; keeps CMS and site layouts isolated | |
| P3 | **Locale strategy**: `next-intl`-style `[locale]` segment with `localePrefix: as-needed` (EN at root, `/ne/` later) to match sitemap rule 3. Mahendra confirms library in T-302; I set the constraint only | Matches SEO plan; Payload localization used for content | Separate domains per language |
| P4 | **Theming**: CSS variables as design tokens (Tailwind v4 `@theme`), brand config in `src/brands/<brand>/` (tokens + site settings defaults). Satish details in T-202 | ADR-013 | Tailwind config per brand |
| P5 | **Server layer**: `src/lib/server/` (Neha) is the only place that touches Payload local API / DB / env secrets; marked `import 'server-only'`. Env parsed once with zod in `src/lib/env.ts` | Security rule: no secrets or DB from client | |
| P6 | **Validation**: zod schemas in `src/lib/schemas/` shared by form and API | Standards | |
| P7 | **Tooling**: pnpm, Node 24 LTS pinned (`.nvmrc`, `engines`, `packageManager`), ESLint flat config + Prettier, Vitest, Playwright, husky + lint-staged avoided (CI is the gate; fewer deps) | Simple | |
| P8 | **Branch/PR policy given AI-team rules**: PM commits; short-lived branches `T-###-slug` created by PM/Roshan only; PR needs Hritik review + green CI; squash merge; Roshan merges to `main` | CLAUDE.md §3, §7 | |
| P9 | **Perf budget in CI**: Lighthouse CI (mobile preset, 4G throttling) + JS size check via `@next/bundle-analyzer` output script; fail build on breach | Role file / README | |

Versions (live `npm view` on 2026-11-06, will be pinned exactly in the scaffold plan): next 16.4.5, payload and @payloadcms/* 3.93.0 (peer next `>=16.3.3 <17`), react 19.3.1, tailwindcss 4.3.4, zod 4.6.7, vitest 5.1.0, @playwright/test 1.65.0. Node: Payload engines `^22.23.4 || >=24.22.1`; nodejs.org index shows 24.22.2 "Krypton" and 26.13.0 "Lithium" as LTS lines. I propose **Node 24** (older LTS than 26, inside Payload's range). TypeScript 7.0.2 and eslint 10.14.0 are latest on npm; I will verify compatibility with Payload/Next before pinning and may pin TS 5.x if Payload lags (to be tested at scaffold time, not now).

## 4. Steps
1. Write `docs/standards.md`: language/TS rules, folder map, naming, import aliases, server/client rules, validation, errors, logging (no PII), i18n and theming rules, a11y, testing, deps policy, commits (`T-###: type: msg` per CLAUDE.md), branch/PR/review policy, DoD detail.
2. Write `docs/scaffold-plan.md` (new, mine): full target tree, ordered commands for later (create-payload-app with website-free blank template + Postgres adapter, Tailwind, lint, test), config file contents, env var list (names only), Docker notes for Raj, who scaffolds (me, once Roshan OKs, on a branch he/PM creates).
3. Write `docs/ci-spec.md` (new, mine): jobs, order, thresholds, caching, required checks, artifacts; co-owned with Raj, who implements in `.github/workflows/`.
4. Update `docs/architecture.md`: repo structure, request flow, server/client boundary, caching/ISR strategy, theming, i18n, env/secrets, link to new docs.
5. Verify (tree consistent with sitemap templates; every ADR constraint mapped; commands dry-checked against package docs where possible without installing).
6. Report with proposed CLAUDE.md §7 ownership table; message PM; answer teammates' structure questions.

## 5. Deliverables
| File | Content | Due |
|---|---|---|
| `docs/standards.md` | Coding + process standards | Wed 11 Nov |
| `docs/scaffold-plan.md` | Tree, pinned versions, commands, configs | Fri 13 Nov |
| `docs/ci-spec.md` | CI quality gates for Raj | Fri 13 Nov |
| `docs/architecture.md` (update) | Structure, boundaries, caching | Fri 13 Nov |
| `team/reports/T-101-repo-foundation.md` | Report + proposed §7 ownership table | Fri 13 Nov |

## 6. Acceptance criteria
- [ ] Every top-level folder has an owner and purpose
- [ ] Standards cover all items in my role file; no contradiction with any ADR
- [ ] Scaffold commands are ordered and runnable by someone who has not read the chat
- [ ] CI spec states each threshold, tool, and failure behaviour
- [ ] Versions carry source + date checked
- [ ] No file outside my ownership edited

## 7. Assumptions · Risks · Questions
- ASSUMPTION: locale at root for EN, `/ne/` later (sitemap rule 3); Mahendra may adjust in T-302.
- ASSUMPTION: scaffold happens after Gate 1 approval; this task writes docs only.
- RISK: Payload 3.x / Next 16 / TypeScript 7 compatibility is only verified at install time → scaffold plan includes a smoke-test step and fallback pins.
- RISK: JS < 150 KB with Payload admin in same app → admin is a separate route group, not counted on content pages; CI measures public routes only.
- QUESTION (pm/Roshan): Is a Node 24 LTS pin acceptable? Any objection to P1 (no monorepo)?
- QUESTION (raj): Is GitHub Actions self-hosted-runner-free (hosted runners) OK for Lighthouse CI?

## 8. Estimate
~2 sessions for standards (Wed), ~2 more for scaffold plan, CI spec and architecture update. Compatibility findings could add half a session.
