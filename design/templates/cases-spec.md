# Template spec: Work hub (`/work`) and case page (`/work/[slug]`) (T-604b)

Owner: sharwan · v1.0 · 2026-11-07 · Shared rules: `service-spec.md`. The sitemap uses `/work`, not `/cases` (sitemap rows 21 to 26). Works with **0 to 6 cases**; facts, client names and screenshots are pending, so every optional part has an empty state. Cover is CSS-only (home spec 3.7) until real screenshots exist.

## 1. Work hub (`cases-list`)
| # | Section | Tone | Component |
|---|---|---|---|
| 0 | Breadcrumbs | surface | `Breadcrumbs` |
| 1 | Hero | alt | `hero plain` (no CTAs) |
| 2 | Case grid | bg | `case-cards` grid; filter chips by service (**only when 5+ cases**) |
| 3 | Testimonials | surface | `testimonials` (hides when none confirmed) |
| 4 | CTA | band | `cta-band` "Tell us about your project" |

Layout: 360 px one column of cards (no ScrollRow on the hub, vertical list); 768 two columns; 1024 three. Card as home case card (cover 16:10, tags, title, one-line summary, whole card is a link). Filter chips are simple links with `aria-current`, server-rendered (`?service=`), 44 px, wrap.
Empty states: **0 cases** shows a `Callout`: "Our first case studies are coming soon." + a primary "Get a quote" button; the hub stays indexable only if sudip agrees (open item: `noindex` while empty). **1 to 2 cases**: cards left aligned at the same width as 3-column cards, no filler.

## 2. Case page (`case`)
| # | Section | Tone | Component |
|---|---|---|---|
| 0 | Breadcrumbs (Home / Our work / Title) | surface | `Breadcrumbs` |
| 1 | Hero | alt | `hero plain` with `aside` = **`CaseFacts`** (NEW): Client (or "A retail client" when `clientNameVisible` false), Industry, Services (links), Year |
| 2 | Cover image | bg | `Media` full container width, 16:9 max, `fetchpriority` only if image; CSS cover when no image |
| 3 | Challenge / Solution / Result | bg | `rich-text` narrow, three H2 sections (labels from i18n) |
| 4 | Metrics | surface | `StatRow` (from `metrics`, real figures only; hides when empty) |
| 5 | Gallery | bg | `Gallery` (**NEW**, simple): 2 columns on phone, 3 on desktop, images 4:3, click opens image in a native `<dialog>` (no library) | hides when empty |
| 6 | Testimonial | surface | `testimonial` block (only `permissionConfirmed`) |
| 7 | Related services | bg | 2 to 3 `services-grid` cards |
| 8 | Next case + CTA | band | `cta-band` "Want a result like this? Get a quote" + link "Next case" |

Layout: 360 px single column; `CaseFacts` below hero text; 1280 px hero two columns (as service). Body text 65ch; Challenge, Solution, Result get a 6 px left rule in orange, amber, green (decoration) and the words as headings.

## 3. New components
| Name | Spec |
|---|---|
| `CaseFacts` | Same card as `ServiceFacts` (service-spec 3) with 4 rows; row omitted when empty; services as links |
| `Gallery` | `<ul>` of buttons; each button 48 px minimum, `aria-label` "Open image: alt"; `<dialog>` with Close button (48 px), Esc closes, focus returns to the thumbnail, arrow buttons Previous/Next; images lazy; no autoplay |
| Filter links | list of links, `aria-current="true"` on active, "All" first |

## 4. States
Hub: 0 / 1 to 2 / 3 to 6 cases / filter active / filter with no results ("No cases for this service yet" + clear filter link). Case: client name hidden / visible; with and without metrics, gallery, testimonial; cover image vs CSS cover; `Gallery` closed / dialog open.

## 5. Fields for neha (cases collection already in content-model §3.6; limits)
| Field | EN max | CMS max |
|---|---|---|
| `title` (H1) | 70 | 98 |
| `summary` | 160 | 225 |
| `heroEyebrow` (computed from industry) | n/a | |
| `challenge`, `solution`, `result` (rich) | 700 each | 980 |
| `metrics[]` (0 to 4): `label` / `value` | 32 / 8 | 45 / 12 |
| `gallery[]` | up to 8 images, each `alt` 120 (170) | |
| `testimonial` | relation | |
| `year` (new, number, optional) | | | request to neha |
| `industry` | select | | |
| Hub: `heroHeading` / `heroSub` / `emptyText` | 60 / 140 / 90 | 84 / 195 / 126 |
All published cases show on the hub (no extra flag).

## 6. Accessibility and Nepali
Cards: one link per card named by the title. Filter links keyboard reachable, not colour-only (active has underline and `aria-current`). Dialog: `aria-labelledby`, focus trap provided by native `<dialog>`, Esc. Image alt text required in the CMS for non-decorative images. Nepali: titles may take 3 lines; cards `min-height` only.

## 7. Components used
Existing: `Breadcrumbs`, `hero plain`, `case-cards`, `testimonials`, `rich-text`, `StatRow` (new in about-spec), `services-grid`, `cta-band`, `Callout`, `Media`. New: `CaseFacts`, `Gallery`, filter links.
