# Reference study: fittin.ru (Nov 2026)

Source: inspection of the public site (browser: scripts, headers, network calls) plus reading every section in their HTML sitemap. Used as a **structural and business reference only**. No copying of text, images or design.

---

## 1. Company snapshot
- **Legal:** ООО «Цифровые Технологии», Voronezh, Russia. On the market since 2015, 40+ staff.
- **Trust signals:** government IT accreditation (No. 52007), software listed in the Russian software registry, 119 awards (Runet Rating, Workspace), named leadership with photos and quotes.
- **Positioning:** "modular Flutter platform for e-commerce" + custom development + their own AI SaaS products.
- **Clients:** mostly fashion, kids, optics, food and restaurants, home and repair, electronics retail. 51 case cards.

## 2. Full site map (67 pages in their HTML sitemap)

| Group | Count | What it contains |
|---|---|---|
| Services | 31 | One landing page per service **and** per industry (restaurants, coffee shops, food delivery, clothing, kids goods, pharmacy, B2B, iiko integration, loyalty, gamification, audits, AI agents, UX/UI…) |
| Products | 3 (+3 external) | Контентзавод, SaleSynergy, AI Photo Editor; AI search, AI assistant, AI recruiter on separate domains |
| Cases | 17 detail pages | `/all_cases` lists 51 cards with filters; 16 have full case pages |
| Media | 4 | Blog, News (from their AI content API), Reels (short videos), Events |
| Company | 4 | About, Contacts, Partners, Careers (separate HR portal subdomain) |
| Pricing & tools | 3 | Tariffs, ROI calculator, Documentation |
| Webinars | 2 | Webinar landing pages with registration |
| FAQ & legal | 4 | FAQ hub, privacy policy, 2 public offers (contracts) |

## 3. Features worth knowing

### 3.1 ROI calculator (`/kalkulyator-stoimosti-razrabotki-prilozheniya`)
- Not a cost calculator: it calculates **return on investment** of an app.
- Inputs: plan (PRO/PRO+), monthly visitors, mobile share (default 85%), site conversion, average order value, margin (with typical ranges per industry), business type, period (6/12/24 months).
- Output: 3 scenarios (pessimistic, conservative, optimistic) with ROI, payback period, extra profit, revenue growth; month-by-month table; cumulative profit chart; **downloadable report**; lead form.
- Every field has a tooltip explaining where to find the number.
- Why it works: the client sells the purchase to their own boss using FITTIN's numbers.

### 3.2 Quiz with virtual strategist "Маша" (`/interactive-site`)
- 5-step quiz → "personal IT strategy" → lead form.
- Upsell: paid 2-day product audit, credited against development if the client continues.
- **For us:** our AI model in a sari can be this persona.

### 3.3 Case studies
- List filters: type (app / website / gamification) × industry (11 options).
- Detail page template: hero with headline result → task → solution (client quote on why they chose FITTIN) → feature list with screenshots → testimonial → 3 metrics → related cases → related services → form.
- Weakness: metrics have no baseline or time period; most cards show no numbers.

### 3.4 Service landing page template (example: AI agents)
16 blocks: hero + 2 CTAs → definition → types (4 cards) → industries (6) → benefits (4) → channels (web, messengers, app, internal) → "how it works" table (LLM, knowledge base, tools/API, rules + human handoff) → 5-step process → integrations → tech & security → cases → testimonials → pricing models → FAQ (6) → form.
**This is the template our service pages should follow.**

### 3.5 Their AI SaaS products (subscription business)

| Product | What it does | Price / month |
|---|---|---|
| SaleSynergy | AI replies to marketplace and map reviews, analytics | Free 1-month demo · 15k · 35k · 50k · from 150k ₽ |
| Контентзавод | Monitors up to 50 sources, writes and publishes up to 5 SEO articles/day to WordPress/Bitrix/Tilda | 30k · 50k · from 150k ₽ |
| AI Photo Editor | Product photos on AI models, furniture in interiors | from 40k ₽ (1,500 generations, extra 30 ₽ each) |
| AI assistant | Chat assistant | 15k ₽ (5,000 requests) |

All are sold through a sales form, not self-serve sign-up. Setup is done by FITTIN in about 1 day.

### 3.6 Rental / subscription model (their core offer)
- **Platform:** one-time integration + monthly licence that includes team, support and updates.
  - Tariffs page: PRO 170k ₽/mo + 625k ₽ setup; PRO+ 190k ₽/mo + 835k ₽ setup (FITTIN does all integrations); Individual by audit.
  - Launch promise: website **or** app in up to 30 days; both in up to 45 days.
