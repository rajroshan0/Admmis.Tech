# Report — T-704, T-707, T-705 (sudip, 2026-11-07 11:03 MSK)

## Delivered
| Task | Deliverable | Status |
|---|---|---|
| T-704 | `seo/sitemap.md` v0.2 | Done |
| T-707 | REVIEW in `team/inbox/writer.md` | Done |
| T-705 | `seo/briefs/_template.md` + 9 P0 briefs: services, web-development, mobile-app-development, ai-agents, outstaffing, digital-marketing, rent, rent-website, pricing | Done (P0 complete) |
Also: `seo/keyword-map.md` v0.2 (/faq row removed), plan `team/plans/T-704-T-705-sitemap-briefs.md`.

## Checks run
- Every brief: title <= 60 chars (with brand suffix), meta <= 155, H1 <= 70, H1 differs from title (asserted by the generator script; it failed the build otherwise).
- No /faq in `seo/` except the Phase 2 reservation and the note that it is dropped.
- One primary keyword per brief; `kwno` lines list the cannibalisation traps from keyword-map §4.

## Assumptions and caveats
- ASSUMPTION: no keyword tool; volumes stay ESTIMATE. FAQ questions are drawn from competitor page wording and buyer concerns, not from Google "People also ask" (not checked). Refine after Search Console data.
- ASSUMPTION: Google shows FAQ rich results only for government and health sites since Aug 2023 (from memory, not re-verified today). I will check the current Google documentation (URL + date) in T-706.
- Rental terms in briefs come from `docs/pricing-model.md`, which is a proposal; briefs mark them TODO(roshan).
- Mahendra's JSON-LD choices (Offer on rentals, Article for cases) are my decisions in sitemap §6; mahendra may object.

## Needs Roshan (via pm)
1. Do we have a Kathmandu office? `content/pages/home.md` address is Janakpurdham-3; keyword map uses Kathmandu modifiers.
2. Facts the briefs cannot fill: project timelines, ownership terms, support terms, years and team size, real case results and client-name permission, WhatsApp number, rental terms (setup fee, minimum term, buyout), VAT/PAN, USD rate.
3. Turnstile as strictly necessary (no consent gate): my view in sitemap §7; needs a privacy check.

## Next (Mon to Wed)
Briefs for custom-software, qa-testing, audit, offline-marketing, rent/ai-agent, rent/team, work, about, contact, careers, opening-event, blog and 3 articles. T-706 schema and analytics spec due Fri 13 Nov.
