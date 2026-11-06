# Progress log

Newest first. Updated every Friday and whenever something important changes.

## 2026-11-06 (Fri, 10:22) — Kickoff pack ready
- Start date set: **kickoff Mon 9 Nov**; nothing blocks the start.
- `docs/kickoff-pack.md`: questions per person, stakeholder brief, kickoff agenda, team message, hiring briefs.
- Waiting on Founder for 6 "before Monday" answers (team names/roles, CTO, GitHub org, domain, budget OK, meeting time zone).

## 2026-11-06 (Fri, 10:10) — FITTIN PDF reviewed
- Founder's 217-page capture reviewed; additions in `reference-fittin.md` §3.9.
- **Team update:** Copywriter + designer: the rental page gets two trust tables, "What's included" and "What you pay separately" (ref §3.9 B). SEO: add a "Platform vs custom" block and a budget-guideline table to the development page brief. Backend: hourly-rate roles in the pricing collection include "AI prompt engineer".

## 2026-11-06 (Fri, later) — Rental service + full reference study
**Done**
- Founder added **rental service** (website / AI agent / team on rent, NPR 100k/month) to launch scope → ADR-012
- Decided the site codebase doubles as the rental website base product → ADR-013
- Prices centralised in one CMS collection → ADR-014
- Full study of fittin.ru: 67 pages, calculator, quiz persona, case template, service page template, AI SaaS products, rental model, webinars, partners → `docs/reference-fittin.md`

**Team update**
> We now sell rentals from day one. **Backend:** add `rentalPlans` to the pricing collection. **Designer:** add an "On rent" page to the templates for the 27 Nov gate. **Tech lead:** design tokens and theming must support multiple brands (ADR-013). **SEO + copywriter:** use the 16-block service page structure in `reference-fittin.md` §3.4 for every service brief.

**Waiting on stakeholders:** Q12–Q15 (rental plan details)

## 2026-11-06 (Fri) — Project kickoff
**Done**
- Analysed fittin.ru (architecture, stack, pricing model) → `docs/reference-fittin.md`
- Stakeholder decisions recorded (ADR-001 to ADR-011)
- Plan compressed from 14 to 8 weeks for the 1 Jan launch; launch scope defined
- Repo and docs structure created

**Team update sent**
> Launch is **1 Jan** at the opening event, English first. Stack is Node/TypeScript: Next.js + Payload + Postgres. Week 1 tasks:
> - **Tech lead:** repo setup, Docker, CI with Lighthouse budget, `.env.example` (by Wed)
> - **Designer:** 3 brand directions using the sari-model hero (by Fri)
> - **SEO:** keyword map EN, sitemap draft, Nepal agency price benchmark
> - **Backend:** Payload collections draft (services, cases, pricingPackages, leads)
> - **DevOps:** VPS, Cloudflare, staging URL, Sentry
> - **Frontend ×2:** component inventory from the reference (keep / change / drop)
> - **QA:** test plan + device list
> - **Copywriter (on start):** service page briefs with SEO

**Blockers / waiting on stakeholders** → see `docs/open-questions.md`

**Next:** Fri 13 Nov — gate 1 (sitemap, scope, brand direction)
