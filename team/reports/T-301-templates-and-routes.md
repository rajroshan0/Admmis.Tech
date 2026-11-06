# Report — T-301 Template & route map
Owner: mahendra · Date: 2026-11-06 · Status: DONE (pending Hritik's final verdict on the docs)

## Delivered
| File | What it is |
|---|---|
| `docs/frontend/templates-and-routes.md` | Route files, 19-template registry, 40-row URL map, data-layer needs, form behaviour, rendering/ISR rules, SEO output, tests, open questions |

## Acceptance criteria
- [x] All 40 sitemap rows present or explicitly grouped (checked by listing row numbers in §4: 1–8, 9–17, 18–20, 21–26, 27–30, 31–33, 34–36, 37–40).
- [x] All 19 template names in the registry table (scripted grep: none missing).
- [x] Each template has data source, JSON-LD type, index rule; ISR tags and heading rules in §7 and §9.
- [x] Neha's form questions answered (§6) and sent to her inbox.
- [x] No hard-coded user-facing string or price in the design (grep for `NPR <digits>` and `$`: none).
- [x] Open questions listed with owner and date (§13).

## Decisions & assumptions made
- Routes: `[locale]/page.tsx`, one `[...slug]` catch-all for `pages`, four collection routes, `opening-event`, separate `(preview)` group for drafts (because `(site)` may not call `draftMode()`; Hritik's static-route CI check).
- 19 template names kept; 9 compositions in code. No merge asked from Sudip.
- Conversion event on the thank-you page, once per `leadId`; idempotency key in `sessionStorage` per formKind (Hritik's changes D).
- `resolveBlocks()` is mine (Hritik B). Redirects use 308 (Hritik C).
- ASSUMPTION: `pages.slug` holds `contact/thank-you` and `rent/website`.
- ASSUMPTION: Turnstile is strictly necessary and loads on form focus (Sudip/Roshan to confirm).
- Not verified (no scaffold yet): Next 16 cache API names, routing file name, global not-found with two root layouts. Marked "verify at scaffold".
- Process note: Hritik approved the plans (with changes A–F, all applied). PM's OK did not arrive before I wrote the docs; I proceeded because the work is docs-only and reversible. PM can ask for changes.

## Open issues / risks
- `h1` rule for collection pages (`title` vs `heroHeading`): Sudip/Neha.
- Block `data` prop types depend on Satish; JSON-LD per template depends on Sudip's spec.
- FAQ rich-result policy of Google needs checking by Sudip (I did not verify it).

## Handoffs
- → neha: data-layer list, `translatedLocales`, leads.md §13.1/§13.6 edits, preview route protection.
- → satish: block `data`/`headingLevel`, currency toggle, `LeadForm` in `cta-form`.
- → sudip: robots thank-you line, H1 rule, JSON-LD table, event name, rule 5 wording.
- → rajaros: test list §12.
- → hritik: review of the docs; CI treatment of the preview group.

## Needs Roshan
- none (Turnstile consent stance goes through PM/Sudip)
