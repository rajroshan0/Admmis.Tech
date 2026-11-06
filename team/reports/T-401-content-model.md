# Report — T-401 CMS content model draft
Owner: neha · Date: 2026-11-06 · Status: DONE (draft v0.1, awaiting Hritik review)

## Delivered
| File | What it is |
|---|---|
| `docs/api/content-model.md` | 18 collections, 2 globals, 19 blocks, access matrix, SEO group, template-to-data map for all 19 sitemap templates, open questions |

## Acceptance criteria
- [x] Every collection/global from architecture.md present, plus `pricing`, `pages`, `siteSettings`, `redirects`, `users`, `events`, `leadJobs`, `leadSettings` (checked against architecture list and sitemap).
- [x] Fields carry type, required, localized, notes; public text localized (re-read).
- [x] No price outside `pricing`; consumers use relations (`pricingRefs`, `priceRef`, block `prices`, `budget-guide`).
- [x] Access matrix covers all collections by role.
- [x] All 19 sitemap templates mapped (section 7).
- [x] SEO group defined; final list marked TODO(sudip).
- [x] Open questions with owners and dates.

## Decisions & assumptions made
- Single `pricing` collection (kind package/rental/hourly), per-kind validation hook, versions enabled, size bands from config file (Hritik's nits applied).
- One non-localized English slug per document, locked after publish, `redirects` auto-filled (Hritik).
- Payload REST/GraphQL for content closed to the public; frontend uses local API.
- ASSUMPTION: localized arrays inside blocks work on Postgres adapter; spike Mon 16 Nov.
- Editor cannot change prices (recommendation, TODO(pm)).

## Open issues / risks
- Size bands, prices, budget ranges not approved (Q16). Stored as data/config.
- Block list may change after wireframes.

## Handoffs
- satish: section 6 block shapes. mahendra: sections 3.14, 7, redirects, SEO group. sudip: section 4 to confirm. raj: media limits, R2.

## Needs Roshan
- Q11 contacts, public team members, price editing rights, lead retention (listed in doc).
