# Template spec: Pricing (`/pricing`, template `pricing`) (T-604b)

Owner: sharwan · v1.0 · 2026-11-07 · Shared rules (tokens, tone rule, form states, a11y, Nepali, CMS max = EN x 1.4) are in `service-spec.md`; plans, tables, band selector, currency toggle in `rent-spec.md`. Brief: `seo/briefs/pricing.md`.

## 0. Decisions
| Topic | Decision |
|---|---|
| Public prices | Shown from CMS (`pricingPackages`, `rentalPlans`, `hourlyRates`), NPR + USD toggle. Only admins edit (ADR-025). No number is ever typed in copy |
| Fallback until Roshan's decision A6 (Fri 13 Nov) | Each price slot shows **"Request a quote"** with no number; the button becomes "Get a quote". The page stays complete and publishable. A page-level `Callout` ("Prices are being finalised. Tell us your goal and we send a clear quote.") shows **only** when every price on the page is missing; hidden otherwise |
| Currency | One `CurrencyToggle` at the top of the first price section (right aligned), also sticky-free; applies to the whole page (`data-currency` on the main element). Choice remembered in `localStorage` (try/catch) |
| One primary CTA | Hero: "Find your price" (scroll to band selector). Plan/package cards: one primary each. Last section: form |

## 1. Section order
| # | Section | Tone | Block / component |
|---|---|---|---|
| 0 | Breadcrumbs | surface | `Breadcrumbs` |
| 1 | Hero | alt | `hero plain`, 2 CTAs: "Find your price", "Get a quote" |
| 2 | How our prices work | bg | `feature-list` (3 items: per service, by size, shown up front) |
| 3 | Find your company size | surface | `SegmentedControl` band selector (S, M, L, XL) with descriptions; sets `data-band` for sections 4 to 5 |
| 4 | Project packages (fixed price) | bg | `pricing-table` (`kind=package`) |
| 5 | Monthly plans (on rent) | surface | `rental-plans` (all products; same block as rent-spec 1.3, band preselected from 3) |
| 6 | Team and hourly rates | bg | `Table` (`hourlyRates`: role, NPR/USD per hour) |
| 7 | Larger projects | surface | `budget-guide` (rows "label : from price") + short `rich-text` on cost drivers |
| 8 | Included, not included | bg | checklist panels (as rent hub) |
| 9 | Paying us | surface | `rich-text` narrow (payment methods; VAT/PAN TODO(roshan)) |
| 10 | FAQ | bg | `faq` (6) |
| 11 | Quote form | surface | `cta-form` + `LeadForm kind="quote"` with **Budget range** select |

## 2. Layout
| Section | 360 px | 1280 px |
|---|---|---|
| Band selector | 2 x 2 radio cards (rent-spec band card), help text below | 4 in a row |
| Packages | Stacked **package cards** (not a wide table): name (H3), "for" line, `Price`, 3 to 5 inclusions, button. Selected band changes the price shown (all bands in the DOM) | `Table` with columns Package / What you get / Price (selected band); row hover `--bg`; max width 64rem |
| Plans | As rent-spec 1.3 (one plan at a time on phone) | Four plan columns, selected highlighted |
| Hourly rates | Stacked table cards (`data-label`) | Real table, 3 columns |
| Budget guide | Two-column list: label left, "from" price right, rows 56 px; wraps | Same, max width 40rem, beside the cost-drivers text (5 / 7) |
| Form | As service-spec 1.1; extra fields: **Company size** (S to XL, "Not sure") and **Budget range** (select from `formOptions`; TODO(sudip/roshan) options) | Two columns |

New components: none. `pricing-table` and `budget-guide` exist in the inventory; the stacked package card is the card variant of `pricing-table` below 640 px (satish: render both from the same data, CSS switch).

## 3. States
| Part | States |
|---|---|
| Any price slot | published (NPR/USD) / **missing: "Request a quote"** / `quoteOnly` row: "Quote only" / currency NPR or USD / JS off: both amounts shown "NPR x (USD y)" |
| Band selector | default / hover / focus / checked (2 px navy, hard shadow, check icon) |
| Package card / table row | default / hover / focus-within; selected band does not change the card, only the price |
| Page callout | shown only when all prices are missing |
| Form | as service-spec 4 |

## 4. Fields for neha
| Field | EN max | CMS max | Req |
|---|---|---|---|
| `heroHeading` / `heroSub` | 70 / 150 | 98 / 210 | yes |
| `rules[]` (3): `title` / `text` | 28 / 120 | 40 / 170 | yes |
| `bandHeading` / `bandHelp` | 50 / 110 | 70 / 155 | yes |
| `bands[]` (4): `label` / `forWho` | 4 / 56 | n/a / 80 | yes (labels from `size-bands.ts`) |
| `packagesHeading` / `packagesIntro` | 60 / 160 | 84 / 225 | yes / no |
| `packages` | relation to `pricing` rows: `name` 28 (40), `forWho` 50 (70), `inclusions[]` 3 to 5 x 60 (84), `priceRef` (optional) | | yes |
| `plansHeading` / `plansIntro` | 60 / 160 | 84 / 225 | yes |
| `ratesHeading` / `ratesIntro` | 60 / 120 | 84 / 170 | yes |
| `rates` | `hourlyRates`: `role` 28 (40), `note` 60 (84), `priceRef` | | yes |
| `guideHeading` / `guideText` | 60 / 500 | 84 / 700 | yes |
| `guideRows[]` | `label` 40 (56), `priceRef` | | yes |
| `notIncluded[]` | 4 to 8 x 60 | 84 | yes |
| `payHeading` / `payText` | 50 / 400 | 70 / 560 | yes |
| `fallbackNotice` | text | 140 | 196 | yes |
| `faqs` (6), `formHeading` / `formText` | as service-spec | | yes |

## 5. Accessibility and Nepali
As service-spec 6 and 7, rent-spec 6 and 7. Price amounts are never the only way to tell packages apart (names and inclusions are text). Tables get `caption`, `th scope`. The currency toggle announces changes with a polite live region.

## 6. Components used
Existing: `Breadcrumbs`, `hero plain` (new in T-604a), `feature-list`, `SegmentedControl`, `CurrencyToggle`, `pricing-table`, `rental-plans`, `Table`, `Price`, `budget-guide`, `Callout` (new in T-604a), `faq`, `cta-form`, `LeadForm`.