- **Code ownership:** subscription by default; one-time code transfer or **code buyout** if the client leaves.
- **Hourly (T&M):** frontend 3,800 · backend 3,500 · designer/analyst/PM 3,000 · QA 2,500 · DevOps 3,800 ₽/hour.
- **Support:** base plan includes 10 hours/month of bug fixing; critical bugs picked up within 1 hour.
- **Group launch:** 3–5 sellers share one multi-brand platform and split the cost.
- **Sales argument:** compares the monthly fee with marketplace commissions ("you pay again for customers who come back").
- ⚠️ **Their prices contradict each other** across pages (tariffs 150k/525k on the calculator page vs 170k/625k on the tariffs page vs "from 100k + 300–500k" in the FAQ). This happens because prices are hand-typed on many static pages. **Lesson: prices live in one CMS collection and every page reads from it.**

### 3.7 Marketing machine
- Webinars: topic page → registration → Telegram channel for reminders → gated bonus (checklist) → sales follow-up. Speakers include their own brand director, who promotes their products.
- Reels page with share buttons; YouTube, RuTube, VK, Telegram, Dzen, VC channels.
- Partners page: ~25 partners (CRM, loyalty, payments, telephony, marketing agencies, a bank, fulfilment) with a "Become a partner" form. Partner marketing brings leads both ways.
- Awards strip and diplomas lightbox on every page.
- Documentation page with PDFs: a formal product description (needed for government registry and enterprise buyers).

### 3.8 Technical (how the site itself is built)
- Static HTML on nginx, vanilla JS, no CMS. Header injected by JS. CSS split into critical and deferred. Service Worker.
- Leads: JS → `bill-go.fittin.ru` → Telegram group. No database step.
- Yandex Metrika with Webvisor; a goal per landing page.
- Pricing page is A/B-tested (`/tariffs` → `/tariffs-a`).
- Product stack (from About page): Flutter/Dart, Python/Django admin, Docker, PostgreSQL/MySQL, MongoDB, Redis, Elasticsearch, S3, Sentry, Codemagic, GitLab, GitHub Actions; Yandex Cloud, Google Cloud, AWS.

## 3.9 Additions from the Founder's PDF capture (6 Nov 2026)
Source: [references/fittin-pages-capture-2026-11.pdf](references/fittin-pages-capture-2026-11.pdf) — 217 pages, English-translated capture of: homepage, **pricing page (newer version)**, full cases list, media menu, custom development page.

**A. Newer pricing page: three packages sold as "your own sales channel instead of a marketplace commission"**

| Package | Price (incl. VAT) | Launch | Includes |
|---|---|---|---|
| Website | 625,000 ₽ one-time + 170,000 ₽/month | up to 30 days | Mobile + desktop, catalog, cart, payment, account, order history, own brand design |
| Application | (same PRO basis) | up to 30 days | App Store + RuStore, push, loyalty program, published to the **client's** developer account |
| Full channel (website + app) | 835,000 ₽ one-time + **270,000 ₽/month** | up to 45 days | One database for both, 1C/MyWarehouse/Bitrix integration; **if the subscription is cancelled, the site and app stay the client's** |

Headline numbers: 10+ years · 100+ e-commerce projects · 45 days to launch · **24 hours to estimate a project**.

**B. Selling techniques on the pricing page (worth copying in our own words)**
1. **"What's included in the subscription"** — 5 numbered items: hosting & updates, integrations, loyalty, analytics, push/newsletters.
2. **"What you pay separately"** table — payment gateway fees (1–3%), delivery, SMS (3–5 ₽), new features (hourly), content/traffic. Their line: it's more honest to show it upfront than let it appear in month one. **Builds trust.**
3. **Risk table "What if your main channel stops?"** — 5 real situations (warehouse refuses stock, terms changed, product card blocked, competitor dumping, account blocked) × "marketplace only" vs "own channel".
4. **"Three questions everyone asks"** — Where do first buyers come from? Who owns the app if I stop paying? Do I need it if I'm on FBO?
5. **Free analysis offer** — "we'll send an analysis for your category… no 40-slide presentation".
6. **Group launch (NEW badge)** — several sellers split one-time and monthly cost.

**C. Updated hourly rates (incl. VAT)** — supersedes §3.6

