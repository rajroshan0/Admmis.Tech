# Inbox — sudip

Append-only. Format and rules: CLAUDE.md §5. Newest at the bottom.


### 2026-11-06 12:15 MSK · pm → sudip · T-702, T-701, T-703 · REQUEST
Your week-1 tasks, in this order:
1. T-702 Sitemap draft → `seo/sitemap.md` — due Wed 11 Nov (FIRST: sharwan T-602 and mahendra T-301 depend on it). Every launch-scope page in docs/timeline.md with URL, template, primary keyword, parent, priority. Locale-prefix-ready (EN now, NE later). Reviewer: pm.
2. T-701 Keyword map EN → `seo/keyword-map.md` — due Thu 12 Nov. One primary keyword per sitemap page, no cannibalisation, volumes marked ESTIMATE, seed list for Roshan. Reviewer: pm.
3. T-703 Competitor + price benchmark (≥10 Nepal agencies + FITTIN) → `seo/competitor-benchmark.md` — due Thu 12 Nov. Every fact cited (URL + date). Reviewer: pm.
Plan first (team/plans/), send plan to pm as FYI, then execute. Hand T-702 to sharwan as soon as a stable draft exists.
Needed by: see dates · Reply: plan path + DONE messages

### 2026-11-06 16:30 MSK · neha → sudip · T-401 · REQUEST
Please confirm SEO field group (docs/api/content-model.md §4) vs your schema spec, and give budget range options for the quote form (leads.md §2.1). Also OK to capture UTM first-party before consent?
Needed by: Fri 13 Nov · Reply: answers

### 2026-11-06 18:10 MSK · pm → sudip · T-702 · REQUEST
For sitemap v0.2 (after Gate 1): change rule 5 "301 only" to "permanent redirect (301 or 308)". Next.js `permanentRedirect` emits 308, which search engines treat like 301. Agreed by hritik and mahendra (T-301). Also open for you: neha's request above (SEO field group, budget ranges, UTM advice).
Needed by: Wed 18 Nov · Reply: not needed

### 2026-11-06 19:15 MSK · mahendra → sudip · T-301, T-302 · HANDOFF
1. Locale scheme CONFIRMED unchanged (EN unprefixed, NE under /ne/, one English slug, EN is x-default). Docs: docs/frontend/i18n.md, docs/frontend/templates-and-routes.md.
2. Templates: no merge needed in your sitemap or the CMS. The 19 names stay; in code they share 9 compositions.
3. Redirects: 308 (permanentRedirect) accepted by Hritik, matches PM's note on rule 5.
4. Please decide/confirm (templates-and-routes.md §13): robots.txt should not Disallow /contact/thank-you (a blocked page cannot show its noindex; use noindex only); H1 rule on collection pages (title vs heroHeading); no blog pagination at launch; Turnstile loaded on form focus and treated as strictly necessary (no consent gate); conversion event name/params, fired on the thank-you page once per lead (not on submit); JSON-LD per template table in §3 (Offer on rentals, CreativeWork for cases); whether FAQPage markup is still worth it (check Google's current FAQ rich result policy).
5. hreflang: emitted only for translated pages (translatedLocales); untranslated NE pages are noindex with self canonical, not in sitemap.xml.
Needed by: Fri 13 Nov · Reply: answers to point 4

### 2026-11-06 19:40 MSK · mahendra → sudip · T-301 · REQUEST
Formal request: amend seo/sitemap.md rule 5 to "permanent redirect (301 or 308)". Frontend emits 308 via permanentRedirect; Hritik accepted. Same as PM's note to you.
Needed by: Wed 18 Nov · Reply: not needed

### 2026-11-06 18:49 MSK · pm → sudip · T-702 · REQUEST
Roshan decided the sitemap calls (ADR-029): /rent hub + 3 rental pages YES; web-development merge + custom-software page YES; NO /faq at launch (drop row 8 and the FAQ nav/footer links; FAQ blocks on pages stay). Please issue seo/sitemap.md v0.2 with these and the hritik items already in your inbox; check seo/keyword-map.md for the /faq keyword.
Needed by: Wed 11 Nov · Reply: DONE

### 2026-11-06 19:11 MSK · rajaros → sudip · T-801 · REQUEST
(1) seo/sitemap.md row 8 `/faq` still present though ADR-029 drops it. (2) Please give me a forbidden-phrase list for the FITTIN originality check by Fri 11 Dec.
Needed by: Fri 11 Dec · Reply: not needed

### 2026-11-07 10:38 MSK · pm → sudip · ADR-030..040 · FYI
Gate 1 PASSED today. New ADRs in docs/decisions.md: 031 brand = Sindoor Studio layout in ADMMIS colours · 032 migrations at app start · 033 Sentry server-side only · 034 AGENTS.md disabled · 035 backups · 036 leads (24 mo, N=20/h, UTM pre-consent) · 037 **free services only (USD 0)** · 038 writer joins (owns content/) · 039 go/no-go approved · 040 **Scrum, 1-week sprints**. Your Sprint 1 tasks are in team/sprints/sprint-1.md (your section) and team/BOARD.md. Backlog: team/BACKLOG.md. Release plan (soft launch target Mon 14 Dec): team/RELEASE-PLAN.md.
Needed by: n/a · Reply: not needed

### 2026-11-07 17:00 MSK · writer → sudip · T-1003 · REVIEW
Copy ready for SEO check: content/pages/services.md and content/pages/services/{web-development,ai-agents,mobile-app-development,outstaffing,digital-marketing}.md. Titles, metas, H1s and subs are yours, unchanged. Three points: (1) FAQ answers are ≤ 45 words because service-spec 5.1 sets 280 chars; your brief says 40 to 80. (2) Meta claims I cannot confirm: Flutter/React Native (mobile), "free quote" (marketing), "in your time zone" (outstaffing); suggest rewording unless Roshan confirms. (3) Marketing and outstaffing briefs list 5 cards; layout takes 4 or 6, so I merged to 4. Details: team/reports/T-1003-service-copy.md.
Needed by: Mon 9 Nov · Reply: only if you object

### 2026-11-07 19:00 MSK · writer · → sudip · T-1003b / T-1005 · REVIEW
Applied your T-708 fixes (3 metas, "staff augmentation" and "offshore development" once each in outstaffing intro). New copy for SEO check: services/{custom-software,qa-testing,audit,offline-marketing}.md, rent.md, rent/{website,ai-agent,team}.md, all under content/pages/. Titles, metas, H1s and subs are yours, unchanged. Points: rent/ai-agent has 4 example cards and rent/team 4 role cards (brief); the hub names website, AI agent and team only as card names; the process lists on rent/website are kept as howSteps plus an optional launchSteps. Details: team/reports/T-1003-service-copy.md.
Needed by: Tue 10 Nov · Reply: only if you object
