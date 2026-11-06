# Keyword map (EN) — tech.admmis.org

Owner: sudip · Task: T-701 · v0.1 · 2026-11-06 · Reviewer: pm

## 0. How to read this (honest data note)

- I have no keyword-volume tool. **Volumes and difficulty below are relative tiers, marked ESTIMATE**: H = high, M = medium, L = low, VL = very low, for Nepal and for English-language searches generally. They are my judgement from SERP type and wording, not measured data. Replace them with Google Keyword Planner numbers (Roshan, see section 6).
- Research done 2026-11-06 by web search; sources in section 7.
- Nepal-market volumes are small. We win on **intent and conversion**, not volume. The SERPs for "web development Nepal" style terms are dominated by directories (Clutch, GoodFirms, TechBehemoths) and agency blogs, so pages that answer "how much" and "who do I hire" with real prices can rank.
- Intent: I = informational, C = commercial investigation, T = transactional.

## 1. Page to primary keyword (launch scope)

Rows follow `seo/sitemap.md`. One primary per page. Secondary keywords are used naturally in H2s and body, not stuffed.

| URL | Primary keyword | Intent | Vol (ESTIMATE) | Diff (ESTIMATE) | Secondary keywords |
|---|---|---|---|---|---|
| `/` | software development company Nepal | C | M | H | IT company Kathmandu; web and app development Nepal; technology and marketing agency Nepal |
| `/services` | IT services Nepal | C | M | H | software services Kathmandu; digital agency Nepal |
| `/services/web-development` | web development company Nepal | C/T | H | H | website development Kathmandu; custom website Nepal; Next.js development Nepal; ecommerce website development Nepal |
| `/services/mobile-app-development` | mobile app development Nepal | C/T | M | M | Flutter app development Nepal; React Native developers Nepal; Android iOS app Kathmandu |
| `/services/custom-software` | custom software development Nepal | C/T | M | M | SaaS development Nepal; business software Nepal; ERP or CRM development Nepal |
| `/services/ai-agents` | AI agent development Nepal | C/T | L (rising) | L–M | AI chatbot development Nepal; AI integration for business Nepal; WhatsApp chatbot Nepal; LLM chatbot company |
| `/services/qa-testing` | software testing services Nepal | C/T | L | M | QA outsourcing Nepal; manual and automation testing Kathmandu; mobile app testing |
| `/services/audit` | website audit service Nepal | C/T | L | L | code audit; UX audit; SEO audit Nepal; website performance audit |
| `/services/outstaffing` | hire dedicated developers Nepal | C/T | L–M | M | offshore developers Nepal; outsourcing to Nepal; staff augmentation Nepal; hire Nepali developers |
| `/services/digital-marketing` | digital marketing agency Nepal | C/T | H | H | SEO company Kathmandu; social media marketing Nepal; Facebook ads Nepal; influencer marketing Nepal |
| `/services/offline-marketing` | event marketing Kathmandu | C/T | L | L | BTL marketing Nepal; activation agency Nepal; print and branding Kathmandu |
| `/pricing` | software development cost Nepal | C | L–M | M | website development price Nepal; app development cost Nepal NPR; IT outsourcing rates Nepal |
| `/rent` | monthly website and software subscription Nepal | C | VL | L | software as a service for SMEs Nepal; rent a website; no upfront cost website |
| `/rent/website` | website on rent Nepal | C/T | VL–L | L | website rental monthly; website subscription Nepal; website with hosting and support monthly |
| `/rent/ai-agent` | AI chatbot subscription Nepal | C/T | VL | L | AI agent monthly plan; chatbot for business monthly; AI customer support Nepal |
| `/rent/team` | rent a development team Nepal | C/T | VL–L | L | monthly developer rental; remote team subscription; hire a team monthly Nepal |
| `/work` | software projects portfolio Nepal | C | L | L | case studies web app Nepal; our work |
| `/work/[slug]` | one per case: "[industry] [solution] Nepal" | C | VL | L | set when cases are picked |
| `/about` | about ADMMIS.TECH | I (brand) | VL | L | ADMMIS Nepal; ADMMIS technology |
| `/contact` | contact software company Kathmandu | T | VL | L | get a quote web development Nepal; WhatsApp developer Nepal |
| `/faq` | web development FAQ Nepal | I | VL | L | how long does a website take; who owns the code; support after launch |
| `/careers` | IT jobs Kathmandu | T (jobs) | M | M | developer jobs Nepal; QA jobs Kathmandu; designer jobs Kathmandu |
| `/careers/[slug]` | "[role] job Kathmandu" | T | L | L | per role |
| `/opening-event` | ADMMIS.TECH opening event | I (brand) | VL | L | tech event Kathmandu 2027; ADMMIS launch |
| `/blog` | tech and marketing blog Nepal | I | VL | L | — |
| `/privacy`, `/terms`, `/cookies` | none (not targeted) | — | — | — | Index low priority |

