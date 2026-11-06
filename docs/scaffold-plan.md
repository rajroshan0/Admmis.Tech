# Scaffold Plan — Next.js + Payload + Tailwind

Owner: hritik · Task: T-101 · Version: v0.1 · 2026-11-06
**Nothing here has been run.** No app is scaffolded and nothing is installed until Roshan approves (after Gate 1). Hritik runs this on a branch created by PM/Roshan; the PM commits.

## 1. Pinned versions (source: `npm view <pkg> version` on the public registry, and nodejs.org/dist/index.json, both checked 2026-11-06)

| Package | Version | Note |
|---|---|---|
| Node | 24.x LTS (24.22.2 "Krypton" at check date) | **PROPOSED**; Payload `engines`: `^22.23.4 \|\| >=24.22.1`. Node 26.13.0 is also LTS but newer; not chosen |
| pnpm | 12.18.0 (latest at check date) | Pin via `packageManager`. Verify it runs on Node 24 at scaffold |
| next | 16.4.5 | Payload 3.93.0 peer range accepts `>=16.3.3 <17` |
| react / react-dom | 19.3.1 | |
| payload, @payloadcms/next, @payloadcms/db-postgres, @payloadcms/richtext-lexical | 3.93.0 (all identical) | One version for all `@payloadcms/*` |
| tailwindcss + @tailwindcss/postcss | 4.3.4 | Tokens via `@theme`; no `tailwind.config.js` |
| zod | 4.6.7 | |
| next-intl | 4.14.9 | **Candidate only**; Mahendra decides in T-302 |
| sharp | 0.35.5 | Image processing for Next and Payload |
| typescript | **5.9.3 (chosen)** | npm `latest` is 7.0.2, but I have not verified Payload/Next/ESLint support for it. Start on 5.9.3; try 7.x as a separate `chore:` after launch |
| eslint 10.14.0, eslint-config-next 16.4.5, eslint-plugin-jsx-a11y 6.10.2, prettier 3.9.10 | | Verify ESLint 10 works with `eslint-config-next` at install; fall back to the major `eslint-config-next` declares |
| vitest 5.1.0, @playwright/test 1.65.0, @axe-core/playwright 4.14.0 | | |
| @lhci/cli 0.16.0, @next/bundle-analyzer 16.4.5 | | CI performance gates |
| server-only 0.0.1 | | Build-time guard |

Rule: at install time, if any pinned version fails its smoke test (§6), record the failing pair and pick the nearest working pin; report it in the scaffold report.

## 2. Decisions behind the scaffold
- One app, one `package.json`, no workspaces (**PROPOSED**).
- Payload embedded in Next (`src/app/(payload)`), PostgreSQL via `@payloadcms/db-postgres`, Lexical rich text, media stored in Cloudflare R2 through S3-compatible storage adapter (`@payloadcms/storage-s3`, same 3.93.0) in production; local disk in dev.
- Brand chosen per deployment by `BRAND` env + `src/brands/<brand>/` (one repo for all rentals; see standards §5).
- Everything content-bearing is `localized`.

## 3. Dependencies (justification, per standards §10)

