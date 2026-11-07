# T-110 Review: service and rent routes (T-307, mahendra)
Reviewer: hritik · 2026-11-07 · Verdict: **APPROVED WITH NITS** (must-fix 1 before any public deploy; fine to commit)
Read the routes, views, `page-metadata.ts`, `_templates/`. Did not re-run build or tests (mahendra reports 48/48, static, 143.7 KB).

## Passes
Static: `dynamicParams=false`, `generateStaticParams`, EN only, `/ne/*` is 404 (correct while NE has no inner pages). H1 rule (heroHeading, fallback card title) applied once per page, other sections h2. Canonical self; no hreflang (no NE version); OG image set. All strings come from messages JSON (no hard-coded copy; `IntroSection`/`PriceAside` take props). No price numbers (A6 pending). Server components only.

## Must-fix
1. **Placeholder copy on indexable pages.** `indexable = Boolean(entry)` only checks that a brief row exists, but every service and rent page renders the "More detail is coming soon" Callout instead of body copy. Those pages would be indexed as thin content. Set `indexable` to false for all pages while the placeholder renders (one flag, e.g. `COPY_READY = false` in `section-pages.ts`), flip it per page when the writer's copy lands. Also list it in the Gate-2/launch checklist.

## Nits
2. **CMS swap is not only a loader change.** Views are built from home card text plus `services.json`; neha's `Services`/`RentalPlans` collections have fixed groups (types, benefits, steps, detail, price, crossSell, faqs). Define a typed `ServiceView`/`RentView` from `payload-types` now, and have the future loader call `findPublished` then `resolvePublished` (my T-109 finding 1: no draft-only relations at depth 1). Process, FAQ and pricing teaser are the same on all 9 pages: ok as scaffolding, but when JSON-LD is added do not emit `FAQPage` for identical shared FAQs on every page (sudip).
3. No `sitemap.ts`/`robots.ts` exist yet: when added they must exclude `noindex` pages (derive from the same `indexable` flag).
4. T-108 nits: `ServiceFacts` still uses `!text-accent` (satish, not fixed yet, contrast check pending). Rental-plans block is not used yet, so its nits (1 to 4) stay open for the pricing task.
5. Switch still links to NE home from inner pages (known, documented).