## 2. Launch articles (3), picked to feed money pages

| # | Working title | Primary keyword | Intent | Vol (ESTIMATE) | Feeds | Why |
|---|---|---|---|---|---|---|
| 1 | How much does a website cost in Nepal (2027) | website cost in Nepal | I/C | M | `/pricing`, `/services/web-development`, `/rent/website` | Many local agencies already rank for price guides (see sources); ours shows real NPR + USD prices from the CMS collection and compares buy vs rent |
| 2 | Outsourcing software development to Nepal: a buyer's guide | outsource software development to Nepal | I/C | L (global) | `/services/outstaffing`, `/rent/team` | Our international audience; GoodFirms and Clutch rank for "Nepal" directory terms, a guide with rates and risks complements them |
| 3 | Website on rent or buy: what suits a small business in Nepal | website rental vs buying a website | I/C | VL | `/rent`, `/rent/website` | Educates a new category; low competition; supports the rental offer |

Recommendation: article 2 captures the international "outsourcing to Nepal" intent for now. If Roshan wants a stronger push, add a landing page `/outsourcing-to-nepal` (template `service`) in Phase 2 or at launch. Decision for PM.

## 3. Clusters and internal links

| Cluster | Hub | Spokes | Link rule |
|---|---|---|---|
| Build | `/services` | web-development, mobile-app-development, custom-software, ai-agents | Each spoke links to hub, pricing, 2 related cases, FAQ |
| Quality | `/services` | qa-testing, audit | Link to web-development and mobile as "check what you have built" |
| Team | `/services` | outstaffing | Link to `/rent/team` ("monthly") and article 2 |
| Marketing | `/services` | digital-marketing, offline-marketing | Cross-link both; link to `/rent/website` for new sites |
| Rent | `/rent` | `/rent/website`, `/rent/ai-agent`, `/rent/team` | Each child links hub, pricing, FAQ and the matching `/services/*` page ("need a custom one?") |
| Money | `/pricing`, `/contact` | all | Every service and rent page links `/pricing` and `/contact` |
| Content | `/blog` | 3 articles | Each article links to two service or rent pages with descriptive anchors |

## 4. Cannibalisation check

| Pair at risk | Separation |
|---|---|
| `/` vs `/services/web-development` and `/services` | Home targets the company ("software development company"); service page targets the service ("web development"). Home does not use "web development company" in title or H1 |
| `/rent/website` vs `/services/web-development` | Rental = monthly, ready-made, "on rent / subscription". Development = custom project, "build". Avoid "build a website" on rent pages and "monthly subscription" on the development page |
| `/rent/team` vs `/services/outstaffing` | Team rental is per person monthly, standard roles; outstaffing is the consultative service for dedicated team setup. Titles differ: "Rent a team" vs "Hire dedicated developers" |
| `/rent/ai-agent` vs `/services/ai-agents` | Rental = one ready agent, monthly plan; service = custom AI product and integration |
| Article 1 vs `/pricing` | Article = informational "how much does it cost", pricing = our actual packages. Article links to pricing with anchor "our packages" |
| `/services/audit` vs `/services/digital-marketing` | SEO audit lives only on `/services/audit`; marketing page mentions SEO but not "audit" as a primary term |
| `/services/offline-marketing` vs digital | Different channels; no shared primary |