| Dependency | Why | Alternative considered |
|---|---|---|
| next, react | ADR-003 | — |
| payload + @payloadcms/* | ADR-003 CMS in same app | Strapi/Directus (separate service, second deploy) |
| @payloadcms/storage-s3 | Media to R2 | Local disk (lost on redeploy/VPS move) |
| tailwindcss | ADR-003 | — |
| zod | Boundary validation, shared schemas | valibot (less ecosystem in Payload/forms) |
| sharp | Required for responsive images | — |
| server-only | Hard fail if server code leaks to client | convention only |
| next-intl (candidate) | Locale routing + messages in App Router | Hand-rolled middleware (more code to own) |
| dev: vitest, playwright, axe, lhci, bundle-analyzer, eslint stack, prettier | Quality gates | — |

Not adding: UI kits, state libraries, animation libraries (Satish proposes if needed, with size cost), lodash, date libraries (use `Intl`).

## 4. Target tree after scaffold
See `docs/standards.md` §2. Additional root files: `.nvmrc` (`24`), `.env.example`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `prettier.config.mjs`, `vitest.config.ts`, `playwright.config.ts`, `lighthouserc.json`, `.gitignore`, `.dockerignore` (raj).

## 5. Steps (in order; run by Hritik after approval)

Preconditions: Roshan approved Node 24 + no-monorepo; branch `T-103-scaffold` exists (PM creates); Node 24 and pnpm installed locally.

1. **Init package.** `pnpm init`; set `name`, `private: true`, `type: module`, `engines.node: ">=24 <25"`, `packageManager: "pnpm@12.18.0"`. Write `.nvmrc`.
2. **Install runtime deps with exact pins** (`pnpm add --save-exact`): `next@16.4.5 react@19.3.1 react-dom@19.3.1 payload@3.93.0 @payloadcms/next@3.93.0 @payloadcms/db-postgres@3.93.0 @payloadcms/richtext-lexical@3.93.0 @payloadcms/storage-s3@3.93.0 graphql@16 sharp@0.35.5 zod@4.6.7 server-only@0.0.1`. (`graphql` is a Payload peer dependency; pin the exact 16.x that pnpm resolves and record it.)
3. **Install dev deps** (`pnpm add -D --save-exact`): `typescript@5.9.3 @types/node@24 @types/react @types/react-dom tailwindcss@4.3.4 @tailwindcss/postcss@4.3.4 eslint@10.14.0 eslint-config-next@16.4.5 eslint-plugin-jsx-a11y@6.10.2 prettier@3.9.10 vitest@5.1.0 @playwright/test@1.65.0 @axe-core/playwright@4.14.0 @lhci/cli@0.16.0 @next/bundle-analyzer@16.4.5`.
4. **Configs.** `tsconfig.json` (strict, `noUncheckedIndexedAccess`, `@/*` alias, `moduleResolution: bundler`); `next.config.ts` wrapped with `withPayload` from `@payloadcms/next/withPayload`, security headers, image formats AVIF/WebP, bundle analyzer on `ANALYZE=true`; ESLint flat config (next core-web-vitals, jsx-a11y, `no-restricted-imports` for deep relatives and for `payload`/`@/lib/server` from `components/**`); Prettier config; PostCSS config for Tailwind v4; `src/styles/globals.css` with `@import "tailwindcss"` and `@theme` token layer imported from the active brand.
5. **Payload wiring.** `src/payload.config.ts` (postgres adapter, lexical editor, localization `en` default and `ne` declared, `admin.user: users`, R2 storage plugin enabled only when env set); route group `src/app/(payload)` as generated by the Payload Next template (copy from the official blank template at the pinned version; **do not hand-write it**); one starter collection `users` with roles `admin|editor|sales` and 2FA hook placeholder (Neha implements in T-4xx).
6. **Env.** `src/lib/env.ts`: zod schemas for server and public env, throws at boot with names (never values). `.env.example` lists: `DATABASE_URL`, `PAYLOAD_SECRET`, `BRAND`, `ENABLED_LOCALES` (default `en`), `NEXT_PUBLIC_SITE_URL`, `R2_*` (account, bucket, key id, secret), `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `SMTP_*` or mail provider key, `CHAT_WEBHOOK_URL`, `CRM_*`, `SENTRY_DSN`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_CLARITY_ID`. Names only, no values.
7. **Skeleton.** Folders from standards §2 with `.gitkeep`; `(site)/[locale]/layout.tsx` and a home page rendering one hard-coded-free placeholder block; `/api/health` route (returns 200 + build SHA; used by Docker/uptime).
8. **Scripts** in `package.json` exactly as standards §14 (`typecheck` = `tsc --noEmit`; `generate:types` = `payload generate:types`; `test` = `vitest run`).
9. **Local DB.** `docker-compose.dev.yml` with PostgreSQL (version chosen by Raj, same major as production) and a named volume — owned by Raj; Hritik requests it, does not write it.
10. **Smoke tests (gate before handoff):**
    - `pnpm install --frozen-lockfile` succeeds on a clean clone, Node 24.
    - `pnpm typecheck`, `pnpm lint`, `pnpm test` pass (one placeholder test for `env.ts`).
    - `pnpm dev`: `/`, `/admin` (create first user), `/api/health` respond.
    - `pnpm build` succeeds; build output shows first-load JS for `/` < 150 KB gzip.
    - A `server-only` import from a client component fails the build (negative test, then removed).
11. **Handoff.** Report with the lockfile commit, deviations from this plan, and the first CI run. Notify Neha (collections), Satish (tokens, components), Mahendra (routes, i18n), Raj (Docker/CI), Rajaros (e2e base URL).

## 6. Fallbacks
- ESLint 10 incompatibility with `eslint-config-next` → use the highest ESLint major that `eslint-config-next@16.4.5` lists as peer.
- Payload/Next compile error on a pinned pair → drop to the latest Next 16.3.x within Payload's peer range (`>=16.3.3`).
- pnpm 12 problem on Node 24 → pin the previous pnpm major and record why.
- `create-payload-app` (3.93.0 exists) is **not used** to generate the project; I copy only the `(payload)` route group files from its template, so structure stays ours. CLI flags unverified, deliberately not relied on.

## 7. Open items
| Item | Owner | Needed by |
|---|---|---|
| Roshan approves Node 24 + no-monorepo (ADR) | pm / Roshan | Gate 1 |
| Postgres major version and production backup tool | raj (T-501) | Fri 13 Nov |
| i18n library final (next-intl or other) | mahendra (T-302) | Fri 13 Nov |
| Token file format (`@theme` variables) | satish (T-202) | Fri 13 Nov |
