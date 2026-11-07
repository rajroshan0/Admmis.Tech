# Template spec: service page and services hub (T-604a)

Owner: sharwan · v1.0 · 2026-11-07 · Builds on `design/homepage/home-spec.md` (tokens, type, header, footer, sticky bar, button and card states are **unchanged**; not repeated here).
Mock: `design/templates/service.html` (service page, Web development; resize to 360 px for mobile). Copy source: `seo/briefs/*.md`, `content/pages/`. Builders: satish (components), mahendra (templates), neha (fields, section 5).

## 0. Decisions

| Topic | Decision |
|---|---|
| Prices | Public, from the CMS price collection, NPR + USD (ADR-005, ADR-014); **only admins edit them** (ADR-025). Confirmed by pm 2026-11-07: prices are public, admin-edit only. Until Roshan decides pricing (A6, due Fri 13 Nov) the fallback state shows "Request a quote" and no number. A price is never typed in copy. If a service has no price row, the facts panel and teaser show "Request a quote" and the quote button (state in 4) |
| Hero tone | Navy (`alt`), **no image** (the homepage hero is the only large image above the fold; performance). Compact: ends with the facts panel, not an arch |
| One primary CTA per screen | Hero: "Get a quote" (primary) + "Chat on WhatsApp" (secondary). Every later section has at most one primary button. Final section is the quote form |
| Tone rhythm | Hero navy, then alternating light tones (rule under 1). Form section is light with a white form card. Never two navy sections touching |
| Reuse | All sections reuse a homepage block. New parts are in section 3 and marked **NEW for satish** |
| Closing sequence | Per sitemap section 4: related cases, price teaser, cross-sell, FAQ, quote form |

## 1. Service page (`/services/{slug}`, template `service`)

Section order is fixed. Section = block (satish `components/blocks/`). Tone alternates so the page scans.

| # | Section | Tone | Block / component | Required |
|---|---|---|---|---|
| 0 | Header, **Breadcrumbs** (Home / Services / Name) | surface | `Header`, `Breadcrumbs` | yes |
| 1 | Hero | alt | `hero` variant **`plain`** (NEW variant) + `ServiceFacts` (**NEW**) | yes |
| 2 | What it is | bg | `rich-text` (`width: narrow`) | yes |
| 3 | Types we build | surface | `feature-list` variant `cards` (3 to 6) | yes |
| 4 | What you get | bg | `feature-list` (4, top-rule variant from home "Why us") | yes |
| 5 | How we do it | surface | `process-steps` (3 to 5) | yes |
| 6 | Detail (technology, SEO, tools) | bg | `rich-text` (`width: narrow`) | optional |
| 7 | Cases | surface | `case-cards` (0 to 3; section hidden when 0) | optional |
| 8 | Price | bg | `PriceTeaser` | yes (shows fallback if no row) |
| 9 | Cross-sell | surface | `rent-cards` style, 2 cards (e.g. website on rent, custom software) | optional |
| 10 | FAQ | bg | `faq` (4 to 6) | yes |
| 11 | Quote form | surface | `cta-form` **with form slot** + `LeadForm kind="quote"` | yes |
| 12 | Footer + sticky bar | alt / surface | global | yes |

Tone rule (mahendra): the hero is always `alt`. Visible sections after it alternate `bg`, `surface`, `bg`, ... by their visible index, so a missing optional section (6, 7, 9) never leaves two same-tone sections touching. The quote form is last and light, so the footer (navy) never touches another navy section.

### 1.1 Section layouts

| Section | 360 px | 768 px | 1280 px |
|---|---|---|---|
| Breadcrumbs | One line, horizontal scroll if long, 14 px, items 44 px tall hit area, `/` separators are CSS, current item `aria-current="page"` not a link | same | same, left aligned to the container |
| Hero | One column: eyebrow (service category), H1 (36/1.12), sub (Lead), 2 buttons stacked full width, then **ServiceFacts** card below | same, buttons side by side | Two columns 1.2fr / 0.8fr, gap 48, text left, ServiceFacts right, top aligned. Padding top 56, bottom 64 |
| What it is | One column, max 65ch, Lead on first paragraph | same | Heading left (4 cols), text right (8 cols) when `width: narrow` is used inside a section with H2; otherwise single column 65ch |
| Types (cards) | One column, compact row cards (icon tile 48 left; same as home services at 360) | 2 columns | 3 columns (up to 6 cards = 3 + 3; with 4 cards = 2 + 2 via 2 columns; with 5 = avoid, writer gives 4 or 6) |
| What you get | One column compact rows | 2 x 2 | 4 columns, 6 px top rule in orange, amber, green, navy |
| Steps | Vertical `<ol>`, connector line | same | Horizontal, up to 5 columns; 3 or 4 steps use equal columns |
| Detail | Single column 65ch, H3s allowed | same | same |
| Cases | `ScrollRow`, card 82% | 46% | grid, 3 columns (2 cards: 2 columns; 1 card: one card 50% width) |
| Price | One column: text, then `Price` box | same | Two columns, text left, price box right (same as home pricing teaser) |
| Cross-sell | One column, cards stacked | 2 columns | 2 columns, each card wide: icon, title, text, link |
| FAQ | Accordion, full width, summary min 56 px | same | column max 52rem, left aligned |
| Quote form | One column: H2, text, then form card | same | Two columns 5 / 7: text and 3 promises (reply time, no obligation, we use your data only to reply) left; form card right |

