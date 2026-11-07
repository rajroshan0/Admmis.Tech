# Page brief: <page name>

Owner: sudip · Writer: writer · Status: draft | ready for writer | in copy | done · Version: vX · Date: YYYY-MM-DD
Rules that always apply: `content/voice-and-tone.md`, CLAUDE.md §8 (Truth, Writing). Never invent prices, clients, results or testimonials; write `TODO(roshan): …` instead. Prices are never typed in copy; they come from the CMS price collection (ADR-014). All text is original (FITTIN is a structure reference only).

## 1. Page facts

| Field | Value |
|---|---|
| URL | `/…` (locale-free; NE later under `/ne/`) |
| Template | name from `seo/sitemap.md` |
| Parent | |
| Priority | P0 / P1 / P2 |
| Index | Y / N |
| Word-count target | range for body text, excluding nav, footer, forms |

## 2. Goal and audience

- **Page goal (one sentence):** what the reader should do or understand.
- **Primary conversion:** the one action (quote form, WhatsApp, view pricing…).
- **Audience:** who reads this, what they already know, what worries them.
- **Search intent:** informational / commercial investigation / transactional, and what the searcher wants to see in the first screen.

## 3. Keywords (volumes are ESTIMATE, see `seo/keyword-map.md`)

- **Primary (one):** …
- **Secondary (use naturally, once or twice each, in H2/H3 or body):** …
- **Do not target on this page (belongs to another page):** …

## 4. Metadata and headings

| Element | Text | Limit |
|---|---|---|
| `<title>` (seoTitle) | | ≤ 60 chars, starts with primary keyword, ends with the brand suffix (space, pipe, ADMMIS.TECH) |
| Meta description | | ≤ 155 chars, one benefit and one action |
| H1 (heroHeading) | | ≤ 70 chars, contains the primary keyword in natural wording, differs from the title |
| Hero subheadline | | ≤ 25 words |

## 5. Section outline

Order is fixed; each row is one block in the CMS. Writer supplies H2/H3 text and body within the word budget.

| # | Block | H2 / H3 (working) | Purpose | Words |
|---|---|---|---|---|

## 6. Proof points and facts needed

What the writer needs and where it comes from. Unknown facts are `TODO(roshan)`.

## 7. CTA

- Primary CTA label, destination, where it appears.
- Secondary CTA.

## 8. Internal links

| Direction | Link | Anchor text (descriptive) | Where |
|---|---|---|---|

## 9. Schema and CMS fields

JSON-LD types (see `seo/sitemap.md` §6) and the CMS fields the copy fills (`seoTitle`, `metaDescription`, `heroHeading`, `faqs[]`, …).

## 10. FAQ (people ask this; answer in 40–80 words each)

## 11. Notes for the writer

Tone, traps, terms to explain, claims to avoid, cannibalisation warnings.
