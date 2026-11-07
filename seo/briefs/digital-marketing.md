# Page brief: Digital marketing

Owner: sudip · Writer: writer · Status: ready for writer · Version: v1 · Date: 2026-11-07 · Task: T-705

Rules that always apply: `content/voice-and-tone.md`, CLAUDE.md §8 (Truth, Writing). Never invent prices, clients, results or testimonials; write `TODO(roshan): …`. Prices come from the CMS price collection (ADR-014), never typed in copy. All text is original. Structure follows `docs/reference-fittin.md` §3.4 (structure only, no FITTIN wording).

## 1. Page facts

| Field | Value |
|---|---|
| URL | `/services/digital-marketing` |
| Template | `service` |
| Parent | `/services` |
| Priority | P0 |
| Index | Y |
| Word-count target | 1,100 to 1,500 words |

## 2. Goal and audience

- **Page goal:** Show that we run measurable marketing for Nepali businesses and get a quote or call.
- **Primary conversion:** Quote form (`service=digital-marketing`) or WhatsApp click.
- **Audience:** SME owners and marketing managers who tried boosting posts and want results; brands launching a website or app that needs traffic. Worries: wasted ad spend, unclear reports, agencies that disappear.
- **Search intent:** Commercial/transactional for "digital marketing agency Nepal". The SERP is crowded and price-led: first screen must show what we do, how we report, and a price signal.

## 3. Keywords (volumes are ESTIMATE, see `seo/keyword-map.md`)

- **Primary (one):** digital marketing agency Nepal
- **Secondary (natural use, once or twice each):** SEO company Kathmandu (see note); social media marketing Nepal; Facebook ads Nepal; Google ads Nepal; influencer marketing Nepal; content marketing Nepal
- **Do not target here:** "SEO audit", "website audit" (`/services/audit`); "event marketing", "BTL", "print" (`/services/offline-marketing`); "website development".

## 4. Metadata and headings

| Element | Text | Count / limit |
|---|---|---|
| `<title>` (seoTitle) | Digital Marketing Agency in Nepal \| ADMMIS.TECH | 47 / 60 |
| Meta description | SEO, social media, Facebook and Google ads and influencer campaigns for Nepali businesses. Clear plans, clear prices. Get a quote. | 141 / 155 |
| H1 (heroHeading) | Digital marketing agency in Nepal: SEO, social and ads | 54 / 70 |
| Hero subheadline | We plan, run and report your marketing so you can see what brings customers and what does not. | 18 / 25 words |

The title and meta above are proposals. The writer may improve wording but must keep the primary keyword at the start of the title, stay within the limits, and tell me if anything changes.

## 5. Section outline

Order is fixed; each row is one CMS block.

| # | Block | H2 / H3 (working) | Purpose | Words |
|---|---|---|---|---|
| 1 | hero | H1 + subheadline + 2 CTAs | Promise and action | 30 to 50 |
| 2 | rich-text | H2: Marketing that you can measure | What we do and how we report; define "SEO", "ads", "reach" once | 100 |
| 3 | cards (5) | H2: Our marketing services: SEO · social media management · paid ads (Meta, Google) · influencer campaigns · content and video | 25 to 35 words each | 150 |
| 4 | benefits (4) | H2: What you get (one team for site and marketing, monthly report in plain words, you own your accounts, no lock-in) | Only true claims; terms TODO(roshan) | 100 to 120 |
| 5 | steps (5) | H2: How we work (goal and audit, plan, launch, report monthly, improve) | Process | 150 |
| 6 | rich-text | H2: Reports you can understand | What the monthly report shows (visits, leads, cost per lead); sample screenshot later | 80 to 100 |
| 7 | rich-text | H2: Marketing together with your website or app | Why combining with `/services/web-development` helps; link | 60 to 80 |
| 8 | price teaser | H2: What marketing costs | Monthly plans from CMS; ad spend is paid to the platform separately (state it) | 80 |
| 9 | case-cards | H2: Marketing results | Case tagged marketing: the Telegram marketing agent; others TODO(roshan) | from CMS |
| 10 | faq | H2: Marketing questions | 6 questions below | 350 to 450 |
| 11 | cta-form | H2: Tell us about your business | Quote form | 20 |

## 6. Proof points and facts needed

- Case proof available now (from `content/pages/home.md`, results unconfirmed): Telegram AI agent for data entry; Telegram AI agent for marketing; WhatsApp AI agent for a local shop; website and mobile app for e-commerce. TODO(roshan): permission to name clients, one real result per case.
- Results (leads, reach, cost per lead) for any real campaign: TODO(roshan). No invented percentages.
- Channels we manage and tools we use (free-only rule, ADR-037, applies to our own tools, not to client ad spend).
- Whether we manage client ad accounts under the client's ownership: TODO(roshan).
- Prices: read from the CMS price collection; the writer writes the sentence around the number, never the number itself. TODO(roshan): price bands are still a proposal (`docs/pricing-model.md`) until approved.

## 7. CTA

- Primary: **Get a quote**, button to `/contact` (and the quote form block at the end of the page). Also in hero.
- Secondary: **Chat on WhatsApp** (click-to-chat). TODO(roshan): WhatsApp number.
- Mobile sticky bar (WhatsApp, call, get a quote) is global; do not write copy for it.

## 8. Internal links

| Direction | Link | Anchor text | Where |
|---|---|---|---|
| Out | `/services/audit` | SEO and website audit | related; the only place "audit" is the topic |
| Out | `/services/offline-marketing` | events and print marketing | related |
| Out | `/services/web-development` | website that converts visitors | related |
| Out | `/services/ai-agents` | AI agent for marketing and replies | related |
| Out | `/pricing` | marketing prices | price teaser |
| Out | `/work` | Our work | case cards |
| Out | `/contact` | Get a quote | CTA |
| In | `/services, /, /pricing, /services/web-development` | digital marketing | anchors |

## 9. Schema and CMS fields

- JSON-LD: `Service` (provider = Organization, areaServed = Nepal), `BreadcrumbList`, `FAQPage` (from `faqs[]`).
- CMS fields to fill: `seoTitle`, `metaDescription`, `heroHeading`, `heroSubheading`, `deliverables[]`, `process[]`, `pricingRefs` (link price items, no text), `relatedCases`, `relatedServices`, `faqs[]`, `showQuoteForm = true`.

## 10. FAQ (answer each in 40 to 80 words, plain English)

Source of questions: wording of questions Nepali agencies answer on their own pages (see `seo/competitor-benchmark.md` sources) and buyer concerns from `docs/pricing-model.md`. ESTIMATE: not checked against Google "People also ask" yet; I will refine from Search Console after launch.

1. What does a digital marketing agency in Nepal do?
2. How much does digital marketing cost in Nepal per month?
3. Is ad spend included in your price?
4. How long before I see results from SEO?
5. Do I own my social media and ad accounts?
6. Do you work with small businesses and shops?

## 11. Notes for the writer

- Competitive SERP: win with transparency (prices, reports, ownership) not adjectives.
- Never promise rankings or sales. Say what we do and how we report.
- SEO audit belongs to `/services/audit`; mention SEO as a service but do not use "audit" as a heading here.
