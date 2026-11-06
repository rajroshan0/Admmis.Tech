# Test Plan — tech.admmis.org

Owner: rajaros · Task: T-801 · Version: v0.1 · 2026-11-06 · Reviewer: hritik
Binding sources: CLAUDE.md §8, docs/standards.md §6-9 and §13, docs/ci-spec.md, docs/decisions.md. If this plan and `docs/ci-spec.md` differ on a CI threshold, ci-spec wins.

## 1. Objective and scope
Nothing reaches the 1 Jan 2027 launch that loses a lead, shows a wrong price, breaks on a budget Android phone on 4G, or fails WCAG 2.2 AA. Soft launch Tue 29 Dec; code freeze and go/no-go Thu 24 Dec (docs/timeline.md).

In scope: all launch-scope pages (docs/timeline.md, seo/sitemap.md as amended by ADR-029), lead pipeline, CMS editor flows, consent and analytics gating, SEO output, security basics, backups restore evidence, English content. Nepali: i18n readiness only (docs/frontend/i18n.md §11).
Out of scope at launch (Phase 2): Nepali content, calculator, AI chat, industry pages, CRM sync to ADMIS CRM, client portal. **No `/faq` page exists at launch (ADR-029)**; FAQ blocks on pages are tested as blocks.

## 2. Risk-based priorities

| Rank | Area | Why it costs most | Depth |
|---|---|---|---|
| 1 | Lead form and pipeline (ADR-007) | A lost lead is lost revenue; guarantee: no lead lost if one channel fails | Unit + 15 e2e cases + manual failure drills + prod smoke |
| 2 | Pricing, single source (ADR-014, ADR-025) | Public price commitments; FITTIN showed 3 prices for one plan | e2e cross-page price equality, CMS role test |
| 3 | Homepage and mobile performance | First impression at the opening event, QR/phone traffic | Lighthouse CI, real-device runs, bundle budget |
| 4 | Consent and analytics (ADR-006) | Legal and data risk; wrong gating pollutes data | e2e network assertions |
| 5 | Accessibility (WCAG 2.2 AA) | Legal/brand; keyboard and screen reader users | axe in CI + manual keyboard + screen reader |
| 6 | i18n readiness (ADR-004) | February switch-on must need no rework | i18n.md §11 cases, Devanagari sample page |
| 7 | SEO output | Organic is the long-term channel | Automated checks + Sudip review |
| 8 | Security baseline | Public forms and admin exposed | Automated header/rate-limit checks, manual abuse pass |
| 9 | Content quality | Placeholders and typos embarrass guests | Content sweep script + human proofread |

## 3. Test levels, owners, where they run

| Level | Tool | Owner | Runs | Blocks merge |
|---|---|---|---|---|
| Unit | Vitest | each engineer; leads pipeline Neha | CI `unit` | yes |
| Lint/types/audit | ESLint (jsx-a11y), tsc, pnpm audit | engineers | CI | yes |
| Bundle budget | `scripts/check-bundle-size.mjs` | hritik | CI `bundle-budget` | yes |
| Static-route check | `scripts/check-static-routes.mjs` | hritik | CI `build` | yes |
| e2e + axe | Playwright (Chromium + WebKit), `@axe-core/playwright` | rajaros | CI `e2e` | yes |
| Lighthouse | `@lhci/cli`, mobile preset, 3 runs | raj/hritik config, rajaros reads | CI `lighthouse` | yes after warm-up |
| Real-device and browsers | manual, see qa/device-matrix.md | rajaros | week 7 and before each gate | go/no-go |
| Screen reader | VoiceOver iOS, TalkBack Android (+ NVDA desktop if available) | rajaros | week 7 | go/no-go |
| Security pass | manual + scripted | rajaros with raj | week 7 | go/no-go |
| Restore test | docs/runbooks/infra-setup.md §12 | raj; rajaros witnesses | monthly + before launch | go/no-go |

`playwright.config.ts` (mine, repo root) starts the production build (`pnpm build`, then `pnpm start` or standalone), never `pnpm dev`; base URL `http://localhost:3000`, readiness via `/api/health`. Browsers are installed in CI only. For a throwaway e2e database the first admin is seeded with `POST /api/users/first-register` (Hritik, T-103). Edge is covered by Chromium; Firefox is manual smoke on lead form, pricing and consent.

Playwright conventions: tests in `tests/e2e/`, one file per flow, `data-testid` only where role/label locators fail, one retry (ci-spec §6), traces on first retry, no `waitForTimeout`. Test data: seeded fixture content and Turnstile test keys; `log` adapters for email/chat/CRM or a mock server (leads.md §11, §14). Tests never hit real providers or real people.

