# Release plan — tech.admmis.org

Owner: pm · 2026-11-07 · Process: Scrum, 1-week sprints Mon–Sun MSK (ADR-040) · Backlog: `team/BACKLOG.md`

## 1. Target dates

| Milestone | Original (`docs/timeline.md`) | **New plan** | Gain |
|---|---|---|---|
| Homepage design approved (Gate 2) | Fri 20 Nov | **Sun 15 Nov** (Sprint 1 Review) — first build visible Sat 7 Nov | 5 days |
| All templates designed (Gate 3) | Fri 27 Nov | **Sun 22 Nov** (Sprint 2 Review) | 5 days |
| Staging live with all templates | ~Fri 4 Dec | **Sun 29 Nov** | 5 days |
| Content freeze | Fri 18 Dec | **Fri 4 Dec** | 14 days |
| Code freeze + go/no-go (Gate 4) | Thu 24 Dec | **Thu 10 Dec** | 14 days |
| **Soft launch (live, unannounced)** | Tue 29 Dec | **Mon 14 Dec** | 15 days |
| Launch sign-off (Gate 5) | Wed 30 Dec | **Fri 18 Dec** | 12 days |
| **Public launch at opening event** | Fri 1 Jan 2027 | **Fri 1 Jan 2027** (fixed by the event) | — |
| Nepali language | ~Feb 2027 | **start Mon 21 Dec**, target live ~mid-Jan | ~3 weeks |

**Fastest realistic launch: soft launch Mon 14 Dec 2026.** The site can be live and indexed 2.5 weeks before the event;
1 Jan stays the public announcement because the event date is fixed. Faster than 14 Dec is not realistic because three
inputs are outside the team's control (see §4): case-study facts and permissions, hero model images, and a working
free host + Roshan's account actions.

## 2. Sprints

| Sprint | Dates | Goal | Key stories | Points | Review |
|---|---|---|---|---|---|
| 1 | Sat 7 – Sun 15 Nov | Homepage running in the ADMMIS brand with real copy; foundations proven (spikes, free infra plan, briefs) | US-102–105, 201–205, 401–402, 702, 704, 802–803, 902, 904, 1001–1003, 911 | ~75 | Sun 15 Nov = **Gate 2** (homepage) |
| 2 | Mon 16 – Sun 22 Nov | All templates designed; CMS collections; services, rent, pricing, contact pages built; lead API saves leads; CI green | US-106, 206–207, 302–306, 403–405, 407, 412, 501–502, 508, 804–805, 1004–1006, 1009 | ~100 | Sun 22 Nov = **Gate 3** (all templates) |
| 3 | Mon 23 – Sun 29 Nov | Every launch page built and on staging; lead alerts, consent + analytics, SEO output; content loaded | US-108–109, 208–209, 307–308, 406, 408–411, 413, 503–506, 703, 705–706, 806–807, 809, 1007–1008, 1010 | ~85 | Sun 29 Nov: staging demo |
| 4 | Mon 30 Nov – Sun 6 Dec | Quality: performance, accessibility, security, devices; bug fixing; **content freeze Fri 4 Dec** | US-507, 808, 810, 905–907, 1011 + bugs | ~20 + bugs | Sun 6 Dec |
| 5 | Mon 7 – Sun 13 Dec | Release: **go/no-go Thu 10 Dec**, production deploy Fri 11 Dec, final checks | US-707, 908–909 | ~6 + fixes | Sun 13 Dec |
| — | **Mon 14 Dec** | **Soft launch** | | | |
| 6 | Mon 14 – Sun 20 Dec | Hypercare; launch sign-off Fri 18 Dec (Gate 5); Phase-2 planning | US-910 | 3 | Fri 18 Dec |
| 7–8 | 21 Dec – 3 Jan | Nepali build starts (US-P01); event rehearsal; buffer | Phase 2 | — | Fri 1 Jan event |

Sprints 4–5 hold intentional slack (~60%): that is the schedule buffer. If Sprints 1–3 slip, the buffer absorbs it
before any date moves.

## 3. Critical path

```
ADMMIS brand (done) → homepage spec (T-603, today) → tokens + layout components (satish)
  → homepage build (today) → template designs (Sprint 2) → templates built (Sprint 2–3)
  → content loaded (Sprint 3) → content freeze Fri 4 Dec → QA → go/no-go Thu 10 Dec → soft launch Mon 14 Dec
Parallel critical inputs: free host + Roshan setup actions (needed by Mon 23 Nov for staging)
                          case-study facts + permissions (needed by Fri 20 Nov)
                          hero model PNGs (needed by Fri 20 Nov)
```

## 4. What Roshan must deliver, and by when

| Input | Needed by | Blocks | If late |
|---|---|---|---|
| Accept/reject homepage at day-1 review | Sun 8 Nov | Sprint 1 direction | Rework eats Sprint 1 |
| Pricing decision on 1-page summary (US-911) | Fri 13 Nov | pricing + rent copy and pages | Pages ship with "Request a quote" only |
| Hero sari-model PNGs (≥ 2000 px, 2–3 poses) | Fri 20 Nov | US-107 | Launch with illustrated placeholder |
| 4 case studies: facts, numbers, permission | Fri 20 Nov | US-1007, US-406 | Fewer cases / anonymised |
| OK on free host choice + do account actions (incl. DNS → Cloudflare) | Mon 23 Nov | staging, US-806–809 | Soft launch moves day-for-day |
| Q10: chat tool, sales email, CRM, who answers leads | Fri 20 Nov | US-503, US-506 | Email-only alerts at launch |
| Event details (venue, time, registration) | Fri 27 Nov | US-409 | Event page with "details soon" |
| Legal text approval (privacy/terms/cookies) | Fri 4 Dec | US-411, content freeze | Go/no-go fails (legal is a NO-GO criterion) |
| Company facts: PAN (12 digits?), address, phone for ADMMIS.TECH | Fri 20 Nov | footer, legal | Footer without PAN |
| Push to GitHub (first CI run) | Mon 16 Nov | US-804 | CI unproven |
| Approvals at each review within 12 h (ADR-016) | each Sunday | next sprint | 1:1 slip |

## 5. If a sprint slips — what moves

| Slip | Action (in this order) |
|---|---|
| ≤ 3 days | Absorb in Sprint 4–5 slack; no date change |
| 4–10 days | Cut "should" stories (US-108, 109, 208, 209, 308, 506, 507, 707) to Phase 2; soft launch moves to ≤ Mon 21 Dec |
| > 10 days | Back to original plan: soft launch Tue 29 Dec; public 1 Jan unchanged |
| A content input is missing | Page ships without that block (e.g. fewer cases); never invented content |
| Free host fails verification | Raj's cheapest paid fallback goes to Roshan as an APPROVAL (money) — same day |

## 6. Gates (Roshan approves; Hritik reviews technically first)

| Gate | Date | What |
|---|---|---|
| 1 | Sat 7 Nov | PASSED (ADR-030) |
| 2 | Sun 15 Nov | Homepage design + build |
| 3 | Sun 22 Nov | All templates |
| 4 | Thu 10 Dec | Go/no-go (19 criteria, ADR-039) |
| 5 | Fri 18 Dec | Launch sign-off after soft launch week |
