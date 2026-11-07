# Page brief: AI agent on rent

Owner: sudip · Writer: writer · Status: ready for writer · Version: v1 · Date: 2026-11-07
Rules that always apply: `content/voice-and-tone.md`, CLAUDE.md §8 (Truth, Writing). Never invent prices, clients, results or testimonials; write `TODO(roshan): …` instead. Prices are never typed in copy; they come from the CMS price collection (ADR-014). All text is original (FITTIN is a structure reference only). Volumes are ESTIMATE, see `seo/keyword-map.md`. FAQ answers: 30 to 45 words (layout limit, T-708). No ranking or sales promises.

## 1. Page facts

| Field | Value |
|---|---|
| URL | `/rent/ai-agent` |
| Template | `rent-product` |
| Parent | `/rent` |
| Priority | P1 |
| Index | Y |
| Word-count target | 700 to 900 |

## 2. Goal and audience

- **Page goal:** Let a small business get an AI chatbot or agent for a fixed monthly fee instead of a build project, and start a plan.
- **Primary conversion:** Plan enquiry/quote form (`generate_lead`, `service=rent-ai-agent`); `view_pricing` on plan table.
- **Audience:** Shop owners, clinics, schools, hotels and restaurants in Nepal that get repeated customer questions on WhatsApp or Facebook. Worries: cost, setup effort, losing control, Nepali language support.
- **Search intent:** Commercial/transactional. First screen: what the agent does, monthly price, channels (WhatsApp, Telegram, website), start action.

## 3. Keywords

- **Primary (one):** AI chatbot subscription Nepal
- **Secondary (natural, once or twice each):** AI agent monthly plan; chatbot for business monthly; AI customer support Nepal; WhatsApp chatbot Nepal
- **Do not target here:** "AI agent development", "custom AI" (belong to `/services/ai-agents`); "rent a team" and "website on rent".

## 4. Metadata and headings

| Element | Text | Count / limit |
|---|---|---|
| `<title>` | AI Chatbot Subscription in Nepal | ADMMIS.TECH | 46 / 60 |
| Meta description | Rent an AI agent for WhatsApp, Telegram or your website. One monthly price, set up for you. See plans and get started. | 118 / 155 |
| H1 | An AI agent for your business, on a monthly plan | 48 / 70 |
| Hero subheadline | It answers common questions and handles routine tasks. You pay one monthly fee and we run it for you. | ≤ 25 words |

Wording may be improved if the primary keyword stays at the start of the title and limits hold; tell me what changed.

## 5. Section outline (order fixed, one CMS block each)

| # | Block | H2 / H3 (working) | Purpose | Words |
|---|---|---|---|---|
| 1 | hero | H1 + subheadline + 2 CTAs | Promise, price pointer and action | 30 to 50 |
| 2 | rich-text | H2: What you get | What the agent does and what the plan includes (setup, hosting, updates, support); items TODO(roshan) | 100 |
| 3 | plans (CMS) | H2: Plans | Plan cards from `rentalPlans`; prices never typed | from CMS |
| 4 | cards (4) | H2: What it can do: answer customers · collect leads and bookings · enter data and reports · send follow-ups | Examples; Nepali language support only if true (TODO(roshan)) | 140 |
| 5 | cards (3) | H2: Where it works: WhatsApp · Telegram · your website | Channels | 80 |
| 6 | steps (4) | H2: How a plan starts: talk, share your knowledge, we set up, you test and go live | Time to start TODO(roshan) | 100 |
| 7 | comparison | H2: Rent or build custom? | Rent vs `/services/ai-agents`; helps the right visitor choose | 100 |
| 8 | faq | H2: Questions about renting an AI agent | 6 questions below | 220 to 270 |
| 9 | cta-form | H2: Start with a short call | Form: business type, channel, questions per day | 20 |

## 6. Proof points and facts needed

TODO(roshan): plan names, what each includes, monthly price (in the CMS only), setup fee, minimum term, cancellation, data handling, whether the agent supports Nepali. No usage statistics or client names without permission.

## 7. CTA

Primary: "Choose a plan" or "Get started" (label per plan CTA). Secondary: "Talk to us".

## 8. Internal links

| Direction | Link | Anchor text | Where |
|---|---|---|---|
| Up | `/rent` | All monthly plans | Breadcrumb |
| Across | `/services/ai-agents` | Need a custom AI agent? | Comparison and crossSell |
| Across | `/pricing` | See all prices | Plan block |
| Across | `/rent/website` | Website on rent | Cross-sell |
| Across | `/blog/…` | AI agent article | Only if the article exists |

## 9. Schema and CMS fields

`Service` with one `Offer` per plan, `BreadcrumbList`, `FAQPage` per sitemap §6. `price` and `priceCurrency` read from the CMS `rentalPlans` collection; plans priced by quote omit `price`. CMS: `seoTitle`, `metaDescription`, `heroHeading`, `plans[]`, `faqs[]`.

## 10. FAQ (answers 30 to 45 words, answer in the first sentence)

1. What does an AI agent on rent include? (Setup, running, updates, support; per CMS plan.)
2. How much does it cost per month? (Point to plans; no typed numbers.)
3. Can I cancel any time? (TODO(roshan): confirm terms.)
4. Does it work in Nepali? (Only what is true.)
5. Who owns the customer data? (TODO(roshan).)
6. What if I need more than the plan covers? (Link to custom service.)

## 11. Notes for the writer

Intent differs from `/services/ai-agents`: this page sells a plan, not a project. Do not reuse its H2s or intro text; avoid duplicate content. Say "AI agent" and "chatbot" both, explain the difference in one line.
