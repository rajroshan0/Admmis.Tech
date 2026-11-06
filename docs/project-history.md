# Project history (from the first request to today)

A chronological record of how this project started and every step taken, so new team members can understand *why* things are the way they are. Detailed decisions are in [decisions.md](decisions.md); weekly status is in [progress-log.md](progress-log.md).

---

## Step 1 — Reverse-engineering fittin.ru (6 Nov 2026, 08:56 MSK)
**Request (Founder):** "I want to understand the architecture of this website, do reverse engineering." — https://fittin.ru/

**What was done**
- Fetched the homepage content and meta tags.
- Shell requests to fittin.ru were blocked (HTTP 403 from the sandbox), so the site was opened in a real browser and inspected from inside the page: scripts, stylesheets, network requests, response headers, forms, service worker.

**Findings**
- fittin.ru is **static HTML on nginx** (HTTP/2, gzip, weak ETags, `Cache-Control: max-age=3600`). Clean URLs via `try_files` (`/tariffs` and `/tariffs.html` both work). No framework, no CMS, no Flutter on their own site.
- Header/mega-menu injected by `header-include.js`; CSS split into critical + deferred with `?v=` cache busting; self-hosted Gilroy fonts; Service Worker `sw.js` (cache v6, header network-only).
- Lead forms: JS POSTs `{chat_id, message}` to `bill-go.fittin.ru/send-telegram-message` → Telegram group. No database/CRM step.
- `lead-events.js` → Yandex Metrika goals (counter 104370182, Webvisor on).
- News widget from `ainews-back.fittin.ru/public/content/{id}/enriched_news`.
- Video from Yandex Object Storage; icons from `unpkg.com/lucide@latest` (unpinned).
- Heavy SEO: ~100 niche landing pages, ~10 JSON-LD blocks per page.
- Weak spots: client-side header (bad for non-JS crawlers), Telegram chat_id exposed in public JS, unpinned CDN dependency, duplicated code across pages.

## Step 2 — Comparing with a ChatGPT analysis (09:02)
**Input:** Founder shared ChatGPT's analysis → saved as [references/chatgpt-fittin-analysis.md](references/chatgpt-fittin-analysis.md).

