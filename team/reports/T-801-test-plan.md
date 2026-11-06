# Report — T-801 Test plan, device matrix, launch checklist, go/no-go
Owner: rajaros · Date: 2026-11-06 · Status: DONE (draft v0.1, pending Hritik review)

## Delivered
| File | What it is |
|---|---|
| /Users/rajroshan/Desktop/ADMMIS.TECH/qa/test-plan.md | Risk-ranked strategy, template-to-test-type map, lead/pricing/consent/i18n cases, WCAG 2.2 AA checklist, perf, security, SEO, content, bug template, schedule |
| /Users/rajroshan/Desktop/ADMMIS.TECH/qa/device-matrix.md | Nepal market reasoning with sources, proposed devices, browser/viewport/network matrix, real-device script |
| /Users/rajroshan/Desktop/ADMMIS.TECH/qa/launch-checklist.md | 61 items, each with owner and date |
| /Users/rajroshan/Desktop/ADMMIS.TECH/qa/go-no-go.md | 19 measurable hard criteria, decision rule, process for Thu 24 Dec |
| /Users/rajroshan/Desktop/ADMMIS.TECH/team/plans/T-801-test-plan.md | Plan |

## Acceptance criteria
- [x] Every launch template and the lead pipeline mapped to U/E/A/P/M: test-plan §4, §5.1
- [x] Named low-end Android with Nepal reasoning and cited sources/dates: device-matrix §1-2 (Redmi 13C/A-series, Galaxy A0x/A1x, ESTIMATE on exact models)
- [x] WCAG 2.2 AA checks listed: test-plan §6 (18 checks)
- [x] Budget Lighthouse >= 90, LCP < 2.5 s 4G, JS < 150 KB: test-plan §7, go-no-go G-5/G-6, same numbers as ci-spec §3
- [x] Go/no-go measurable: go-no-go §1 with measure, evidence, owner
- [x] Checklist owner per item; real devices/accounts TODO(roshan)
- [x] No `/faq` page (ADR-029): only mentioned as "must not exist"
- [x] Cited repo paths exist (checked with a file test); I did not re-verify each section number beyond reading them.

## Decisions & assumptions made
- ASSUMPTION: CI e2e = Chromium + WebKit; Firefox/Edge/Samsung Internet manual (ci-spec §2).
- ASSUMPTION: support policy last 2 majors, Android 9+, iOS 16+; Hritik to confirm.
- ASSUMPTION: LHCI thresholds (a11y/SEO/BP 0.95) from ci-spec §3 are the go/no-go numbers.
- Real-device pass is a hard criterion (G-12); emulation cannot satisfy it.
- Sources caveat: StatCounter Nepal figures (Android 75.07 % / iOS 24.93 %, Sep 2026) came via search summary, I could not open the page. Brand shares are old (2020-2024); no 2025-26 Nepal vendor data found. Checked 2026-11-06.

## Open issues / risks
- No devices yet; no staging; no scaffold, so nothing is measured (all go/no-go rows currently "unknown").
- Content proofreader unnamed; forbidden-phrase list for originality check needed from Sudip.
- Some leads.md decisions affect tests (Q8 UTM before consent, Turnstile consent stance).
- Observed doc mismatches for owners: sitemap.md still lists `/faq` (row 8) and 9 vs rows count, and rule 5 says 301 only while Mahendra uses 308; robots.txt line in sitemap still disallows thank-you (templates §13 Q3). Sudip to update.

## Handoffs
- → hritik: review plan; confirm threshold and browser-policy assumptions.
- → pm: checklist owners and dates; proofreader name; device purchase request path.
- → raj: staging URL, restore-log, monitors proof, rollback rehearsal.
- → neha: test accounts for roles, L-16..L-23 added to your leads cases.
- → sudip: forbidden-phrase list; remove `/faq` row from seo/sitemap.md.

## Needs Roshan
- Approve/loan 2 budget Android phones + 1 iPhone by Mon 21 Dec (order by Fri 4 Dec); approve any cloud device service as fallback.
- Production smoke needs one tagged test lead in production on 29 Dec.
