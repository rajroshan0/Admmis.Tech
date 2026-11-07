# Page brief: Offline marketing: events, print and BTL

Owner: sudip · Writer: writer · Status: ready for writer · Version: v1 · Date: 2026-11-07
Rules that always apply: `content/voice-and-tone.md`, CLAUDE.md §8 (Truth, Writing). Never invent prices, clients, results or testimonials; write `TODO(roshan): …` instead. Prices are never typed in copy; they come from the CMS price collection (ADR-014). All text is original (FITTIN is a structure reference only). Volumes are ESTIMATE, see `seo/keyword-map.md`. FAQ answers: 30 to 45 words (layout limit, T-708). No ranking or sales promises.

## 1. Page facts

| Field | Value |
|---|---|
| URL | `/services/offline-marketing` |
| Template | `service` |
| Parent | `/services` |
| Priority | P2 |
| Index | Y |
| Word-count target | 700 to 900 |

## 2. Goal and audience

- **Page goal:** Show that the same team that builds your site can run events, print and on-ground campaigns in Kathmandu, and collect enquiries.
- **Primary conversion:** Quote form (`generate_lead`, `service=offline-marketing`).
- **Audience:** Nepali business owners and marketing managers planning a launch, event or activation; NGOs and institutions. Worries: reliability on event day, budget, vendors.
- **Search intent:** Commercial. First screen: what we organise (events, print, BTL), location (Kathmandu), and a quote action.

## 3. Keywords

- **Primary (one):** event marketing Kathmandu
- **Secondary (natural, once or twice each):** BTL marketing Nepal; activation agency Nepal; print and branding Kathmandu; event management Kathmandu
- **Do not target here:** "digital marketing", "SEO", "Facebook ads" (belong to `/services/digital-marketing`); `/event` page (our own opening event).

## 4. Metadata and headings

| Element | Text | Count / limit |
|---|---|---|
| `<title>` | Event and BTL Marketing in Kathmandu | ADMMIS.TECH | 50 / 60 |
| Meta description | Events, print and on-ground campaigns in Kathmandu, planned with your online marketing. Clear plan and budget. Get a quote. | 123 / 155 |
| H1 | Events, print and on-ground marketing in Kathmandu | 50 / 70 |
| Hero subheadline | Launches, activations and printed material that match your online campaigns, planned and run by one team. | ≤ 25 words |

Wording may be improved if the primary keyword stays at the start of the title and limits hold; tell me what changed.

## 5. Section outline (order fixed, one CMS block each)

| # | Block | H2 / H3 (working) | Purpose | Words |
|---|---|---|---|---|
| 1 | hero | H1 + subheadline + 2 CTAs | Promise and action | 30 to 50 |
| 2 | rich-text | H2: What offline marketing is | Explain BTL in plain words (below-the-line: direct, on-ground, print) | 90 |
| 3 | cards (4) | H2: What we do: events and launches · print and branding · on-ground activations · brand material | One card each | 140 |
| 4 | benefits (3) | H2: Why link offline with online: same message everywhere · one team and one plan · reporting you can read | Only true points | 90 |
| 5 | steps (4) | H2: How it works: goal, plan and budget, run, review | Process | 110 |
| 6 | price teaser | H2: What it costs | Per-project, via quote unless CMS has prices | 50 to 70 |
| 7 | case-cards | H2: Events we have run | Only real cases; the ADMMIS.TECH opening event may be referenced after 1 Jan 2027 with `/event` | CMS |
| 8 | crossSell (2) | Want online campaigns too? → digital-marketing · Need a site for the event? → web-development | Route | 60 |
| 9 | faq | H2: Offline marketing questions | 5 questions below | 180 to 230 |
| 10 | cta-form | H2: Plan your event or campaign | Form: type, date, city, budget | 20 |

## 6. Proof points and facts needed

TODO(roshan): events and print jobs delivered, vendors or in-house, cities covered beyond Kathmandu, any named clients (permission). If we have no portfolio yet, say "we plan and manage" and show process only.

## 7. CTA

Primary: "Get a quote". Secondary: "Talk on WhatsApp" (number TODO(roshan)).

## 8. Internal links

| Direction | Link | Anchor text | Where |
|---|---|---|---|
| Up | `/services` | All our services | Breadcrumb and footer of page |
| Across | `/pricing` | See prices | Price block |
| Across | `/services/digital-marketing` | Digital marketing | Cross-sell |
| Across | `/event` | Our opening event | Only after event details are confirmed |
| Across | `/services/web-development` | Website for your campaign | Cross-sell |

## 9. Schema and CMS fields

`Service`, `BreadcrumbList`; `FAQPage` per sitemap §6 rule. CMS: `seoTitle`, `metaDescription`, `heroHeading`, `faqs[]`, price teaser reads the price collection. `areaServed` = Kathmandu, Nepal.

## 10. FAQ (answers 30 to 45 words, answer in the first sentence)

1. What is BTL marketing? (Plain definition.)
2. Do you only work in Kathmandu? (TODO(roshan).)
3. Can you handle printing as well as planning? (Say what is true.)
4. How far ahead should I plan an event? (General guidance, no invented stats.)
5. How much does it cost? (By quote; no figures.)

## 11. Notes for the writer

P2 page, lowest priority; keep it honest and short if we have no portfolio. Never invent event counts or clients. Use "Kathmandu" naturally in H1 and once in the intro.