## 4. Coverage map: every launch template and the lead pipeline
Template names and URLs from docs/frontend/templates-and-routes.md §4 and seo/sitemap.md. U = unit, E = e2e, A = axe/a11y, P = perf (Lighthouse/bundle), M = manual.

| Template | URLs | U | E | A | P | M | Key checks |
|---|---|---|---|---|---|---|---|
| `home` | `/` | - | yes | yes | yes (LCP image, hero) | device + visual | one h1, hero LCP < 2.5 s, CTA to contact, no layout shift, reduced-motion respected |
| `services-hub` | `/services` | - | yes | yes | yes | - | 9 services listed, links all 200 |
| `service` | 9 pages `/services/*` | - | yes (all 9 smoke) | yes | yes (1 route in LHCI, all in bundle check) | sample 3 | price teaser reads from pricing collection, related cases, quote form, FAQ block |
| `pricing` | `/pricing` | price formatting | yes | yes | yes | - | NPR and USD both in DOM, toggle, prices equal everywhere (§5), quote form |
| `rent-hub`, `rent-product` | `/rent`, `/rent/website`, `/rent/ai-agent`, `/rent/team` | - | yes | yes | yes | - | NPR 100,000/month base (ADR-012) matches CMS, band selector, Offer JSON-LD |
| `cases-list`, `case` | `/work`, `/work/[slug]` x4-6 | - | yes | yes | yes (1 fixture) | client permission recorded | images have alt, no client name without written permission (TODO(roshan)) |
| `about`, `careers-list`, `job` | `/about`, `/careers`, `/careers/[slug]` | - | yes | yes | - | - | closed job: noindex + banner |
| `event` | `/opening-event` | - | yes | yes | yes | - | date shows NPT, registration form uses lead API (`formKind=event`), works on phone from QR |
| `blog-list`, `article` | `/blog`, 3 posts | - | yes | yes | yes (1) | - | reading width, images, JSON-LD Article |
| `contact` + `thank-you` | `/contact`, `/contact/thank-you` | schema | yes (lead cases §6) | yes | yes | prod smoke | thank-you noindex, not in sitemap |
| `legal` | `/privacy`, `/terms`, `/cookies` | - | yes | yes | - | content review by Roshan/legal TODO(roshan) | privacy names all data processors (leads.md §10); cookie settings re-open banner |
| `error` | `/404`, unknown URL | - | yes | yes | - | - | HTTP 404, links home/services/contact |
| generated | `/sitemap.xml`, `/robots.txt` | - | yes | - | - | - | see §9 |
| layout | header, footer, nav, sticky mobile bar, language switcher (hidden while EN only) | - | yes | yes | - | device | keyboard nav, skip link, menu focus trap/restore |
| CMS admin | `/admin` | access rules | yes (role cases) | - | - | editor walkthrough | editor cannot change prices (ADR-025) or open leads; publish -> page updates within revalidation window |

## 5. Critical flow tests (automated, Playwright)

### 5.1 Lead pipeline (docs/api/leads.md §14, owner of cases: Neha; automation: Rajaros)
All 15 cases in leads.md §14 are implemented as e2e (case 13 deferred until NE is enabled). Additional cases I add:

| ID | Case | Expected |
|---|---|---|
| L-16 | Submit on each form kind: contact, quote (pricing), service-page form, event registration | `formKind` stored correctly, one thank-you |
| L-17 | Email channel mock fails, chat succeeds | lead stored, chat sent, email retried (failure of a notification channel, role requirement) |
| L-18 | All channels fail, lead in admin | red status in admin, nothing shown to visitor as error |
| L-19 | Auto-reply on (ADR-026) | visitor gets plain confirmation, no marketing, no PII leak of other leads |
| L-20 | UTM params on landing, navigate, submit | `source` stored (pending Q8) |
| L-21 | Form at 360 px with on-screen keyboard viewport (WebKit mobile emulation) | submit button reachable, error summary focused |
| L-22 | Offline/5xx on submit | data kept, WhatsApp/phone fallback visible, retry uses the same key |
| L-23 | Logs and Sentry payload | no name/email/phone/message in test logs (grep of captured logs) |

### 5.2 Pricing single source (ADR-014)
- P-1: a price in the seeded `pricing` collection appears identically (amount, currency, period) on `/pricing`, `/rent`, `/rent/website`, relevant service teasers, and in the quote-form summary.
- P-2: admin changes a price -> pages show the new value within the revalidation window (templates-and-routes §12 case 4).
- P-3: editor role cannot edit prices; admin can (ADR-025).
- P-4: repo scan test: no price literal (`NPR`, `Rs`, `$` followed by digits) in `src/` outside pricing formatting and fixtures; also grep of rendered HTML for prices not present in the collection.
- P-5: NPR and USD both rendered; currency toggle changes visibility, not the data.