### 1.2 Section headers
`SectionHeader` as home (eyebrow optional, H2, intro). H2 limit 60 characters. Exactly one H1 (hero). Heading levels: H2 per section, H3 per card or step. No skipped levels.

## 2. Services hub (`/services`, template `services-hub`)

| # | Section | Tone | Block / component |
|---|---|---|---|
| 0 | Breadcrumbs | surface | `Breadcrumbs` (Home / Services) |
| 1 | Hero | alt | `hero` variant `plain`, **no facts panel**, 2 CTAs |
| 2 | Services in 3 groups: **Build** (4), **Quality** (2), **Team and marketing** (3) | bg | `services-grid` with `groups` (see below) |
| 3 | Which one do I need? | surface | **`ChoiceList`** (NEW): 5 rows, "If you need X, start with Y" |
| 4 | Price | bg | `PriceTeaser` (text only, links to `/pricing`; no number needed on the hub) |
| 5 | On rent | surface | `rent-cards` (3), same block as home |
| 6 | How a project works | bg | `process-steps` (4, same text as home) |
| 7 | Cases | surface | `case-cards` (2 to 4) |
| 8 | FAQ | bg | `faq` (4) |
| 9 | Closing CTA | band (orange) | `cta-band` (not the form: the hub routes, `/contact` has the form) |

Group layout: each group = H3 + one-line description (max 90 characters) + cards.
- 360 px: group heading, then compact row cards (one column).
- 768 px: 2 columns of vertical cards.
- 1280 px: group heading in a left column (3 cols, sticky is **not** used), cards in the right 9 cols, 2 columns of **row cards** (icon left, title, text, "Learn more" link text). 4 cards = 2 x 2, 2 cards = 1 x 2, 3 cards = 2 + 1 (the single card is allowed; no empty placeholder).
- Card = the home services card: whole card is one link on the title (stretch link), hover lift, focus ring. Add a line `from NPR ...`? **No.** The hub shows no prices (prices belong to service pages and `/pricing`).

`ChoiceList`: `<ul>`, each row is a link: left a question in plain words (max 60 characters, 16/700), right the service name with an arrow (max 24 characters). 360 px: stacked, question above, service name below, full-row link, min height 64 px. 1024 px: two columns inside the row, border-bottom 1 px `--line`. Hover: background `--bg`, arrow moves 4 px (transform). Focus ring 3 px `--focus`, offset -3 px inside the row.

## 3. New components and variants (mark for satish)

| Name | Status | Spec |
|---|---|---|
| `hero` variant `plain` | **NEW variant** | Navy, no image. Slots: eyebrow, H1, sub, 2 CTAs, optional `aside` slot. Uses the home hero text styles. Without `aside`, text max width 40rem |
| `ServiceFacts` | **NEW** | Card in the hero `aside`. `--alt-surface`, 1 px `--alt-line-strong`, `--r2`, padding 20 (24 from 1024). Title "At a glance" (H2 is not used: it is an `aside` with `aria-label`, title is a `<p>` 14/700 amber uppercase). 3 rows as a `<dl>`: **Starts from** (a `Price` in the alt colours, or "Request a quote"), **Typical time** (text, e.g. "2 to 4 weeks", TODO(roshan)), **Best for** (text). Each row: `dt` 13 px `--alt-muted`, `dd` 16/700 white, rows divided by 1 px `--alt-line-strong`. No buttons inside. Row text max 40 characters. Rows with no value are omitted (never an empty row) |
| `ChoiceList` | **NEW** | As in section 2 |
| `Callout` | **NEW** (used in rent-spec) | Box with 6 px left rule (green for info, amber for important), icon + bold title + text. Background `--surface` on bg, `--alt-surface` on navy. Never colour alone: the icon and title carry the meaning |
| `cta-form` form slot | existing block, slot used here | Form card: `--surface`, 2 px navy border, `--r2`, hard shadow 4px, padding 20 (28 from 1024). Fields in section 4 |
| `feature-list` variant `cards` | existing (variant) | Same as the services card with a title, text and optional icon; no link unless `href` is set |