| Role | ₽/hour |
|---|---|
| Frontend (UI) developer | 3,990 |
| Backend developer | 3,675 |
| DevOps engineer | 3,990 |
| UX/UI designer | 3,990 |
| Analyst | 3,150 |
| Project manager | 2,940 |
| QA / tester | 2,625 |
| **AI prompt / query engineer** | **4,200** (new role, highest rate) |

**D. Custom development page — page structure**
Hero ("send your specs, get an estimate") → what's included (6 items: spec review, architecture, UX/UI, implementation, testing on real devices, post-release support) → **"Platform vs custom" comparison** → **scenarios table** (scenario · what's inside · relevant case: B2B wholesale → Saturn; custom brand app → Finn Flare; employee app → Corporate; industry app → Syrovarnya; MVP → MVP service) → stack & publishing stores (App Store, Google Play, RuStore, Huawei AppGallery, Aurora) → 6 stages → cases with 2 metrics each → **budget guideline table** (platform from 525k ₽ + from 150k ₽/mo; custom from 525k ₽ as lower limit) → FAQ (incl. "what happens if we switch to another contractor?", "do you take designs from another team?") → form.

**E. Case metrics shown on cards**
Saturn: 20+ cities, 30,000+ products · Finn Flare: ×2.5 lower budget, ×1.5 faster development · Gulliver: 80% of mobile traffic, 50% of revenue through the app · Syrovarnya: launched in 2 months, first app in the chain's history. Full case list has ~50 clients (adds Khvanch, Nika, Sneakerhead, 4FORMS, DAF Jewelry, Vkuster, Es Med Clinic, Marc O'Polo, Uzbechka, NetOptika, Aloe Pharmacy, Adria Cats, Zveno courier app, Voronezh Metropolitanate site).

**F. Homepage content marketing**
- Original research as blog content: *"What customers complain about in reviews — 2026"*, 1.1 million reviews analysed with partners (SaleSynergy, Markway). **Research gets press and backlinks.**
- Membership badge: Association for the Development of Digital Agencies (ARDA).
- 17 rotating testimonials with name, title, company and photo.

**G. Again: prices are inconsistent** — Full channel monthly is 270k ₽ here vs 190k ₽ on the other pricing variant; platform monthly "from 150k" on the custom page vs 170k. Confirms ADR-014 (one price source).

## 4. What we adopt (and when)

| Idea | ADMMIS.TECH version | When |
|---|---|---|
| Rental model | Website / AI agent / team on rent (ADR-012) | **Launch** |
| Service page template (16 blocks) | Our service pages, CMS blocks | **Launch** |
| Case template + filters | 4–6 cases at launch, filters when >10 | **Launch** (filters Phase 2) |
| One pricing source | `pricingPackages` collection in NPR + USD | **Launch** |
| Trust signals | Company registration, PAN/VAT, IT association membership, client logos, team photos | **Launch** |
| FAQ hub with pricing, timelines, SLA, code ownership | FAQ page + per-page FAQ blocks | **Launch** |
| Quiz with persona | Sari-model persona quiz → recommended package | Phase 2 (Feb) |
| ROI calculator | ROI/cost calculator in NPR + USD, downloadable PDF | Phase 2 |
| Industry landing pages | Retail, restaurants, pharmacy, education, tourism (Nepal-specific) | Phase 2, 2–3 per month |
| Webinars + reels | Events section, short-video page | Phase 2 |
| Partners program | Partners page (payments: eSewa/Khalti, hosting, marketing) | Phase 2 |
| Own AI SaaS products | Review replies, AI content, AI photos for Nepali sellers | Later — separate product track |
| "What's included / what you pay separately" tables | On the rental page, for each plan | **Launch** |
| "Who owns it if I stop paying?" answer | Rental FAQ (depends on Q14) | **Launch** |
| Platform vs custom comparison + scenarios table | Development service page | **Launch** |
| Budget guideline table ("from NPR …") | Pricing page | **Launch** |
| Risk table (own channel vs marketplace/Daraz/Facebook-only) | Rental / e-commerce page | Phase 2 |
| AI prompt engineer as a priced role | Outstaffing / hourly rates | **Launch** |
| Original research content (e.g. "Nepal SME digital report 2027") | Blog + PR | Phase 2 |

## 5. What we do better
CMS instead of hand-edited files · prices from one source · leads stored before notification · no secrets in client-side JS · consent-based analytics · case metrics with baseline and period · multilingual (EN + NE) · self-serve trial for SaaS products later.
