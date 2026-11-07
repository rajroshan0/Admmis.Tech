# Page brief: Services hub

Owner: sudip · Writer: writer · Status: ready for writer · Version: v1 · Date: 2026-11-07 · Task: T-705

Rules that always apply: `content/voice-and-tone.md`, CLAUDE.md §8 (Truth, Writing). Never invent prices, clients, results or testimonials; write `TODO(roshan): …`. Prices come from the CMS price collection (ADR-014), never typed in copy. All text is original. Structure follows `docs/reference-fittin.md` §3.4 (structure only, no FITTIN wording).

## 1. Page facts

| Field | Value |
|---|---|
| URL | `/services` |
| Template | `services-hub` |
| Parent | `/` |
| Priority | P1 (money hub, links to every P0) |
| Index | Y |
| Word-count target | 500 to 700 words, plus the 9 service cards |

## 2. Goal and audience

- **Page goal:** Help a business owner see in ten seconds which service fits, and send them to the right service page or to a quote.
- **Primary conversion:** Click through to a service page (target 60% of visits), then the quote form.
- **Audience:** Owner or manager of a Nepali SME, or a foreign buyer scanning what we do. Knows the problem ("we need a website", "we need an app"), not the technical terms.
- **Search intent:** Commercial investigation for "IT services Nepal". The searcher wants a list of what we offer and proof that we are a real company. First screen: the 9 services as cards.

## 3. Keywords (volumes are ESTIMATE, see `seo/keyword-map.md`)

- **Primary (one):** IT services Nepal
- **Secondary (natural use, once or twice each):** software services Kathmandu (use "Nepal" in body; avoid claiming Kathmandu until Roshan confirms an office there); digital agency Nepal; web, app and AI services; technology and marketing agency Nepal
- **Do not target here:** Every service-specific keyword (web development company, mobile app development, AI agent, outstaffing, digital marketing). Each belongs to its own page. Do not use those phrases as H2s here; use the short service names.

## 4. Metadata and headings

| Element | Text | Count / limit |
|---|---|---|
| `<title>` (seoTitle) | IT Services in Nepal \| ADMMIS.TECH | 34 / 60 |
| Meta description | Websites, mobile apps, custom software, AI agents, testing, audits, dedicated teams and marketing. One Nepal-based team, clear prices. Get a quote. | 147 / 155 |
| H1 (heroHeading) | IT services in Nepal, from first build to marketing | 51 / 70 |
| Hero subheadline | Choose one service or combine several. Each is priced on its own, and we show the prices. | 17 / 25 words |

The title and meta above are proposals. The writer may improve wording but must keep the primary keyword at the start of the title, stay within the limits, and tell me if anything changes.

## 5. Section outline

Order is fixed; each row is one CMS block.

| # | Block | H2 / H3 (working) | Purpose | Words |
|---|---|---|---|---|
| 1 | hero | H1 + subheadline + 2 CTAs | Say what the page is and offer the quote | 30 to 50 |
| 2 | services-grid | H2: Build, test and grow your business online (3 groups: Build / Quality / Team and marketing) | Nine cards, 20 to 30 words each, each linking to its page. Group them so the reader scans | 9 x 25 = 225 |
| 3 | rich-text | H2: How we choose the right service with you | Short guide: "If you need X, start with Y" (5 lines, each linking to a service) | 100 to 130 |
| 4 | pricing teaser | H2: Know the cost before you start | Explain that each service is priced separately and by company size; link to `/pricing` | 50 to 70 |
| 5 | rental teaser | H2: Prefer to pay monthly? | Link to `/rent` and the three rental pages | 40 to 60 |
| 6 | steps | H2: How a project works (4 steps, same as home) | Reuse the home process text; do not rewrite differently | 80 |
| 7 | case-cards | H2: Work we have done | 2 to 4 cards from the `cases` collection | from CMS |
| 8 | faq | H2: Questions about our services | 4 questions | 200 to 280 |
| 9 | cta-form | H2: Tell us what you need | Quote form | 20 |

## 6. Proof points and facts needed

- List of the 9 services is fixed (`seo/sitemap.md` §2.2): web development, mobile apps, custom software, AI agents, QA and testing, audits, dedicated team (outstaffing), digital marketing, offline marketing.
- Case proof available now (from `content/pages/home.md`, results unconfirmed): Telegram AI agent for data entry; Telegram AI agent for marketing; WhatsApp AI agent for a local shop; website and mobile app for e-commerce. TODO(roshan): permission to name clients, one real result per case.
- Number of years, team size, completed projects: TODO(roshan). Do not write any number until confirmed.

## 7. CTA

- Primary: **Get a quote**, button to `/contact` (and the quote form block at the end of the page). Also in hero.
- Secondary: **Chat on WhatsApp** (click-to-chat). TODO(roshan): WhatsApp number.
- Mobile sticky bar (WhatsApp, call, get a quote) is global; do not write copy for it.

## 8. Internal links

| Direction | Link | Anchor text | Where |
|---|---|---|---|
| Out | `/services/web-development` | Website development | card + guide |
| Out | `/services/mobile-app-development` | Mobile app development | card + guide |
| Out | `/services/custom-software` | Custom software development | card |
| Out | `/services/ai-agents` | AI agent development | card + guide |
| Out | `/services/qa-testing` | Software testing | card |
| Out | `/services/audit` | Website and code audit | card |
| Out | `/services/outstaffing` | Dedicated developers | card + guide |
| Out | `/services/digital-marketing` | Digital marketing | card + guide |
| Out | `/services/offline-marketing` | Event and offline marketing | card |
| Out | `/pricing` | Pricing | teaser |
| Out | `/rent` | Rent a website, AI agent or team | teaser |
| Out | `/work` | Our work | case cards |
| Out | `/contact` | Get a quote | CTA |
| In (planned) | `/` | Services | home nav, footer, home services section |
| In | `every `/services/*` page` | Breadcrumb "Services" | breadcrumb |

## 9. Schema and CMS fields

- JSON-LD: `BreadcrumbList`, `ItemList` (the nine service URLs).
- CMS fields: `pages` entry; blocks `services-grid`, `rental-plans` (teaser), `faq`, `cta-form`.

## 10. FAQ (answer each in 40 to 80 words, plain English)

Source of questions: wording of questions Nepali agencies answer on their own pages (see `seo/competitor-benchmark.md` sources) and buyer concerns from `docs/pricing-model.md`. ESTIMATE: not checked against Google "People also ask" yet; I will refine from Search Console after launch.

1. What services does ADMMIS.TECH offer?
2. Can I use more than one service together?
3. How are your services priced?
4. Do you work with companies outside Nepal?

## 11. Notes for the writer

- This is a hub: it routes, it does not sell deeply. Keep each card to what the reader gets, in plain words.
- Do not repeat the service pages' keywords. If a sentence sounds like the first line of a service page, cut it.
- No "we offer end-to-end solutions" filler. Say what a person can order.
