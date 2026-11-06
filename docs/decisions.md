# Decision log (ADRs)

Format: number · date · decision · reason · approved by. Newest at the bottom. Never delete an entry; supersede it.

| # | Date | Decision | Reason | Approved by |
|---|---|---|---|---|
| ADR-001 | 2026-11-06 | Company/brand: **ADMMIS.TECH**, sub-organisation of the registered ADMMIS | Uses existing legal entity; faster start | Founder |
| ADR-002 | 2026-11-06 | **Launch 1 Jan 2027** at opening event. Scope reduced to fit 8 weeks (see timeline) | Fixed business date | Founder |
| ADR-003 | 2026-11-06 | **Node.js + TypeScript**: Next.js + Payload CMS + PostgreSQL, one app | One language for the whole team; Payload runs inside Next.js (one codebase, one deploy). Page speed comes from static generation + CDN, not from the language. Python (FastAPI) stays the choice for future AI/ML services | Founder (proposed by PM) |
| ADR-004 | 2026-11-06 | **English at launch**, Nepali ~1 month after. Site built i18n-ready from day one | Time to Jan 1; avoid rework | Founder |
| ADR-005 | 2026-11-06 | Public prices for small services in **NPR + USD**; quote form for large projects | Mix of local and international clients | Founder |
| ADR-006 | 2026-11-06 | Analytics: **GA4 + Meta Pixel + Microsoft Clarity**, loaded only after cookie consent | Measure leads by channel; retarget ads; see user behaviour. Consent needed for EU/US visitors | Founder |
| ADR-007 | 2026-11-06 | Lead pipeline: form → API → database → email + team-chat alert → CRM | No lead lost if one channel fails (FITTIN only relays to Telegram) | Founder |
| ADR-008 | 2026-11-06 | Hire **bilingual copywriter** + **photographer/videographer** | Content is the critical path; own photos instead of stock | Founder |
| ADR-009 | 2026-11-06 | Hero visual: **AI-generated model in a Nepali sari**, supplied by Founder | Distinctive, local brand identity | Founder |
| ADR-010 | 2026-11-06 | Final design/content approval: **CTO + Founder** | Clear sign-off owners | Founder |
| ADR-011 | 2026-11-06 | All project records live in this Git repo (README + /docs) | One source of truth for the whole team | Founder |
| ADR-012 | 2026-11-06 | **Rental service sold from launch:** website on rent, AI agent on rent, team on rent. Base price **NPR 100,000/month**. Exact scope per plan pending (Q12–Q15) | Recurring revenue; proven by FITTIN's subscription model | Founder |
| ADR-013 | 2026-11-06 | The ADMMIS.TECH site codebase (Next.js + Payload blocks) is built **themeable and multi-brand** so it becomes the base product for "website on rent" | Build once, reuse for every rental client; no separate product to build before launch | Founder (proposed by PM) |
| ADR-014 | 2026-11-06 | All prices (packages, rental plans, hourly rates) live in **one CMS collection**; every page reads from it | FITTIN shows 3 different prices for the same plan on different pages | Founder (proposed by PM) |
| ADR-015 | 2026-11-06 | **Domain: `tech.admmis.org`** (subdomain of ADMMIS) — supersedes the `admmis.tech` assumption. Brand name stays ADMMIS.TECH | Part of the ADMMIS family; no extra domain cost | Roshan |
| ADR-016 | 2026-11-06 | **Roshan is Founder and CTO** → single approver for all gates. Tech lead (Hritik) does a technical review before each gate. Approval SLA: **12 hours**. Supersedes ADR-010 | Faster decisions; keep a second pair of eyes on technical gates | Roshan |
| ADR-017 | 2026-11-06 | CTO approved stack (ADR-003). Hosting: **VPS in Mumbai region**, no existing servers — new accounts. **2FA mandatory** on all accounts. **Backups every 24 hours** | Low latency for Nepal; security baseline | Roshan (CTO) |
| ADR-018 | 2026-11-06 | **Rental pricing by company size:** every service is charged separately; price depends on client size band. Proposal in `pricing-model.md` | Fair for micro businesses, profitable on large clients | Roshan (bands/prices pending gate 1) |
| ADR-019 | 2026-11-06 | Rental products (ready-made website + tools, AI agents) are **built by our senior engineers**, reusing this site's codebase (ADR-013) | No separate team needed | Roshan (CTO) |
| ADR-020 | 2026-11-06 | **Logo:** ADMMIS family, own "AT" monogram/combination mark | Family brand, distinct unit | Roshan |
| ADR-021 | 2026-11-06 | **Daily standup 10:00 MSK** (12:45 NPT) | Works for Founder (Moscow) and team (Nepal) | Roshan |
| ADR-022 | 2026-11-06 | Code repository: **github.com/rajroshan0/Admmis.Tech** | — | Roshan |
| ADR-023 | 2026-11-06 | **AI team operating model:** each role (PM + 8 seniors) runs as a Claude Code AI employee with its own role file (`.claude/agents/`), shared rules (`CLAUDE.md`), task board (`team/BOARD.md`) and inboxes (`team/inbox/`). Plan → execute → verify → report loop; only PM commits; Roshan approves money, accounts, pushes, deploys and external contact | One way of working for the whole team; every task, message and decision traceable in the repo | Roshan |
| ADR-024 | 2026-11-06 | **T-103 app scaffold approved** before Gate 1: Next.js + Payload + Tailwind, pnpm, `.env.example`, docker compose for local Postgres, README "Getting started". Local only: no deploy, no accounts | Lets Roshan run the site locally (`pnpm dev`) and unblocks the Mon 16 Nov spikes and the JS-budget baseline | Roshan |
| ADR-025 | 2026-11-06 | **Only admins may change prices** in the CMS (editors cannot) | Prices are public commitments (ADR-005, ADR-014); one controlled source | Roshan (proposed by neha/pm) |
| ADR-026 | 2026-11-06 | **Auto-reply email** to everyone who submits a lead form: plain confirmation, no marketing | Tells the client we received it; reduces duplicate submissions | Roshan (proposed by neha/pm) |
| ADR-027 | 2026-11-06 | **One repo, no monorepo; brand fixed at build time; one Docker image per client** (`ARG BRAND`, tag `<brand>-<sha>`), same commit for all brands. Detail of ADR-013 | Each client site ships only its own CSS/fonts (performance budget); one codebase to maintain | Roshan (proposed by hritik/pm) |
| ADR-028 | 2026-11-06 | **Rental clients choose fonts from an approved list** (free Google Fonts with Devanagari); no custom font uploads | Keeps licensing, Devanagari support and performance under control | Roshan (proposed by satish/pm) |
| ADR-029 | 2026-11-06 | **Sitemap scope:** /rent hub + 3 separate rental pages (website, AI agent, team); Development + Websites merged into one web-development service; new custom-software/SaaS service page; **no standalone /faq at launch** (FAQ blocks on pages only) | Each rental product is its own search intent; clearer service split; less launch content | Roshan (proposed by sudip) |