Everything else is an existing block: `process-steps`, `faq`, `case-cards`, `rent-cards`, `PriceTeaser`, `Price`, `Breadcrumbs`, `RichText`, `Accordion`, `Button`, `SegmentedControl`.

## 4. States

| Part | States to build |
|---|---|
| ServiceFacts | with price / price on request / a row missing / Nepali text (wraps to 3 lines) |
| PriceTeaser | price present (NPR and USD, toggle) / **no price row**: shows "Request a quote", text "Tell us what you need and we send a clear quote", one primary button "Get a quote" / quote-only package (`quoteOnly`) shown as "Quote only" text, never as 0 |
| Cases section | 0 cases: hidden. 1 to 3: as 1.1. Cases are links; the whole card is the link |
| FAQ | closed / hover / focus / open (as home). First item open by default |
| Quote form | idle / field focus / field error (message below the field, icon + red text, `aria-describedby`, `aria-invalid`) / submitting (button disabled, label "Sending...", `aria-busy`) / success (replaces the form on the same page: Callout "We got your request" and the next step, focus moves to it; the conversion event is fired on the thank-you page, not here, see templates-and-routes §6) / server error (Callout amber: "Could not send. Please call or use WhatsApp", with those links) / **Turnstile fallback** (ADR-036): form replaced by WhatsApp and phone links |
| Breadcrumbs | default / link hover (underline) / link focus / current (no link) |
| ChoiceList row | default / hover / focus / active |

Quote form fields (short form, `kind="quote"`): **Name** (required, max 80), **Phone or email** (required, one field; the server decides which; max 120), **Service** (select, prefilled from the page; 9 options), **What do you need?** (textarea, max 1000, 4 rows, optional but encouraged), consent checkbox (required, links to privacy), Turnstile. Field heights 48 px, label above, 16 px text (prevents iOS zoom), border `--line-strong`, error colour `--danger`. Submit: primary "Send request" full width on 360. Max 4 visible inputs + checkbox. The email/phone split is neha's contract in `docs/api/leads.md`; the design needs one visible field, not two, to keep the form short.

## 5. Content fields for neha (service entry and hub)

Limits are English maximums. **CMS `maxLength` = column "CMS max"** (English x 1.4, rounded) so Nepali fits; the layout is tested at the CMS max. Required = must exist to publish.

### 5.1 `services` entry (one per service page)

| Field | Type | EN max | CMS max | Req | Notes |
|---|---|---|---|---|---|
| `title` | text | 40 | 56 | yes | Card title on hub and home, breadcrumb, nav. Card limit on home is 22; use `cardTitle` if longer |
| `cardTitle` | text | 22 | 30 | yes | Home and hub card title |
| `cardText` | text | 100 | 140 | yes | Card text (16 words) |
| `icon` | enum | n/a | n/a | yes | IconName list from component inventory |
| `group` | enum | n/a | n/a | yes | `build` / `quality` / `team-marketing` (hub grouping) |
| `order` | number | n/a | n/a | yes | Order inside group |
| `heroEyebrow` | text | 30 | 42 | no | Defaults to the group name |
| `heroHeading` (H1) | text | 70 | 98 | yes | SEO limit; layout fits 3 lines at 360 px up to 98 |
| `heroSub` | text | 150 | 210 | yes | 25 words |
| `facts.startsFromPriceRef` | relation to `pricing` | n/a | n/a | no | Missing = "Request a quote" |
| `facts.time` | text | 30 | 42 | no | |
| `facts.bestFor` | text | 40 | 56 | no | |
| `intro` | rich text | 600 | 840 | yes | Section 2 body; Lexical |
| `typesHeading` / `typesIntro` | text | 60 / 120 | 84 / 170 | yes / no | |
| `types[]` | array 3 to 6 | n/a | n/a | yes | `title` 28 (40), `text` 120 (170), `icon` optional |
| `benefitsHeading` | text | 60 | 84 | yes | |
| `benefits[]` | array 4 | n/a | n/a | yes | `title` 28 (40), `text` 120 (170), `icon` |
| `processHeading` | text | 60 | 84 | yes | |
| `steps[]` | array 3 to 5 | n/a | n/a | yes | `title` 18 (26), `text` 110 (155), `time` 20 (28, optional) |
| `detailHeading` / `detail` | text / rich text | 60 / 900 | 84 / 1260 | no | Section 6 |
| `relatedCases` | relation, max 3 | n/a | n/a | no | |
| `priceHeading` / `priceText` | text | 60 / 220 | 84 / 310 | yes | Number never typed |
| `pricingRefs` | relation, 1 to 3 `pricing` | n/a | n/a | no | Rows in the PriceTeaser |
| `crossSell[]` | array 0 to 2 | n/a | n/a | no | `title` 30 (42), `text` 110 (155), `href`, `cta` 24 (34) |
| `faqs` | relation, 4 to 6 `faqs` | n/a | n/a | yes | question 70 (98), answer 280 chars / 45 words (390 / 63) |
| `formHeading` / `formText` | text | 50 / 120 | 70 / 170 | yes | Section 11 |
| `promises[]` | array 3 | n/a | n/a | no | 50 (70) each |
| `seoTitle`, `metaDescription` | text | 60 / 155 | per SEO rule | yes | not scaled; SEO limits |

