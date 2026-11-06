# Gate 1 — Technical readiness review

Owner: hritik · Task: T-102 · Version: v0.1 (partial) · 2026-11-06 18:52 MSK
Scope: week-1 engineering deliverables. T-202, T-302, T-401, T-402 were reviewed at document level. T-103 (scaffold) now exists and passes its smoke tests locally (§5), so the "verify at scaffold" items below are partly answered. Docker, CI workflows and the runbook have never been run.

## 1. Summary for Roshan

| Item | Verdict | Technical risk | Gate 1 blocker? |
|---|---|---|---|
| T-202 design tokens (satish) | APPROVED (v0.1.1, must-fixes applied) | Medium: Tailwind v4 behaviour unproven | No |
| T-302 i18n (mahendra) | APPROVED WITH NITS (v0.2 due Fri 20 Nov) | Medium: next-intl on Next 16, client JS cost unproven | No |
| T-401 content model (neha) | APPROVED (v0.2) | Low | No |
| T-402 lead API (neha) | APPROVED (v0.2) | Low-medium: Turnstile-unreachable path is a PM decision | No |
| T-801 test plan (rajaros) | APPROVED WITH NITS (plan only) | Low | No |
| T-501 infra runbook (raj) | APPROVED WITH NITS (2 decisions open, §3 items 5-6) | Medium: untested; migrations and Sentry JS budget | No |
| T-502 Docker/CI (raj) | CHANGES REQUIRED (7 small items, all sent to raj) | Medium: written before the scaffold, no Docker here to build it | No |
| T-103 scaffold (hritik) | DONE, smoke tests pass (report team/reports/T-103-scaffold.md); peer review by neha pending | Low-medium: JS budget headroom only 17 KB | No |

**Readiness call:** the design is coherent and the documents agree with each other and with ADR-003/004/007/013/014/017/027. The stack runs: Next 16.4.5 + Payload 3.93.0 + Tailwind 4.3.4 on Node 24, admin and health respond, build and standalone output work. Recommendation: Gate 1 can pass. Two findings need Roshan's attention: (a) JS budget, an empty page is already 133 KiB of the 150 KB; (b) production database migrations are not designed yet (§3 item 5). The Mon 16 Nov spikes (§4) still apply.

## 2. Per-deliverable findings

### T-202 Design tokens (docs/frontend/design-tokens.md)
- Correct: 3-layer token model, semantic-only use in components, build-time brand selection (matches ADR-027, one image per brand), completeness and contrast checks as build gates.
- Secure/Fast: no runtime theming, no brand JS; only the selected brand's CSS ships. Good for the 150 KB budget.
- Consistent: weight tokens kept out of Tailwind's `font-*` namespace to avoid collision with `font-heading`. Correct call.
- Risks to prove at scaffold: (1) `@theme` vs `@theme static`/`inline` for unused tokens, next/font variables and `color-mix()` derived tokens inside `[data-tone=alt]` (the derived-token re-declaration is required, as Satish wrote); (2) `--color-*: initial` plus magenta placeholders: confirm the completeness script catches placeholders; (3) `@brand/*` alias: I own `scripts/select-brand.mjs`; it must work in dev, build and Vitest.
- Nit: the alt-tone token set is large (8 `alt-*` tokens). Acceptable now; revisit if a rental client finds it hard to fill (ADR-019 rental product).

### T-302 i18n (docs/frontend/i18n.md) and T-301 routes
- Correct: EN unprefixed, NE under `/ne/`, no detection, `translatedLocales` page rule (noindex + self canonical), Devanagari fonts only on NE pages.
- Fast: static rendering only, with `setRequestLocale`. The `(preview)` route group is **excluded from the static-route check** (docs/ci-spec.md §9). This answers Mahendra's question 1.
- Risks to prove at scaffold: Next 16 routing file name (`proxy.ts` vs `middleware.ts`), next-intl behaviour with static output, next-intl client cost vs 150 KB budget (fallback: pre-resolved strings as props, no provider on content pages), `globalNotFound` with two root layouts.
- Lint proposals (hard-coded strings, `href="/…"`): accepted in principle. I will implement the simplest working version at scaffold (`no-restricted-syntax` on JSX text and string literals in `href`), and tell Mahendra what it covers.
- Open for Neha: `translatedLocales` computed field (Wed 18 Nov).

