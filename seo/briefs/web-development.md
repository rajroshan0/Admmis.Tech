# Page brief: Web development

Owner: sudip · Writer: writer · Status: ready for writer · Version: v1 · Date: 2026-11-07 · Task: T-705

Rules that always apply: `content/voice-and-tone.md`, CLAUDE.md §8 (Truth, Writing). Never invent prices, clients, results or testimonials; write `TODO(roshan): …`. Prices come from the CMS price collection (ADR-014), never typed in copy. All text is original. Structure follows `docs/reference-fittin.md` §3.4 (structure only, no FITTIN wording).

## 1. Page facts

| Field | Value |
|---|---|
| URL | `/services/web-development` |
| Template | `service` |
| Parent | `/services` |
| Priority | P0 |
| Index | Y |
| Word-count target | 1,000 to 1,400 words |

## 2. Goal and audience

- **Page goal:** Convince a Nepali business owner that we can build their website, show what it costs, and get them to ask for a quote.
- **Primary conversion:** Quote form submission (`generate_lead`) or WhatsApp click.
- **Audience:** Owner of a shop, clinic, school, hotel or small company with no website or an old one. Worries: cost, who owns the site, will it work on phones, will it be maintained. Secondary: foreign buyers (use USD pricing and "clients outside Nepal" proof).
- **Search intent:** Commercial/transactional for "web development company Nepal". They compare agencies. First screen: what we build, a price signal, a contact action. They want to see real work and real prices.

## 3. Keywords (volumes are ESTIMATE, see `seo/keyword-map.md`)

- **Primary (one):** web development company Nepal
- **Secondary (natural use, once or twice each):** website development Kathmandu (see note on Kathmandu); custom website Nepal; Next.js development Nepal; ecommerce website development Nepal; website design and development Nepal
- **Do not target here:** "website on rent" and "monthly website subscription" (belong to `/rent/website`); "software development company" (home); "custom software", "SaaS" (`/services/custom-software`); "SEO" as a service (`/services/digital-marketing`, `/services/audit`).

## 4. Metadata and headings

| Element | Text | Count / limit |
|---|---|---|
| `<title>` (seoTitle) | Web Development Company in Nepal \| ADMMIS.TECH | 46 / 60 |
| Meta description | Fast, clear websites and web platforms built in Nepal: company sites, online shops, booking and portals. See prices and get a quote. | 132 / 155 |
| H1 (heroHeading) | Web development in Nepal: fast websites that bring customers | 60 / 70 |
| Hero subheadline | We design, build and launch your website so it loads fast on any phone and makes it easy to contact you. | 21 / 25 words |

The title and meta above are proposals. The writer may improve wording but must keep the primary keyword at the start of the title, stay within the limits, and tell me if anything changes.

## 5. Section outline

Order is fixed; each row is one CMS block.

| # | Block | H2 / H3 (working) | Purpose | Words |
|---|---|---|---|---|
| 1 | hero | H1 + subheadline + 2 CTAs | Promise and action | 30 to 50 |
| 2 | rich-text | H2: What we build (definition in 3 lines, then types) | Define "website" vs "web platform" in plain words | 80 to 100 |
| 3 | cards (4) | H3 per type: Company website · Online shop · Booking and service sites · Portals and dashboards | Types, 25 words each | 100 |
| 4 | cards (6) | H2: Websites for your industry (retail, restaurants, pharmacy, education, tourism, services) | One line each; no separate pages yet (Phase 2 `/industries/*`) | 120 to 150 |
| 5 | benefits (4) | H2: What you get (fast on phones, easy to update, you own content and domain, search-ready) | Benefits, each 20 to 30 words | 100 to 120 |
| 6 | rich-text | H2: How we build it (technology in plain words) | Next.js, a CMS you can edit, hosting; explain "CMS" once; payment options eSewa/Khalti only if confirmed | 120 to 150 |
| 7 | steps (5) | H2: From idea to launch in 5 steps (talk, plan and quote, design, build, launch and support) | Process with typical time per step. Times: TODO(roshan) | 150 |
| 8 | rich-text | H2: Search-ready from day one | Technical SEO we include (speed, mobile, structure); no ranking promises | 80 to 100 |
| 9 | price teaser | H2: What a website costs | Pull packages from the CMS; explain what changes the price | 60 to 90 |
| 10 | case-cards | H2: Websites we have built | 1 to 3 cases tagged web | from CMS |
| 11 | cards (2) | H2: Prefer to pay monthly? / Need software, not a website? | Cross-links to `/rent/website` and `/services/custom-software` | 50 |
| 12 | faq | H2: Website questions we hear often | 6 questions below | 350 to 450 |
| 13 | cta-form | H2: Tell us about your website | Quote form | 20 |

