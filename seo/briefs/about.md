# Page brief: About

Owner: sudip · Writer: writer · Status: ready for writer · Version: v1 · Date: 2026-11-07
Rules that always apply: `content/voice-and-tone.md`, CLAUDE.md §8 (Truth, Writing). Never invent prices, clients, results, team names or testimonials; write `TODO(roshan): …` instead. All text is original. Field names and limits: `design/templates/about-spec.md` (EN max column wins). FAQ answers 30 to 45 words.

## 1. Page facts

| Field | Value |
|---|---|
| URL | `/about` |
| Template | `about` |
| Parent | `/` |
| Priority / Index | P2 / Y |
| Word-count target | 450 to 650 |

## 2. Goal and audience

- **Goal:** Say who ADMMIS.TECH is, that it is part of ADMMIS, and why a buyer can trust it; lead to the quote form.
- **Primary conversion:** "Work with us" (quote form) and "Join the team" (`/careers`).
- **Audience and search intent:** Buyers checking the company before contacting (Nepali owners, international CTOs), candidates. Branded/navigational intent; they look for who is behind it and where.

## 3. Keywords (ESTIMATE volumes in `seo/keyword-map.md`)

- **Primary:** about ADMMIS.TECH
- **Secondary:** technology agency Kathmandu; ADMMIS Nepal; software and marketing agency Nepal
- **Do not target here:** Service keywords (they belong to service pages).

## 4. Metadata and headings

| Element | Text | Count / limit |
|---|---|---|
| title (`seoTitle`) | About ADMMIS.TECH | Technology Agency in Nepal | 46 / 60 |
| Meta description | ADMMIS.TECH is the technology and marketing team of ADMMIS in Nepal. Meet who we are, how we work and what we believe. Work with us. | 132 / 155 |
| H1 | About ADMMIS.TECH: a technology team built in Nepal | 51 / 70 |
| Hero sub | We build websites, apps and AI, and run marketing, for businesses in Nepal and abroad. | per spec |

## 5. Section outline (spec order; hidden sections stay empty until facts exist)

- hero: `heroHeading`, `heroSub` (badge logo is decorative)
- story: `storyHeading` (60), `story` (900 chars), one Lead paragraph; what we do, why Nepal, what we promise. No founding year or size unless confirmed
- parent: `parentHeading`, `parentText` (200), `parentLink` www.admmis.org; explain ADMMIS in one line
- values: 3 to 4 x `title` 28 / `text` 120 (e.g. clear prices, plain words, you own your work; only if true)
- how we work: reuse the home steps, no new copy
- team, numbers, clients: leave empty (hidden) until Roshan confirms
- cta: `ctaHeading` 40, `ctaText` 120

## 6. Proof points and facts needed

TODO(roshan): who may be named publicly, year and place founded, team size, any real figure, client logos with permission, relationship to ADMMIS (legal name).

## 7. CTA and internal links

Primary `/contact`; secondary `/careers`. Links: `/services`, `/work`, `/rent`, www.admmis.org (external).

## 8. Schema and CMS fields

`Organization` (about; one `@id` sitewide), `BreadcrumbList`. Fields as spec section 5.

## 9. FAQ

None (spec has no FAQ block).

## 10. Notes for the writer

Ownership of the brand name search: keep "ADMMIS.TECH" and "ADMMIS" spelling exactly. No superlatives ("best", "leading"). Keep the Nepal angle factual.