### 5.2 Hub page (`pages`, template `services-hub`)
Hub-specific fields: `heroHeading` 70 (98), `heroSub` 150 (210); `groups[]` (3): `title` 24 (34), `text` 90 (126), cards come from `services` by `group`; `choices[]` (5 to 6): `question` 60 (84), `serviceRef`; price teaser text 220 (310); steps reuse the home entries (shared global, not retyped); `faqs` 4.

## 6. Accessibility

- One H1 per page (hero). Hero `aside` has `aria-label="At a glance"`; facts are a `<dl>`.
- Breadcrumb `nav aria-label="Breadcrumb"`, `ol`, current item `aria-current="page"`; target 44 px.
- Links in rich text: navy, bold, underlined (never colour alone). Whole-card links keep a single link named by the title.
- Steps are an `ol`. Group sections on the hub use `aria-labelledby` on the group H3.
- Form: visible labels, no placeholder-only labels, error summary not needed for 4 fields but each error has `aria-describedby`; on submit failure focus moves to the first invalid field. Targets 48 px. Consent checkbox 24 px visual with a 44 px label area.
- Tone changes are never the only separator (padding plus a 1 px border between two same-tone sections).
- Focus rings per home-spec section 1.3 (`--focus` on light, `--alt-focus` on navy, `--ink` on orange).
- Reduced motion: card lift and arrow move are transforms and are disabled by the global rule.
- Contrast: only existing token pairs are used (all pass; table in home-spec 1.5). `ServiceFacts` dt on alt-surface: `--alt-muted` on `#14306B` = 9.37:1.

## 7. Nepali (Devanagari) allowance

- Test every field at the CMS max (English x 1.4). Devanagari is wider and taller: Mukta 17/1.75 body, headings 1.35 to 1.4 (home-spec section 2).
- No fixed heights anywhere; cards use `min-height` only; grids use `align-items: stretch`. H1 may take 4 lines at 360 px.
- No uppercase and no letter-spacing in `:lang(ne)` (eyebrows, badges, footer headings).
- Buttons may wrap to 2 lines at 360 px (min height stays 48, padding 12 vertical); nav labels 14 characters (EN) become 20 in Nepali, so the header collapses to the burger below 1100 px when `:lang(ne)` (satish, same rule as home).
- Breadcrumb and ChoiceList wrap; they never truncate with an ellipsis.

## 8. Components used (aligned with `docs/frontend/component-inventory.md`)

Existing: `Header`, `NavMenu`, `MobileNav`, `Footer`, `StickyActionBar`, `Breadcrumbs`, `PageHeader` (not used when hero exists), `hero`, `feature-list`, `process-steps`, `case-cards`, `ScrollRow`, `PriceTeaser`, `Price`, `SegmentedControl`, `rent-cards`, `faq`, `Accordion`, `cta-form`, `cta-band`, `LeadForm`, `Button`, `RichText`, `SectionHeader`, `Icon`.
New: `hero` variant `plain`, `ServiceFacts`, `ChoiceList`, `Callout`.

## 9. Open items

| # | Item | Owner |
|---|---|---|
| 1 | Roshan pricing decision A6 (Fri 13 Nov); fallback until then | roshan |
| 2 | Typical times per service and project process times | TODO(roshan) |
| 3 | Case images: cases show the CSS cover until Roshan supplies screenshots | roshan |
| 4 | `Callout` and `ChoiceList` are new: satish may fold `Callout` into `Card` variant if cheaper | satish |
