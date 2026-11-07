# Plan — T-503, T-504, T-505 Free infra, DNS steps, Mac Docker note
Owner: raj · Date: 2026-11-07 · Due: T-505 Sat 7 Nov 14:30 MSK · T-504 Sat 7 Nov 16:00 MSK · T-503 Tue 10 Nov · Reviewer: hritik (pm for T-505)

## 1. Goal (in my own words)
Roshan can (a) run the app locally on his Apple Silicon Mac, (b) move admmis.org to Cloudflare Free without breaking email or the existing site, and (c) decide on a USD 0 hosting plan, all from plain written steps. I prepare; Roshan executes (CLAUDE.md §3, ADR-037).

## 2. Inputs I read
CLAUDE.md, ADR-017/030-040, team/sprints/sprint-1.md, team/inbox/raj.md, docs/runbooks/infra-setup.md v0.1 (363 lines, paid VPS plan), docker-compose.dev.yml, .env.example.

## 3. Approach
- T-505 and T-504 first (short, Roshan-facing). T-503 rewrites infra-setup.md to v0.2 with the free stack; v0.1 paid option stays as the fallback section.
- Every price, limit and licence term is cited with URL + check date, from the primary vendor page. Claims I could only see in search snippets are marked UNVERIFIED and listed as TODO(roshan): verify in browser.

## 4. Steps
1. T-505 `docs/runbooks/local-dev-mac.md`.
2. T-504 `docs/runbooks/dns-cloudflare.md` incl. subdomain-delegation evaluation and recommendation.
3. T-503 `docs/runbooks/infra-setup.md` v0.2, ADR proposal text, revised Roshan actions at USD 0.
4. Report `team/reports/T-503-T-505-free-infra.md`; message PM after each task.

## 5. Deliverables
| File | Content |
|---|---|
| docs/runbooks/local-dev-mac.md | Docker Desktop install, dev loop, troubleshooting, Homebrew Postgres alternative |
| docs/runbooks/dns-cloudflare.md | Move admmis.org to Cloudflare Free, keep records, verify, roll back |
| docs/runbooks/infra-setup.md (v0.2) | Free host comparison, trade-offs, free stack, Roshan actions at USD 0, ADR text |

## 6. Acceptance criteria
- [ ] Each runbook has purpose, prerequisites, steps, verify, roll back.
- [ ] Every external fact has URL + date or is marked UNVERIFIED.
- [ ] No account created, no DNS changed, no secret in any file.

## 7. Assumptions, risks, questions
- ASSUMPTION: Roshan's Mac has no Docker (confirmed: `docker` not on PATH); Homebrew and psql exist.
- RISK: my web-fetch helpers returned reports I could not read, so primary-page verification is incomplete. Mitigation: mark UNVERIFIED, ask PM.
- QUESTION (pm): who is the registrar of admmis.org (Q17)? Is the Docker use "personal" or company use (matters for the licence)?

## 8. Estimate
T-505 0.5 h, T-504 1.5 h, T-503 3 h. Primary-source verification is the variable.
