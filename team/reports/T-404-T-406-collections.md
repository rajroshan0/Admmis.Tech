# Report T-404 / T-406 — CMS collections (neha, 2026-11-07)
Status: DONE for code that can be verified without a database. Migrations not run (no Docker, C1).
- Plan: team/plans/T-404-collections.md (hritik OK with conditions, all applied).
- Built: collections Pages, Services, Pricing, RentalPlans, Faqs, Redirects, Media (final), Users (roles, name); global siteSettings; shared `access/`, `fields/` (seo, icons, helpers), `hooks/` (slug lock + auto redirect, revalidate, pricing validation); `src/lib/server/content.ts` (published-only reads) and `revalidate.ts`; `src/config/size-bands.ts`; `src/migrations/index.ts` (empty); config wired with `prodMigrations` + `migrationDir`.
- Checks: `generate:types`, `typecheck`, `lint`, `prettier --check` all clean; tests 42 pass (new: access rules, slug, pricing validation, published-only reads).
- NOT verified (needs DB): initial migration create/apply at start, no re-run on restart, second migration, localized-subfield arrays on Postgres, admin UI conditions and required-in-hidden-group behaviour.
- Post-Docker check: fresh DB, `pnpm payload migrate:create initial`, `migrate:status`, `NODE_ENV=production pnpm start`, inspect `payload_migrations`, restart, add a field and repeat.
- For raj: keep push off in production, use a fresh DB for the initial migration, run one app container only.
- Open: GraphQL still enabled in the app route (content-model says off; hritik/mahendra own `src/app`). Editors delete drafts only (no own-record check). Remaining collections (cases, posts, jobs, events, team, leads) are later tasks.
- Fix T-406-fix (hritik T-109): `findPublished` now always uses depth 0, so a published doc cannot populate draft Faq or Pricing rows. New `resolvePublished` resolves relation ids to published docs only. Tests added.
- T-108 nit 4: RentalPlans refuses a 7th plan (size band) for one product (MAX_BANDS = 6).
- typecheck, lint, tests pass. Callers must use `resolvePublished` for relations (mahendra data layer).
