# Page brief: Blog hub

Owner: sudip · Writer: writer · Status: ready for writer · Version: v1 · Date: 2026-11-07
Rules that always apply: `content/voice-and-tone.md`, CLAUDE.md §8 (Truth, Writing). Never invent prices, clients, results, team names or testimonials; write `TODO(roshan): …` instead. All text is original. Field names and limits: `design/templates/blog-spec.md` (EN max column wins). FAQ answers 30 to 45 words.

## 1. Page facts

| Field | Value |
|---|---|
| URL | `/blog` |
| Template | `blog-list` |
| Parent | `/` |
| Priority / Index | P2 / Y |
| Word-count target | 60 to 120 plus excerpts |

## 2. Goal and audience

- **Goal:** List articles and route readers to services; signal that the site has useful guides.
- **Primary conversion:** Click through to an article, then to the matching service.
- **Audience and search intent:** Informational readers; navigational. They want topic names and fresh posts.

## 3. Keywords (ESTIMATE volumes in `seo/keyword-map.md`)

- **Primary:** tech and marketing blog Nepal
- **Secondary:** technology blog Nepal; web and marketing guides Nepal
- **Do not target here:** The articles' own keywords (each article owns its own).

## 4. Metadata and headings

| Element | Text | Count / limit |
|---|---|---|
| title (`seoTitle`) | Tech and Marketing Blog for Nepal | ADMMIS.TECH | 47 / 60 |
| Meta description | Guides on websites, software, AI and marketing for businesses in Nepal and abroad. Prices, choices and plain advice from our team. | 130 / 155 |
| H1 | Tech and marketing guides for businesses in Nepal | 49 / 70 |
| Hero sub | Plain advice on websites, software, AI and marketing. | per spec |

## 5. Section outline (spec order; hidden sections stay empty until facts exist)

- header: `heroHeading`, `heroSub`
- featured and grid: post `title` 70, `excerpt` 200 (raise to 280 pending neha), `tags` 3 x 24; excerpts written with each article
- empty state: "Our first articles are coming soon"
- cta band: "Need help with your project?" → `/contact`

## 6. Proof points and facts needed

None needed.

## 7. CTA and internal links

Links: each article, `/services`, `/pricing`.

## 8. Schema and CMS fields

`BreadcrumbList`, `ItemList` of article URLs.

## 9. FAQ

None.

## 10. Notes for the writer

FLAG for mahendra and sharwan: blog-spec uses `/blog?page=2`; sitemap rule 8 says path pages (`/blog/page/2`) with self canonicals. No pagination at launch (3 posts), so no conflict now; settle before 10 posts. Keep title/H1 free of dates.
