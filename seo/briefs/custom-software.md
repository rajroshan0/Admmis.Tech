# Page brief: Custom software and SaaS

Owner: sudip · Writer: writer · Status: ready for writer · Version: v1 · Date: 2026-11-07
Rules that always apply: `content/voice-and-tone.md`, CLAUDE.md §8 (Truth, Writing). Never invent prices, clients, results or testimonials; write `TODO(roshan): …` instead. Prices are never typed in copy; they come from the CMS price collection (ADR-014). All text is original (FITTIN is a structure reference only). Volumes are ESTIMATE, see `seo/keyword-map.md`. FAQ answers: 30 to 45 words (layout limit, T-708). No ranking or sales promises.

## 1. Page facts

| Field | Value |
|---|---|
| URL | `/services/custom-software` |
| Template | `service` |
| Parent | `/services` |
| Priority | P1 |
| Index | Y |
| Word-count target | 900 to 1,200 |

## 2. Goal and audience

- **Page goal:** Help a business owner or startup founder see when a website is not enough and software built for their process is, and ask for a quote.
- **Primary conversion:** Quote form (`generate_lead`, `service=custom-software`).
- **Audience:** Nepali business owners with manual or spreadsheet work, startup founders with a product idea, and some international buyers. They worry about cost, scope creep, who owns the code, and whether it is maintained after launch.
- **Search intent:** Commercial/transactional. First screen: what we build (internal tools, SaaS, portals, integrations), who it is for, and a quote action.

## 3. Keywords

- **Primary (one):** custom software development Nepal
- **Secondary (natural, once or twice each):** SaaS development Nepal; business software Nepal; ERP or CRM development Nepal; software development company Kathmandu
- **Do not target here:** "web development" and "online shop" (belong to `/services/web-development`); "hire developers" (outstaffing).

## 4. Metadata and headings

| Element | Text | Count / limit |
|---|---|---|
| `<title>` | Custom Software Development in Nepal | ADMMIS.TECH | 50 / 60 |
| Meta description | Custom software and SaaS built in Nepal around how your business works: tools, portals, CRM and integrations. Clear plan and price. Get a quote. | 144 / 155 |
| H1 | Custom software built around how your business works | 52 / 70 |
| Hero subheadline | Replace spreadsheets and manual steps with software made for your team. We plan, build, test and support it. | ≤ 25 words |

Wording may be improved if the primary keyword stays at the start of the title and limits hold; tell me what changed.

## 5. Section outline (order fixed, one CMS block each)

| # | Block | H2 / H3 (working) | Purpose | Words |
|---|---|---|---|---|
| 1 | hero | H1 + subheadline + 2 CTAs | Promise and action | 30 to 50 |
| 2 | rich-text | H2: When you need custom software | Plain test: repeated manual work, tools that do not talk, a product idea. Say when a website or off-the-shelf tool is enough (honest, builds trust) | 100 to 120 |
| 3 | cards (4) | H2: What we build: internal tools and dashboards · SaaS products · customer portals · integrations and automation | Concrete examples, no fake clients | 150 |
| 4 | benefits (4) | H2: Why build with us: one team from plan to support · you own the code and data (TODO(roshan) confirm) · clear scope and price · help after launch | Only true points | 120 |
| 5 | steps (5) | H2: How it works: discover, scope, design, build in short cycles, launch and support | Process; time ranges TODO(roshan) | 150 |
| 6 | rich-text | H2: Technology we use | Stack in plain words (Next.js, PostgreSQL, TypeScript per ADR-003); explain one term each | 80 to 100 |
| 7 | price teaser | H2: What it costs | Pricing model from CMS (fixed scope or monthly); link to `/pricing` | 60 to 80 |
| 8 | case-cards | H2: Software we have built | Only real cases | CMS |
| 9 | crossSell (2) | Need a website only? → web-development · Want a team to run it? → outstaffing / `/rent/team` | Route wrong-fit visitors | 60 |
| 10 | faq | H2: Questions about custom software | 6 questions below | 220 to 270 |
| 11 | cta-form | H2: Tell us what you want to build | Form: need, budget range, timeline | 20 |

## 6. Proof points and facts needed

TODO(roshan): systems we have shipped; code and data ownership; support terms; typical timeline; any named client (needs permission). Do not claim any until confirmed.

## 7. CTA

Primary: "Get a quote" (form) in hero and end. Secondary: "See prices" → `/pricing`.

## 8. Internal links

| Direction | Link | Anchor text | Where |
|---|---|---|---|
| Up | `/services` | All our services | Breadcrumb and footer of page |
| Across | `/pricing` | See prices | Price block |
| Across | `/cases` | Work we have done | Case block (only if a real case exists) |
| Across | `/services/web-development` | Website development | Cross-sell |
| Across | `/services/outstaffing` | Hire a dedicated team | Cross-sell |
| Across | `/services/ai-agents` | AI agents for your software | Intro or crossSell |

## 9. Schema and CMS fields

`Service`, `BreadcrumbList`; `FAQPage` per sitemap §6 rule. CMS: `seoTitle`, `metaDescription`, `heroHeading`, `faqs[]`, price teaser reads the price collection.

## 10. FAQ (answers 30 to 45 words, answer in the first sentence)

1. What is custom software? (Software made for your process, unlike a ready tool you adapt to.)
2. How much does custom software cost in Nepal? (Depends on scope; point to the price block, do not type numbers.)
3. How long does it take? (Range by size; TODO(roshan).)
4. Who owns the code? (TODO(roshan): confirm.)
5. Can you connect it to our existing tools? (Integrations: say what is true.)
6. Do you support it after launch? (Support terms TODO(roshan).)

## 11. Notes for the writer

Cannibalisation: keep "website" wording to one line pointing to web-development. Explain SaaS in one plain sentence (Nepali SMEs may not know it). No tool or framework lists that read like a CV.
