# Template spec: Opening event (`/opening-event`, template `event`) (T-604b)

Owner: sharwan · v1.0 · 2026-11-07 · Shared rules: `service-spec.md`; look from home spec 3.9 (date tile, hexagon emblem). One event, flat URL, kept as archive after 1 Jan 2027. Details (venue, time, agenda, speakers) are TODO(roshan); every missing part hides.

## 1. Sections
| # | Section | Tone | Component |
|---|---|---|---|
| 0 | Breadcrumbs | surface | `Breadcrumbs` |
| 1 | Hero | alt | `hero plain` + date tile (home 3.9, orange fill, navy text, amber hard shadow; `role="img"` with full date label) and 3 fact rows (date, venue, time) |
| 2 | About the event | bg | `rich-text` narrow |
| 3 | Agenda | surface | `Agenda` (**NEW**): `<ol>` rows time + title + speaker; hides when empty |
| 4 | Speakers / team | bg | `TeamGrid` (about-spec); hides when empty |
| 5 | Location | surface | address, `Callout` with directions text; **map is a link to the map service, not an embedded iframe** (performance and privacy). Online event: join info after registration |
| 6 | Register | bg | `cta-form` + `LeadForm kind="event"`: Name, Phone or email, Number of guests (1 to 5, optional), consent. Or a link button when `registration=link`; or none |
| 7 | FAQ | surface | `faq` (3) |
| 8 | Footer | | global |

Hero primary CTA: "Register" (scroll to 6). After the event the hero shows a `Callout` "This event has taken place" (archive state) and the form is replaced by a link to `/blog` or `/work`.

## 2. Layout
360 px: stacked, date tile first (132 px), facts as rows with 24 px amber icons, buttons full width. 1024 px: three columns as home (tile, text, hexagon emblem decorative). Agenda: 360 px time above title; 768 px two columns (time 8rem). Form two columns as service-spec.

## 3. New component
`Agenda` (for satish): rows divided by 1 px `--line`; time 15/700 (tabular figures), title 16/700, speaker 14 muted; no accordion; current/past marking is not used.

## 4. States
Before event (register open) / registration closed (`registration=none`: no form, text "Registration is closed") / link registration / archive (after `endsAt`) / agenda empty / speakers empty / form states per service-spec 4.

## 5. Fields for neha (events, content-model §3.13)
| Field | EN max | CMS max |
|---|---|---|
| `title` (H1) | 60 | 84 |
| `heroSub` | 150 | 210 |
| `venue` / `address` | 60 / 120 | 84 / 170 |
| `description` (rich) | 900 | 1260 |
| `agenda[]`: `time` / `title` / speaker | 12 / 70 / relation | 17 / 98 |
| `registration` / `registrationLink` | enum / url | |
| `locationNote` (new, optional) | 160 | 225 | request to neha |
| `archiveNote` (new) | 120 | 170 | request to neha |
| `faqs` (3), `formHeading`, `formText` | as service-spec | |

## 6. Accessibility and Nepali
Dates and times use `<time datetime>`; tile has a text equivalent; hexagon is `aria-hidden`; Bikram Sambat date may be shown beside the Gregorian date later (TODO(roshan)); Nepali time labels use `Intl` with `ne-NP`. Form as contact-spec.

## 7. Components used
Existing: `Breadcrumbs`, `hero plain`, `rich-text`, `TeamGrid`, `Callout`, `cta-form`, `LeadForm`, `faq`. New: `Agenda`.