### T-401 Content model and T-402 Lead API (docs/api/)
- Correct and consistent with ADR-014 (one price collection) and ADR-007 (lead guarantee, outbox). Postgres outbox + cron worker, no Redis: right size for one VPS.
- Secure: validation before Turnstile, rate limits, no PII in logs (leads.md §10).
- Open decision from Neha, item 7: **2FA for Payload (ADR-017)**. My recommendation: (a) in the Mon 16 Nov spike, test whether a maintained Payload TOTP plugin exists for 3.93.0 (I have not verified any; no plugin is named here on purpose); (b) if none is acceptable, put **Cloudflare Access** (free plan, one-time-PIN or IdP) in front of `/admin` as the second factor and keep Payload's own login. Both need Roshan's OK as an ADR change only if (b) replaces ADR-017 wording; I will send a proposal to PM after the spike.
- Neha's code will get peer review per standards §12 after scaffold.

### T-801 Test plan (rajaros)
Plan reviewed: APPROVED WITH NITS. Thresholds in ci-spec §3 are confirmed as the go/no-go numbers, with two conditions: the binding measurement is staging plus a real low-end Android (CI Lighthouse is a regression gate, noisy); and manual keyboard, screen-reader and zoom checks stay separate items, because an automated accessibility score is not WCAG 2.2 AA. CI browsers Chromium + WebKit, Firefox manual smoke, Edge covered by Chromium: approved. qa/ documents themselves are not yet reviewed.

### T-501 / T-502 (raj)
Reviewed 2026-11-06 (details in team/inbox/raj.md). Caddy config, compose hardening (non-root, read-only, cap_drop, loopback port), restricted-key deploy script and the backup design (pg_dump, age, R2, restore test) have no objections. T-502 changes required: `.env.ci` contents, artifact hidden files, coverage dependency, failing audit job (fixed by me), health vs readiness route, no Sentry client SDK. Never executed: no Docker on the authoring machine, first real run is the first CI run after Roshan pushes.

## 3. Cross-document technical findings
1. **Bundle script input.** ci-spec §4 reads `.next/app-build-manifest.json`. In Next 16 (Turbopack default) this file may not exist. I will confirm at scaffold and adapt `scripts/check-bundle-size.mjs` (the budget itself does not change).
2. **Postgres version.** Standards/scaffold plan left it to Raj; he chose 17. Local smoke tests here run on Postgres 14 (only binary available); CI service container is the first real 17 run.
3. **pnpm 12** blocks dependency build scripts by default. Done: `allowBuilds: esbuild` in `pnpm-workspace.yaml` (not a monorepo).
5. **Production migrations are undesigned.** Payload auto-pushes schema only in dev. `deploy.sh` runs no migration and the image has no Payload CLI. Proposal to PM: committed migrations run at startup through the Postgres adapter (verify the option on 3.93.0). Decision needed before Gate 2.
6. **Sentry client SDK vs JS budget.** At most 14 KB headroom: launch with server-side error reporting only or lazy-load after idle. Decision with Raj.
7. **Audit:** `pnpm audit --prod --audit-level=high` failed on transitive deps via Payload (1 critical, 3 high). Fixed with `overrides`; runtime check of the Lexical path still to do.
4. **Env names.** `docs/api/leads.md` §11 lists env names; they will be merged into `.env.example` and `src/lib/env.ts` at scaffold.

## 4. What must be proven before Gate 2 (spikes, Mon 16 Nov)
1. `pnpm dev` / `pnpm build` work on Node 24 with Payload 3.93.0 + Next 16.4.5; first-load JS for `/` recorded (baseline for T-201).
2. Tailwind v4 `@theme` + brand alias + tone scope behaves as T-202 describes.
3. next-intl static rendering and client cost.
4. 2FA option for Payload admin.
5. `output: 'standalone'` image with Payload (tracing includes).

## 5. T-103 results
Node 24.22.2 (nvm), pnpm 12.18.0 (corepack). typecheck, lint (0 warnings), format:check, 3 unit tests, `pnpm build` all pass. `pnpm dev` served `/`, `/admin`, `/api/health` (200) against a throwaway Postgres 14; first registered user becomes admin. Standalone server (`node .next/standalone/server.js`) serves the same three routes (55 MB). `server-only` import from a client component fails the build. **First-load JS for `/en`: 136.2 KB gzip (133.0 KiB)**, budget 150 KB: headroom about 14 KB. Not run: Docker (compose, image), Playwright, Lighthouse, a Postgres 17 run, fresh-clone install.

## 6. Version fallbacks
None needed so far (npm registry re-checked today: next 16.4.5, payload 3.93.0, pnpm 12.18.0, eslint 10.14.0 exist). TypeScript stays at 5.9.3 as planned (npm latest is 7.0.2). Tailwind latest is now 4.3.5; the plan pins 4.3.4 (patch only, will pin 4.3.4 unless it fails).
