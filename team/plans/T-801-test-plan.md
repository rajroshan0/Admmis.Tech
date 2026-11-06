# Plan — T-801 Test plan, device matrix, launch checklist, go/no-go
Owner: rajaros · Date: 2026-11-06 · Due: Fri 13 Nov · Reviewer: hritik

## 1. Goal (in my own words)
Give the team one binding QA standard before code lands: what is tested, how, on which devices, who owns each check, and the measurable rule that decides go or no-go on Thu 24 Dec. This plan sets test standards for everyone, so PM and Hritik see it first.

## 2. Inputs I read
README §5, CLAUDE.md §8, docs/timeline.md, docs/ci-spec.md, docs/standards.md (§6-9, 13), docs/decisions.md (ADR-005/006/007/014/025/026/029), seo/sitemap.md, docs/api/leads.md §14, docs/frontend/templates-and-routes.md §12, docs/frontend/i18n.md §11, docs/runbooks/infra-setup.md §11-12. Web: StatCounter and Nepal phone-market pages (cited in the device matrix).

## 3. Approach
Risk-based. Highest weight: lead form and pipeline, pricing single source, homepage, mobile performance, consent, i18n readiness. Pyramid: Vitest unit (owners) > Playwright e2e on Chromium + WebKit in CI (mine) > Lighthouse CI / bundle budget (Raj, Hritik) > manual real-device and screen-reader passes (mine, Roshan supplies devices). Alternatives rejected: Cypress (stack says Playwright); full cross-browser matrix in CI (cost, CI time) - Firefox and Edge run as manual smoke.

## 4. Steps
1. Draft qa/test-plan.md (scope, risk table, template-to-test-type map, lead pipeline cases, a11y, perf, security, SEO, content, i18n, environments, bug process, schedule).
2. Draft qa/device-matrix.md with sourced Nepal reasoning; real devices marked TODO(roshan).
3. Draft qa/launch-checklist.md with owner per item.
4. Draft qa/go-no-go.md with measurable criteria.
5. Review acceptance criteria of open board tasks (shift left) and message owners.
6. Verify every cited path; send plan and DONE.

## 5. Deliverables
| File | Content |
|---|---|
| qa/test-plan.md | strategy, risks, coverage map, cases, bug template |
| qa/device-matrix.md | devices, browsers, viewports, network profiles |
| qa/launch-checklist.md | pre-launch items with owner |
| qa/go-no-go.md | measurable criteria, decision protocol |
| team/reports/T-801-test-plan.md | report |

## 6. Acceptance criteria (testable)
- [ ] Every launch-scope template (sitemap §2, ADR-029) and the lead pipeline mapped to unit/e2e/a11y/perf/manual
- [ ] Device matrix has a named low-end Android with Nepal reasoning, sources and dates
- [ ] WCAG 2.2 AA checks listed
- [ ] Budget: Lighthouse >= 90, LCP < 2.5 s on 4G, JS < 150 KB
- [ ] Go/no-go criteria measurable
- [ ] Checklist has an owner per item; real devices/accounts marked TODO(roshan)
- [ ] No /faq page in any list (ADR-029)

## 7. Assumptions · Risks · Questions
- ASSUMPTION: Roshan can lend or buy 2 budget Android phones and 1 iPhone by Mon 21 Dec (TODO(roshan)); otherwise BrowserStack/emulation, which is weaker.
- ASSUMPTION: e2e runs on Chromium + WebKit in CI per ci-spec §2; Firefox/Edge manual.
- RISK: no Nepal-specific 2025-26 device share data found -> matrix chooses by price tier and marks ESTIMATE.
- RISK: Lighthouse on CI is noisy -> follow ci-spec §3 rerun rule; real-device check is the tiebreaker.
- QUESTION (Hritik): OK that qa/go-no-go.md is the binding gate rule and CI Lighthouse numbers (a11y/SEO/best-practices 0.95) are the thresholds?
- QUESTION (PM): who is the named sign-off for content proofreading (copywriter not hired yet)?

## 8. Estimate
~1 session for drafts, 0.5 for review loop. Changes if Hritik wants different thresholds.
