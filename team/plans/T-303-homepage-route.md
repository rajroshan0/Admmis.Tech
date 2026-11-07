# Plan — T-303 Homepage route
Owner: mahendra · Date: 2026-11-07 · Due: 2026-11-07 18:00 MSK · Reviewer: hritik

## 1. Goal (in my own words)
Roshan runs `pnpm dev --port 3100` at 20:00 and sees the real homepage: all sections from `content/pages/home.md`, rendered from message files, inside the site layout (skip link, header, footer, mobile sticky bar), with correct metadata. No hard-coded user-facing strings.

## 2. Inputs I read
CLAUDE.md, `content/pages/home.md`, `content/microcopy.md`, `docs/frontend/i18n.md`, `docs/frontend/component-inventory.md` (block contract), `docs/standards.md`, sprint-1, my inbox.

## 3. Approach
- Message files `src/messages/en/{home,common}.json`, keys 1:1 with the writer's field names, generated from the copy file by a script and then owned by me. `TODO(roshan)` fields are omitted (never shown); FAQ items with a TODO answer are left out.
- next-intl is not installed and T-304 is due Tue, so a small typed loader `src/lib/i18n/messages.ts` (`getMessages(locale, namespace)`, EN base + locale merge) stands in. Message files do not change when next-intl replaces it.
- Pure mapping `src/lib/routes/home-view.ts` turns messages into block props (contract sent to satish). Pages pass strings as props.
- Until satish's components exist, semantic stand-ins in `src/app/(site)/[locale]/_placeholders/` with the same names and props; swapped by changing imports.
- Metadata builder `src/lib/seo/metadata.ts` (title, description, absolute canonical, OG, twitter).

## 4. Steps
1. Messages and loader. 2. View mapping and tests. 3. Layout and page. 4. Metadata and favicon. 5. Contract to satish. 6. Verify (typecheck, lint, test, build, curl). 7. Swap to satish's components when they land. 8. Report.

## 5. Deliverables
| File | Content |
|---|---|
| `src/messages/en/home.json`, `common.json` | UI and page copy |
| `src/lib/i18n/{config,messages}.ts` | locales, loader |
| `src/lib/routes/{path,home-view}.ts` | path helper, props mapping |
| `src/lib/seo/metadata.ts` | metadata builder |
| `src/app/(site)/[locale]/{layout,page}.tsx`, `src/app/icon.svg` | route |

## 6. Acceptance criteria
- [ ] typecheck, lint, test, build pass; `/` static (SSG), no cookies/headers
- [ ] curl of `/` shows one h1, all 10 sections, footer, title, canonical, OG, `lang`
- [ ] no TODO text and no PAN in the HTML; JS size unchanged versus empty page baseline

## 7. Assumptions · Risks · Questions
- ASSUMPTION: block props follow component-inventory §3.1 plus a few additions (cta on cards, CtaBand, string FAQ answers) requested from satish.
- RISK: satish's API differs → mapping file is the single place to adapt.
- QUESTION (satish): hero image file name and size.

## 8. Estimate
4 h; the swap depends on satish's components (from about 13:45).
