# Plan — T-702 Sitemap draft
Owner: sudip · Date: 2026-11-06 · Due: Wed 11 Nov (target: stable draft Fri 6 Nov) · Reviewer: pm

## 1. Goal (in my own words)
One page list for the whole launch scope: URL, template, parent, primary keyword, priority, indexation. Sharwan (T-602 structure) and Mahendra (T-301 route map) build from it, so it must be stable early.

## 2. Inputs I read
README §2, docs/timeline.md (launch scope), ADR-004/012/014/015, docs/reference-fittin.md, docs/pricing-model.md.

## 3. Approach
Flat, short, lowercase URLs. Services under /services/, rental under /rent/ (hub + 3 children, same template). EN at root, locale prefix `/ne/` added in Feb (ASSUMPTION until Mahendra's T-302). Primary keywords are working labels here; T-701 validates them.

## 4. Steps
1. Draft sitemap.md with page table, URL rules, indexation rules, hreflang/locale rule, Phase 2 list.
2. Send HANDOFF to sharwan and mahendra, plus inbox entries; FYI to pm.

## 5. Deliverables
| File | Content |
|---|---|
| seo/sitemap.md | Page table, URL rules, navigation, Phase 2 |

## 6. Acceptance criteria
- [ ] Every launch-scope item in docs/timeline.md has a row
- [ ] One primary keyword per indexable page, no duplicates
- [ ] URL rules stated; locale rule stated
- [ ] Noindex pages marked

## 7. Assumptions · Risks · Questions
- ASSUMPTION: EN has no URL prefix, Nepali uses /ne/ (Mahendra to confirm in T-302).
- ASSUMPTION: rental gets a hub plus 3 child pages (scope addition vs. one "On rent" page) because each rental service is a separate search intent. PM to confirm.
- RISK: keyword labels change after T-701 → minor edit only.

## 8. Estimate
1 session.
