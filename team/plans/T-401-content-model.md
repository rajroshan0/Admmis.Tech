# Plan — T-401 CMS content model draft
Owner: neha · Date: 2026-11-06 · Due: Thu 12 Nov · Reviewer: hritik

## 1. Goal (in my own words)
One document, `docs/api/content-model.md`, that defines every Payload collection, global and block: fields, types, required, localized, relations, access rules, and which page template or block reads it. Frontend (Satish blocks, Mahendra templates) can build against it and I can implement it in week 2 without guessing. It must let editors run the whole site and enforce ADR-014 (one price source) and ADR-004 (all public text localized).

## 2. Inputs I read
CLAUDE.md, ADR-004/005/006/007/013/014/018/019, `docs/architecture.md`, `docs/standards.md` (v0.1), `docs/pricing-model.md`, `seo/sitemap.md` (19 templates), `design/brand-directions/README.md`, inbox from pm and hritik. Still to read while drafting: `seo/keyword-map.md` (SEO fields).

## 3. Approach
- Start from the architecture list and refine. Per collection: field table (name, type, required, localized, notes/help text), relations, access, hooks (revalidate, slug, price validation), used-by.
- **Pricing (ADR-014):** one collection `prices` is the single source. `pricingPackages`, `rentalPlans`, `hourlyRates` from the architecture list become `kind` variants of it (or three collections sharing one `priceSchema` field group). RECOMMENDATION: one collection `pricing` (matches Hritik's standards: "the `pricing` collection") with `kind` = package | rental | hourly, `amounts[]` of {currency NPR|USD, minorUnits int}, `sizeBand` S|M|L|XL for rental, `unit` (one-time | month | hour | person-month). Blocks and pages reference by relation; no price number in any other collection or block. Hritik to confirm single vs three collections.
- **Localization:** every public text field `localized: true`; slugs: sitemap says English slugs on all locales, so ONE non-localized slug per document (ASSUMPTION, conflicts with role-file "slugs per locale"; flagged as question to hritik/sudip).
- **Blocks:** Hero, ServicesGrid, CaseCards, PricingTable, RentalPlans, Testimonials, FAQ, CtaForm, LogoStrip, RichText, Video, plus Steps/Features as needed by sitemap templates. Each block has a documented data shape that Satish maps to a component; page-per-template collections (services, cases, posts, jobs) get a fixed layout plus an optional `blocks` tail.
- **Multi-brand (ADR-013):** brand differences live in env/`brands/` and `siteSettings`; no per-brand data in a shared DB (separate DB per deployment, standards §5). Content model has no brand field.
- **Access:** roles admin / editor / sales. Deny by default. Leads: read/update sales+admin only; editors no access; no public create via Payload REST (create only through `/api/leads` using local API). Draft/publish via `versions.drafts` on content collections; live preview URLs; `afterChange` revalidation hook calling a tag-based revalidate in `lib/server`.
- **Media:** R2 storage, required alt (localized) unless `decorative`, upload limits (type allowlist, size cap), focal point.
- **SEO group** on every public document: metaTitle, metaDescription, ogImage, canonicalOverride, noindex, JSON-LD hints (fields per Sudip's spec).
- Alternatives rejected: separate price collections with copied numbers (violates ADR-014); localized slugs (conflicts with sitemap rule 3).

## 4. Steps
1. Read keyword-map for SEO fields. 2. Draft overview + conventions (localization, SEO group, drafts, ids, money). 3. Collections one by one. 4. Globals (siteSettings, navigation/footer). 5. Blocks with data shapes. 6. Access matrix table. 7. Template-to-data map covering all 19 sitemap templates. 8. Editor-experience notes (help text, previews, revalidation). 9. Open questions. 10. Self-check against sitemap and ADRs; send to Hritik for review; handoff notes to Satish, Mahendra, Sudip, Raj.

## 5. Deliverables
| File | Content |
|---|---|
| `docs/api/content-model.md` | Full content model draft v0.1 |
| `team/reports/T-401-content-model.md` | Completion report |

## 6. Acceptance criteria (testable)
- [ ] Every collection/global in architecture.md present, plus `pricing`, `pages`, `siteSettings`, `redirects`, `users`, `forms/lead options` if needed.
- [ ] Each field: type, required, localized, help text; each public text field localized.
- [ ] No price value stored outside `pricing`; every consumer references it by relation.
- [ ] Access matrix covers every collection x role (admin/editor/sales/public) x action.
- [ ] All 19 sitemap templates map to collections/blocks.
- [ ] SEO group defined and aligned with keyword-map.
- [ ] Open questions listed with owner and date.

## 7. Assumptions · Risks · Questions
- ASSUMPTION: one non-localized slug per document, English, same across locales (sitemap rule 3).
- ASSUMPTION: single `pricing` collection with `kind` (to confirm with Hritik; ADR-014 says "one CMS collection").
- ASSUMPTION: Nepal-only fields (phone formats, size bands) are config not code.
- RISK: Payload postgres adapter limits on deeply nested blocks and localized arrays → keep blocks shallow; test in week 2 spike.
- RISK: size bands/prices not approved until Gate 1 (Q16) → bands are enum values editable in one config, amounts are data.
- QUESTION (hritik): single `pricing` collection OK? Localized vs shared slug OK?
- QUESTION (sudip): SEO field list final? Structured-data fields per template?

## 8. Estimate
~1.5 working days. Could grow if blocks list expands after Sharwan's wireframes.
