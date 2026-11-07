# Page brief: AI agents

Owner: sudip · Writer: writer · Status: ready for writer · Version: v1 · Date: 2026-11-07 · Task: T-705

Rules that always apply: `content/voice-and-tone.md`, CLAUDE.md §8 (Truth, Writing). Never invent prices, clients, results or testimonials; write `TODO(roshan): …`. Prices come from the CMS price collection (ADR-014), never typed in copy. All text is original. Structure follows `docs/reference-fittin.md` §3.4 (structure only, no FITTIN wording).

## 1. Page facts

| Field | Value |
|---|---|
| URL | `/services/ai-agents` |
| Template | `service` |
| Parent | `/services` |
| Priority | P0 (rising demand, low competition) |
| Index | Y |
| Word-count target | 1,200 to 1,600 words |

## 2. Goal and audience

- **Page goal:** Explain AI agents in plain words, show real examples we built, and get a quote request.
- **Primary conversion:** Quote form (`service=ai-agents`) or WhatsApp click. Secondary: click to `/rent/ai-agent`.
- **Audience:** Owners of shops, clinics, schools and service firms with many repeated customer questions; managers who want to cut manual data entry; foreign buyers evaluating AI integration. Worries: will it make mistakes, is my data safe, will it replace my staff, what does it cost.
- **Search intent:** Commercial/transactional, partly informational ("what is an AI agent"). First screen: a plain definition, channels, and an example. Searchers are often new to the topic.

## 3. Keywords (volumes are ESTIMATE, see `seo/keyword-map.md`)

- **Primary (one):** AI agent development Nepal
- **Secondary (natural use, once or twice each):** AI chatbot development Nepal; AI integration for business Nepal; WhatsApp chatbot Nepal; Telegram bot development; LLM chatbot company
- **Do not target here:** "AI chatbot subscription", "AI agent monthly plan" (belong to `/rent/ai-agent`); "software development company" (home).

## 4. Metadata and headings

| Element | Text | Count / limit |
|---|---|---|
| `<title>` (seoTitle) | AI Agent Development in Nepal \| ADMMIS.TECH | 43 / 60 |
| Meta description | AI agents and chatbots for WhatsApp, Telegram and your website, built in Nepal. They answer customers and handle routine tasks. Get a quote. | 140 / 155 |
| H1 (heroHeading) | AI agent development in Nepal that answers your customers | 57 / 70 |
| Hero subheadline | An AI agent is software that answers questions and does routine work for you, on WhatsApp, Telegram or your website. | 20 / 25 words |

The title and meta above are proposals. The writer may improve wording but must keep the primary keyword at the start of the title, stay within the limits, and tell me if anything changes.

## 5. Section outline

Order is fixed; each row is one CMS block.

| # | Block | H2 / H3 (working) | Purpose | Words |
|---|---|---|---|---|
| 1 | hero | H1 + subheadline + 2 CTAs | Promise and action | 30 to 50 |
| 2 | rich-text | H2: What is an AI agent? | Definition in 3 to 4 lines; difference from a simple chatbot | 100 to 130 |
| 3 | cards (4) | H2: What AI agents do for you (types): customer support · sales and lead capture · data entry and reports · marketing content | 25 to 30 words each | 120 |
| 4 | cards (6) | H2: Agents for your industry (retail, clinics, schools, hotels and tourism, restaurants, services) | One line each | 120 |
| 5 | benefits (4) | H2: What you get (answers any hour, fewer repeated tasks, your team handles the people part, you keep control) | Benefits; only claims we can support | 100 to 120 |
| 6 | channels | H2: Where your agent works: WhatsApp, Telegram, your website, your app | One line each | 80 |
| 7 | how-it-works table | H2: How an AI agent works (language model, your knowledge base, connected tools, rules and human handoff) | Plain explanation; this section builds trust | 150 to 200 |
| 8 | steps (5) | H2: From idea to a working agent (talk, collect your knowledge, build and connect, test with your team, launch and improve) | Process; time: TODO(roshan) | 150 |
| 9 | rich-text | H2: Integrations, privacy and safety | Which systems we connect; where data is stored; what we log; human handoff; no promises of 100% accuracy | 120 to 150 |
| 10 | case-cards | H2: Agents we have built | The 3 AI cases (Telegram data entry, Telegram marketing, WhatsApp shop) | from CMS |
| 11 | price teaser | H2: How AI agent work is priced | Project price plus monthly option; link to `/rent/ai-agent` | 80 |
| 12 | faq | H2: AI agent questions | 6 questions below | 350 to 450 |
| 13 | cta-form | H2: Tell us what you want your agent to do | Quote form | 20 |

