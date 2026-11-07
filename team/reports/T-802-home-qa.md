# Report — T-802 Manual QA of the day-1 homepage
Owner: rajaros · Date: 2026-11-07 · Status: DONE

## Delivered
| File | What it is |
|---|---|
| `qa/bugs/BUG-001` to `BUG-010` | 10 bug reports (0 S1, 2 S2, 6 S3, 2 S4) |
| this report | Pass/fail table and evidence |

## Scope and method
Commit 5fdd40a. `pnpm build`, then `pnpm start --port 3102` (production). Chrome stable driven by Playwright (`@playwright/test` 1.65 is in the repo; Playwright's own browsers are not installed, so I used the installed Google Chrome with `channel: 'chrome'`). axe-core 4.14 through `@axe-core/playwright`. Lighthouse 13.6 (from `@lhci/cli`), mobile defaults, 3 runs. No packages installed, no code changed. Only the server I started (PID 37015) was stopped.
Not tested: real devices, Safari/WebKit, Firefox, screen reader, 200 % zoom, slow-network visual check. Those stay open for T-804.

## Verdict
**No S1.** Two S2 (focus ring invisible on case cards, LCP over budget). Fixable before Roshan's 20:00 review: BUG-001 (small CSS change), BUG-008 (footer email wrap), BUG-003 (remove FAQ link). The page itself is solid.

## Pass / fail
| # | Check | Result | Notes |
|---|---|---|---|
| 1 | No horizontal page scroll at 320, 360, 768, 1280 | PASS | `scrollWidth == clientWidth` at all four. Case cards scroll sideways inside their own row at 360 and 768 (intended `scroll-row`) |
| 2 | Nothing overlapping (screenshots 360 and 1280, full page) | PASS | One cosmetic issue: footer email wraps mid-word at 1280 (BUG-008) |
| 3 | Sticky bar below 768 only | PASS | `display:flex` at 360; `none` at 768, 1023, 1024, 1280. Only "Get a quote" shows (WhatsApp and Call wait for numbers, TODO(roshan)) |
| 4 | Burger below 1024, desktop nav from 1024 | PASS | Matches spec 3.1 |
| 5 | Skip link first, works | PASS | First Tab stop, 208x50, visible ring, targets `#main` |
| 6 | Tab order logical, 1280 and 360 | PASS | Header, hero, services, rent, work, pricing, event, FAQ, CTA band, footer. Sticky bar last in DOM |
| 7 | Visible focus on every interactive element | **FAIL** | Four case-card links: ring clipped by `overflow-hidden` (BUG-001). Everything else shows a 3 px ring (blue on light, amber on navy, navy on orange) |
| 8 | Mobile menu open, close, Escape, focus return | PASS | `aria-expanded` and label swap, Tab and Shift+Tab wrap inside the panel, Escape closes and focus returns to the burger, body scroll locked, sticky bar covered while open |
| 9 | FAQ `<details>` | PASS | Native, first open, exclusive (`name`), Enter and Space toggle, ring visible. Three questions shown; the three with `TODO(roshan)` answers are hidden as the spec requires |
| 10 | Links resolve | PASS with known 404s | See list below |
| 11 | Copy equals `content/pages/home.md` | PASS | Header, hero, services (9), rent (3), why us (4), process (4), work (4), pricing, event, FAQ (3 of 6), final CTA, footer about and copyright match word for word. One difference: page shows only one CTA button in the final band (WhatsApp number pending) |
| 12 | No TODO text, no PAN visible | PASS | grep of rendered text: no `TODO`, no 12-digit number, no phone, no address, no registration line |
| 13 | Images, alt text, size | PASS | Logo alt "ADMMIS.TECH home"; hero alt as in content, 460x575 rendered, `/_next/image` 640 w, 22 KB webp (hritik), preloaded; footer lockup lazy with alt "ADMMIS.TECH"; case covers are CSS and `aria-hidden` |
| 14 | Heading order | PASS | One h1; h2 per section; h3 inside cards; footer column titles are h2 (acceptable, per hritik) |
| 15 | Landmarks | PASS | header, labelled nav, `main#main`, footer with 4 labelled navs, sections `aria-labelledby`. axe: 0 violations at 1280, 1 moderate best-practice `region` at 360 (BUG-009) |
| 16 | Contrast, 5 pairs vs spec | PASS | Computed from rendered colours: white on navy 16.06 (h1), amber on navy 8.43 (eyebrow), muted on bg 7.31, navy on orange 6.16 (buttons), footer text `#D7DEF0` on navy 11.93. Focus ring on bg 4.52. All match spec section 1 |
| 17 | Reduced motion | PASS | `prefers-reduced-motion: reduce`: zero elements with transition or animation over 0.01 ms |
| 18 | Lighthouse mobile | **PARTIAL** | Performance 97 / 95 / 97, accessibility 100, best-practices 100, SEO 100. CLS 0, TBT 10 to 150 ms, total 207 KiB. **LCP 2.5 / 2.6 / 2.6 s, median 2.6 s, over the 2.5 s budget** (BUG-002) |
| 19 | JS without JavaScript | PARTIAL | Content renders without JS; menu button is shown but inert (BUG-004) |
| 20 | Meta and sharing | PARTIAL | Title and description present and match content; canonical and og:url are localhost (build env); no og:image (BUG-006) |
| 21 | Spec fidelity: header dropdowns | PARTIAL | Services and About are plain links (BUG-005) |
| 22 | Security headers (localhost) | PARTIAL | `nosniff`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` present. No CSP or HSTS (expected to come from Cloudflare or Raj; not tested here). HTML `s-maxage` is one year (BUG-007) |

## Links on the page
200: `/`, `https://www.admmis.org`, `mailto:`. **404 (pages not built yet, expected):** `/services`, `/rent`, `/pricing`, `/work`, `/about`, `/contact`, 9 service pages (`/services/web-development`, `mobile-app-development`, `custom-software`, `ai-agents`, `qa-testing`, `audit`, `outstaffing`, `digital-marketing`, `offline-marketing`), `/rent/website`, `/rent/ai-agent`, `/rent/team`, `/opening-event`, `/careers`, `/blog`, `/privacy`, `/terms`, `/cookies`.
**404 and should never exist:** `/faq` (ADR-029, BUG-003).
Most important dead link for Roshan to know about: **every "Get a quote" button (header, hero, pricing, CTA band, sticky bar) goes to `/contact`, which is 404 today.** The lead form is the product of this site; until T-304/T-4xx land, the page cannot capture a lead.
Also 404: `/robots.txt`, `/sitemap.xml`, `/favicon.ico` (BUG-010). `/ne` is 404 by design. `/en` returns 200 and `/` returns 200 (known, hritik nit 1).

## Observations that are not bugs
- Copy says "one message away on WhatsApp" but no WhatsApp link exists anywhere yet (number is TODO(roshan)). Fine for a review build, must be fixed before launch.
- Footer shows "© 2027". Correct for launch, odd on a 2026 preview.
- Footer email `admmis.org@gmail.com` is published although company-info asks Roshan whether a sales address on admmis.org is wanted.
- JS: Lighthouse reports about 53 KiB unused JS and 14 KiB legacy JS (framework). Hritik owns the 143.8 KB budget measure.
- **Shared folder warning:** running `pnpm build` rewrote `.next/`. A `next start` on port 3100 (PID 35573, started 10:55 from this same folder, not mine) was running at the time and now serves from a changed build. If that is someone's open review session, they should restart it.

## Decisions & assumptions
- ASSUMPTION: Chrome stable stands in for Chrome Android. Real low-end Android not tested (needs Roshan's device list, T-804).
- ASSUMPTION: Lighthouse on localhost without Cloudflare; the binding LCP is the staging run (hritik's go/no-go note).

## Handoffs
- satish: BUG-001, 004, 005, 008, 009. mahendra: 003, 006, 010. hritik and raj: 002, 007. writer: 003. sharwan: 003 (spec dropdown lists FAQ), 005.
- T-803 (Playwright + axe spec) next.

## Needs Roshan
- Nothing new. Reminder for tonight: `/contact` is 404, so no quote button works yet.

## T-803 started (same day)
`playwright.config.ts` and `tests/e2e/home.spec.ts` written: 20 tests (structure, copy vs `content/pages/home.md`, links, layout at 360/768/1280, sticky bar, menu, FAQ, skip link, focus rings, reduced motion, axe WCAG 2.2 AA at 360 and 1280). All 20 pass on Chromium against the production build; BUG-001, 003, 009 are `test.fail()` markers that turn red when the bug is fixed (remove the marker then). WebKit not run locally (browsers not installed); CI installs chromium and webkit. Lint clean. Run locally: `pnpm build`, then `E2E_PORT=3102 E2E_CHANNEL=chrome E2E_WEBKIT=0 pnpm test:e2e`. My server on port 3102 is stopped.
