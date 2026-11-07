# Page brief: Mobile app development

Owner: sudip · Writer: writer · Status: ready for writer · Version: v1 · Date: 2026-11-07 · Task: T-705

Rules that always apply: `content/voice-and-tone.md`, CLAUDE.md §8 (Truth, Writing). Never invent prices, clients, results or testimonials; write `TODO(roshan): …`. Prices come from the CMS price collection (ADR-014), never typed in copy. All text is original. Structure follows `docs/reference-fittin.md` §3.4 (structure only, no FITTIN wording).

## 1. Page facts

| Field | Value |
|---|---|
| URL | `/services/mobile-app-development` |
| Template | `service` |
| Parent | `/services` |
| Priority | P0 |
| Index | Y |
| Word-count target | 1,000 to 1,300 words |

## 2. Goal and audience

- **Page goal:** Help a business or startup understand how an app is built, what it costs, and request a quote.
- **Primary conversion:** Quote form or WhatsApp click.
- **Audience:** Business owners with an operational or customer-facing app idea; startup founders; some foreign clients wanting an offshore team. Worries: cost, cross-platform vs native, who maintains the app, store approval.
- **Search intent:** Commercial/transactional for "mobile app development Nepal". First screen: platforms covered (Android, iPhone), the technology choice in simple words, and a contact action.

## 3. Keywords (volumes are ESTIMATE, see `seo/keyword-map.md`)

- **Primary (one):** mobile app development Nepal
- **Secondary (natural use, once or twice each):** Flutter app development Nepal; React Native developers Nepal; Android iOS app Kathmandu (see note); app development company Nepal; hire app developers
- **Do not target here:** "software development company" (home); "web app" as a main term (`/services/web-development`); "dedicated developers" (`/services/outstaffing`).

## 4. Metadata and headings

| Element | Text | Count / limit |
|---|---|---|
| `<title>` (seoTitle) | Mobile App Development in Nepal \| ADMMIS.TECH | 45 / 60 |
| Meta description | Android and iPhone apps built in Nepal. Clear plan, clear price, support after launch. Get a quote. | 141 / 155 |
| H1 (heroHeading) | Mobile app development in Nepal for Android and iPhone | 54 / 70 |
| Hero subheadline | From idea to the Play Store and App Store. We choose the technology that fits your goal and budget. | 19 / 25 words |

The title and meta above are proposals. The writer may improve wording but must keep the primary keyword at the start of the title, stay within the limits, and tell me if anything changes.

## 5. Section outline

Order is fixed; each row is one CMS block.

| # | Block | H2 / H3 (working) | Purpose | Words |
|---|---|---|---|---|
| 1 | hero | H1 + subheadline + 2 CTAs | Promise and action | 30 to 50 |
| 2 | rich-text | H2: Apps for Android and iPhone (definition) | What we build; native vs cross-platform in 3 plain lines | 100 |
| 3 | cards (4) | H3: Customer apps · Staff and delivery apps · Booking and e-commerce apps · Apps for your AI agent or service | Types, 25 words each | 100 |
| 4 | comparison table | H2: Flutter, React Native or native: which one is right | Table: when to choose each, cost and speed effect, honest trade-offs | 150 to 200 |
| 5 | benefits (4) | H2: What you get | Benefits | 100 |
| 6 | steps (5) | H2: How we build your app (idea, design, build, test, publish and support) | Process; mention store review time as the stores' own, no promise. Times: TODO(roshan) | 150 |
| 7 | rich-text | H2: Integrations and security | Payments, maps, SMS, push, login, data protection basics | 100 to 120 |
| 8 | rich-text | H2: After launch | Updates, bug fixing, new OS versions; link to support terms | 60 to 80 |
| 9 | price teaser | H2: What an app costs | Budget guide from the CMS; what drives cost (platforms, features, backend) | 80 |
| 10 | case-cards | H2: Apps we have built | Cases tagged mobile (e-commerce website and app) | from CMS |
| 11 | faq | H2: Mobile app questions | 6 questions below | 350 to 450 |
| 12 | cta-form | H2: Tell us about your app | Quote form | 20 |

## 6. Proof points and facts needed

- Case proof available now (from `content/pages/home.md`, results unconfirmed): Telegram AI agent for data entry; Telegram AI agent for marketing; WhatsApp AI agent for a local shop; website and mobile app for e-commerce. TODO(roshan): permission to name clients, one real result per case.
- Technologies we really use for apps: TODO(roshan) confirm Flutter, React Native, native Kotlin/Swift. Write only what the team has shipped.
- Apps published on stores (names or counts): TODO(roshan).
- Prices: read from the CMS price collection; the writer writes the sentence around the number, never the number itself. TODO(roshan): price bands are still a proposal (`docs/pricing-model.md`) until approved.

## 7. CTA

- Primary: **Get a quote**, button to `/contact` (and the quote form block at the end of the page). Also in hero.
- Secondary: **Chat on WhatsApp** (click-to-chat). TODO(roshan): WhatsApp number.
- Mobile sticky bar (WhatsApp, call, get a quote) is global; do not write copy for it.

## 8. Internal links

| Direction | Link | Anchor text | Where |
|---|---|---|---|
| Out | `/pricing` | App development prices | price teaser |
| Out | `/services/web-development` | website | related |
| Out | `/services/custom-software` | custom software and backends | related |
| Out | `/services/ai-agents` | AI agent inside your app | related |
| Out | `/services/qa-testing` | mobile app testing | related |
| Out | `/services/outstaffing` | dedicated app developers | related |
| Out | `/work` | Our work | case cards |
| Out | `/contact` | Get a quote | CTA |
| In | `/services, /, /pricing` | mobile app development | anchors |

## 9. Schema and CMS fields

- JSON-LD: `Service` (provider = Organization, areaServed = Nepal), `BreadcrumbList`, `FAQPage` (from `faqs[]`).
- CMS fields to fill: `seoTitle`, `metaDescription`, `heroHeading`, `heroSubheading`, `deliverables[]`, `process[]`, `pricingRefs` (link price items, no text), `relatedCases`, `relatedServices`, `faqs[]`, `showQuoteForm = true`.

## 10. FAQ (answer each in 40 to 80 words, plain English)

Source of questions: wording of questions Nepali agencies answer on their own pages (see `seo/competitor-benchmark.md` sources) and buyer concerns from `docs/pricing-model.md`. ESTIMATE: not checked against Google "People also ask" yet; I will refine from Search Console after launch.

1. How much does it cost to build a mobile app in Nepal?
2. Should I build for Android, iPhone, or both?
3. What is the difference between Flutter, React Native and native apps?
4. How long does it take to build an app?
5. Who owns the app code and the store accounts?
6. Do you maintain the app after it is published?

## 11. Notes for the writer

- The comparison table is the page's differentiator: be honest about trade-offs. Do not claim one technology is best.
- Explain "native", "cross-platform" and "backend" once.
- Do not promise store approval or timelines you do not control.
- No exaggerated user numbers or app-store ratings unless real and linkable.
