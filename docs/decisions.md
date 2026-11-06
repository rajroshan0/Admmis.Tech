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
