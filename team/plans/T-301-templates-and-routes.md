# Plan — T-301 Template & route map
Owner: mahendra · Date: 2026-11-06 · Due: Thu 12 Nov · Reviewer: hritik

## 1. Goal (in my own words)
One document, `docs/frontend/templates-and-routes.md`, that says for every launch-scope URL: which template renders it, which route file, which CMS collection feeds it, which blocks it uses, how it is generated and revalidated, and which SEO markup it emits. Satish (blocks), Neha (data layer), Sudip (JSON-LD, sitemap) and Rajaros (tests) build against it. It also answers Neha's open form-contract questions (§13 of `docs/api/leads.md`).

## 2. Inputs I read
`CLAUDE.md`, `seo/sitemap.md` v0.1, `docs/api/content-model.md` v0.2 (§3.14, §6, §7), `docs/api/leads.md` v0.2 (§2, §13), `docs/standards.md` (§2–§4, §6–§8), `docs/architecture.md` (routing), `docs/scaffold-plan.md`, `design/brand-directions/README.md`, ADR-004/007/012/014.

## 3. Approach (decisions I will put in the doc)
1. **Routing shape:** `src/app/(site)/[locale]/` with (a) `page.tsx` for home, (b) ONE optional-free catch-all `[...slug]/page.tsx` that resolves any `pages` document by slug path and dispatches on its `template` field, (c) four collection routes `services/[slug]`, `work/[slug]`, `blog/[slug]`, `careers/[slug]`, (d) `opening-event/page.tsx` (flat URL, `events` collection). New CMS pages need no code change. Alternative rejected: one hand-written route file per URL (40 files, violates "one template, many pages").
2. **Template registry:** a map `template name -> { component, dataLoader, jsonLd, defaultIndex }` in `src/app/(site)/[locale]/_templates/`. 19 sitemap names stay (CMS select), implemented as about 9 compositions. Answer to Sudip: no merge needed in the sitemap or CMS, the merge is in code.
3. **Data flow:** page fetches through `lib/server` functions (Neha), then a `resolveBlocks()` step turns block references into props, so blocks never fetch (standards §2). I list the exact data-layer functions I need from Neha.
4. **Rendering:** static + ISR, `generateStaticParams` per route, `dynamicParams = true` for new slugs, tags exactly as in content-model §1; no route-level `loading.tsx` (it would turn redirects/404 into 200).
5. **Redirects table:** looked up only when a slug is not found (no per-request cost), then `permanentRedirect` (HTTP 308, treated as 301 by search engines). Flag to Sudip: sitemap rule 5 says "301 only".
6. **Forms:** answers to Neha: JSON response + client navigation (not a native redirect); client idempotency key held in memory; conversion event fired once on the thank-you page, not on submit.
7. **SEO output per template:** metadata, canonical, hreflang, JSON-LD builders, breadcrumbs, sitemap.ts, robots.ts, 404/500, noindex rules. JSON-LD types are a proposal until Sudip's schema spec lands.
8. **New folders I need Hritik to approve:** `src/components/forms/`, `src/lib/routes/`, `src/app/(site)/[locale]/_templates/`; one `JsonLd` component using `dangerouslySetInnerHTML` (standards §8 forbids it except rich text; JSON-LD needs it, with `<` escaped and a unit test).

## 4. Steps
1. Build the URL-to-template table from the 40 sitemap rows. 2. Template registry table (19 names). 3. Data-layer needs for Neha. 4. Block usage per template and heading rules. 5. Rendering/ISR/revalidation. 6. SEO markup per template. 7. Form behaviour and answers to Neha. 8. Special routes (404, 500, redirects, preview). 9. Open questions. 10. Verify against sitemap (every row covered, counts) and content-model §7 (all 19 templates). 11. Report, inbox handoffs.

## 5. Deliverables
| File | Content |
|---|---|
| `docs/frontend/templates-and-routes.md` | Template and route map v0.1 |
| `team/reports/T-301-templates-and-routes.md` | Completion report |
| inbox appends | neha (form answers + data-layer requests), sudip (merge answer, redirects, robots), satish (block-resolution contract), hritik (new folders) |

## 6. Acceptance criteria (testable)
- [ ] All 40 sitemap rows appear (or are grouped explicitly) with template, route file, collection, blocks.
- [ ] All 19 template names appear in the registry; none missing vs `content-model.md` §7.
- [ ] Each template has: data source, ISR tags, JSON-LD type, indexation, heading rule.
- [ ] Neha's form questions answered; form behaviour matches `leads.md` §13.
- [ ] No hard-coded user-facing string, no price literal anywhere in the design.
- [ ] Open questions listed with owner and date.

## 7. Assumptions · Risks · Questions
- ASSUMPTION: `pages.slug` stores `contact/thank-you` and `rent/website` (one nested level), per content-model §3.14.
- ASSUMPTION: Next 16 + next-intl 4 behave as documented for `as-needed` prefix, `generateStaticParams`, tags. Verified only at scaffold (T-103); I will not claim version-specific API details.
- RISK: multiple root layouts (`(site)` and `(payload)`) make a top-level `not-found.tsx` awkward → Hritik to check `globalNotFound` at scaffold.
- RISK: `resolveBlocks()` ownership unclear (Neha server side vs Satish blocks) → proposed Neha, asked in plan review.
- QUESTION (hritik): approve the three new folders and the JSON-LD carve-out.
- QUESTION (neha): can she provide the data functions in §5 of the doc, and `translatedLocales`?

## 8. Estimate
About 1 working session. Could grow if Sudip's schema spec changes the JSON-LD table.
