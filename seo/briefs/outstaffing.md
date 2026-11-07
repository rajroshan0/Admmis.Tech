# Page brief: Dedicated team (outstaffing)

Owner: sudip · Writer: writer · Status: ready for writer · Version: v1 · Date: 2026-11-07 · Task: T-705

Rules that always apply: `content/voice-and-tone.md`, CLAUDE.md §8 (Truth, Writing). Never invent prices, clients, results or testimonials; write `TODO(roshan): …`. Prices come from the CMS price collection (ADR-014), never typed in copy. All text is original. Structure follows `docs/reference-fittin.md` §3.4 (structure only, no FITTIN wording).

## 1. Page facts

| Field | Value |
|---|---|
| URL | `/services/outstaffing` |
| Template | `service` |
| Parent | `/services` |
| Priority | P0 (international audience) |
| Index | Y |
| Word-count target | 1,100 to 1,500 words |

## 2. Goal and audience

- **Page goal:** Show that a company in Nepal, or abroad, can add skilled people to its team through us, with clear rates and low risk, and request a call.
- **Primary conversion:** Quote or "talk to us" form with budget and role fields (`generate_lead`, `service=outstaffing`).
- **Audience:** Two groups. (1) Nepali software companies and startups that need extra developers. (2) International CTOs, founders and agencies looking at "offshore developers Nepal". Worries: quality, communication, time zone, IP protection, contracts, replacement if it does not work.
- **Search intent:** Commercial/transactional. International searchers read rates, risks and how we manage. First screen: roles, location, and how the model works.

## 3. Keywords (volumes are ESTIMATE, see `seo/keyword-map.md`)

- **Primary (one):** hire dedicated developers Nepal
- **Secondary (natural use, once or twice each):** offshore developers Nepal; outsourcing to Nepal; staff augmentation Nepal; hire Nepali developers; dedicated development team; hire QA engineers Nepal
- **Do not target here:** "rent a development team", "monthly team" (belong to `/rent/team`); "custom software" (service page).

## 4. Metadata and headings

| Element | Text | Count / limit |
|---|---|---|
| `<title>` (seoTitle) | Hire Dedicated Developers in Nepal \| ADMMIS.TECH | 48 / 60 |
| Meta description | Hire dedicated developers, designers, QA and DevOps from Nepal. Pay a clear monthly rate per person. Talk to us. | 136 / 155 |
| H1 (heroHeading) | Hire dedicated developers in Nepal for your product | 51 / 70 |
| Hero subheadline | Add senior engineers, designers and testers to your team. You direct the work; we handle hiring, tools and payroll. | 19 / 25 words |

The title and meta above are proposals. The writer may improve wording but must keep the primary keyword at the start of the title, stay within the limits, and tell me if anything changes.

## 5. Section outline

Order is fixed; each row is one CMS block.

| # | Block | H2 / H3 (working) | Purpose | Words |
|---|---|---|---|---|
| 1 | hero | H1 + subheadline + 2 CTAs | Promise and action | 30 to 50 |
| 2 | rich-text | H2: What a dedicated team means | Definition in plain words: you manage tasks, we employ and support | 100 |
| 3 | cards (5) | H2: Roles you can hire: developers (frontend, backend, mobile) · designers · QA and testers · DevOps · AI engineers | Role cards with skills; no fake headcount | 150 |
| 4 | benefits (4) | H2: Why hire through ADMMIS.TECH (monthly rate you can see, you manage the work, we handle HR and tools, replace if it does not fit) | Only what is true; terms TODO(roshan) | 120 |
| 5 | comparison table | H2: Dedicated team, project, or rent a team? | Compare outstaffing, fixed project, and `/rent/team`; helps the right visitor choose | 120 to 160 |
| 6 | steps (5) | H2: How it works (brief, shortlist, interview, start, review monthly) | Process; time to start: TODO(roshan) | 150 |
| 7 | rich-text | H2: Time zone, communication and tools | Nepal time vs Europe, UK, US, Australia overlap; tools (Slack, Jira, GitHub) | 100 to 120 |
| 8 | rich-text | H2: Security, contracts and IP | NDA, IP ownership by the client, access controls; legal wording TODO(roshan) | 100 to 120 |
| 9 | price teaser | H2: Rates | Per-person monthly rates in NPR and USD from the CMS (`hourlyRates`); link to `/pricing` | 60 to 80 |
| 10 | case-cards | H2: Teams and projects | Only if a real engagement exists | from CMS |
| 11 | faq | H2: Questions from companies hiring in Nepal | 6 questions below | 400 to 500 |
| 12 | cta-form | H2: Tell us who you need | Form: role, seniority, start date, budget | 20 |

## 6. Proof points and facts needed

- Team size and seniority mix we can place: TODO(roshan). Do not claim "100+ engineers".
- Rates are per person (see `docs/pricing-model.md` §2): shown from CMS only.
- Replacement and trial terms, minimum term, contract entity (Nepal), payment methods for foreign clients: TODO(roshan).
- Time zone fact: Nepal is UTC+5:45 (checkable, no source needed, but state it).
- Any real client engagement or reference: TODO(roshan), with permission.

## 7. CTA

- Primary: **Talk to us about your team**, button to `/contact?service=outstaffing` (the page canonicalises to `/contact`).
- Secondary: **See rates**, link to `/pricing`.
- WhatsApp click-to-chat as on other service pages.

## 8. Internal links

| Direction | Link | Anchor text | Where |
|---|---|---|---|
| Out | `/rent/team` | rent a team monthly | comparison table + cross-link |
| Out | `/pricing` | rates | price teaser |
| Out | `/services/qa-testing` | QA engineers | roles |
| Out | `/services/web-development` | web development | related |
| Out | `/services/mobile-app-development` | mobile development | related |
| Out | `/blog (article 2)` | outsourcing software development to Nepal: a buyer's guide | related reading, once the article exists |
| Out | `/contact` | Talk to us | CTA |
| In | `/services, /rent/team, blog article 2, /pricing` | hire dedicated developers | anchors |

## 9. Schema and CMS fields

- JSON-LD: `Service` (areaServed = Nepal and Worldwide), `BreadcrumbList`, `FAQPage`.
- CMS fields as other service pages, plus `deliverables[]` = roles.

## 10. FAQ (answer each in 40 to 80 words, plain English)

Source of questions: wording of questions Nepali agencies answer on their own pages (see `seo/competitor-benchmark.md` sources) and buyer concerns from `docs/pricing-model.md`. ESTIMATE: not checked against Google "People also ask" yet; I will refine from Search Console after launch.

1. How much does it cost to hire a developer in Nepal?
2. What time zone do Nepali developers work in, and how do we communicate?
3. Who owns the code and intellectual property?
4. What if a developer is not a good fit?
5. How fast can a developer start?
6. What is the difference between hiring a dedicated team and renting a team?

## 11. Notes for the writer

- International readers: short sentences, no idioms, show USD where rates appear.
- Do not write "cheap" or "low cost" as the headline benefit; say "clear monthly rate".
- Cannibalisation: `/rent/team` sells ready standard roles per person monthly; this page is the consultative team service. Keep "rent" out of the H1 and title here.
