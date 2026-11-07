# Page brief: QA and software testing

Owner: sudip · Writer: writer · Status: ready for writer · Version: v1 · Date: 2026-11-07
Rules that always apply: `content/voice-and-tone.md`, CLAUDE.md §8 (Truth, Writing). Never invent prices, clients, results or testimonials; write `TODO(roshan): …` instead. Prices are never typed in copy; they come from the CMS price collection (ADR-014). All text is original (FITTIN is a structure reference only). Volumes are ESTIMATE, see `seo/keyword-map.md`. FAQ answers: 30 to 45 words (layout limit, T-708). No ranking or sales promises.

## 1. Page facts

| Field | Value |
|---|---|
| URL | `/services/qa-testing` |
| Template | `service` |
| Parent | `/services` |
| Priority | P1 |
| Index | Y |
| Word-count target | 800 to 1,100 |

## 2. Goal and audience

- **Page goal:** Show that independent testing finds problems before customers do, and get the visitor to request a test quote.
- **Primary conversion:** Quote form (`generate_lead`, `service=qa-testing`).
- **Audience:** Product owners, startups and agencies with an app or site that is buggy or about to launch; foreign teams looking at QA outsourcing. Worries: cost, access to code, speed, report quality.
- **Search intent:** Commercial/transactional. First screen: what we test, what the client receives (a clear bug report), and a quote action.

## 3. Keywords

- **Primary (one):** software testing services Nepal
- **Secondary (natural, once or twice each):** QA outsourcing Nepal; manual and automation testing Kathmandu; mobile app testing; website testing service
- **Do not target here:** "website audit", "code audit", "SEO audit" (belong to `/services/audit`); "hire QA engineers" (outstaffing).

## 4. Metadata and headings

| Element | Text | Count / limit |
|---|---|---|
| `<title>` | Software Testing Services in Nepal | ADMMIS.TECH | 48 / 60 |
| Meta description | Manual and automated testing for websites, apps and software, done in Nepal. Clear bug reports and fixes list. Get a quote. | 123 / 155 |
| H1 | Software testing that finds bugs before your customers do | 57 / 70 |
| Hero subheadline | We test your website or app on real phones and browsers, then send a clear list of what to fix. | ≤ 25 words |

Wording may be improved if the primary keyword stays at the start of the title and limits hold; tell me what changed.

## 5. Section outline (order fixed, one CMS block each)

| # | Block | H2 / H3 (working) | Purpose | Words |
|---|---|---|---|---|
| 1 | hero | H1 + subheadline + 2 CTAs | Promise and action | 30 to 50 |
| 2 | rich-text | H2: Why testing matters | Cost of a bug found late, in plain words; no invented statistics | 100 |
| 3 | cards (4) | H2: What we test: websites · mobile apps · APIs and back end · speed and security basics | Scope cards | 150 |
| 4 | cards (3) | H2: Types of testing: manual · automated · performance and accessibility | Explain each term in one sentence | 120 |
| 5 | steps (4) | H2: How it works: scope, test plan, test, report and retest | Process; times TODO(roshan) | 120 |
| 6 | benefits (4) | H2: What you get: a bug report in plain words · tests on real devices · retest after fixes · a pass/fail summary | Only true points | 100 |
| 7 | price teaser | H2: What it costs | From CMS; link `/pricing` | 60 to 80 |
| 8 | crossSell (2) | Built it with us? → web-development · Want a deeper review? → audit | Differentiate from audit | 60 |
| 9 | faq | H2: Testing questions | 6 questions below | 220 to 270 |
| 10 | cta-form | H2: Tell us what to test | Form: product type, link or stage, deadline | 20 |

## 6. Proof points and facts needed

TODO(roshan): tools we use (name only if used), device list, projects tested, retest policy. Rajaros (QA) may supply real checklist items; no named clients without permission.

## 7. CTA

Primary: "Get a quote". Secondary: "See prices".

## 8. Internal links

| Direction | Link | Anchor text | Where |
|---|---|---|---|
| Up | `/services` | All our services | Breadcrumb and footer of page |
| Across | `/pricing` | See prices | Price block |
| Across | `/cases` | Work we have done | Case block (only if a real case exists) |
| Across | `/services/audit` | Code, UX and SEO audit | Differentiation line |
| Across | `/services/web-development` | Website development | Cross-sell |
| Across | `/services/mobile-app-development` | Mobile app development | Cross-sell |

## 9. Schema and CMS fields

`Service`, `BreadcrumbList`; `FAQPage` per sitemap §6 rule. CMS: `seoTitle`, `metaDescription`, `heroHeading`, `faqs[]`, price teaser reads the price collection.

## 10. FAQ (answers 30 to 45 words, answer in the first sentence)

1. What is the difference between QA testing and an audit? (Testing finds bugs in how it works; audit reviews quality of code, design or SEO.)
2. How much does testing cost? (Point to price block.)
3. Do you test on real phones? (Say only the devices we have; TODO(roshan).)
4. Can you test an app you did not build? (Yes if we get access; confirm.)
5. How long does testing take? (Range TODO(roshan).)
6. Do you offer automated tests? (Say what is true.)

## 11. Notes for the writer

Do not use the word "audit" as a heading here. Keep jargon (regression, E2E) out or explain it in one line.
