# Engineering Standards

Owner: hritik · Task: T-101 · Version: v0.1 · 2026-11-06
Binding for every engineer. Disagree openly (CLAUDE.md §5), then follow. Items marked **PROPOSED** wait for Roshan's ADR.

## 1. Toolchain (pinned)

| Item | Rule | Status |
|---|---|---|
| Package manager | **pnpm** only. `packageManager` field in `package.json`. No `npm`/`yarn` lockfiles | ADR-003 + role rule |
| Node | **Node 24 LTS**, pinned in `.nvmrc` and `engines`. Payload supports `^22.23.4 \|\| >=24.22.1` (npm registry, checked 2026-11-06) | **PROPOSED** (Roshan) |
| Language | TypeScript `strict: true`, `noUncheckedIndexedAccess: true`. No `any` without a `// any: <reason>` comment. No `@ts-ignore` (use `@ts-expect-error` + reason) | Binding |
| Framework | Next.js App Router + Payload CMS in one app | ADR-003 |
| Styling | Tailwind CSS, design tokens as CSS variables | ADR-003, ADR-013 |
| Lint/format | ESLint (flat config) + Prettier. CI fails on any warning | Binding |
| Tests | Vitest (unit), Playwright (e2e, owned by rajaros) | Binding |
| Monorepo | **None.** One app, one `package.json` | **PROPOSED** (Roshan) |

Next.js 16 differs from older releases (APIs, conventions, file structure). Before coding against a Next feature, read the matching guide in `node_modules/next/dist/docs/` for the installed version; do not rely on memory. Heed deprecation notices. (ADR-034 replaces the auto-generated `AGENTS.md` block with this rule.)

Exact dependency versions are in `docs/scaffold-plan.md`. Dependencies are pinned exactly (no `^`) in `package.json`; upgrades are their own `chore:` task.

## 2. Repo structure

```
/
├─ src/
│  ├─ app/
│  │  ├─ (site)/[locale]/…        public pages (mahendra); `_templates/` = template registry (private folder)
│  │  ├─ (payload)/…              Payload admin + its API (generated; do not hand-edit)
│  │  ├─ api/…                    custom route handlers, e.g. leads (neha)
│  │  ├─ sitemap.ts, robots.ts    (mahendra)
│  │  └─ not-found.tsx
│  ├─ components/
│  │  ├─ forms/                   form UI: LeadForm, fields, Turnstile widget (mahendra; built from ui/ primitives)
│  │  ├─ ui/                      primitives: Button, Input, Card… (satish)
│  │  ├─ blocks/                  CMS blocks: Hero, Pricing, FAQ… (satish; props only, no data fetching)
│  │  └─ layout/                  Header, Footer, Nav (satish)
│  ├─ collections/                Payload collections (neha)
│  ├─ globals/                    Payload globals, e.g. siteSettings (neha)
│  ├─ blocks-config/              Payload block schemas that map to components/blocks (neha + satish)
│  ├─ lib/
│  │  ├─ server/                  ONLY place for DB, Payload local API, secrets, email/CRM (neha). `import 'server-only'`
│  │  ├─ schemas/                 zod schemas shared by form and API (neha + mahendra)
│  │  ├─ i18n/                    locales, routing config, message loaders (mahendra)
│  │  ├─ routes/                  URL/template resolution, `resolveBlocks()` (server-only, mahendra)
│  │  ├─ seo/                     metadata + JSON-LD builders and the single `JsonLd` component (mahendra)
│  │  ├─ analytics/               consent-gated loaders, event names (mahendra, spec from sudip)
│  │  ├─ env.ts                   zod-parsed env, single source (hritik)
│  │  └─ utils/                   small pure helpers
│  ├─ brands/<brand>/             brand config: tokens.css, brand.ts (name, logo, locales, defaults) (satish)
│  ├─ messages/{en,ne}/*.json     UI strings (mahendra)
│  ├─ styles/                     globals.css, tokens base (satish)
│  └─ payload.config.ts           (neha)
├─ public/                        static assets, fonts (self-hosted)
├─ tests/e2e/                     Playwright (rajaros)
├─ qa/                            QA docs (rajaros)
├─ infra/  Dockerfile  docker-compose*.yml  .github/workflows/   (raj)
├─ docs/  seo/  design/  team/
└─ package.json, tsconfig.json, eslint.config.mjs, prettier config, .nvmrc, .env.example   (hritik)
```

Unit tests sit next to the code: `foo.ts` → `foo.test.ts`.

### Import aliases
`@/*` → `src/*`. No relative imports that climb more than one level (`../../x` is rejected by lint). Barrel `index.ts` files only in `components/ui`.

