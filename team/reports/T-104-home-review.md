# T-104 Code review: homepage build

Reviewer: hritik · 2026-11-07 10:57 MSK · Scope: satish T-203/T-204, mahendra T-303 (uncommitted tree)

## Verdict: APPROVED WITH NITS (no must-fixes)

Nothing blocks Roshan's review tonight. Nits below are for the next working session. Items 1 to 3 should land before Gate 2.

## Checks run

| Check | Result |
|---|---|
| `pnpm typecheck` | pass |
| `pnpm lint` (max-warnings 0) | pass |
| `pnpm test` | 5 files, 13 tests pass |
| `pnpm build` | pass. `/en` is SSG (`●`), `/icon.svg` static. No public route is dynamic |
| First Load JS for `/en` | **143.8 KB gzip confirmed** (I summed the 8 chunks the HTML loads with `<script async>`, served gzip). Excludes the 39.6 KB `noModule` polyfill chunk, which modern browsers skip |
| TODO / PAN / placeholder text in HTML | none (word-boundary grep) |
| Secrets | none in HTML or `.env.example` |
| One h1, heading order | h1 (hero), h2 per section, h3 inside cards. Footer column titles are h2 (acceptable) |
| Landmarks | header, nav (labelled), main#main, footer, 4 labelled footer navs, sections with `aria-labelledby`. Skip link first |
| Fonts | Montserrat preloaded (one woff2). Mukta Devanagari has `preload: false`, so EN pages request no Devanagari file. Self-hosted by next/font |
| Hero image | `next/image` with `preload`, explicit 640x800, `sizes`, alt text, 22 KB webp, not lazy. LCP setup is correct |
| Contrast (computed) | fg/bg 15.2, muted/bg 7.3, on-primary/primary 6.2 (active 4.8), alt-muted/alt 11.9, focus/bg 4.5 (non-text needs 3), line-strong/bg 4.1 and green/bg 3.7 (non-text only). All tokens match design spec values and WCAG AA |
| Reduced motion | `base.css` zeroes duration tokens and animations under `prefers-reduced-motion` |
| Mobile menu | Escape closes and returns focus, Tab and Shift+Tab wrap, closes on link click and on resize to desktop, `aria-expanded`/`aria-controls`, scroll lock restored on cleanup. Panel content is server-rendered children (not in the client bundle). Good |
| FAQ | native `<details name="faq">`, no JS, first item open |
| i18n | no user-facing literals in components; all strings come from `src/messages/en/*`. Only literals are SVG path data |
| Tests | meaningful (path, deepMerge fallback, no-TODO-in-messages guard, canonical, home-view date). No component tests yet; acceptable for now, axe e2e is rajaros's |

## JS budget: allocating the last ~6.2 KB

The empty page is 136.2 KB, so the framework baseline eats almost all of the budget and the whole homepage adds only ~7.6 KB. The rest is tight. Proposed allocation (gzip):

| Item | Budget | Rule |
|---|---|---|
| Consent banner + preferences | **3.0 KB** | vanilla-leaning client island, no UI library, rendered after hydration idle, must not block LCP |
| Language switch | **0.5 KB** | plain `<a>` links to the other locale. Zero client JS. Enable only when NE exists |
| Form code | **0** on `/` | Lead form lives on `/contact` and the rent and service pages as a route-level client chunk. The home page only links to `/contact`. Never import form code in the shared layout |
| Reserve | **2.7 KB** | analytics loader (consent-gated, injected after consent so it is not counted), future fixes |

Rule for everyone: any PR that raises `/en` First Load JS must say by how much. CI budget check stays at 150 KB. Note: the 143.8 figure comes from my manual sum. Turbopack's build output does not print per-route sizes, so raj's `scripts/check-bundle-size.mjs` should do the same sum from the built HTML.

## Nits (by owner)

### mahendra
1. `/en` and `/` both answer 200 (the proxy rewrites `/` to `/en`, and `/en` is not redirected). The canonical points to `/`, so SEO is safe, but standards say EN is unprefixed. Fix in T-304: 308 `/en/x` to `/x` in the proxy. Until then do not link to `/en` anywhere.
2. `proxy.ts` hard-codes `LOCALES = ['en','ne']`. Fine for now; when ENABLED_LOCALES changes, `/ne` is a 404 via `dynamicParams = false`, which is the correct outcome.
3. No JSON-LD on the homepage yet (Organization, WebSite). Expected from sudip's schema spec; track it as a task so it is not forgotten.
4. Layout and page import `@/brands/admmis-tech/*` directly (see brand section). Acceptable until the `select-brand` script exists; mark with a TODO that names the task.
5. Canonical uses `NEXT_PUBLIC_SITE_URL` at build time. Local build gives `http://localhost:3000`. CI and the Docker build must set the real URL (raj: add to `.env.ci` and the Dockerfile ARG). Not a code fault.

### satish
1. `layout.tsx` skip link uses `focus:bg-white focus:text-black`. Use tokens (`bg-surface text-fg`). The file is mahendra's, but the class choice belongs to the design system. Put the skip link in `components/layout/` as `SkipLink` so tokens live there.
2. `HeroBlock` passes `quality={80}`, but `images.qualities` is not configured, so Next serves q=75 (seen in the HTML). Drop the prop or set `images.qualities` (hritik can add it). Either way the page is correct today.
3. Both light and dark lockup SVGs are preloaded by React's early-image hoisting. The dark one is used only in the footer. Cost is 2.9 KB; mark the footer logo `loading="lazy"` (plain `<img>` supports it) so it is not preloaded.
4. Mobile menu: when it opens, focus stays on the toggle (fine for a disclosure). Optional: mark the page content `inert` while open so screen readers cannot browse behind it. Low priority.
5. Tone: hero section is `data-tone="alt"` (navy), h1 uses `text-fg`. It works because the tone scope remaps tokens, but add one line to the component comment so nobody "fixes" it.

