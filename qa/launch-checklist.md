# Launch Checklist (DRAFT v0.1)

Owner: rajaros (list), PM (tracks completion) · Task: T-801 · 2026-11-06 · Reviewer: hritik
Status legend: [ ] open · [x] done with evidence (link or file) · [W] waived by Roshan (date, reason).
Items needing real accounts, money, DNS or external contact are `TODO(roshan)`: the owner prepares, Roshan executes or approves (CLAUDE.md §3).
Dates: code freeze Thu 24 Dec · soft launch Tue 29 Dec · sign-off Wed 30 Dec · launch Fri 1 Jan.

## 1. Content and legal (content freeze Fri 18 Dec)

| # | Item | Owner | Due | Done |
|---|---|---|---|---|
| 1.1 | All launch pages entered in CMS: home, services hub, 9 services, pricing, `/rent` + 3 rental pages, work list + 4-6 cases, about, careers (+ open roles), contact, opening event, blog + 3 articles, privacy, terms, cookies (no `/faq`, ADR-029) | pm / copywriter | Fri 18 Dec | [ ] |
| 1.2 | Proofread by bilingual copywriter (TODO: hire, ADR-008) then Roshan sign-off (ADR-016); sweep script clean (placeholders, typos, alt text) | copywriter (TODO: hire) → Roshan; rajaros runs sweep | Tue 22 Dec | [ ] |
| 1.3 | Written client permission recorded for each case study (name, logo, figures, photos) | pm, TODO(roshan) | Fri 11 Dec | [ ] |
| 1.4 | No invented facts, stats, testimonials; every number has a source or is removed | sudip, pm | Fri 18 Dec | [ ] |
| 1.5 | Photo/video rights confirmed (own shoot, hero model files from Roshan) | sharwan, TODO(roshan) | Fri 18 Dec | [ ] |
| 1.6 | Privacy policy names every data processor (email, chat, CRM, analytics, Cloudflare, Turnstile), retention period set, deletion-on-request process | sudip / pm, TODO(roshan) | Fri 11 Dec | [ ] |
| 1.7 | Cookie policy and consent banner texts match what actually loads | sudip, mahendra | Fri 18 Dec | [ ] |
| 1.8 | Prices in CMS final and approved by Roshan (ADR-005, ADR-018); NPR and USD both present | pm, neha, TODO(roshan) | Fri 18 Dec | [ ] |
| 1.9 | Contact details (phone, WhatsApp, email, address, map) correct and tested | pm | Fri 18 Dec | [ ] |
| 1.10 | Opening event page: date, time (NPT), venue, registration flow verified | pm | Fri 18 Dec | [ ] |
| 1.11 | No FITTIN copied text, image or layout (originality check) | sudip, rajaros | Tue 22 Dec | [ ] |
| 1.12 | Roshan + final design/content approval recorded | pm | Wed 23 Dec | [ ] |

## 2. Functional and lead pipeline

| # | Item | Owner | Due | Done |
|---|---|---|---|---|
| 2.1 | e2e suite green on release candidate (CI link) | rajaros | Wed 23 Dec | [ ] |
| 2.2 | Lead e2e cases (leads.md §14 + L-16..L-23) pass | rajaros, neha | Fri 11 Dec | [ ] |
| 2.3 | Real providers configured: sales email address(es), team chat, CRM account (Q10); secrets in production env only | neha, raj, TODO(roshan) | Fri 20 Nov (Q10), re-check Mon 21 Dec | [ ] |
| 2.4 | Auto-reply text approved (ADR-026), sends once, no marketing | neha, pm | Fri 11 Dec | [ ] |
| 2.5 | Lead-worker scheduler running; failed jobs retry; digest arrives | raj, neha | Fri 18 Dec | [ ] |
| 2.6 | Who answers leads and within what time is defined (SLA) | TODO(roshan) | Fri 18 Dec | [ ] |
| 2.7 | Editor and admin roles tested; only admins change prices (ADR-025); editors cannot open leads | neha, rajaros | Fri 18 Dec | [ ] |
| 2.8 | Slug change redirect works; 404 page works; sitemap and robots correct | mahendra, rajaros | Fri 18 Dec | [ ] |
| 2.9 | All internal and external links return 200 (crawler) | rajaros | Tue 22 Dec | [ ] |
| 2.10 | Event registration reaches sales (formKind=event) | mahendra, neha | Fri 18 Dec | [ ] |

## 3. Performance, accessibility, devices

| # | Item | Owner | Due | Done |
|---|---|---|---|---|
| 3.1 | LHCI thresholds met on all listed routes (go-no-go G-5), staging evidence | hritik, rajaros | Tue 22 Dec | [ ] |
| 3.2 | Bundle budget < 150 KB first-load JS on all public routes | hritik | Tue 22 Dec | [ ] |
| 3.3 | Hero and all images optimised (AVIF/WebP, sizes, `priority` only on LCP image) | satish, mahendra | Fri 11 Dec | [ ] |
| 3.4 | axe clean in CI; manual WCAG 2.2 AA checklist signed (test-plan §6) | rajaros | Tue 22 Dec | [ ] |
| 3.5 | Screen reader pass: VoiceOver iOS, TalkBack Android | rajaros | Tue 22 Dec | [ ] |
| 3.6 | Reduced-motion verified on hero and animations | satish, rajaros | Fri 18 Dec | [ ] |
| 3.7 | Real-device pass on 2 Android + 1 iPhone (matrix §6) | rajaros, TODO(roshan) devices | Mon 21-Tue 22 Dec | [ ] |
| 3.8 | Cross-browser smoke: Chrome, Edge, Firefox, Safari, Samsung Internet | rajaros | Tue 22 Dec | [ ] |
| 3.9 | Fast-3G and offline-submit checks pass | rajaros | Tue 22 Dec | [ ] |
| 3.10 | Fonts: EN pages load no Devanagari file; Nepali sample page ok at 360 px | satish, rajaros | Fri 18 Dec | [ ] |