Rule for Mahendra and the copywriter: one H1 per page, containing the primary keyword (naturally); title tag starts with it; no two pages share a primary or the same title.

## 5. Modifier strategy

- **Local:** "Nepal", "Kathmandu" (also "Lalitpur", "Pokhara" only in about/contact text, not as separate pages). Nepali buyers search in English for tech terms; Nepali-script keywords come with the NE launch (Feb 2027), needing a separate research pass.
- **International:** "outsourcing to Nepal", "offshore developers Nepal", "hire Nepali developers", "Nepal software development rates". Used on outstaffing, rent/team, article 2 and the pricing page (USD column).
- **Intent triggers:** "cost", "price", "packages", "monthly", "hire", "company", "agency", "services" for commercial pages; "how", "what is", "vs" for blog.
- Avoid chasing "cheap", "affordable" as a primary: it attracts low-budget leads and conflicts with positioning. Use as a secondary only if the data shows demand.

## 6. Seed list for Roshan to verify (Google Keyword Planner, Search Console after launch)

Tool: Google Keyword Planner (free with a Google Ads account, no spend needed), location Nepal, language English; repeat once with location "United States / United Kingdom / Australia" for the international terms. Export CSV into `seo/` for me.

1. web development company Nepal
2. website development Kathmandu
3. website cost in Nepal
4. software development cost Nepal
5. mobile app development Nepal
6. Flutter developers Nepal
7. custom software development Nepal
8. AI agent development Nepal
9. AI chatbot Nepal
10. WhatsApp chatbot Nepal
11. software testing services Nepal
12. website audit Nepal
13. SEO audit Nepal
14. SEO company Kathmandu
15. digital marketing agency Nepal
16. digital marketing agency Kathmandu
17. social media marketing Nepal
18. Facebook ads Nepal
19. influencer marketing Nepal
20. event management company Kathmandu
21. hire dedicated developers Nepal
22. offshore developers Nepal
23. outsourcing to Nepal
24. software outsourcing Nepal
25. hire Nepali developers
26. staff augmentation Nepal
27. website on rent
28. website subscription Nepal
29. website rental monthly
30. rent a development team
31. IT jobs Kathmandu
32. software developer jobs Nepal
33. ecommerce website Nepal
34. eSewa Khalti integration website
35. website maintenance Nepal
36. app development company Kathmandu
37. IT company Kathmandu
38. UI UX design Nepal
39. Nepal software development rates
40. best software companies in Nepal

Also pull "related" suggestions for each seed. Report volume, competition, and top-of-page bid (a proxy for commercial value).

## 7. Sources (checked 2026-11-06)

- Directory-dominated SERP for Nepal web development: https://clutch.co/np/web-developers, https://techbehemoths.com/top-companies/web-development/kathmandu, https://www.goodfirms.co/directory/country/top-website-development-companies/nepal
- Local price-guide content already ranking: https://blog.bisup.com/?p=20065, https://www.arjankc.com.np/blog/website-development-cost-nepal, https://shresthaujjwal-com-np.pages.dev/blog/web-development-cost-nepal-2026/, https://webhousenepal.com/blogs/website-design-and-development-price-in-nepal
- Digital marketing price content: https://www.arjankc.com.np/blog/digital-marketing-agency-cost-nepal, https://yetistudio.co/blog/social-media-pricing-package-nepalese-businesses
- Offshore rate content: https://upstackstudio.com/blog/offshore-software-development-rate-by-country/

## 8. Next

- On Roshan's CSV: replace ESTIMATE tiers with numbers, re-rank, adjust primaries only where a variant has clearly higher demand.
- After launch: Search Console query review at week 2 and week 6; update titles for pages with impressions but low CTR.
- Nepali keyword pass for Feb 2027 launch.