## Brand token structure (ADR-013 / ADR-027) and the `@brand` alias question

Structure is right: `tokens-base.css` declares every token name with placeholder values and no brand values; `brands/admmis-tech/tokens.css` supplies values; components use token classes only (no hex found in `components/`). Fonts and logo come from `brand.ts` and `fonts.ts`.

Not yet right: `globals.css`, `layout.tsx` and `page.tsx` name `admmis-tech` directly, which standards §5 forbids once the script exists. **Answer to satish's open question:** do not use a TS path alias for CSS (Tailwind v4's `@import` does not resolve tsconfig paths reliably). Decision proposal: `scripts/select-brand.mjs` (hritik, runs in `predev` and `prebuild`) reads `BRAND` and writes two git-ignored generated files:
- `src/styles/brand.generated.css` containing `@import '../brands/<id>/tokens.css';`
- `src/brands/active.ts` re-exporting `brand` and `fonts` from `./<id>/`

and a plain TS alias is then unnecessary: code imports `@/brands/active`. I will write this as a short proposal for PM if Roshan wants it as an ADR; it is a small task (about 1 hour) in Sprint 2.

## T-106 (ADR-034), done

- `next.config.ts`: added `agentRules: false`. Verified in `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/agentRules.md`. Typecheck passes.
- `docs/standards.md` §1: added the "read the Next 16 docs in `node_modules/next/dist/docs/` before coding" rule.
- **Root `AGENTS.md`**: I did not delete it. Important: in `generate-agent-files.js`, when `agentRules` is false, `next dev` removes the managed block and then **deletes `AGENTS.md` itself if nothing else is in it**. The file contains only the managed block, so the next `next dev` will delete it automatically. Recommendation: let that happen, but Roshan should OK it first (CLAUDE.md §3 delete rule). If Roshan wants to keep the file, add any text outside the markers.

---
# Addendum 2026-11-07 (batch 2): BUG fixes and reviews

## BUG-002 (a) fixed, BUG-007 fixed (hritik, next.config.ts)
- Critical-CH came from `withPayload` (adds Accept-CH, Vary, Critical-CH to `/:path*`). `next.config.ts` now rewrites those rules to `/admin/:path*` only. Production build checked on port 3104: `/` and `/en` carry none of the three headers.
- Public HTML now sends `Cache-Control: public, max-age=0, s-maxage=300, stale-while-revalidate=3600`. `/_next/static` stays immutable. Policy is in docs/standards.md §6.
- BUG-002 (b): fetchPriority="high" on the hero image, REQUEST sent to satish.

## BUG-006 (my part)
Dockerfile defaults `NEXT_PUBLIC_SITE_URL=https://tech.admmis.org` and the ci.yml docker job passes no override, so the deployed image canonical is correct. The `http://localhost:3000` values in ci.yml are the test jobs only, which is right. Rule: one image per commit, built with the production URL; staging is the same image, so staging must be behind auth and send `X-Robots-Tag: noindex` (raj, at Caddy). Remaining: og:image (mahendra).

## T-803 e2e (rajaros): APPROVED WITH NITS
Good: runs against the production build, `test.fail` markers with bug ids, copy checked against content/pages/home.md, keyboard, axe at two widths, reduced motion.
Nits:
1. Add one test that guards my fixes: GET `/` has no `critical-ch` header and `cache-control` contains `s-maxage=300`.
2. Sticky bar locator uses `div.fixed.bottom-0` plus the text "Get a quote": brittle. Ask satish for a `data-testid` or select by role and name.
3. Mobile menu trap test accepts any element inside `header`; the panel is inside the header, so it cannot detect focus escaping to the logo link. Tighten to the panel plus the toggle.
4. `pnpm start` on a `standalone` build prints a warning. Fine for now; the Docker image runs `node server.js`, so add one smoke run against the container later.

## T-503 infra v0.2 §0 (raj): APPROVED WITH NITS
Technically sound. The arm64 need is real and larger than the doc says:
1. **Build must run on arm64.** `output: 'standalone'` copies the traced node_modules of the build platform, including sharp's native binary. A build-on-amd64 image will not run on Oracle A1. Use `docker buildx --platform linux/arm64` with QEMU for the whole build, or build natively on the Oracle host. Expect a QEMU build to take 10 to 20 minutes; it is only needed for the deploy build. Keep the amd64 build in CI for speed. Arm GitHub runners are free only for public repos; the repo visibility is still open.
2. sharp: pnpm-lock.yaml already contains `@img/sharp-linuxmusl-arm64@0.35.5` and `@img/sharp-linux-arm64`, so a prebuilt binary exists for Alpine arm64. I still want one smoke test (image optimisation request) in the arm64 job. If it fails, switch the runtime base to Debian slim.
3. postgres:17 and caddy images are multi-arch: fine.
4. Image optimisation (`/_next/image`) runs on 2 Arm cores: keep Cloudflare caching for it and the 22 KB hero as the only large image.
5. Section 0.2 mitigation 1 (use a larger Node heap so memory looks busy) is a hack. Prefer real load: run production, staging and the nightly backup. Do not tune settings for the sake of a metric.
6. Add to the free-stack table: single image, prod URL baked in (see BUG-006).