### 5.3 Navigation and routes
templates-and-routes.md §12 cases 1-12 and i18n.md §11 cases 1-3, 11 (locale redirects, 404 for disabled locale). Plus: every internal link on every page returns 200 (crawler test, runs in CI on fixtures); header/footer links identical on all pages; external links have `rel="noopener"`.

### 5.4 Consent and analytics (ADR-006)
- C-1: first visit (no choice): no request to GA4, Meta, Clarity, or any third party; banner visible and keyboard operable.
- C-2: Accept: GA4, Pixel and Clarity load after, once each.
- C-3: Reject / close: still none load; choice remembered; `/cookies` re-opens settings; withdraw stops further tracking.
- C-4: Thank-you conversion event: none without consent; one with consent; none on reload (templates §12 case 5).
- C-5: Turnstile is not a consent-gated tracker (pending Sudip/Roshan decision, templates §13 Q5); test follows the decision.
- C-6: Banner does not cover content on a 360 px screen and does not cause CLS.

### 5.5 Language readiness
i18n.md §11 cases 1-11. At launch only cases 1, 2 (none emitted), 4 (no Devanagari font request on EN pages), 7, 10, 11 run in CI; the Nepali sample page (case 5) runs in week 7 manually, then automated at switch-on.

## 6. Accessibility (WCAG 2.2 AA)
Automated: axe via Playwright on every template URL, on 360 px and 1280 px, with banner open and closed, menu open, form with errors. A new violation fails CI (ci-spec §2 job 8). Lighthouse a11y >= 0.95 (ci-spec §3).
Manual checklist (week 7, every template, full pass on home, pricing, contact):

| # | Check (WCAG 2.2 criterion) | How |
|---|---|---|
| 1 | Keyboard only: all interactive elements reachable and operable, no traps (2.1.1, 2.1.2) | Tab through; menu, dialogs, banner, form, currency toggle, carousel |
| 2 | Visible focus, not obscured by sticky header/mobile bar (2.4.7, 2.4.11 Focus Not Obscured) | scroll while tabbing |
| 3 | Skip link, landmarks, one h1, heading order (1.3.1, 2.4.1, 2.4.6) | inspection |
| 4 | Contrast text >= 4.5:1, large text and UI components >= 3:1 (1.4.3, 1.4.11), incl. on images and in dark/hover/disabled states | axe + manual on hero text over image |
| 5 | Reflow at 320 px wide and 400% zoom, no horizontal scroll (1.4.10) | browser zoom |
| 6 | Text spacing override does not clip (1.4.12) | bookmarklet |
| 7 | Target size >= 24x24 CSS px; 44 px preferred for primary mobile actions (2.5.8) | measure |
| 8 | Forms: labels, instructions, errors identified and linked, error summary focused, no autocomplete blocking, `autocomplete` tokens set (1.3.5, 3.3.1, 3.3.2, 3.3.3) | keyboard + screen reader |
| 9 | Redundant entry: form data kept after server error (3.3.7) | submit with failure mock |
| 10 | Accessible authentication: Turnstile must offer a non-cognitive path (3.3.8) | test widget with keyboard and screen reader; if it fails, S2 |
| 11 | Dragging not required (2.5.7); pointer cancel (2.5.2) | carousel/slider if any |
| 12 | Alt text present and meaningful, decorative marked (1.1.1) | CMS check: required field |
| 13 | `prefers-reduced-motion` stops non-essential animation and hero motion (2.3.3 best practice; project rule) | OS setting on |
| 14 | `lang` attribute correct (3.1.1); switcher links carry `lang` (3.1.2) | inspection |
| 15 | Page titles unique and descriptive (2.4.2); link purpose clear (2.4.4) | crawl |
| 16 | Screen reader: VoiceOver iOS Safari and TalkBack Chrome: home, pricing, contact form, menu, banner | manual script |
| 17 | Consistent help: contact/WhatsApp in same place across pages (3.2.6) | inspection |
| 18 | No content on hover/focus that can't be dismissed (1.4.13) | menus, tooltips |

