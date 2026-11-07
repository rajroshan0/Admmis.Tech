# Page brief: On rent hub

Owner: sudip · Writer: writer · Status: ready for writer · Version: v1 · Date: 2026-11-07 · Task: T-705

Rules that always apply: `content/voice-and-tone.md`, CLAUDE.md §8 (Truth, Writing). Never invent prices, clients, results or testimonials; write `TODO(roshan): …`. Prices come from the CMS price collection (ADR-014), never typed in copy. All text is original. Structure follows `docs/reference-fittin.md` §3.4 (structure only, no FITTIN wording).

## 1. Page facts

| Field | Value |
|---|---|
| URL | `/rent` |
| Template | `rent-hub` |
| Parent | `/` |
| Priority | P0 |
| Index | Y |
| Word-count target | 700 to 1,000 words |

## 2. Goal and audience

- **Page goal:** Explain the rental model in plain words, help the visitor pick one of three products, and show plans by company size.
- **Primary conversion:** Click to a rental product page (`view_pricing`), then quote form.
- **Audience:** Small business owners without budget for a large upfront payment; managers wanting predictable monthly costs. Worries: hidden fees, lock-in, what happens to my site if I stop.
- **Search intent:** Commercial. New category: few people search the exact words; most arrive from home, ads, or "no upfront cost website" style queries. First screen: one-line model and three product cards.

## 3. Keywords (volumes are ESTIMATE, see `seo/keyword-map.md`)

- **Primary (one):** monthly website and software subscription Nepal
- **Secondary (natural use, once or twice each):** software as a service for SMEs Nepal; rent a website; no upfront cost website; pay monthly website Nepal
- **Do not target here:** "website on rent Nepal" (`/rent/website`); "AI chatbot subscription" (`/rent/ai-agent`); "rent a development team" (`/rent/team`). On this hub use the words "website", "AI agent" and "team" only as card names that link out.

## 4. Metadata and headings

| Element | Text | Count / limit |
|---|---|---|
| `<title>` (seoTitle) | Website and Software Subscription in Nepal \| ADMMIS.TECH | 56 / 60 |
| Meta description | Rent a ready-made website, an AI agent or a development team and pay every month. No big payment at the start. See plans by company size. | 137 / 155 |
| H1 (heroHeading) | Monthly website and software subscription for Nepal | 51 / 70 |
| Hero subheadline | Rent what you need and pay every month. We look after hosting, updates and support. | 15 / 25 words |

The title and meta above are proposals. The writer may improve wording but must keep the primary keyword at the start of the title, stay within the limits, and tell me if anything changes.

## 5. Section outline

Order is fixed; each row is one CMS block.

| # | Block | H2 / H3 (working) | Purpose | Words |
|---|---|---|---|---|
| 1 | hero | H1 + subheadline + 2 CTAs | Promise and action | 30 to 50 |
| 2 | rich-text | H2: What "on rent" means | 3 lines: monthly price, we maintain, you keep content and domain | 80 to 100 |
| 3 | cards (3) | H2: Choose what to rent: Website · AI agent · Team | Each card: who it is for, what is included, link to page | 3 x 50 = 150 |
| 4 | table | H2: How renting compares with buying | Rows: upfront cost, monthly cost, support, ownership, cancel; honest | 100 to 150 |
| 5 | plans | H2: Plans by company size (S, M, L, XL) | Plans from the CMS; explain how to pick a band (`docs/pricing-model.md` §1) | from CMS + 80 |
| 6 | rich-text | H2: What is included, what is not | Included: hosting, updates, support hours. Not included: payment fees, SMS, ad spend, paid plugins, new custom features | 100 to 120 |
| 7 | rich-text | H2: If you stop renting | Content and domain are yours; code buyout option. Confirm terms: TODO(roshan) | 60 to 80 |
| 8 | faq | H2: Questions about renting | 6 questions below | 350 to 450 |
| 9 | cta-form | H2: Tell us what you need | Quote form | 20 |

## 6. Proof points and facts needed

- Terms in `docs/pricing-model.md` §3 are a PROPOSAL: setup fee, minimum 6 months, support hours, response time, code buyout. TODO(roshan): approve before copy is final.
- Prices: read from the CMS price collection; the writer writes the sentence around the number, never the number itself. TODO(roshan): price bands are still a proposal (`docs/pricing-model.md`) until approved.
- Included features per plan: from `rentalPlans` collection (neha T-404).

## 7. CTA

- Primary: **See the three plans**, scroll or link to the cards.
- Secondary: **Get a quote**, `/contact`.
- Do not repeat prices in CTAs.

## 8. Internal links

| Direction | Link | Anchor text | Where |
|---|---|---|---|
| Out | `/rent/website` | website on rent | card |
| Out | `/rent/ai-agent` | AI agent on rent | card |
| Out | `/rent/team` | team on rent | card |
| Out | `/pricing` | pricing | plans + FAQ |
| Out | `/services` | custom services (buy once) | comparison table |
| Out | `/contact` | Get a quote | CTA |
| In | `/, /services, /pricing, every `/rent/*` page (breadcrumb)` | On rent | nav and footer |

## 9. Schema and CMS fields

- JSON-LD: `BreadcrumbList`, `FAQPage`.
- CMS fields: `pages` entry; blocks `rental-plans` (all products), `faq`, `cta-form`; plan data from `rentalPlans`.

## 10. FAQ (answer each in 40 to 80 words, plain English)

Source of questions: wording of questions Nepali agencies answer on their own pages (see `seo/competitor-benchmark.md` sources) and buyer concerns from `docs/pricing-model.md`. ESTIMATE: not checked against Google "People also ask" yet; I will refine from Search Console after launch.

1. What does renting a website or software mean?
2. Is there a setup fee or minimum period?
3. What happens if I stop paying or want to leave?
4. Who owns my content, domain and code?
5. Which plan fits my business size?
6. Can I change my plan later?

## 11. Notes for the writer

- This is a routing page. Do not write long product copy; link to the product pages.
- Say in one clear sentence what is different from buying: you pay monthly and we look after it.
- Do not use FITTIN's subscription terms or wording; ours come from `docs/pricing-model.md` once approved.
