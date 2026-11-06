# Kickoff pack — ADMMIS.TECH website

Prepared by PM, Fri 6 Nov 2026. **Kickoff: Monday 9 November 2026.**

---

## 1. Start plan

| When | What | Who |
|---|---|---|
| Fri 6 – Sun 8 Nov | Founder answers the 6 "must have before Monday" questions (§2). PM sends stakeholder brief and team kickoff invite. Job posts for copywriter + photographer go out | Founder, PM |
| **Mon 9 Nov** | Stakeholder meeting (30 min) → Team kickoff (60 min) → work starts | All |
| Tue 10 – Thu 12 Nov | Week-1 tasks (§5). Copywriter and photographer interviews | Team, PM |
| **Fri 13 Nov** | Gate 1: sitemap, scope, brand direction, rental plan details | CTO + Founder |

**Nothing blocks a Monday start.** Work that needs missing answers (case studies, prices, rental terms) is scheduled for later in week 1–2.

## 2. Questions — by person

### Founder (Roshan) — must have before Monday
1. Names of the 5 engineers + 3 professionals, and which role each takes (see `team-and-tools.md`). Are they full-time on this project or shared?
2. CTO's name and contact.
3. GitHub organisation name (to push this repo and invite the team).
4. Is `admmis.tech` registered? Who controls DNS?
5. Budget OK? (`budget.md`: ≈ NPR 2.36M / USD 15,750 to launch). Can PM approve tool subscriptions up to USD 300/month?
6. Time zone for meetings: is the team in Nepal (NPT)? You are in Moscow time — 10:00 NPT standup = 07:15 MSK. Suggest standup at **12:45 NPT / 10:00 MSK**?

### Founder — needed by Fri 13 Nov
7. Rental plans (Q12–Q14): what 100k NPR includes, setup fee, minimum term, who owns code if the client leaves.
8. List of current clients + which ones may be shown as case studies (we ask them for permission).
9. Where is ADMMIS registered (country, registration/PAN/VAT number) — needed for footer, invoices, legal pages.
10. Existing ADMMIS brand assets: logo files, colours, fonts? Should ADMMIS.TECH look like part of the ADMMIS family or be its own brand?
11. Hero model files (sari): delivery date.

### CTO
1. Approve the stack (ADR-003, ADR-013): Next.js + Payload + PostgreSQL, single app. Any objection?
2. Hosting preference: VPS region close to Nepal (Singapore or Mumbai) — any existing provider/account?
3. Existing ADMMIS infrastructure to reuse (servers, Google Workspace, GitHub, Cloudflare, CRM)?
4. Security requirements: 2FA policy, who gets production access, backup retention.
5. Who owns the AI-agent rental product (Q15) — this team or a separate one?
6. Availability for gates (13, 20, 27 Nov, 24 & 30 Dec): can you approve within 48 hours?

### Engineers (at kickoff)
1. Weekly availability and any leave planned before 1 Jan (Dashain/Tihar are over; Christmas/New Year?).
2. Experience with Next.js, Payload CMS, Tailwind, Docker — anyone needs ramp-up time?
3. Laptops OK? Anyone needs accounts (GitHub, Figma, Slack, Bitwarden)?
4. Tech lead: propose coding standards, branch rules, PR review policy by Wed.

### Designer
1. Portfolio direction you'd propose for a Nepali tech + marketing agency with international clients.
2. Font licences: OK to use free Google Fonts (and one that supports Devanagari for the Nepali version later)?

### SEO / content strategist
1. Does admmis.tech or admmis.org already have traffic / Google Search Console / Analytics accounts?
2. Top 10 competitor agencies in Nepal you know of (for benchmark).

### QA
1. Which test phones do we have? (Need 2 budget Android + 1 iPhone.)

### Sales (whoever answers leads)
1. Which email/number receives leads? Response target (suggest: within 2 working hours)?

## 3. Brief for stakeholders (Founder + CTO) — send today

> **ADMMIS.TECH website — project brief**
> **Goal:** English agency website live **1 January 2027** at the opening event; Nepali ~February.
> **Scope at launch:** Home, 8–10 service pages, "On rent" page (website / AI agent / team from NPR 100k/month), 4–6 case studies, pricing (NPR + USD), about, careers, contact, blog (3 articles), event page, legal pages, CMS, lead pipeline, analytics.
> **Stack:** Node.js/TypeScript — Next.js + Payload CMS + PostgreSQL, Cloudflare, Docker on VPS.
> **Budget:** ≈ NPR 2.36M / USD 15,750 to launch incl. 15% contingency; ≈ USD 60–150/month to run.
> **Your sign-offs:** 13 Nov (scope, brand), 20 Nov (homepage), 27 Nov (all designs), 24 Dec (go/no-go), 30 Dec (launch).
> **Top risks:** late content, slow approvals, unclear rental terms, no case-study permissions.
> **What I need from you:** see questions list. Everything is recorded in the Git repo (README + /docs).

## 4. Kickoff meeting agenda — Mon 9 Nov (60 min)

1. Why we're building this, and the 1 Jan deadline (Founder, 5 min)
2. Scope, timeline, gates (PM, 10 min)
3. What we learned from FITTIN — what we copy, what we do better (PM, 10 min)
4. Architecture and stack (Tech lead, 10 min)
5. Roles, ways of working, tools, Definition of Done (PM, 10 min)
6. Week-1 tasks and owners (PM, 10 min)
7. Questions (5 min)

**Reading before the meeting:** README.md, docs/timeline.md, docs/architecture.md, docs/reference-fittin.md §3.4, §3.9.

## 5. Team kickoff message — send Monday morning

> Hi team — ADMMIS.TECH website kicks off today. Launch is **1 January** at our opening event.
> Repo: (link) — README is the single source of truth. Please read README, timeline, architecture and the FITTIN study before the kickoff at (time).
> **Week 1 owners:**
> - **Tech lead:** repo, Docker, CI with Lighthouse budget, coding standards (Wed)
> - **Frontend 1:** component inventory from the reference (keep / change / drop), design tokens plan for multi-brand (ADR-013)
> - **Frontend 2:** page template list, i18n structure (EN now, NE later)
> - **Backend:** Payload collections draft: services, cases, pricingPackages, rentalPlans, hourlyRates, leads (Thu)
> - **DevOps:** VPS (Singapore/Mumbai), Cloudflare, staging URL, Sentry, backups (Fri)
> - **Designer:** 3 brand directions with the sari-model hero (Fri)
> - **SEO:** keyword map (EN), sitemap draft, Nepal competitor + price benchmark (Thu)
> - **QA:** test plan + device list (Fri)
> Standup daily at (time). Gate 1 Friday 13 Nov.

## 6. Hiring briefs — post today

**Contract copywriter (English, Nepali later)** — 9 Nov – 31 Dec, ~6 weeks full-time
Writes ~25 web pages (home, services, rental, pricing, about, careers), 4–6 case studies, 3 blog articles; SEO briefs provided. Must have B2B/tech writing samples in English; Nepali a plus (needed from January). Paid test: rewrite one service page.

**Photographer / videographer** — 1–2 day shoot in week 3 (23–27 Nov)
Team portraits, office and work-in-progress photos, 5–8 short vertical clips (for site and reels). Delivers edited high-res photos + web versions within 5 days. Must provide signed release forms for everyone filmed.