## 6. Proof points and facts needed

- Case proof available now (from `content/pages/home.md`, results unconfirmed): Telegram AI agent for data entry; Telegram AI agent for marketing; WhatsApp AI agent for a local shop; website and mobile app for e-commerce. TODO(roshan): permission to name clients, one real result per case.
- Real result per case (hours saved, messages handled): TODO(roshan); only publish confirmed numbers.
- Which language models and tools we use, where data is hosted: TODO(roshan) with hritik. Write nothing about "secure" or "private" until confirmed.
- Languages the agents handle (English, Nepali): TODO(roshan). Nepali capability matters for local searchers.
- Prices: read from the CMS price collection; the writer writes the sentence around the number, never the number itself. TODO(roshan): price bands are still a proposal (`docs/pricing-model.md`) until approved.

## 7. CTA

- Primary: **Get a quote**, button to `/contact` (and the quote form block at the end of the page). Also in hero.
- Secondary: **Chat on WhatsApp** (click-to-chat). TODO(roshan): WhatsApp number.
- Mobile sticky bar (WhatsApp, call, get a quote) is global; do not write copy for it.
- Tertiary: "Rent an AI agent monthly" link to `/rent/ai-agent`.

## 8. Internal links

| Direction | Link | Anchor text | Where |
|---|---|---|---|
| Out | `/rent/ai-agent` | rent an AI agent by the month | price teaser + cta |
| Out | `/pricing` | AI agent prices | price teaser |
| Out | `/services/custom-software` | custom software | related |
| Out | `/services/web-development` | website with a chatbot | related |
| Out | `/services/mobile-app-development` | mobile app | related |
| Out | `/services/digital-marketing` | marketing automation | related |
| Out | `/work` | Our work | case cards |
| Out | `/contact` | Get a quote | CTA |
| In | `/services, /, /rent/ai-agent, /pricing` | AI agent development | anchors |

## 9. Schema and CMS fields

- JSON-LD: `Service` (provider = Organization, areaServed = Nepal), `BreadcrumbList`, `FAQPage` (from `faqs[]`).
- CMS fields to fill: `seoTitle`, `metaDescription`, `heroHeading`, `heroSubheading`, `deliverables[]`, `process[]`, `pricingRefs` (link price items, no text), `relatedCases`, `relatedServices`, `faqs[]`, `showQuoteForm = true`.

## 10. FAQ (answer each in 40 to 80 words, plain English)

Source of questions: wording of questions Nepali agencies answer on their own pages (see `seo/competitor-benchmark.md` sources) and buyer concerns from `docs/pricing-model.md`. ESTIMATE: not checked against Google "People also ask" yet; I will refine from Search Console after launch.

1. What is an AI agent, and how is it different from a chatbot?
2. Can an AI agent work on WhatsApp or Telegram?
3. Will the AI agent give wrong answers?
4. Is my customers' data safe with an AI agent?
5. How much does an AI agent cost, and can I pay monthly?
6. Can the agent speak Nepali?

## 11. Notes for the writer

- This is our differentiator page: we have working examples. Lead with them.
- No hype words ("revolutionary", "next-gen"). Honest limits build trust: the agent hands over to a human when unsure.
- Cannibalisation: "monthly plan", "subscription" and "rent" go to `/rent/ai-agent` only; link there.
- Do not name tools or vendors until hritik confirms the stack (ADR-037 free-services rule may change choices).
