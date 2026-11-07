# Template spec: On rent hub and rental product pages (T-604a)

Owner: sharwan · v1.0 · 2026-11-07 · Builds on `design/homepage/home-spec.md` and `design/templates/service-spec.md` (shared rules, new components `hero plain`, `ServiceFacts`, `Callout`, `ChoiceList`, quote-form states and the tone rule live there; not repeated).
Mock: `design/templates/rent.html` (hub; resize to 360 px). Copy source: `seo/briefs/rent.md`, `rent-website.md` (and `rent-ai-agent`, `rent-team` when written). Builders: satish, mahendra, neha.

## 0. Decisions

| Topic | Decision |
|---|---|
| Prices | Public, from the CMS `pricing` collection (kind `rental`), NPR + USD toggle (ADR-005, ADR-014); only admins edit (ADR-025). Confirmed by pm 2026-11-07: prices are public, **editing** is admin-only. Until Roshan decides pricing (A6, due Fri 13 Nov) the fallback state shows "Request a quote" and no number. The templates never contain a typed number |
| Price status | Band prices and terms in `docs/pricing-model.md` are still a **proposal** (TODO(roshan)). The mock shows placeholders (`NPR 00,000`). Until approved, `rentalPlans` rows stay unpublished and the plans block renders the **"Request a quote" state** (section 4) so no unapproved number can go live |
| Rent vs buy | Always say what is different in one sentence: you pay monthly and we look after it. Table is honest (rent costs more over years; section 3.4) |
| One primary CTA | Hero: "See the three plans" (primary, scrolls to cards) + "Get a quote" (secondary). Plans block: one primary per selected band ("Apply for this plan"). Last section: form |
| Hero | Navy `plain` hero, no image. Hub has no facts panel. Product pages use `ServiceFacts` with **Starts from** (lowest published band), **Minimum term**, **Setup** (all TODO(roshan) until approved) |
| Tone | Hero navy; alternate light tones after (rule in service-spec 1). The plans section is `surface` with `--bg` plan cards so the highlighted card stands out |

## 1. Rent hub (`/rent`, template `rent-hub`)

| # | Section | Tone | Block / component |
|---|---|---|---|
| 0 | Breadcrumbs (Home / On rent) | surface | `Breadcrumbs` |
| 1 | Hero | alt | `hero` variant `plain` |
| 2 | What "on rent" means | bg | `feature-list` (3 items, check icons) |
| 3 | Choose what to rent | surface | `rent-cards` (3) |
| 4 | Rent vs buy | bg | `Table` (5 rows) |
| 5 | Plans by company size | surface | `rental-plans` (hub: all products, one product per tab) |
| 6 | Included, not included | bg | two lists (`feature-list` variant `checklist`) |
| 7 | If you stop renting | surface | `Callout` (green) + short text |
| 8 | FAQ | bg | `faq` (6) |
| 9 | Form | surface | `cta-form` with `LeadForm kind="rent"` |

Note: brief outline has `rich-text` for 2, 6, 7. Design turns them into short structured blocks because 3 lines or two short lists scan better on a phone than prose; copy volume is unchanged (80 to 120 words each). If Neha prefers to keep `rich-text`, the styles in 1.2 apply to it.

### 1.1 Layouts

| Section | 360 px | 768 px | 1280 px |
|---|---|---|---|
| Hero | As service hero without aside | same | Text max 40rem, left; right side empty on purpose (a navy hero that is pure type is faster and keeps focus on the CTA) |
| Meaning (3) | Compact rows: check icon in a green circle 40 px left, title and text | 3 columns | 3 columns, top rule colours orange, amber, green |
| Product cards (3) | One column, vertical, gap 16 | 3 columns | 3 columns, gap 24. Card: icon tile, title (H3), "for" line (muted), 3 bullet inclusions, "From NPR ..." (a `Price`, or nothing), link "See plan" as the stretch link. Cards of equal height; link pinned to the bottom |
| Rent vs buy table | **Stacked**: each row becomes a block, row label as H3-like heading, two lines "Rent: ..." and "Buy: ..." with the words (no colour-only meaning) | Real table | Real table, 3 columns (topic, On rent, Buy once), max width 56rem. Header row navy, white text; first column bold; zebra with `--bg` |
| Plans | See 1.3 | | |
| Included / not included | Two stacked panels: "Included" with check icons, "Not included" with dash icons, both with text labels | 2 columns | 2 columns equal |
| Stop renting | `Callout` full width, then text | same | Callout 4 cols left, text 8 cols right |
| FAQ | As service | | |
| Form | As service, extra field: **Company size** (select S, M, L, XL, "Not sure") and **Service to rent** (select, 3) | | Two columns 5 / 7 |

