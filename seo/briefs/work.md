# Page brief: Our work (case list)

Owner: sudip · Writer: writer · Status: ready for writer · Version: v1 · Date: 2026-11-07
Rules that always apply: `content/voice-and-tone.md`, CLAUDE.md §8 (Truth, Writing). Never invent prices, clients, results, team names or testimonials; write `TODO(roshan): …` instead. All text is original. Field names and limits: `design/templates/cases-spec.md` (EN max column wins). FAQ answers 30 to 45 words.

## 1. Page facts

| Field | Value |
|---|---|
| URL | `/work` |
| Template | `cases-list` |
| Parent | `/` |
| Priority / Index | P1 / Y |
| Word-count target | 120 to 200 plus case cards |

## 2. Goal and audience

- **Goal:** Show proof of work and route to case pages and to the quote form.
- **Primary conversion:** "Tell us about your project" (`/contact`).
- **Audience and search intent:** Buyers comparing agencies; commercial investigation. They want real, specific projects.

## 3. Keywords (ESTIMATE volumes in `seo/keyword-map.md`)

- **Primary:** software projects portfolio Nepal
- **Secondary:** web development portfolio Nepal; our work; case studies Nepal software
- **Do not target here:** Service keywords; individual case keywords.

## 4. Metadata and headings

| Element | Text | Count / limit |
|---|---|---|
| title (`seoTitle`) | Software Projects Portfolio in Nepal | ADMMIS.TECH | 50 / 60 |
| Meta description | See websites, apps and software we have built for businesses in Nepal and abroad, with the problem, the solution and the result. | 128 / 155 |
| H1 | Our work: software projects built in Nepal | 42 / 70 |
| Hero sub | Real projects, what we did and what changed. | per spec |

## 5. Section outline (spec order; hidden sections stay empty until facts exist)

- hero: `heroHeading`, `heroSub`, no CTAs
- case grid: from `cases` (titles and summaries are written per case, see case briefs); filter chips appear only with 5+ cases
- testimonials: only `permissionConfirmed`, otherwise hidden
- cta: heading "Tell us about your project" + text

## 6. Proof points and facts needed

TODO(roshan): which projects can be shown and with what permission (client name visible or not), real results. Until 1 case is approved show an honest empty state: "Our first case studies are coming soon" and the CTA. Do not invent cases.

## 7. CTA and internal links

Primary `/contact`. Links: every case, `/services`.

## 8. Schema and CMS fields

`BreadcrumbList`, `ItemList` of case URLs (only when cases exist).

## 9. FAQ

None.

## 10. Notes for the writer

If zero cases at launch, set the page to noindex and drop it from sitemap.xml until at least 2 cases exist (decision for mahendra). Case briefs are written when cases are chosen.
