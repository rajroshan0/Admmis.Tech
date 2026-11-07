# Template spec: Blog hub (`/blog`) and article (`/blog/[slug]`) (T-604b)

Owner: sharwan · v1.0 · 2026-11-07 · Shared rules: `service-spec.md`. 3 launch articles; `posts` collection (content-model §3.9). Tags only (categories are Phase 2).

## 1. Blog hub (`blog-list`)
| # | Section | Tone | Component |
|---|---|---|---|
| 0 | Breadcrumbs | surface | `Breadcrumbs` |
| 1 | Header | alt | `hero plain` compact (no CTAs) |
| 2 | Featured (newest post) | bg | `PostCard` large variant (**NEW** component, see 3) |
| 3 | Post grid | bg | `PostCard` (default), 1 / 2 / 3 columns |
| 4 | Pagination | bg | `Pagination` (**NEW**, tiny): "Previous", "Next", page links; only when more than 9 posts |
| 5 | CTA | band | `cta-band` |

Layout: 360 px one column; 768 two; 1024 three; featured card is full width on 768+ (image left 5 / text right 7), stacked on phone. Pagination is real links (`/blog?page=2`, `rel=prev/next` not needed), 44 px targets, current page `aria-current="page"`.
Empty state: 0 posts: `Callout` "Our first articles are coming soon" + CTA. 1 to 2 posts: no featured/grid split; show cards in the grid.

## 2. Article (`article`)
| # | Section | Tone | Component |
|---|---|---|---|
| 0 | Breadcrumbs (Home / Blog / Title) | surface | `Breadcrumbs` |
| 1 | Article header | bg | H1 `title`, meta line (author, date, reading time), tags |
| 2 | Cover | bg | `Media` 16:9, `fetchpriority=high` (this is the LCP candidate; max 80 KB AVIF) |
| 3 | Body | bg | `RichText` (`width: narrow`, 65ch, 18/1.7 on desktop) |
| 4 | Author box | surface | `AuthorBox` (**NEW**): photo 56 px, name, role, short bio (hides when no author photo/bio) |
| 5 | Related services | bg | 2 to 3 `services-grid` cards from `relatedServices` |
| 6 | CTA | band | `cta-band` "Need help with this? Get a quote" |

Prose styles (`RichText` inside articles): H2 28/1.2, H3 22/1.3, paragraphs 16/1.65 (17/1.75 Nepali), lists with 8 px gaps, links navy bold underlined, blockquote with 6 px amber left rule and 18/1.6 text, images `--r2` with caption 14 muted, code blocks `--ink` fill, white text, horizontal scroll (never wrap), tables stacked below 640 px. Table of contents is **not** at launch (3 short articles).

## 3. New components
| Name | Spec |
|---|---|
| `PostCard` | `--surface`, 1 px `--line`, `--r2`; cover 16:10 (CSS cover when missing), tag chip (amber, navy text, max 1 shown), title H3 (limit 90), excerpt (15 px muted, 3 lines max via CSS `line-clamp`; the full excerpt stays in DOM), meta (date, minutes). Whole card links via the title. States: default / hover (lift 3 px) / focus-within ring. Large variant: row layout from 768 |
| `AuthorBox` | `<aside aria-label="About the author">`, photo or initials tile, name as a `<p>` 16/700 (not a heading), role 14 muted, bio 15, optional link |
| `Pagination` | `<nav aria-label="Pagination">`, `ol` of links, 44 x 44 minimum, current has navy fill and `aria-current="page"`, disabled Previous/Next are plain text with `aria-disabled` |

## 4. States
Hub: 0 / 1 to 2 / 3+ posts / page 2 / no cover. Article: no author box / no related services / long code block / no cover (CSS cover, not LCP) / scheduled (not visible).

## 5. Fields for neha (posts, content-model §3.9)
| Field | EN max | CMS max |
|---|---|---|
| `title` (H1) | 70 | 98 |
| `excerpt` | 200 | 280 (content-model says 200: **request: raise to 280 for Nepali**) |
| `tags[]` | 3 x 24 | 34 |
| `cover.alt` | 120 | 170 |
| `body` | rich, no limit; images need `alt`, headings H2 and H3 only | |
| Hub: `heroHeading` / `heroSub` / `emptyText` | 60 / 140 / 90 | 84 / 195 / 126 |
| Author box | from `teamMembers`: `bio` 100 (140) | |

## 6. Accessibility and Nepali
One H1; body headings start at H2 and never skip; links in body underlined; images have alt; code blocks are focusable (`tabindex=0`, `role="region"`, `aria-label`) when they scroll; reading time computed. Nepali: line height 1.75, titles 3 to 4 lines on cards, no uppercase on tags, dates formatted with the locale (`Intl`), and reading time in words not characters.

## 7. Components used
Existing: `Breadcrumbs`, `hero plain`, `Media`, `RichText`, `services-grid`, `cta-band`, `Callout`. New: `PostCard`, `AuthorBox`, `Pagination`.