## 7. Performance
Budget from CLAUDE.md §8 and ci-spec §3: Lighthouse mobile performance >= 90, LCP <= 2.5 s on throttled 4G, CLS <= 0.1, TBT <= 200 ms, first-load JS <= 150 KB gzip on content pages, a11y/SEO/best-practices >= 95.
- CI: LHCI on `/`, `/services/web-development`, `/pricing`, `/rent`, `/contact`, `/blog/<fixture>` (ci-spec §3). I add `/rent/website`, `/work/<fixture>` and `/opening-event` when those templates land.
- Staging (after Gate 2, Raj provides URL): Lighthouse and WebPageTest-style runs behind Cloudflare, 3 runs each, record medians in `qa/perf-log.md`.
- Real device: low-end Android on Chrome with throttled 4G profile and with real mobile data if available: LCP by eye and via Chrome remote debugging; scroll jank on the hero; form typing latency. Numbers recorded in the device log (qa/device-matrix.md §5).
- Weight checks: LCP image size and format (AVIF/WebP), font files count and size (EN pages: no Devanagari file), third-party scripts absent before consent, hero model image budget (Roshan supplies source files; TODO(sharwan/satish) set max KB).
- TTFB check from a Nepal vantage point: TODO(roshan) (a friend's phone or test node); Mumbai VPS and Cloudflare should help (ADR-017); cache HIT ratio for static pages verified via `cf-cache-status`.

## 8. Cross-browser and devices
See qa/device-matrix.md. CI: Chromium + WebKit (Playwright). Manual: Chrome Android, Safari iOS, Chrome/Edge/Firefox desktop, Samsung Internet smoke.

## 9. SEO checks (with Sudip)
Automated per URL: status, one h1, unique title (<= ~60 chars) and meta description, one self-canonical on the canonical host, `robots` meta correct, valid JSON-LD (parse + type per templates §3), Open Graph and Twitter tags with a working image, no `noindex` on indexable pages, `noindex` on thank-you and closed jobs, sitemap lists only indexable pages and excludes `/contact/thank-you`, `robots.txt` disallows `/admin` and `/api` and points to sitemap, staging serves `Disallow: /` and `noindex` (templates §12 case 9), 308/301 redirect map works, breadcrumbs match JSON-LD, image `alt`. No `/faq` URL or sitemap entry. Sudip reviews titles, keywords and schema choice; I verify they are rendered.

## 10. Security basics (with Raj, Neha)

| # | Check | Method |
|---|---|---|
| S-1 | Headers: CSP, HSTS, X-Content-Type-Options, Referrer-Policy, frame-ancestors/X-Frame-Options, Permissions-Policy | script on staging and prod |
| S-2 | `/admin` reachable only with login; no `/api/*` listing; Payload REST closed for leads | request tests unauthenticated, as editor |
| S-3 | Form abuse: oversized payload (413), unknown keys, XSS and HTML in every field, Markdown/mention injection, SQL-like strings, unicode edge cases, wrong origin, replayed Turnstile token | e2e + manual |
| S-4 | Rate limit: 6th request in 10 min = 429 + `Retry-After`; Cloudflare rule active in prod (Raj) | script |
| S-5 | No secrets in client JS or repo: scan built `.next/static` for key patterns and env var names; `gitleaks`-style scan is Raj's CI job, I verify the report | scan |
| S-6 | Cookies: flags (Secure, HttpOnly, SameSite) on admin session; none set before consent except strictly necessary | e2e |
| S-7 | Error pages leak no stack traces or versions; `X-Powered-By` removed | request |
| S-8 | Dependency audit green (`pnpm audit --prod --audit-level=high`) | CI |
| S-9 | Admin: 2FA on all real accounts (ADR-017) checked by Raj; I check the CMS admin has strong password policy and no default account | manual, TODO(roshan) accounts |
| S-10 | HTTPS everywhere, HTTP redirects, www/host canonical, valid cert | script |
| S-11 | Clickjacking and open-redirect: `next.redirect` on thank-you cannot be set to an external URL | e2e |

## 11. Content checks
Sweep script (mine) over rendered HTML of all pages: placeholder strings (`lorem`, `TODO`, `TBD`, `XXX`, `example.com`, `Coming soon`, `[...]`), empty headings, missing alt, broken links, duplicate titles, prices not from CMS, English typos via a dictionary pass, forbidden text (FITTIN name or copied phrases: Sudip supplies the list), photos with unknown rights, client logos or names without recorded permission. Human proofread by the bilingual copywriter (ADR-008, TODO: hire) after content freeze Fri 18 Dec, then Roshan's final content approval (ADR-016). Legal pages reviewed by Roshan (TODO(roshan)).

## 12. CMS and editor flows
Create/edit/publish/unpublish page, case, post, job; slug change creates redirect; image upload requires alt; draft preview works and is not public or indexable; roles (admin, editor, sales) per ADR-025; sales can read leads, editor cannot; "Anonymise lead" action works; autosave/versions do not publish by accident.

## 13. Environments

| Env | Used for | Data |
|---|---|---|
| Local / CI | unit, e2e, LHCI | seeded fixtures, Turnstile test keys, `log` adapters |
| Staging (Raj, after Gate 2; TODO(roshan) account approval) | full regression, device pass, perf, security | content copy, no real lead notifications to real people unless Roshan agrees |
| Production | smoke only: one test lead (tagged, deleted via anonymise), uptime, headers | real; soft launch 29 Dec |

## 14. Bug process
Reproducible or it is not a bug report. Log in `qa/bugs.md` (create on first bug; template below) or GitHub issues once Roshan approves use. Severity:

| Sev | Meaning | Examples | Fix deadline |
|---|---|---|---|
| S1 blocker | Launch cannot proceed | lead lost, site down, wrong price published, consent bypass, data exposure, form unusable on phone | before next build, stop-ship |
| S2 major | Critical flow degraded, no workaround or bad workaround | a11y blocker on form, LCP over budget on home, broken service page | before code freeze |
| S3 minor | Non-critical, workaround exists | layout glitch on one device, minor a11y issue off critical path | before launch if cheap, else hypercare |
| S4 cosmetic | Polish | 2 px misalignment, copy nit | backlog |

Template:
```
### BUG-### · S? · <title>
Found: YYYY-MM-DD by <name> · Build: <commit or URL> · Owner: <engineer>
Env/device: <browser, OS, device, viewport, network, locale>
Steps: 1. … 2. …
Expected: …
Actual: …
Evidence: <screenshot/trace/HAR path or URL> · Frequency: always|sometimes (n/N)
Status: open | fixed (commit) | verified | wontfix (reason, approver)
```
Flow: I log and message the owner and PM; owner fixes in the same task branch; I verify on the same environment and add a regression test where practical; I close it. S1/S2 are reported to PM the same session. A `wontfix` on S1/S2 needs Roshan's approval via PM.

## 15. Shift-left: acceptance-criteria review
Every board task is reviewed by me for testable criteria before build; I reply to the owner and PM in the same session. A criterion is testable when it names an observable result, a number or a URL. I flag: vague words ("fast", "works well"), missing failure cases, missing mobile/a11y/i18n criteria, missing test data.

## 16. Schedule (backwards from launch)

| When | QA activity |
|---|---|
| 9-13 Nov | This plan, matrix, checklist; review criteria of T-1xx/T-2xx/T-4xx tasks |
| 16-27 Nov | Playwright skeleton in `tests/e2e/` once scaffold (T-103) lands: smoke, axe, nav; lead tests wired against Neha's API as it lands |
| 30 Nov-11 Dec | Lead pipeline e2e complete, consent and pricing tests, LHCI route list extended; early device pass of homepage |
| 14-18 Dec | Full regression on staging, content sweep, SEO checks; content freeze Fri 18 Dec |
| 21-23 Dec | Device pass, screen reader, security pass, restore witness, bug fixing and re-test |
| Thu 24 Dec | Code freeze, go/no-go (qa/go-no-go.md) |
| 25-28 Dec | Regression on release candidate; production smoke prep |
| Tue 29 Dec | Soft launch smoke on production |
| Wed 30 Dec | Final checks, launch sign-off input |
| Fri 1 Jan | Event-day watch: uptime, test lead, QR flow on phone |

## 17. Entry and exit criteria
Entry to QA week 7: all content entered (freeze), staging live, seeded data, all P0 templates built. Exit: go/no-go criteria met (qa/go-no-go.md), launch checklist 100 %.

## 18. Open items

| # | Item | To | By |
|---|---|---|---|
| 1 | Devices: 2 budget Android + 1 iPhone available to QA | Roshan | Mon 21 Dec (order by Fri 4 Dec if buying) |
| 2 | Staging URL and basic-auth/noindex | Raj | Gate 2 |
| 3 | Copywriter hired for proofreading (ADR-008); Roshan final sign-off | PM | Fri 11 Dec |
| 4 | Forbidden-phrase list for FITTIN originality check | Sudip | Fri 11 Dec |
| 5 | Max hero image weight | Satish / Sharwan | Gate 2 |
| 6 | Test accounts for CMS roles (admin, editor, sales) in staging | Neha | Fri 4 Dec |
| 7 | Nepal-vantage-point TTFB test | Roshan | Mon 21 Dec |
