# Page brief: Privacy policy

Owner: sudip · Writer: writer · Status: ready for writer · Version: v1 · Date: 2026-11-07
Rules that always apply: `content/voice-and-tone.md`, CLAUDE.md §8 (Truth, Writing). Never invent prices, clients, results, team names or testimonials; write `TODO(roshan): …` instead. All text is original. Field names and limits: `design/templates (no legal spec: plain `legal` template, rich text)` (EN max column wins). FAQ answers 30 to 45 words.

## 1. Page facts

| Field | Value |
|---|---|
| URL | `/privacy` |
| Template | `legal` |
| Parent | `/` |
| Priority / Index | P2 (low) / Y (low priority, in sitemap.xml) |
| Word-count target | as long as the law needs; plain words |

## 2. Goal and audience

- **Goal:** Meet legal and trust needs; no search goal.
- **Primary conversion:** None. Linked from footer, all forms (consent).
- **Audience and search intent:** Visitors and regulators checking policies. Navigational only.

## 3. Keywords (ESTIMATE volumes in `seo/keyword-map.md`)

- **Primary:** privacy policy ADMMIS.TECH
- **Secondary:** none
- **Do not target here:** Everything else; do not optimise.

## 4. Metadata and headings

| Element | Text | Count / limit |
|---|---|---|
| title (`seoTitle`) | Privacy Policy | ADMMIS.TECH | 28 / 60 |
| Meta description | How ADMMIS.TECH collects, uses and protects your personal data, how long we keep it and how to ask us to delete it. | 115 / 155 |
| H1 | Privacy policy | 14 / 70 |
| Hero sub | Last updated: TODO(date) | per spec |

## 5. Section outline (spec order; hidden sections stay empty until facts exist)

- H1 + last-updated date
- Short summary at top (3 to 5 bullets in plain words)
- Numbered H2 sections; each short; define terms
- Must cover (lead data, ADR-036): what we collect (name, email or phone, message, UTM), why, 24-month retention, who processes it, rights and how to ask (contact), Cloudflare Turnstile, analytics only after consent, no sale of data. TODO(roshan): legal entity name and contact email; Nepal law review

## 6. Proof points and facts needed

Legal facts are TODO(roshan); no copying of other sites' policies. Suggest a lawyer review before launch (Roshan's decision).

## 7. CTA and internal links

Link to `/contact` for questions.

## 8. Schema and CMS fields

`BreadcrumbList` only.

## 9. FAQ

None.

## 10. Notes for the writer

Indexing decision: keep indexable (trust signal; harmless) but low priority, no keyword work, include in sitemap.xml. Alternative if Roshan prefers: `noindex` is also acceptable for legal pages; tell me and I update sitemap rows 34 to 36. Title and H1 follow the page name.
