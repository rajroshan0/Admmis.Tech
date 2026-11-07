# Page brief: Code, UX/UI and SEO audit

Owner: sudip · Writer: writer · Status: ready for writer · Version: v1 · Date: 2026-11-07
Rules that always apply: `content/voice-and-tone.md`, CLAUDE.md §8 (Truth, Writing). Never invent prices, clients, results or testimonials; write `TODO(roshan): …` instead. Prices are never typed in copy; they come from the CMS price collection (ADR-014). All text is original (FITTIN is a structure reference only). Volumes are ESTIMATE, see `seo/keyword-map.md`. FAQ answers: 30 to 45 words (layout limit, T-708). No ranking or sales promises.

## 1. Page facts

| Field | Value |
|---|---|
| URL | `/services/audit` |
| Template | `service` |
| Parent | `/services` |
| Priority | P1 |
| Index | Y |
| Word-count target | 800 to 1,100 |

## 2. Goal and audience

- **Page goal:** Sell a fixed-scope review of a site or app (code, UX/UI, SEO, speed) that ends in a prioritised fix list.
- **Primary conversion:** Quote form (`generate_lead`, `service=audit`).
- **Audience:** Owners of a slow, old or low-traffic website; companies unhappy with a previous developer; agencies. Worries: being sold more work, jargon, cost.
- **Search intent:** Commercial. First screen: what is reviewed, what the report contains, how long it takes.

## 3. Keywords

- **Primary (one):** website audit service Nepal
- **Secondary (natural, once or twice each):** code audit; UX audit; SEO audit Nepal; website performance audit; website review service
- **Do not target here:** "software testing" (belongs to `/services/qa-testing`); "digital marketing" and SEO services (belong to `/services/digital-marketing`).

## 4. Metadata and headings

| Element | Text | Count / limit |
|---|---|---|
| `<title>` | Website Audit Service in Nepal | ADMMIS.TECH | 44 / 60 |
| Meta description | A clear review of your website or app: code, design, speed and SEO. You get a plain-language report and a prioritised fix list. Get a quote. | 140 / 155 |
| H1 | A website audit that tells you what to fix first | 48 / 70 |
| Hero subheadline | We review your code, design, speed and search basics, then give you a short, ranked list of fixes. | ≤ 25 words |

Wording may be improved if the primary keyword stays at the start of the title and limits hold; tell me what changed.

## 5. Section outline (order fixed, one CMS block each)

| # | Block | H2 / H3 (working) | Purpose | Words |
|---|---|---|---|---|
| 1 | hero | H1 + subheadline + 2 CTAs | Promise and action | 30 to 50 |
| 2 | rich-text | H2: When an audit helps | Slow site, old code, falling visits, before a redesign or launch | 100 |
| 3 | cards (4) | H2: What we review: code quality · UX/UI · SEO basics · speed and security | One card each, what is checked | 160 |
| 4 | rich-text | H2: What you receive | Report structure: summary, findings with priority, fix list, optional walkthrough call | 100 |
| 5 | steps (4) | H2: How it works: scope, review, report, walkthrough | Duration TODO(roshan) | 110 |
| 6 | benefits (3) | H2: Why an independent review: honest findings · no obligation to hire us for fixes (TODO(roshan) confirm) · plain words | Only true | 90 |
| 7 | price teaser | H2: What it costs | From CMS; link `/pricing` | 60 to 80 |
| 8 | crossSell (2) | Need fixes built? → web-development · Need ongoing search work? → digital-marketing | Route to services | 60 |
| 9 | faq | H2: Audit questions | 6 questions below | 220 to 270 |
| 10 | cta-form | H2: Send us your site | Form: URL, concern, goal | 20 |

## 6. Proof points and facts needed

TODO(roshan): sample report (redacted) or checklist we can show; tools used (name only if used); turnaround time. No claims such as "improve ranking by X%".

## 7. CTA

Primary: "Get a quote". Secondary: "See prices".

## 8. Internal links

| Direction | Link | Anchor text | Where |
|---|---|---|---|
| Up | `/services` | All our services | Breadcrumb and footer of page |
| Across | `/pricing` | See prices | Price block |
| Across | `/cases` | Work we have done | Case block (only if a real case exists) |
| Across | `/services/qa-testing` | Software testing | Differentiation line |
| Across | `/services/digital-marketing` | SEO and marketing | Cross-sell |
| Across | `/services/web-development` | Website development | Cross-sell |

## 9. Schema and CMS fields

`Service`, `BreadcrumbList`; `FAQPage` per sitemap §6 rule. CMS: `seoTitle`, `metaDescription`, `heroHeading`, `faqs[]`, price teaser reads the price collection.

## 10. FAQ (answers 30 to 45 words, answer in the first sentence)

1. What does a website audit include? (Code, UX/UI, SEO basics, speed; list.)
2. How long does an audit take? (TODO(roshan).)
3. Do I have to hire you to fix the problems? (TODO(roshan): confirm.)
4. Will an audit raise my Google ranking? (No promise; fixes help, nobody can guarantee.)
5. Can you audit an app, not only a website? (Say what is true.)
6. How much does an audit cost? (Point to price block.)

## 11. Notes for the writer

This page owns the word "audit". Other service pages must not use it as a heading. Never promise rankings or traffic.
