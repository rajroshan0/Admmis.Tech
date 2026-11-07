# Page brief: Pricing

Owner: sudip · Writer: writer · Status: ready for writer · Version: v1 · Date: 2026-11-07 · Task: T-705

Rules that always apply: `content/voice-and-tone.md`, CLAUDE.md §8 (Truth, Writing). Never invent prices, clients, results or testimonials; write `TODO(roshan): …`. Prices come from the CMS price collection (ADR-014), never typed in copy. All text is original. Structure follows `docs/reference-fittin.md` §3.4 (structure only, no FITTIN wording).

## 1. Page facts

| Field | Value |
|---|---|
| URL | `/pricing` |
| Template | `pricing` |
| Parent | `/` |
| Priority | P0 |
| Index | Y |
| Word-count target | 700 to 1,000 words around the price tables |

## 2. Goal and audience

- **Page goal:** Be the clearest price page in Nepal: show real numbers, explain what changes them, and move the visitor to a quote.
- **Primary conversion:** Quote form (`generate_lead` with `budget_band` and `service`); `view_pricing` event on scroll to tables.
- **Audience:** Owners comparing agencies mainly on cost; foreign buyers comparing with their home rates (USD). Worries: hidden costs, vague quotes, being sold the wrong size.
- **Search intent:** Commercial investigation for "software development cost Nepal" and related "price" queries. First screen: the price tables or a band selector. Competitors rarely publish firm prices (see `seo/competitor-benchmark.md` §2).

## 3. Keywords (volumes are ESTIMATE, see `seo/keyword-map.md`)

- **Primary (one):** software development cost Nepal
- **Secondary (natural use, once or twice each):** website development price Nepal; app development cost Nepal NPR; IT outsourcing rates Nepal; digital marketing price Nepal; website cost in Nepal (belongs to blog article 1, mention only)
- **Do not target here:** "website cost in Nepal" as main term (blog article 1); "website on rent" (`/rent/website`).

## 4. Metadata and headings

| Element | Text | Count / limit |
|---|---|---|
| `<title>` (seoTitle) | Software Development Cost in Nepal \| ADMMIS.TECH | 48 / 60 |
| Meta description | See what websites, apps, AI agents and marketing cost in Nepal. Public NPR and USD prices by company size. Pick a plan or request a quote. | 138 / 155 |
| H1 (heroHeading) | Software development cost in Nepal: our public prices | 53 / 70 |
| Hero subheadline | Every service is priced separately and by company size. Find your price, or tell us your goal and get a quote. | 21 / 25 words |

The title and meta above are proposals. The writer may improve wording but must keep the primary keyword at the start of the title, stay within the limits, and tell me if anything changes.

## 5. Section outline

Order is fixed; each row is one CMS block.

| # | Block | H2 / H3 (working) | Purpose | Words |
|---|---|---|---|---|
| 1 | hero | H1 + subheadline + 2 CTAs | Promise and action | 30 to 50 |
| 2 | rich-text | H2: How our prices work | Three rules: priced per service; depends on company size (S, M, L, XL); we show prices before you ask | 100 to 130 |
| 3 | band selector / table | H2: Find your company size | The four bands with who they are (`docs/pricing-model.md` §1) | 80 to 100 |
| 4 | pricing-table | H2: Project packages (fixed price) | Packages from `pricingPackages` in NPR and USD | from CMS + 60 |
| 5 | plans | H2: Monthly plans (on rent) | `rentalPlans`; link to `/rent` | from CMS + 50 |
| 6 | table | H2: Team and hourly rates | `hourlyRates` per role in NPR and USD | from CMS + 40 |
| 7 | budget-guide | H2: What a larger project costs | "From" ranges and what drives cost: pages, features, platforms, integrations | 120 to 160 |
| 8 | rich-text | H2: What is not included | Payment gateway fees, SMS, ad spend, paid plugins | 60 |
| 9 | rich-text | H2: Paying us | NPR via bank, eSewa, Khalti; USD via bank or Wise (proposed; confirm). VAT and PAN: TODO(roshan) | 60 to 80 |
| 10 | faq | H2: Pricing questions | 6 questions below | 350 to 450 |
| 11 | cta-form | H2: Get your quote | Quote form with budget range options | 20 |

## 6. Proof points and facts needed

- Prices: read from the CMS price collection; the writer writes the sentence around the number, never the number itself. TODO(roshan): price bands are still a proposal (`docs/pricing-model.md`) until approved.
- Prices live in `pricingPackages`, `rentalPlans`, `hourlyRates` (ADR-014); only admins change them (ADR-025). Writer writes sentences only.
- Budget range options for the quote form: from neha's request (answer with T-706).
- VAT, taxes and invoicing statements: TODO(roshan).
- USD basis (exchange rate and international markup): TODO(roshan).

## 7. CTA

- Primary: **Get a quote**, form on page.
- Secondary: **See monthly plans**, link to `/rent`.
- WhatsApp click-to-chat.

## 8. Internal links

| Direction | Link | Anchor text | Where |
|---|---|---|---|
| Out | `/rent` | monthly plans | plans block |
| Out | `/rent/website` | website on rent | plans block |
| Out | `/services/web-development` | website development | packages |
| Out | `/services/mobile-app-development` | mobile app development | budget guide |
| Out | `/services/ai-agents` | AI agents | budget guide |
| Out | `/services/outstaffing` | dedicated developers | rates |
| Out | `/services/digital-marketing` | digital marketing | packages |
| Out | `/contact` | Get a quote | CTA |
| In | `/, every service and rent page (price teaser), blog article 1 "our packages"` | pricing / our packages | anchors |

## 9. Schema and CMS fields

- JSON-LD: `BreadcrumbList`, `FAQPage`. No `Offer` here (avoid duplicate markup; `Offer` lives on rental pages).
- CMS: `pages` + `pricing`; blocks `pricing-table`, `budget-guide`, `rental-plans` (teaser), `faq`, `cta-form`.

## 10. FAQ (answer each in 40 to 80 words, plain English)

Source of questions: wording of questions Nepali agencies answer on their own pages (see `seo/competitor-benchmark.md` sources) and buyer concerns from `docs/pricing-model.md`. ESTIMATE: not checked against Google "People also ask" yet; I will refine from Search Console after launch.

1. How much does a website cost in Nepal with ADMMIS.TECH?
2. Why does the price depend on company size?
3. Do you show prices in US dollars?
4. Are there extra costs after I pay?
5. Can I pay monthly instead of all at once?
6. How do I get a custom quote for a bigger project?

## 11. Notes for the writer

- This is the trust page. Short sentences, tables, no adjectives. Every number comes from the CMS.
- Do not write "cheapest", "best price", "affordable". Show the numbers.
- Do not copy FITTIN's price wording or structure of tariffs; ours are original (`docs/pricing-model.md`).
- If Roshan changes bands, only CMS data changes; this brief stays valid.