### 1.2 Table and checklist styles
- `Table`: header cell `--ink` fill, white text 14/700; body 15 px; cell padding 12 16; 1 px `--line` row dividers; no vertical lines; first column `th scope="row"`; `caption` visually shown above the table (the H2 serves) and in markup.
- Stacked (below 640 px): `thead` visually hidden, each `tr` is a card (`--surface`, 1 px `--line`, `--r`), each `td` has a `data-label` shown before it (CSS `::before` content from attribute). `th scope="row"` is the card title.
- Checklist: check icon `--green` (graphic 3.69:1) in a 28 px circle on `--bg`, text 16 px `--ink`. Not-included items: dash icon (`--muted`), text `--ink`. The words "Included" and "Not included" are the list headings, so meaning is never colour alone.

### 1.3 Plans block (`rental-plans`)
Same block on the hub (all products) and product pages (one product). Built with the inventory pattern: radio group + CSS `:has()`, no JS, all bands in the DOM, `SegmentedControl` for band and for currency.

**Structure (hub)**
1. Product selector: `SegmentedControl` (Website · AI agent · Team), `role="radiogroup"`, label "What do you want to rent?". Hidden on product pages.
2. Band selector: `SegmentedControl` S · M · L · XL, each option shows label and a one-line description ("1 to 10 staff"). 360 px: 2 x 2 grid of radio cards (min 56 px tall). 768 px up: 4 in a row.
3. Help text under the selector: "Not sure of your size? Choose the nearest and we confirm it on our first call." (writer)
4. **Plan card** for the selected band (one card shown at a time on 360 px; on 1024 px **all four bands are shown as four columns** and the selected one is highlighted with a 2 px navy border, hard shadow and an amber badge "Your size"). Card content: band name (H3), who it is for (muted, 40 characters), **Price** (`Price` with NPR/USD, "per month", 32/700), one-time setup line (muted, from CMS), 4 to 6 inclusions (check list), support hours line, primary button "Apply for this plan" (`/contact?type=rent&plan=...`, preselects the form).
5. `CurrencyToggle` (NPR / USD) above the plans, aligned right (this is the single client leaf in the inventory, #6).
6. **Team product** is priced per person, not per band: the band selector is replaced by a `Table` with rows by role (Senior engineer, Designer, QA engineer): role, "per person per month" `Price`, note. Button "Ask for a team".
7. **XL / quote-only**: card shows "Quote" instead of a price, text "Large teams need a plan made for them", button "Get a quote" (secondary style is not used; this is the card's one primary).

Highlighted price row = the selected band in the team table (navy left rule 6 px + `--bg` fill + bold). Never highlighted by colour alone: a visible "Selected" text is added for screen readers and sighted users in the badge.

## 2. Rental product page (`/rent/website`, `/rent/ai-agent`, `/rent/team`, template `rent-product`)

Same layout for the three; the content differs (fields in 5).

| # | Section | Tone | Block / component |
|---|---|---|---|
| 0 | Breadcrumbs (Home / On rent / Name) | surface | `Breadcrumbs` |
| 1 | Hero + facts | alt | `hero plain` + `ServiceFacts` (Starts from, Minimum term, Setup) |
| 2 | How it works (3 steps) | bg | `process-steps` (3) |
| 3 | What is included every month | surface | `feature-list` (6, top-rule variant) |
| 4 | Plans by company size | bg | `rental-plans` (this product only; Team uses the per-person table) |
| 5 | Examples | surface | `feature-list` variant `cards`, 3 (Website: shop, clinic or school, service business. AI agent: customer chat, data entry, marketing. Team: engineer, designer, QA). Cards are not links |
| 6 | Why rent | bg | `feature-list` (4) |
| 7 | Go live in four steps | surface | `process-steps` (4; replaces section 2 on Website only: see note) |
| 8 | Not included | bg | checklist (not-included list) |
| 9 | Your content and domain stay yours | surface | `Callout` + text |
| 10 | Cross-sell | bg | 2 cards (`rent-cards` style): custom service, marketing |
| 11 | FAQ | surface | `faq` (6) |
| 12 | Form | bg | `cta-form` with `LeadForm kind="rent"`, plan preselected from `?plan=` |

Note on 2 vs 7: the rent-website brief has both ("How website rental works" in 3 steps and "Go live in four steps"). Design keeps one process section to avoid saying the same thing twice. Sudip/writer decide which text survives; the template renders `process-steps` once at position 2 and a second instance at 7 only if the field `launchSteps` is filled.

Layout rules: as the service page for hero, steps, features, FAQ, form. The facts card rows: **Starts from** (the lowest published band price, `Price`; or "Request a quote"), **Minimum term** (text, e.g. "6 months", TODO(roshan)), **Setup** (text, e.g. "One-time fee", TODO(roshan)). On Team: **Starts from** is the lowest per-person price with the label "per person".

## 3. New components

All new parts are defined in `service-spec.md` section 3 (`hero plain`, `ServiceFacts`, `ChoiceList`, `Callout`). Rental additions:

| Name | Status | Spec |
|---|---|---|
| Band radio card | **NEW** (part of `rental-plans`, inventory has "band selector") | `label` wrapping a native radio. 56 px min height, `--surface`, 2 px `--line-strong` border, `--r`; title 16/700, sub 14 muted. Checked: 2 px navy border, `--bg` fill, check icon top right, hard shadow 3px. Focus on the radio draws the 3 px `--focus` ring on the label (`:has(:focus-visible)`). Disabled: not used |
| Plan card | **NEW** (in `rental-plans`) | `--surface`, 1 px `--line`, `--r2`, padding 24; highlighted: 2 px navy border + `--shadow-hard` + amber badge "Your size". Sections: header, price, setup line, checklist, support line, button |
| `Table` stacked variant | in inventory (stacked below 640 px) | Section 1.2 |
| Checklist variant of `feature-list` | **NEW variant** | Section 1.2 |
| `CurrencyToggle` | in inventory | Aligned right above plans; two options NPR, USD; the choice is remembered in `localStorage` (try/catch), never required |

## 4. States

| Part | States |
|---|---|
| Plans block | band selected (radio checked) / hover / focus / **price present** / **price missing**: the price area reads "Request a quote", the button reads "Get a quote" and goes to `/contact?type=rent&plan=...`; no `0` ever shown / **quote-only band** (XL) / currency NPR or USD / JS off (radio and `:has()` still work; currency toggle falls back to showing both amounts: "NPR 00,000 (USD 000)") |
| Team table | default / selected row (with "Selected" text) / row hover (background `--bg`) |
| Product cards (hub) | default / hover (lift 3 px) / focus-within (ring) / "From" price present or absent (the line is removed, the card stays the same height via flex) |
| Compare table | desktop table / stacked cards below 640 px |
| ServiceFacts | with value / "Request a quote" / row omitted |
| Form (kind rent) | as service-spec 4, plus plan preselected: shows a read-only chip "Plan: Website, size M" with a "change" link (button style link) above the fields |

## 5. Content fields for neha

Limits as in service-spec 5: English max, CMS max = English x 1.4 for Nepali. `H1` follows the SEO rule (`heroHeading`, 70).

### 5.1 Rent hub (`pages`, template `rent-hub`)

| Field | Type | EN max | CMS max | Req |
|---|---|---|---|---|
| `heroHeading` (H1) / `heroSub` | text | 70 / 150 | 98 / 210 | yes |
| `meaning[]` (3) | `title` 28 (40), `text` 110 (155), `icon` | n/a | n/a | yes |
| `productsHeading` / `productsIntro` | text | 60 / 120 | 84 / 170 | yes / no |
| `products[]` (3) | `rentalProduct` relation; hub card fields come from the product page: `cardTitle` 22 (30), `cardFor` 40 (56), `cardBullets[]` 3 x 40 (56), `icon` | | | yes |
| `compareHeading` | text | 60 | 84 | yes |
| `compareRows[]` (5) | `topic` 24 (34), `rent` 70 (98), `buy` 70 (98) | | | yes |
| `plansHeading` / `plansIntro` / `bandHelp` | text | 60 / 160 / 110 | 84 / 225 / 155 | yes / no / yes |
| `includedHeading` / `included[]` (4 to 8) | text | 40 / item 60 | 56 / 84 | yes |
| `notIncludedHeading` / `notIncluded[]` (4 to 8) | text | 40 / item 60 | 56 / 84 | yes |
| `exitHeading` / `exitCallout` / `exitText` | text | 50 / 90 / 400 | 70 / 126 / 560 | yes |
| `faqs` | relation, 6 | question 70 (98), answer 280 chars (390) | | yes |
| `formHeading` / `formText` | text | 50 / 120 | 70 / 170 | yes |

### 5.2 `rentalProduct` page (`pages`, template `rent-product`)

| Field | Type | EN max | CMS max | Req |
|---|---|---|---|---|
| `product` | enum `website` / `ai-agent` / `team` | n/a | n/a | yes |
| `heroEyebrow` / `heroHeading` / `heroSub` | text | 30 / 70 / 150 | 42 / 98 / 210 | no / yes / yes |
| `facts.minTerm` / `facts.setup` | text | 30 / 30 | 42 / 42 | no |
| (Starts from) | computed from `pricing` rows | | | n/a |
| `howHeading` / `howSteps[]` (3) | `title` 18 (26), `text` 110 (155) | | | yes |
| `includedHeading` / `included[]` (6) | `title` 28 (40), `text` 120 (170), `icon` | | | yes |
| `plansHeading` / `plansIntro` | text | 60 / 160 | 84 / 225 | yes |
| (plan data) | from `rentalPlans`: `band`, `label`, `forWho` 40 (56), `priceRef`, `setupText` 40 (56), `inclusions[]` 4 to 6 x 60 (84), `supportText` 40 (56), `quoteOnly` bool | | | yes |
| `teamRoles[]` (Team only) | `role` 28 (40), `priceRef`, `note` 60 (84) | | | yes for team |
| `examplesHeading` / `examples[]` (3) | `title` 28 (40), `text` 120 (170), `icon` | | | yes |
| `whyHeading` / `why[]` (4) | `title` 28 (40), `text` 120 (170) | | | yes |
| `launchSteps[]` (4) | optional second process | | | no |
| `notIncluded[]` | 4 to 8 x 60 (84) | | | yes |
| `exitHeading` / `exitCallout` / `exitText` | text | 50 / 90 / 400 | 70 / 126 / 560 | yes |
| `crossSell[]` (2) | `title` 30 (42), `text` 110 (155), `href`, `cta` 24 (34) | | | no |
| `faqs` (6) / `formHeading` / `formText` | as hub | | | yes |
| `seoTitle`, `metaDescription` | SEO limits (60 / 155), not scaled | | | yes |

Plan price rule for neha: `rentalPlans` rows reference a `pricing` doc. A plan with no published price renders the "price on request" state; the editor sees a warning, the page still publishes. Prices are formatted server-side (`Price` receives strings; the component never formats money).

## 6. Accessibility

- Band selector and product selector are native radio groups in a `fieldset` with `legend`; arrow keys change the selection; focus ring on the visible card; all targets at least 56 px.
- All four bands in the DOM: screen readers read every plan; the selected plan is also marked with the text "Your size" (not only a border).
- Tables: real `table`, `caption`, `th scope`; the stacked variant changes only `display`, so semantics stay and the row `th` remains the card title. Cell labels come from `data-label` via `::before`.
- Included / not included: icon + the words in the list headings; dash icons carry `aria-hidden`, the list has `aria-label="Not included"`.
- Currency toggle: radio group `aria-label="Currency"`; amount change is announced with a visually hidden `aria-live="polite"` text ("Showing prices in USD").
- `Callout` uses `role="note"`.
- Contrast: only tokens already verified (home-spec 1.5). `Price` 32/700 `--ink` on `--surface`; on navy facts card white on `#14306B` 12.61:1.

## 7. Nepali allowance

As service-spec 7, plus:
- Band card labels ("1 to 10 staff") may reach 56 characters; radio cards grow in height (min-height only).
- Table cells wrap; stacked variant needed up to 640 px, and Nepali tables switch to stacked up to **900 px** (`:lang(ne)`) because three columns of Devanagari are cramped.
- Price numbers stay Latin digits at launch (ASSUMPTION; Devanagari digits only if Roshan asks; `Intl` locale `ne-NP` decides digits, so check with satish before enabling).
- "NPR" and "USD" labels stay Latin in both languages.

## 8. Components used (aligned with `docs/frontend/component-inventory.md`)

Existing: `Header`, `Footer`, `StickyActionBar`, `Breadcrumbs`, `hero`, `feature-list`, `process-steps`, `rent-cards`, `rental-plans`, `Table`, `Price`, `SegmentedControl`, `CurrencyToggle`, `faq`, `Accordion`, `cta-form`, `LeadForm`, `Button`, `SectionHeader`, `Icon`.
New: `hero plain`, `ServiceFacts`, `Callout`, band radio card, plan card, checklist variant. (`ChoiceList` is service-only.)

## 9. Open items

| # | Item | Owner |
|---|---|---|
| 1 | Roshan pricing decision A6 (Fri 13 Nov); fallback until then | roshan |
| 2 | Band prices, setup fee, minimum term, support hours, code buyout (`docs/pricing-model.md`) | TODO(roshan) |
| 3 | Examples section for Website needs three example screens; Sharwan to design them after approval of the terms (not stock-looking, per brief) | sharwan |
| 4 | Marketing on rent exists in the pricing model but not in ADR-029 (3 products). Not designed; add a fourth card only if Roshan approves | pm |