## 6. Proof points and facts needed

- Case proof available now (from `content/pages/home.md`, results unconfirmed): Telegram AI agent for data entry; Telegram AI agent for marketing; WhatsApp AI agent for a local shop; website and mobile app for e-commerce. TODO(roshan): permission to name clients, one real result per case.
- Technology list we really use (Next.js, a headless CMS, PostgreSQL): from `docs/architecture.md`. Confirm that client sites use the same stack. TODO(roshan).
- Performance claim: only state "loads fast on phones" with a measured Lighthouse or load-time figure from our own site (rajaros/raj produce it). Until then say "built for speed on any phone".
- Typical timeline per website type and ownership terms: TODO(roshan). The home FAQ also waits for these.
- Payment gateway integrations (eSewa, Khalti, bank): TODO(roshan) which we have built.
- Prices: read from the CMS price collection; the writer writes the sentence around the number, never the number itself. TODO(roshan): price bands are still a proposal (`docs/pricing-model.md`) until approved.

## 7. CTA

- Primary: **Get a quote**, button to `/contact` (and the quote form block at the end of the page). Also in hero.
- Secondary: **Chat on WhatsApp** (click-to-chat). TODO(roshan): WhatsApp number.
- Mobile sticky bar (WhatsApp, call, get a quote) is global; do not write copy for it.

## 8. Internal links

| Direction | Link | Anchor text | Where |
|---|---|---|---|
| Out | `/pricing` | Website packages and prices | price teaser |
| Out | `/rent/website` | website on rent | cross-link card (do not use "build" wording there) |
| Out | `/services/custom-software` | custom software for your business | cross-link card |
| Out | `/services/mobile-app-development` | mobile app | related services |
| Out | `/services/digital-marketing` | marketing for your new website | related services |
| Out | `/services/qa-testing` | website testing | related services |
| Out | `/services/audit` | website audit | related services |
| Out | `/work` | Our work | case cards |
| Out | `/contact` | Get a quote | CTA |
| In | `/services, /, /rent/website, /pricing, blog article 1 "How much does a website cost in Nepal"` | website development | descriptive anchors |

## 9. Schema and CMS fields

- JSON-LD: `Service` (provider = Organization, areaServed = Nepal), `BreadcrumbList`, `FAQPage` (from `faqs[]`).
- CMS fields to fill: `seoTitle`, `metaDescription`, `heroHeading`, `heroSubheading`, `deliverables[]`, `process[]`, `pricingRefs` (link price items, no text), `relatedCases`, `relatedServices`, `faqs[]`, `showQuoteForm = true`.

## 10. FAQ (answer each in 40 to 80 words, plain English)

Source of questions: wording of questions Nepali agencies answer on their own pages (see `seo/competitor-benchmark.md` sources) and buyer concerns from `docs/pricing-model.md`. ESTIMATE: not checked against Google "People also ask" yet; I will refine from Search Console after launch.

1. How much does a website cost in Nepal?
2. How long does it take to build a website?
3. Who owns my website, domain and content?
4. Will my website work on mobile phones?
5. Can you add online payment (eSewa, Khalti) to my website?
6. What happens after the website goes live? Do you offer support?

## 11. Notes for the writer

- Money page. Keep "website on rent" wording out of this page except the single cross-link card; that term belongs to `/rent/website`.
- Explain "CMS", "hosting" and "domain" once, in one line each. Many readers use English as a second language.
- Avoid "cheap" and "best". Show prices instead.
- Kathmandu: use only where it describes the client, not where we are, until Roshan confirms our office location.