## 4. SEO and analytics

| # | Item | Owner | Due | Done |
|---|---|---|---|---|
| 4.1 | Titles, descriptions, canonicals, OG images, JSON-LD on every page validated | mahendra, sudip, rajaros | Fri 18 Dec | [ ] |
| 4.2 | `sitemap.xml` valid; thank-you and closed jobs excluded; no `/faq` | mahendra, rajaros | Fri 18 Dec | [ ] |
| 4.3 | Production: indexable; staging: `noindex` and `Disallow: /` | raj, rajaros | Tue 29 Dec | [ ] |
| 4.4 | Google Search Console and Bing property verified, sitemap submitted | sudip, TODO(roshan) accounts | Tue 29 Dec | [ ] |
| 4.5 | GA4, Meta Pixel, Clarity: IDs set, events fire only after consent, conversion event on thank-you only once per lead (accounts: TODO(roshan)) | sudip, mahendra | Fri 18 Dec | [ ] |
| 4.6 | Analytics test in production: one consented test conversion seen in GA4 DebugView | sudip, rajaros | Tue 29 Dec | [ ] |
| 4.7 | Social share previews (WhatsApp, Facebook, LinkedIn) show correct image and text | rajaros | Tue 22 Dec | [ ] |

## 5. Infrastructure, security, operations

| # | Item | Owner | Due | Done |
|---|---|---|---|---|
| 5.1 | Production VPS, Cloudflare, DNS `tech.admmis.org`, TLS valid, HTTP -> HTTPS (accounts, DNS: TODO(roshan)) | raj | Mon 14 Dec | [ ] |
| 5.2 | 2FA on every account (ADR-017); recovery codes stored | raj, TODO(roshan) | Mon 14 Dec | [ ] |
| 5.3 | Security headers and CSP verified (test-plan S-1) | raj, rajaros | Tue 22 Dec | [ ] |
| 5.4 | Turnstile production keys set; rate limit and Cloudflare rule active | raj, neha | Fri 18 Dec | [ ] |
| 5.5 | Security abuse pass done (S-1..S-11), no secrets in client JS | rajaros, raj | Tue 22 Dec | [ ] |
| 5.6 | `pnpm audit` high/critical = 0; dependencies pinned | hritik | Wed 23 Dec | [ ] |
| 5.7 | Daily backup running; heartbeat alert proven | raj | Fri 18 Dec | [ ] |
| 5.8 | Restore test passed, logged in `docs/runbooks/restore-log.md` (RTO measured) | raj, rajaros witness | Fri 18 Dec | [ ] |
| 5.9 | Uptime monitor, `/api/health`, worker and backup heartbeats, Sentry: test alert received by right people | raj | Fri 18 Dec | [ ] |
| 5.10 | Rollback to previous image tested on staging | raj | Tue 22 Dec | [ ] |
| 5.11 | Deploy runbook dry-run; production deploy approved by Roshan | raj, TODO(roshan) | Mon 28 Dec | [ ] |
| 5.12 | Admin accounts created for editors with least privilege; default/test accounts removed | neha, raj | Mon 28 Dec | [ ] |
| 5.13 | On-call plan for 1 Jan: who watches alerts, who can deploy a fix, phone numbers (no secrets in repo) | pm, raj | Tue 29 Dec | [ ] |
| 5.14 | Cost/limits check: no free-tier cap (email sends, Sentry events, R2, monitors) will be hit by launch traffic | raj | Mon 21 Dec | [ ] |

## 6. Release and launch days

| # | Item | Owner | When | Done |
|---|---|---|---|---|
| 6.1 | Go/no-go criteria evaluated (qa/go-no-go.md); decision recorded | rajaros, pm, TODO(roshan) | Thu 24 Dec | [ ] |
| 6.2 | Code freeze; release tag created; deployed image digest = tested commit | hritik, raj | Thu 24 Dec | [ ] |
| 6.3 | Soft launch deploy, production smoke: home, pricing, rent, contact test lead (tagged, then anonymised), consent, 404, sitemap, robots, headers | raj, rajaros | Tue 29 Dec | [ ] |
| 6.4 | Event rehearsal on the real URL and projected screen/phone; QR codes scanned on 2 phones | pm, rajaros | Tue 29-Wed 30 Dec | [ ] |
| 6.5 | Launch sign-off | TODO(roshan) | Wed 30 Dec | [ ] |
| 6.6 | Launch-day watch (uptime, leads, errors, traffic) | raj, rajaros, neha | Fri 1 Jan | [ ] |
| 6.7 | Test-lead cleanup in production; confirm no test data left in CMS | neha, rajaros | Wed 30 Dec | [ ] |
| 6.8 | Hypercare plan 4-15 Jan: daily lead check, Search Console errors, S3 backlog | pm | Fri 1 Jan | [ ] |

## 7. Counting rule
Total items: 12 + 10 + 10 + 7 + 14 + 8 = 61. Launch needs 61/61 done or waived in writing by Roshan. Only I edit `qa/`: owners send me an evidence link and I tick the box; PM reads the status here. Evidence goes in `qa/go-no-go-evidence.md`.
