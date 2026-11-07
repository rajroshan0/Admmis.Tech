# Inbox — satish

Append-only. Format and rules: CLAUDE.md §5. Newest at the bottom.


### 2026-11-06 13:20 MSK · sharwan → satish · T-602 · FYI
Token values for 3 candidate directions are in design/brand-directions/*.html (section 2) and README. Same token names across all: --bg --surface --ink --muted --primary --onp --accent --line --alt --onalt --focus --r --r2. Final set after Gate 1.
Needed by: after Gate 1 · Reply: not needed

### 2026-11-06 14:40 MSK · hritik → satish · T-101 · FYI
For T-202: tokens are CSS variables via Tailwind v4 @theme (no tailwind.config.js), brand folder src/brands/<brand>/tokens.css selected by env BRAND, one repo for all brands (not forks). Components: src/components/{ui,blocks,layout}, props only, no data fetching. See docs/standards.md §2, §5. Tell me if you want a different token format.
Needed by: Thu 12 Nov · Reply: only if objecting

### 2026-11-06 16:30 MSK · neha → satish · T-401 · HANDOFF
Block data shapes are in docs/api/content-model.md §6 (19 blocks; props only, no prices typed, all text localized). Tell me if a block shape does not fit your components.
Needed by: Thu 12 Nov · Reply: only if objecting

### 2026-11-06 19:18 MSK · mahendra → satish · T-301, T-302 · REQUEST
From docs/frontend/templates-and-routes.md and i18n.md:
1. Blocks receive a ready `data` prop (I build it in resolveBlocks, src/lib/routes/) plus `headingLevel`; hero block heading is the page H1, all others start at h2. Please define each block's `data` type.
2. `cta-form` block is a layout shell: it renders my `LeadForm` (src/components/forms/), built on your ui/ primitives.
3. `pricing-table`/`rental-plans`: render NPR and USD both in the HTML; the toggle only switches a `data-currency` attribute (no flash, crawlable). NPR is the default view.
4. Tokens: `:lang(ne)` rules (body leading about 1.6-1.75, heading leading at least 1.3, letter-spacing normal) and per-locale fonts in src/brands/<brand>/fonts.ts (`latin` for all locales, `devanagari` for NE only; EN pages must not load Devanagari files).
5. Language switcher component (header+footer), rendered only when more than one locale is enabled; props: items with href, lang, label, current.
Needed by: Fri 20 Nov · Reply: only if objecting

### 2026-11-06 19:40 MSK · pm → satish · T-201, T-202 · REQUEST
1. T-201 Component inventory (keep / change / new / drop) → `docs/frontend/component-inventory.md` — due Thu 12 Nov. Reviewer: hritik. Inputs: `seo/sitemap.md`, `docs/api/content-model.md` v0.2 §6 (19 blocks), `docs/frontend/templates-and-routes.md` (9 compositions, block contract), `design/brand-directions/` (components + states per direction), `docs/reference-fittin.md` (structure only).
2. T-202 Design-token architecture for multi-brand theming → `docs/frontend/design-tokens.md` — due Fri 13 Nov. Reviewer: hritik. Inputs: `docs/standards.md` §5 (one repo, `src/brands/<brand>/`, env BRAND), sharwan's shared token names in `design/brand-directions/README.md`, mahendra's `:lang(ne)` and per-locale font request above.
Both technical → plans to pm AND hritik, wait for OK. Docs only, no scaffold/install, no git. Brand direction not chosen yet (Gate 1) — token architecture must work for all three.
Needed by: see dates · Reply: plan paths + DONE

### 2026-11-06 19:45 MSK · hritik → satish · T-201, T-202 · REVIEW
Plans: APPROVED WITH NITS. Start both. Your two decisions:
1. No motion library at launch (CSS + one small IntersectionObserver hook): YES. Conditions: content must be visible without JS and before hydration (never default `opacity:0` in CSS waiting for the hook; use a `js` class set by the hook or `@starting-style`-like progressive enhancement), the LCP/hero image is never animated in, animate only transform/opacity, honor prefers-reduced-motion, and the hook is part of one small client file reused by all blocks (no per-block observers). If a library is ever wanted, propose it with its gzip size and what CSS cannot do.
2. No user-toggled dark mode at launch; a natively dark brand is fine: YES. Keep tokens semantic. Set `color-scheme` per brand so form controls and scrollbars match.
Nits for T-202:
a. Brand selection mechanism: a CSS `@import` cannot read an env var. `BRAND` is a build-time setting; I will provide `scripts/select-brand.mjs` that resolves `src/brands/$BRAND/` (tokens.css, fonts.ts, brand.ts) at build via a generated import or an alias. Write the doc against a stable path, e.g. `@brand/tokens.css`, and I make that alias work at scaffold. Consequence: one Docker image per brand (I updated standards §5 and architecture; Raj will be told).
b. Tailwind v4: when `@theme` values reference other CSS variables, check whether `@theme inline` is required so utilities resolve to the variable; mark it "verify at scaffold" in the doc rather than asserting either way.
c. Hex/px lint rule: do not depend on a specific plugin yet; describe the rule (no color literals or arbitrary `[#...]`/`[12px]` values in components) and I choose the enforcement at scaffold.
d. Icons: inline SVG set is fine; keep them as small server components or a sprite so unused icons are not shipped to the client. Cap at about 20.
e. Rental-client fonts (your question to Sharwan): my view is approved pairs only at first; each extra family costs bytes and Devanagari coverage. Final call is Sharwan's and Roshan's.
f. Contrast check: specify it as a script that reads the brand tokens and fails below 4.5:1 text / 3:1 UI pairs; I will add it to ci-spec when you send the pair list.
T-201 nits: sizes S/M/L fine as estimates; list per component whether it needs `"use client"` and why (Mahendra's islands list is the reference); each block's `data` prop type must be exported from the block file so `resolveBlocks()` (Mahendra) can import it.
Needed by: docs per your dates · Reply: not needed

### 2026-11-06 20:30 MSK · hritik → satish · T-201 · REVIEW
docs/frontend/component-inventory.md read in full. VERDICT: APPROVED WITH CHANGES (one must-fix, rest nits). Block count 20 is right; keep `banner` as a block that shares the `Banner` component with the global announcement (your proposal), Neha fixes the "19" wording.
MUST-FIX
1. §9 JS estimate: "about 3.3 KB of 150 KB" counts only your islands and reads like a page total. Rewrite as a budget table with three lines: (a) framework baseline (Next client runtime + React) = "measured at scaffold, first measurement before any component is built"; my unverified expectation is that it already takes the larger part of the 150 KB, so do not read the rest as free headroom; (b) shared islands: yours + Mahendra's (consent, LeadForm + zod + Turnstile loader, thank-you reader, i18n provider namespaces); (c) remainder. Mark every number an estimate. I will own the final allocation after the first measurement and put it in standards §6.
NITS
2. Your question 9, `:has()` for the band selector: acceptable, but prefer a pattern that needs no `:has()`: radios first in the DOM, panels after them, styled with `input:checked ~ .panel`. Works on old Android WebView with no client fallback. Test on Rajaros's device matrix either way.
3. StickyActionBar CSS-only: approved. Add `scroll-padding-bottom` equal to the bar height so keyboard focus is never hidden behind it (WCAG 2.2 focus not obscured), and make sure the consent banner stacks above it.
4. `/dev/components` must return 404 in production and not be in the sitemap or the production image; add a guard (`NODE_ENV` check or excluded from the build) and tell me so the CI static-route check ignores it.
5. `pricing-table` toggle: choose buttons with `aria-pressed` (your text says "radio/buttons"). Keep one pattern across #6 and #7 SegmentedControl.
6. `RichTextData = unknown`: define a minimal serialized-Lexical type of your own so the renderer is typed, without importing `payload` into components.
7. `Reveal`: confirm in the usage page that print and no-JS render fully visible, and add it to the Lighthouse routes check (no CLS).
8. Effort total: your call and PM's; the cut order you list is sensible. Agree Mahendra builds templates on stubs from week 3.
Needed by: v0.2 by Fri 20 Nov · Reply: not needed

### 2026-11-06 21:05 MSK · pm → satish · T-201 · FYI
For v0.2 (Fri 20 Nov): read hritik's full nit list in this inbox (20:30 entry) — your report says one nit was not yet read. Mark entries ✔ read when done.
Needed by: Fri 20 Nov · Reply: not needed

### 2026-11-06 21:10 MSK · hritik → satish · T-202 · REVIEW
docs/frontend/design-tokens.md read in full; I recomputed a sample of your ratios (the _test set, Sindoor --line 1.30, 15.06 / 6.08 / 3.65 / 6.54 / 6.52 / 6.31) and they match. VERDICT: APPROVED WITH CHANGES. Three must-fixes (small), then nits. v0.2 by Fri 20 Nov.
MUST-FIX
1. Name clash risk in Tailwind v4: `--font-heading`/`--font-body` (family namespace `--font-*`) and `--font-weight-heading` (weight namespace `--font-weight-*`) would both produce a `font-heading` utility. I cannot confirm which wins, so do not rely on it: rename the weight tokens so no key repeats a family key (for example `--font-weight-title`, `--font-weight-title-3`, `--font-weight-strong`) and mark the rest "verify at scaffold".
2. Fonts (§8.1): loaders are at module scope and `fonts.ts` is imported by the shared locale layout, so Devanagari `next/font` loaders can emit preload links on EN pages even if the variable class is only applied for `ne`. Set `preload: false` on the Devanagari loaders (the per-subset @font-face rules use unicode-range, so EN pages with no Devanagari text download nothing) and keep the "EN requests no Devanagari file" network test as the proof. If preload still leaks, split into `fonts.latin.ts` and `fonts.devanagari.ts` with a dynamic import in the `ne` branch.
3. Contrast pair list (§11.3) misses the error and success colours on alt sections. Himal's `#FF8A80` on its light alt `#F3F6FB` is 2.11:1 (I computed it), while `#B3261E` on it is 6.03:1. So add `alt-danger` and `alt-success` tokens (or state that danger/success are remapped in the `data-tone="alt"` scope) and pairs: danger and success on alt and alt-surface (4.5), focus on alt-surface (3).
NITS
4. Brand alias: a CSS `@import "@brand/tokens.css"` may not resolve through Tailwind's CSS import step. Safer mechanism I will implement: `select-brand.mjs` writes a git-ignored `src/styles/brand.generated.css` containing the `@import` of the real brand path, plus the TS alias for `fonts`/`brand`. Write the doc against that and keep "verify at scaffold".
5. Tailwind v4 emits only the theme variables that utilities use unless `@theme static` is set. Your completeness check reads the brand file, not the output, so it is fine, but note it and verify placeholders/derived tokens behave under the tone scopes.
6. Completeness check: detect "missing" by absence in the brand file rather than by finding the magenta placeholder in output.
7. Hero frames: four frame variants ship their CSS in every build. Acceptable for four small frames; later select only the brand's frame at build time. brand.ts should also require `logo` plus a `logoOnDark` variant for natively dark brands and for alt/dark sections.
8. Forced colours: keep the focus ring an `outline` (not a box-shadow) so it survives forced-colors mode; shadows are decoration only. Add one line.
Agreed without change: three layers, semantic-only components, build-time brand, no runtime switching, `_test` brand as proof, danger/success/line-strong additions, 1.75 Devanagari body leading, curated rental font list as an ASSUMPTION pending Roshan.
Needed by: v0.2 by Fri 20 Nov · Reply: not needed

### 2026-11-06 18:49 MSK · pm → satish · ADR-024..029 · FYI
New ADRs in docs/decisions.md: 024 scaffold approved (hritik starts now), 025 only admins change prices, 026 auto-reply email to leads, 027 build-time brand / one image per client, 028 rental fonts from approved list, 029 sitemap (no /faq at launch, 3 rental pages, custom-software page). Update your docs in your next v0.2 where they touch these.
Needed by: your v0.2 dates · Reply: not needed

### 2026-11-06 19:17 MSK · hritik → satish · T-103 · FYI
Scaffold is running (report: team/reports/T-103-scaffold.md). JS budget baseline: an EMPTY home page is already 133 KiB (136.2 KB gzip, 6 chunks, modern browsers) of the 150 KB limit: about 14 KB headroom for everything else. Measure with `node scripts/check-bundle-size.mjs` after `pnpm build`. Consequences: no motion library, no client SDKs, islands only where unavoidable, scope any next-intl client provider to the smallest namespace (fallback in i18n.md §2.3 may be needed). Run the check before you hand over any UI task and put the number in your report.
Also: src/styles/globals.css is a stub (only @import tailwindcss); the @brand/* alias and tokens-base.css are yours to wire, with scripts/select-brand.mjs coming from me after the tokens spike.
Needed by: no action · Reply: not needed

### 2026-11-07 10:50 MSK · writer → satish · T-1002 · HANDOFF
Homepage copy is ready for review: content/pages/home.md. Sections in page order: header, hero, services (9 cards), rent (3), whyUs (4 points), process (4 steps), work (4 cases), pricingTeaser, event, faq (6), finalCta, footer, stickyBar. Each line is `field: text`; field names map 1:1 to message keys (e.g. home.hero.headline, home.services.cards[0].title). Common labels: content/microcopy.md. Voice guide: content/voice-and-tone.md.
Fields starting with `TODO(roshan)` must not be shown on the site; render them hidden or as a dev placeholder until Roshan answers (PAN, phone, WhatsApp number, case results, event venue/time, 3 FAQ answers).
Needed by: 14:00 MSK · Reply: only if a length does not fit your layout

### 2026-11-07 10:38 MSK · pm → satish · ADR-030..040 · FYI
Gate 1 PASSED today. New ADRs in docs/decisions.md: 031 brand = Sindoor Studio layout in ADMMIS colours · 032 migrations at app start · 033 Sentry server-side only · 034 AGENTS.md disabled · 035 backups · 036 leads (24 mo, N=20/h, UTM pre-consent) · 037 **free services only (USD 0)** · 038 writer joins (owns content/) · 039 go/no-go approved · 040 **Scrum, 1-week sprints**. Your Sprint 1 tasks are in team/sprints/sprint-1.md (your section) and team/BOARD.md. Backlog: team/BACKLOG.md. Release plan (soft launch target Mon 14 Dec): team/RELEASE-PLAN.md.
Needed by: n/a · Reply: not needed
