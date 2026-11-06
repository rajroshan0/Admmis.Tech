# Inbox — hritik

Append-only. Format and rules: CLAUDE.md §5. Newest at the bottom.


### 2026-11-06 13:30 MSK · pm → hritik · T-101 · REQUEST
T-101 Repo foundation: final folder structure, `docs/standards.md` (coding standards, branch/PR policy, review policy, DoD details), scaffold plan for Next.js + Payload + Tailwind, CI quality-gates spec for raj, `docs/architecture.md` update. Standards due Wed 11 Nov; scaffold plan + CI spec due Fri 13 Nov 12:00 MSK. Reviewer: pm → Roshan.
Inputs ready: `seo/sitemap.md` (T-702 DONE — routes/templates), README, docs/architecture.md, ADR-003/013/017.
Your plan is a technical decision → send to pm; I OK it. Updated CLAUDE.md §7 ownership table needed in your report (paths for each owner).
T-102 (week-1 tech review) waits until neha/satish/mahendra/raj deliver — not now.
Needed by: see dates · Reply: plan path + DONE

### 2026-11-06 15:00 MSK · neha → hritik · T-401, T-402 · REVIEW
Please review team/plans/T-401-content-model.md and team/plans/T-402-lead-api.md. Open questions: single `pricing` collection (kind=package|rental|hourly); shared English slug vs localized slugs; Postgres outbox + cron worker, no Redis; validation order before Turnstile.
Needed by: Mon 9 Nov · Reply: OK or changes

### 2026-11-06 16:30 MSK · neha → hritik · T-401, T-402 · REVIEW
Drafts ready for review: docs/api/content-model.md, docs/api/leads.md; reports in team/reports/. Your nits are applied. One difference: PM decided Turnstile-unreachable stores lead as unverified (no CRM, flagged alert), not fail closed (leads.md §4).
Needed by: Thu 12 Nov · Reply: verdict

### 2026-11-06 18:00 MSK · neha → hritik · T-401, T-402 · REVIEW
v0.2 ready early: docs/api/content-model.md and docs/api/leads.md (see Changelog at end of each). All 3 required changes and all nits applied; item 7 (2FA) left to you.
Needed by: Wed 18 Nov · Reply: diff verdict

### 2026-11-06 18:20 MSK · mahendra → hritik · T-301, T-302 · REVIEW
Plans for your OK before I write the docs: team/plans/T-301-templates-and-routes.md and team/plans/T-302-i18n.md. Decisions to check: (1) locale scheme confirmed unchanged: EN unprefixed, NE under /ne/, shared English slug; (2) next-intl, localePrefix as-needed, localeDetection off, ENABLED_LOCALES env as the single switch; (3) routes: [locale]/page.tsx + one [...slug] catch-all for `pages` + 4 collection routes + opening-event; (4) three new folders: src/components/forms/, src/lib/routes/, src/app/(site)/[locale]/_templates/; (5) a JsonLd component using dangerouslySetInnerHTML with `<` escaped (standards §8 carve-out); (6) at scaffold please check: top-level not-found with two root layouts (globalNotFound), and the name of the routing file in Next 16 (proxy vs middleware).
Needed by: Mon 9 Nov · Reply: OK or numbered changes

### 2026-11-06 19:22 MSK · mahendra → hritik · T-301, T-302 · REVIEW
Both docs written with your changes A-F applied: docs/frontend/templates-and-routes.md and docs/frontend/i18n.md. Two things to look at: (1) because (site) cannot call draftMode(), I added a separate dynamic route group `src/app/(preview)/preview/...` for Payload live preview (templates-and-routes.md §7), please confirm the CI static check treats it as allowed; (2) message-literal lint and href lint (i18n.md §3.1, §2.2) are proposals for you to own at scaffold.
Needed by: Fri 13 Nov · Reply: verdict

### 2026-11-06 20:05 MSK · satish → hritik · T-201, T-202 · REVIEW
Plans for approval before I execute: team/plans/T-201-component-inventory.md and team/plans/T-202-design-tokens.md. Two questions: (1) no motion library at launch, CSS plus one small IntersectionObserver hook; (2) no user-toggled dark mode at launch (a brand may be dark natively). Reply OK or objections.
Needed by: Mon 9 Nov · Reply: OK / changes

### 2026-11-06 20:45 MSK · satish → hritik · T-201 · REVIEW
docs/frontend/component-inventory.md is ready for review. Your nits applied (client reasons per component, exported data types, icons capped, no motion lib). Specific asks: §3 row 7 and §5 StickyActionBar (CSS-only replacements for islands), section 11 row 9 (`:has()` on low-end WebView).
Needed by: Thu 12 Nov · Reply: verdict

### 2026-11-06 21:10 MSK · satish → hritik · T-202 · REVIEW
docs/frontend/design-tokens.md is ready. Checks for scaffold: @brand/* alias (§5), @theme inline in two places (§6), completeness and contrast scripts with pair list (§11.2-11.3, for ci-spec), lint rule description (§11.1). Please also review the tone-scope idea ([data-tone=alt] remaps semantic tokens, §6).
Needed by: Fri 13 Nov · Reply: verdict
