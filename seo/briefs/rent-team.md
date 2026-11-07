# Page brief: Team on rent

Owner: sudip · Writer: writer · Status: ready for writer · Version: v1 · Date: 2026-11-07
Rules that always apply: `content/voice-and-tone.md`, CLAUDE.md §8 (Truth, Writing). Never invent prices, clients, results or testimonials; write `TODO(roshan): …` instead. Prices are never typed in copy; they come from the CMS price collection (ADR-014). All text is original (FITTIN is a structure reference only). Volumes are ESTIMATE, see `seo/keyword-map.md`. FAQ answers: 30 to 45 words (layout limit, T-708). No ranking or sales promises.

## 1. Page facts

| Field | Value |
|---|---|
| URL | `/rent/team` |
| Template | `rent-product` |
| Parent | `/rent` |
| Priority | P1 |
| Index | Y |
| Word-count target | 700 to 900 |

## 2. Goal and audience

- **Page goal:** Let a company get a monthly dedicated developer or team with a visible price and flexible terms, and request a call.
- **Primary conversion:** Plan enquiry form (`generate_lead`, `service=rent-team`); `view_pricing` on plan table.
- **Audience:** Nepali startups and agencies, and international founders and CTOs, who want predictable monthly capacity without hiring. Worries: quality, replacement, IP, communication, minimum term.
- **Search intent:** Commercial/transactional. First screen: roles, monthly rate model, how to start.

## 3. Keywords

- **Primary (one):** rent a development team Nepal
- **Secondary (natural, once or twice each):** monthly developer rental; remote team subscription; hire a team monthly Nepal; monthly dedicated developer
- **Do not target here:** "hire dedicated developers Nepal", "offshore developers", "staff augmentation" (belong to `/services/outstaffing`).

## 4. Metadata and headings

| Element | Text | Count / limit |
|---|---|---|
| `<title>` | Rent a Development Team in Nepal | ADMMIS.TECH | 46 / 60 |
| Meta description | Rent developers, designers or QA from Nepal on a monthly plan. See the monthly rate per role and start with a short call. | 121 / 155 |
| H1 | Rent a development team in Nepal, month by month | 48 / 70 |
| Hero subheadline | Choose the roles you need and pay a clear monthly rate. Scale up or down with notice. | ≤ 25 words |

Wording may be improved if the primary keyword stays at the start of the title and limits hold; tell me what changed.

## 5. Section outline (order fixed, one CMS block each)

| # | Block | H2 / H3 (working) | Purpose | Words |
|---|---|---|---|---|
| 1 | hero | H1 + subheadline + 2 CTAs | Promise, price pointer, action | 30 to 50 |
| 2 | rich-text | H2: How renting a team works | Monthly plan vs a fixed project; who manages whom | 100 |
| 3 | plans (CMS) | H2: Plans and monthly rates | Plan cards from `rentalPlans`; prices never typed | from CMS |
| 4 | cards (4) | H2: Roles you can rent: developers · designers · QA and DevOps · AI engineers | Skills per card; no invented headcount | 140 |
| 5 | benefits (4) | H2: Why rent: predictable monthly cost · start fast (TODO(roshan) time) · change roles with notice · we handle HR and tools | Only true | 110 |
| 6 | comparison | H2: Rent a team or hire dedicated developers? | Compare with `/services/outstaffing` (longer commitment, custom terms) to separate intents | 100 |
| 7 | steps (4) | H2: How a plan starts: brief, shortlist, interview, start | Process | 100 |
| 8 | faq | H2: Questions about renting a team | 6 questions below | 220 to 270 |
| 9 | cta-form | H2: Tell us who you need | Form: roles, start date, months | 20 |

## 6. Proof points and facts needed

TODO(roshan): plan structure, monthly rates (CMS only), minimum term, notice period, replacement policy, time overlap with Europe/US/Australia (true hours only), NDA and IP terms.

## 7. CTA

Primary: "Choose a plan" / "Request a team". Secondary: "Talk to us".

## 8. Internal links

| Direction | Link | Anchor text | Where |
|---|---|---|---|
| Up | `/rent` | All monthly plans | Breadcrumb |
| Across | `/services/outstaffing` | Dedicated team for longer projects | Comparison and crossSell |
| Across | `/pricing` | See all prices | Plan block |
| Across | `/rent/website` | Website on rent | Cross-sell |
| Across | `/blog/…` | Outsourcing to Nepal guide | Only if the article exists |

## 9. Schema and CMS fields

`Service` with one `Offer` per plan, `BreadcrumbList`, `FAQPage` per sitemap §6. `price` and `priceCurrency` read from the CMS `rentalPlans` collection; plans priced by quote omit `price`. CMS: `seoTitle`, `metaDescription`, `heroHeading`, `plans[]`, `faqs[]`.

## 10. FAQ (answers 30 to 45 words, answer in the first sentence)

1. How does renting a team work? (Monthly plan, you direct tasks.)
2. How much does it cost per month? (Point to plans; no typed numbers.)
3. Can I change the team size? (Notice terms TODO(roshan).)
4. What if a person is not a good fit? (Replacement policy TODO(roshan).)
5. Which time zones do you cover? (Overlap hours only; true statement.)
6. Who owns the code and work? (TODO(roshan): client owns, confirm.)

## 11. Notes for the writer

Cannibalisation: this page is the monthly subscription; outstaffing is the longer dedicated model. Keep the two intros different. Do not state "in your time zone" unless confirmed; say overlap hours.