**Assessment**
- ✅ Correct: the tech list on FITTIN's About page exists (Flutter, Python, Docker, MySQL, S3, Elasticsearch, Redis, PostgreSQL, MongoDB, Sentry, GitLab, GitHub Actions, CodeMagic, Yandex/Google/AWS cloud) — verified. Correctly warned that this is their **product** stack, not their website's. Good split between "corporate site" vs "e-commerce platform".
- ❌ Wrong / weak: invented URL tree (`/services/…`, `/cases`, `/tarify` don't exist; real structure is flat slugs at root, `/all_cases`, `/tariffs`); database schema is a guess (their site has no DB); "microservice-oriented" not found on the page; no network-level findings; an unrelated "Fit-A-Pet" image; mostly generic methodology.
- Conclusion: use the observed findings for "how FITTIN works"; ChatGPT's suggested stack is a reasonable starting point for building our own.

## Step 3 — Decision to build our own agency site (09:07)
**Request:** Build a similar website for our own country (Nepal), same services, design loosely inspired by FITTIN, our own material. Act as the only PM managing 5 senior engineers + 3 professionals; can request more people.

**PM output:** approach (learn from FITTIN, don't copy; discovery → design → build; strong v1 then grow), 9 stakeholder questions, team role assignment, request for copywriter + photographer (+ optional lawyer), proposed stack, 14-week plan, risks, Monday kickoff message.

## Step 4 — Stakeholder answers and project setup (09:32)
**Founder decisions:** brand **ADMMIS.TECH** (sub-organisation of registered ADMMIS) · new agency with existing clients · services: any-tech development, websites, AI products, AI agents, QA, audit, outstaffing, **digital + offline marketing** · clients: Nepali SMEs/retailers/small business + international (Asia, Europe, Americas) · English first, Nepali ~1 month later · small services priced in NPR + USD, big ones by quote · **deadline 1 January 2027 with an opening event** · approval: CTO + Founder · copywriter and photographer approved · Node.js preferred · GA4 + Meta Pixel + Clarity approved · hero visual: AI model in a Nepali sari (Founder will supply) · record everything in Git README.

**PM output**
- Opened FITTIN's pricing page: `/tariffs` redirects (meta refresh) to `/tariffs-a` (A/B test). PRO 170k ₽/mo + 625k ₽ setup; PRO+ 190k ₽/mo + 835k ₽; Individual; T&M from 2,625 ₽/h.
- Python vs Node: Node.js chosen (ADR-003) — speed comes from static generation + CDN, not the language; one TypeScript codebase.
- Plan compressed from 14 to **8 weeks**; launch scope defined.
- Budget estimate ≈ **NPR 2.36M / USD 15,750** to launch (1 USD ≈ 150 NPR; senior contractors at NPR 120k/month; market reference NPR 80–100k+ for seniors).
- Repo created with README + docs (decisions ADR-001–011, architecture, timeline, team & tools, budget, progress log, open questions, FITTIN reference). Commit `9705cc1`.

## Step 5 — Rental service + full FITTIN study (09:42)
**Founder decisions:** sell the rental model **now**, not later: website on rent, AI agents on rent, teams on rent — **NPR 100,000/month**. Asked for a deeper study of everything FITTIN has.

**PM output**
- ADR-012 (rental service at launch), ADR-013 (our site codebase is themeable/multi-brand and becomes the "website on rent" product), ADR-014 (all prices in one CMS collection).
- Flagged: "team on rent" at 100k loses money (one senior ≈ 120k) → open questions Q12–Q15.
- Full study of all 67 sitemap pages: ROI calculator, "Маша" quiz persona, 51 case cards + case template, 16-block service page template, 4 AI SaaS products with prices, rental details (support hours, 1-hour critical SLA, code buyout, group launch), hourly rates, webinars, reels, partners, documentation, FAQ. Found FITTIN's prices contradict across pages. → [reference-fittin.md](reference-fittin.md). Commit `d4442e9`.
- During the study fittin.ru began refusing the browser (likely rate limiting); remaining pages read via web fetch.

## Step 6 — Repo moved to the Founder's Mac (09:47)
**Request:** keep all files from start to end in `~/Desktop/ADMMIS.TECH`; Founder will push to Git later.
**PM output:** this history file + the ChatGPT reference added; full repo (with git history) copied to the folder.

## Step 7 — Founder's PDF capture of fittin.ru (10:10)
**Input:** 217-page PDF (Google Docs render, English-translated) of FITTIN's homepage, newer pricing page, cases list, media menu and custom development page → saved as [references/fittin-pages-capture-2026-11.pdf](references/fittin-pages-capture-2026-11.pdf).
**PM output:** text extracted and deduplicated (most pages are repeated carousels). New findings added to [reference-fittin.md §3.9](reference-fittin.md): Website / App / Full-channel packages (Full channel 835k ₽ + 270k ₽/month), "what's included" and "what you pay separately" tables, risk table, 8 hourly roles incl. AI prompt engineer at 4,200 ₽/h, custom-dev page structure, case card metrics, original-research blog content. Adoption table extended.

---

## Sources used
- https://fittin.ru/ · /tariffs-a · /sitemap · /kalkulyator-stoimosti-razrabotki-prilozheniya · /interactive-site · /all_cases · /all_cases/gulliver · /o-nas · /partners · /documentation · /faq · /products_salesynergy · /products_contentzavod · /AIPhotoEditor · /webinar-landing · /reels · /razrabotka-ii-agentov-dlya-biznesa
- Nepal salary reference: https://www.kumarijob.com/blog/job-salary-in-nepal/software-engineer-salary-in-nepal
- Exchange rate: https://wise.com/us/currency-converter/usd-to-npr-rate
