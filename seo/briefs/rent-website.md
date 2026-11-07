# Page brief: Website on rent

Owner: sudip · Writer: writer · Status: ready for writer · Version: v1 · Date: 2026-11-07 · Task: T-705

Rules that always apply: `content/voice-and-tone.md`, CLAUDE.md §8 (Truth, Writing). Never invent prices, clients, results or testimonials; write `TODO(roshan): …`. Prices come from the CMS price collection (ADR-014), never typed in copy. All text is original. Structure follows `docs/reference-fittin.md` §3.4 (structure only, no FITTIN wording).

## 1. Page facts

| Field | Value |
|---|---|
| URL | `/rent/website` |
| Template | `rent-product` |
| Parent | `/rent` |
| Priority | P0 |
| Index | Y |
| Word-count target | 900 to 1,200 words |

## 2. Goal and audience

- **Page goal:** Show a small business that renting a ready-made website is simple, safe and affordable, and get an application or quote request.
- **Primary conversion:** Quote/apply form (`generate_lead`, `service=rent-website`).
- **Audience:** Shop owners, clinics, restaurants, tutors and freelancers with 1 to 50 staff who need a website but not a large payment. Worries: do I own it, can I leave, will it look like everyone else's, what if it breaks.
- **Search intent:** Commercial/transactional for "website on rent Nepal". Low volume (ESTIMATE VL to L), strong intent. First screen: what you get monthly and the starting plan.

## 3. Keywords (volumes are ESTIMATE, see `seo/keyword-map.md`)

- **Primary (one):** website on rent Nepal
- **Secondary (natural use, once or twice each):** website rental monthly; website subscription Nepal; website with hosting and support monthly; rent a website for my business
- **Do not target here:** "web development company", "build a website", "custom website" (`/services/web-development`). Avoid "build" and "project" wording as a promise; say "ready-made and customised for you".

## 4. Metadata and headings

| Element | Text | Count / limit |
|---|---|---|
| `<title>` (seoTitle) | Website on Rent in Nepal \| ADMMIS.TECH | 38 / 60 |
| Meta description | Get a ready-made, professional website on monthly rent in Nepal. Hosting, updates and support included. No big upfront cost. See plans and apply. | 145 / 155 |
| H1 (heroHeading) | Website on rent in Nepal: pay monthly, no big upfront cost | 58 / 70 |
| Hero subheadline | A professional website for your business, live fast. One monthly price covers hosting, updates and support. | 16 / 25 words |

The title and meta above are proposals. The writer may improve wording but must keep the primary keyword at the start of the title, stay within the limits, and tell me if anything changes.

## 5. Section outline

Order is fixed; each row is one CMS block.

| # | Block | H2 / H3 (working) | Purpose | Words |
|---|---|---|---|---|
| 1 | hero | H1 + subheadline + 2 CTAs | Promise and action | 30 to 50 |
| 2 | rich-text | H2: How website rental works | 3 steps in words: pick a plan, we set up your site, you pay monthly | 100 |
| 3 | feature-list (6) | H2: What is included every month (hosting, domain help, security, updates, support hours, backups) | Check each against plan data; no extra claims | 150 |
| 4 | plans | H2: Plans by company size | From `rentalPlans` (S, M, L, XL); no typed prices | from CMS + 60 |
| 5 | cards (3) | H2: Websites for your business (examples: shop, clinic or school, service business) | Show template examples (images from sharwan, not stock-looking) | 100 |
| 6 | benefits (4) | H2: Why rent instead of buy | Lower start cost, predictable monthly, we maintain, change plans | 100 |
| 7 | steps (4) | H2: Go live in four steps | Time to launch: TODO(roshan) | 100 to 120 |
| 8 | rich-text | H2: What is not included | Payment gateway fees, SMS, paid plugins, new custom features, ad spend | 60 |
| 9 | rich-text | H2: Your content and domain stay yours | Exit terms and code buyout: TODO(roshan) | 60 to 80 |
| 10 | cards (2) | H2: Need something custom? / Need marketing? | Cross-links: `/services/web-development`, `/services/digital-marketing` | 50 |
| 11 | faq | H2: Website rental questions | 6 questions below | 350 to 450 |
| 12 | cta-form | H2: Apply for your website | Quote/apply form with company size field | 20 |

## 6. Proof points and facts needed

- Included features and plan data: from CMS (`rentalPlans`).
- Number of rented websites live: TODO(roshan). Do not claim "100+ clients".
- Example sites: sharwan designs 2 to 3 demo sites. Do not use other agencies' screenshots.
- Launch time, support hours, response time, minimum term, setup fee: TODO(roshan) (pricing-model §3 is a proposal).
- Prices: read from the CMS price collection; the writer writes the sentence around the number, never the number itself. TODO(roshan): price bands are still a proposal (`docs/pricing-model.md`) until approved.

## 7. CTA

- Primary: **Apply for your website**, to the form on this page / `/contact`.
- Secondary: **Chat on WhatsApp**.
- Link to compare buy vs rent: blog article 3 once published.

## 8. Internal links

| Direction | Link | Anchor text | Where |
|---|---|---|---|
| Out | `/rent` | all rental products | breadcrumb and card |
| Out | `/pricing` | pricing and size bands | plans block |
| Out | `/services/web-development` | a custom website built for you | cross-link card |
| Out | `/services/digital-marketing` | marketing for your website | cross-link card |
| Out | `/rent/ai-agent` | add an AI agent | related |
| Out | `/blog (article 3)` | website on rent or buy | related reading, after publish |
| Out | `/contact` | Get a quote | CTA |
| In | `/rent, /, /services/web-development, blog articles 1 and 3` | website on rent | anchors |

## 9. Schema and CMS fields

- JSON-LD: `Service` with one `Offer` per plan (price and currency from CMS, `unitText` MONTH), `BreadcrumbList`, `FAQPage`.
- CMS: `pages` (rentalProduct = website) + `pricing`; fields `seoTitle`, `metaDescription`, `heroHeading`, `faqs[]`.

## 10. FAQ (answer each in 40 to 80 words, plain English)

Source of questions: wording of questions Nepali agencies answer on their own pages (see `seo/competitor-benchmark.md` sources) and buyer concerns from `docs/pricing-model.md`. ESTIMATE: not checked against Google "People also ask" yet; I will refine from Search Console after launch.

1. What is website on rent, and how does it work?
2. How much does it cost per month?
3. Do I own my website, domain and content?
4. Can I cancel, and what happens to my website?
5. What is included, and what costs extra?
6. Can I customise the design and add features later?

## 11. Notes for the writer

- Money page with low competition: be specific, short and concrete. Show what you get for the monthly price.
- Do not copy FITTIN's terms (30-day launch, code buyout multiples). Ours are decided by Roshan.
- Cannibalisation: avoid "web development company", "build a website".
- Only one price source: the CMS. Never write "from NPR …" in the body.