### Boundaries (lint-enforced where possible)
1. `src/lib/server/**` and `payload` may be imported only from Server Components, route handlers and other server code. `server-only` makes the build fail otherwise.
2. `components/blocks/**` and `components/ui/**` receive data through props. They never fetch.
3. Pages (`app/`) fetch data through `lib/server` functions, then pass props down.
4. Client code reaches the server only through route handlers or Server Actions that re-validate with zod.

## 3. Coding rules

- **Server Components by default.** Add `"use client"` only for interaction (menus, forms, consent banner, animation hooks). Keep client islands small, leaf-level. Reviewer asks "why client?" on every `"use client"`.
- **Validation:** zod at every boundary (form input, route handler, env, CMS webhook). Schema lives in `lib/schemas`, inferred types via `z.infer`. Never trust client validation.
- **Errors:** expected failures return typed results (`{ ok: false, code }`), unexpected ones throw. No silent `catch {}`. User-facing errors are i18n keys, never raw messages.
- **Logging:** structured, via one logger in `lib/server/logger.ts`. **Never log PII** (name, email, phone, message body, IP) or secrets. Log lead IDs, not lead content.
- **Secrets:** only via `lib/env.ts` (server schema vs public schema). Only `NEXT_PUBLIC_*` reaches the browser and must contain nothing secret. `.env*` is git-ignored; `.env.example` lists names with empty values.
- **Naming:** files `kebab-case.ts(x)`; React components `PascalCase`; functions/vars `camelCase`; constants `SCREAMING_SNAKE`; Payload collection slugs `camelCase` plural per `docs/architecture.md`; zod schemas `fooSchema`; types `Foo`.
- **Comments:** explain why, not what. No commented-out code.
- **Dates/currency:** store ISO UTC; format at the edge with `Intl` and the active locale. Money is stored as integer minor units + currency code (NPR, USD). All prices come from the `pricing` collection (ADR-014); no price literal in code or content blocks.

## 4. i18n (ADR-004)

- No user-facing string literals in components. UI strings: `src/messages/<locale>/*.json`; content: Payload localized fields.
- Every CMS text field is `localized: true` from day one (Nepali content added ~Feb 2027 without migration).
- Routing: EN unprefixed, NE under `/ne/` (assumption from `seo/sitemap.md` rule 3; **mahendra confirms in T-302**).
- Layouts must work with Devanagari: no fixed-width text boxes, no fonts without Devanagari fallback, line-height tokens sized for it.
- Use logical CSS properties (`ms-`, `ps-`) so a future RTL locale costs nothing.

## 5. Theming and multi-brand (ADR-013, ADR-019)

- **One repo, many brands.** The brand is selected **per deployment** by config: `src/brands/<brand>/` plus env `BRAND` (default `admmis-tech`). Client rentals are deployments of this same repo with a different brand folder and env, not forks. (Direction from PM, 2026-11-06.)
- `BRAND` is a **build-time** setting (token file and fonts are resolved at build); one image per brand from the same commit. Server runtime also reads it for brand defaults. A script `scripts/select-brand.mjs` (hritik, at scaffold) resolves `src/brands/$BRAND/` so no component imports a brand path directly.
- Components use token classes (`bg-surface`, `text-fg`, `rounded-card`), never raw hex, px colors, or brand names.
- Brand-specific copy, logo, and default locales live in `brands/<brand>/brand.ts` or in CMS, never in components.
- **OPEN POINT (for Roshan, no decision taken):** Per-client forks would be needed only if a client requires custom code that cannot be expressed as brand config, blocks, or CMS content, or requires an isolated codebase contractually. Until such a case appears, we do not fork. Revisit at Gate 3.
- Per-brand data separation is by deployment (own database per client). No multi-tenant data in a single DB at launch.

## 6. Performance (enforced in CI, see `docs/ci-spec.md`)

| Metric | Budget |
|---|---|
| Lighthouse mobile (Performance) | ≥ 90 |
| LCP (4G, mobile preset) | < 2.5 s |
| CLS | < 0.1 |
| First-load JS on content pages | < 150 KB (gzip) |

Rules: `next/image` for every image (AVIF/WebP, explicit width/height, `priority` only for the LCP image); fonts self-hosted via `next/font`, subset, `display: swap`; no third-party script before consent; animations use `transform`/`opacity` and respect `prefers-reduced-motion`; no client-side data fetching for content; content pages are static/ISR (`revalidate` on publish via Payload hook). Nothing under `(site)` may read `cookies()`, `headers()` or `searchParams` in layouts or pages (it silently makes the route dynamic); CI checks the build output lists public content routes as static/ISR.

