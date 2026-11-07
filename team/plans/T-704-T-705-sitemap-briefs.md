# Plan — T-704 sitemap v0.2, T-707 home SEO check, T-705 P0 page briefs

Owner: sudip · 2026-11-07 · Reviewer: pm (FYI, own area; no technical decision outside `seo/`)

## Goal
Sitemap v0.2 consistent with ADR-029/030 and the hritik/mahendra/rajaros items; an SEO verdict on the home copy; briefs good enough for `writer` to write P0 pages without meeting us.

## Inputs read
CLAUDE.md, role file, sprint-1.md, inbox, decisions ADR-029..040, seo/*.md, docs/frontend/templates-and-routes.md §3 and §13.

## Steps and deliverables
1. T-704 `seo/sitemap.md` v0.2 (due 13:30 MSK): drop /faq (row, nav, footer, keyword), rule 5 = 301/308, robots without thank-you Disallow, H1 rule, JSON-LD table, answers to mahendra §13, changelog. Also `seo/keyword-map.md` /faq row removed.
2. T-707 (due 14:30 MSK): check `content/pages/home.md` against keyword map; REVIEW in `team/inbox/writer.md`; message pm.
3. T-705 (target 19:00 MSK): `seo/briefs/_template.md` + P0 briefs (services, web-development, mobile-app-development, ai-agents, outstaffing, digital-marketing, rent, rent-website, pricing). Remainder Mon-Wed.
4. Report `team/reports/T-705-briefs.md`.

## Acceptance
No /faq anywhere in seo/; every brief has all template fields; title <= 60, meta <= 155 (counted by script); one primary per page, no cannibalisation vs keyword-map.

## Assumptions
ASSUMPTION: no live keyword data; volumes stay ESTIMATE. Prices are never written in briefs; they come from the CMS price collection (TODO(roshan) until the pricing gate).

## Risks
Brief quality vs time; writer needs facts we do not have (proof points) -> marked TODO(roshan).
