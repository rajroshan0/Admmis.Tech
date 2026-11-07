# Template spec: About (`/about`) (T-604b)

Owner: sharwan · v1.0 · 2026-11-07 · Shared rules: `service-spec.md`. Facts are pending (team size, years, clients): every number and name is `TODO(roshan)` and the sections hide when empty. No invented facts, statistics or testimonials (CLAUDE.md §8).

## 1. Section order
| # | Section | Tone | Component | Hides when empty |
|---|---|---|---|---|
| 0 | Breadcrumbs | surface | `Breadcrumbs` | no |
| 1 | Hero: who we are | alt | `hero plain`; right side: the **full badge** logo (`admmis-tech-badge.svg`, 200 px+, `aria-hidden`; decorative) | no |
| 2 | Our story and mission | bg | `rich-text` narrow, one Lead paragraph | no |
| 3 | Part of ADMMIS | surface | `Callout` (info) + link to www.admmis.org (external, `rel`) | no |
| 4 | What we believe (3 to 4 values) | bg | `feature-list` (top-rule variant) | no |
| 5 | How we work | surface | `process-steps` (same as home) | no |
| 6 | The team | bg | `TeamGrid` (**NEW**) from `teamMembers` where `showOnAbout` | **yes**, until Roshan confirms who is public |
| 7 | Numbers | surface | `StatRow` (**NEW**, 3 to 4) | **yes**, only confirmed real figures |
| 8 | Clients we work with | bg | `logo-strip` | **yes**, only `permissionConfirmed` clients |
| 9 | CTA | band | `cta-band`: "Work with us" / "Join the team" (links `/careers`) | no |

Tone follows the visible-index rule (service-spec 1). The band follows a light section.

## 2. Layout
| | 360 px | 1280 px |
|---|---|---|
| Hero | text only; badge hidden below 768 (decorative, saves bytes: `display:none` and not loaded) | 1.2fr / 0.8fr; badge right, 220 px |
| Story | one column, 65ch | heading left (4 cols), text right (8) |
| Values | compact row cards | 3 or 4 columns |
| TeamGrid | 2 columns of compact cards (photo 1:1, name, role) | 4 columns, gap 24 |
| StatRow | 2 x 2 | one row of 3 or 4, dividers 1 px `--line` |
| Logo strip | 2 columns, grayscale-free, 56 px high, `alt` = client name | one row, up to 6 |

## 3. New components (for satish)
| Name | Spec |
|---|---|
| `TeamGrid` card | Photo (1:1, `--r2`, `object-fit: cover`, 200 px max, AVIF/WebP, lazy; **no photo state:** navy tile with initials in 32/700 amber), name H3 (28 characters), role (muted, 40), optional one-line bio (100). Not a link unless `links` has one; links are icon buttons 44 px with `aria-label` |
| `StatRow` | `<dl>`: value 40/700 navy (never orange text on light), label 15 muted; value max 8 characters, label 32. Real figures only |

## 4. States
`TeamGrid` card: with photo / no photo / with links; `StatRow`: 3 or 4 items; sections 6, 7, 8 absent when no data; logo strip with 1 to 6 items (centred when fewer than 4).

## 5. Fields for neha
| Field | EN max | CMS max | Req |
|---|---|---|---|
| `heroHeading` / `heroSub` | 70 / 150 | 98 / 210 | yes |
| `storyHeading` / `story` (rich) | 60 / 900 | 84 / 1260 | yes |
| `parentHeading` / `parentText` / `parentLink` | 40 / 200 / url | 56 / 280 | yes |
| `values[]` (3 to 4): `title` / `text` | 28 / 120 | 40 / 170 | yes |
| `teamHeading` / `teamIntro` | 40 / 120 | 56 / 170 | no |
| Team | from `teamMembers`: `name` 40 (56), `role` 40 (56), `bio` 100 (140), `showOnAbout` | | |
| `stats[]` (0 to 4): `value` 8, `label` 32 | | 12 / 45 | no |
| `clients` | relation `clients`, `permissionConfirmed` only | | no |
| `ctaHeading` / `ctaText` | 40 / 120 | 56 / 170 | yes |

## 6. Accessibility and Nepali
Team photos: `alt` = "Name, role" or empty if the name is next to it (decorative); do not repeat. Logo strip: list with `alt` names. Stat values are text, not images. Nepali: names may be in Devanagari; cards use `min-height`; no truncation. Personal data: publish only with consent (content-model §3.11).

## 7. Components used
Existing: `Breadcrumbs`, `hero plain`, `rich-text`, `Callout`, `feature-list`, `process-steps`, `logo-strip`, `cta-band`. New: `TeamGrid`, `StatRow`.