**Caching and headers (BUG-002, BUG-007).** Public HTML is sent with `Cache-Control: public, max-age=0, s-maxage=300, stale-while-revalidate=3600` (set in `next.config.ts`; Next's default for prerendered pages is a one-year `s-maxage`, which risks a stale page behind Cloudflare). Cloudflare respects origin headers for HTML (no "Cache Everything" with "Ignore origin"); raj purges on deploy; the Payload publish hook calls `revalidatePath`. `/_next/static` stays immutable. Client-hint headers (`Accept-CH`, `Critical-CH`, `Sec-CH-Prefers-Color-Scheme`) are allowed on `/admin` only: `Critical-CH` restarts the first request in Chrome and costs about 600 ms of LCP. Never add them to public routes.

## 7. Accessibility (WCAG 2.2 AA)
Semantic landmarks and one `h1` per page; every input has a label; visible focus; contrast ≥ 4.5:1; alt text from CMS (required field, empty only when marked decorative); all interactive elements keyboard-operable; dialogs trap and restore focus; motion honors reduced-motion. `eslint-plugin-jsx-a11y` on; axe checks in Playwright (rajaros).

## 8. Security
Validate and size-limit every input server-side; Turnstile on public forms; rate-limit `/api/leads`; Payload access control deny-by-default per collection (admin / editor / sales); security headers and CSP set in `next.config` (raj reviews); no `dangerouslySetInnerHTML` except (1) the sanitised rich-text renderer and (2) the single `JsonLd` component in `src/lib/seo/`, which only accepts objects built by typed builders (never editor-supplied strings), serialises with `JSON.stringify`, escapes `<`, `>`, `&`, U+2028 and U+2029 as `\uXXXX`, and has a unit test with a `</script>` payload (lint exception limited to that file); dependency audit in CI (`pnpm audit --prod`, high+ fails). 2FA on all accounts (ADR-017).

## 9. Testing
- **Unit (Vitest):** all logic in `lib/` (schemas, price formatting, lead pipeline steps with mocked adapters). Target: every `lib/server` function that has a branch has a test.
- **e2e (Playwright, rajaros):** lead form → DB → notification, consent gating of analytics, language routing, 404, key pages render.
- A bug fix includes a regression test where practical.

## 10. Dependencies
Prefer few, well-maintained, TypeScript-typed libraries. A new dependency needs one line in the PR/report: what, why, size, maintenance status, alternative considered. No duplicates of what Next/Payload/Tailwind/zod already do. Approved base set is in `docs/scaffold-plan.md` §3.

## 11. Git, commits, branches, PRs

CLAUDE.md §7 governs actions: AI employees do not run git branch/commit/push/reset/stash. The PM commits one reviewed task as one commit; Roshan pushes and merges to `main`.

- **Commit message:** `T-### type(scope): summary`, e.g. `T-402 feat(leads): validate and persist lead before notifying`. Types: `feat fix chore docs refactor test perf ci`. Body explains why when not obvious. (Role rule says prefix with task ID; this fixes the exact format.)
- **Branches** (created by PM/Roshan): `T-###-short-slug`, short-lived, from `main`. `main` is always deployable.
- **PR:** description states task ID, what changed, how verified, new dependencies, screenshots for UI. One task per PR. Squash merge.
- **Merge requires:** Hritik review verdict, green CI (`docs/ci-spec.md`), Roshan merges. No direct pushes to `main`.

## 12. Review policy
Every engineering task is reviewed by Hritik using the 7-point checklist (correct, secure, fast, accessible, typed and tested, consistent, documented). Verdicts: `APPROVED`, `APPROVED WITH NITS`, `CHANGES REQUIRED`. Reviews happen in the same working session the task arrives. Hritik's own code is reviewed by Neha (backend) or Satish (frontend). Nits do not block; required changes are numbered with the reason.

## 13. Definition of Done (details; summary in README §5)
A task is done when all hold:
1. Acceptance criteria from the plan met and ticked in the report.
2. `pnpm lint`, `pnpm typecheck`, `pnpm test` pass locally; CI green.
3. Reviewed by Hritik (verdict recorded in the report).
4. Performance budget not regressed; checked on a mid/low-end Android profile (throttled) for UI work.
5. Accessible: keyboard walkthrough done; no new axe violations.
6. No hard-coded strings, colors or prices; i18n and tokens used.
7. Docs updated if behaviour or contracts changed (`docs/api/`, `docs/frontend/`, architecture).
8. Report written (`team/reports/`), PM notified, dependents handed off.

## 14. Scripts every checkout supports
`pnpm dev` · `pnpm build` · `pnpm start` · `pnpm lint` · `pnpm typecheck` · `pnpm test` · `pnpm test:e2e` · `pnpm format` · `pnpm payload` (CLI) · `pnpm generate:types` (Payload types). Names are fixed so CI and runbooks can rely on them.
