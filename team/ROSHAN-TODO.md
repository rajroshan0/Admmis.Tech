# Roshan's to-do list

Owner: pm · Rebuilt 2026-11-07 (Sat) 16:00 MSK after Roshan's answers A2–A5, A10 · Sorted by deadline within each section.
Reply in the lead chat, e.g. "A1 yes, A2 option A, B3: +977 98…". PM records your answers and moves them to **Answered**.

## Approve / decide

| # | What | Why it matters / what it blocks | Options + PM recommendation | Where to see it | Deadline |
|---|---|---|---|---|---|
| A11 | Proofread the Nepali homepage (native check), especially the AI-agent/audit cards and FAQ. Is "भाडामा" the right word for "on rent"? Add the Bikram Sambat date to the event? | Nepali page goes live only after your check | Recommend: proofread in the file or on /ne; send corrections in chat | `content/pages/home.ne.md` · http://localhost:3100/ne | Tue 10 Nov |
| A6 | Prices: bands, rental prices, team-on-rent option, terms (P1–P6) | Pricing and rent pages. Team-on-rent may be **3–4× underpriced for foreign clients** | Recommend: P1–P4 yes, team option A + a separate USD rate card | `docs/pricing-summary.md` | Fri 13 Nov |
| A7 | Budget plan and team pay model (Q19, Q20) | Real cash plan | Free-services-only for now (ADR-037) | `docs/budget.md` | Fri 13 Nov |
| A8 | Free hosting: Oracle Cloud Always Free (2 CPU / 12 GB, India region, USD 0). (a) Is giving Oracle a card for verification OK? (likely required, not verified) (b) approve the new hosting ADR text (§0.7) | Staging server; soft launch 14 Dec depends on it. Risk: Oracle may reclaim a quiet server → raj measures for 7 days and we switch to paid (Lightsail Mumbai ≈ USD 12–24/mo, needs your OK) before 14 Dec if needed | Recommend: yes to Oracle + the 7-day measurement gate (hritik reviewing) | `docs/runbooks/infra-setup.md` §0 | Fri 13 Nov |
| A9 | Test phones (G2): use your/team phones + free emulators? | Real-device test before launch | Recommend: borrowed phones, USD 0 | `qa/device-matrix.md` | Fri 20 Nov |

## Send files / info

| # | What | Why it matters / what it blocks | Where it goes | Deadline |
|---|---|---|---|---|
| B1 | PAN: the number on file has 12 digits (Nepal PANs have 9). The correct number? And is ADMMIS registered in Nepal? | Footer and legal pages; not published until confirmed | `docs/company-info.md` | Fri 13 Nov |
| B2 | ADMMIS.TECH address: is it also Janaki Chowk, Janakpurdham-3? Do we have (or plan) a Kathmandu office? Many search keywords say "Kathmandu"; we won't claim an office we don't have | Footer, contact page, Google listing | same | Fri 13 Nov |
| B3 | Which phone number(s) to publish, and the WhatsApp number | The mobile bottom bar shows only "Get a quote" until then | same | Fri 13 Nov |
| B4 | ADMMIS.TECH social accounts (the ones we have are ADMMIS.FASHION) | Footer links | same | Fri 20 Nov |
| B5 | The 4 case studies: client type (or anonymous), what we built, result numbers, permission to show, screenshots | "Our work" shows titles only; case pages can't be written | `docs/company-info.md` table | Fri 20 Nov |
| B6 | Opening event: venue, city, start/end time, do guests register? | Event section and event page | lead chat | Fri 20 Nov |
| B7 | FAQ facts: typical time for a website / app / AI agent; ownership terms; support terms after launch; may we promise a same-working-day reply? | 3 of 6 homepage FAQs are hidden until answered | lead chat | Fri 13 Nov |
| B11 | Optional proof facts: years in business, team size, VAT number, and the NPR→USD rate to use for prices | Service pages read stronger with real numbers; we never invent them | lead chat | Fri 20 Nov |
| B12 | Service page facts: which technologies we have really shipped (e.g. Flutter/React Native?), payment gateways we integrate, where AI agent data is hosted, can our AI agents speak Nepali, standard contract/NDA wording (needs legal review) | Service pages (web, mobile, AI agents, outstaffing) show these as hidden gaps; we never claim what we can't prove | List in `team/reports/T-1003-service-copy.md` | lead chat | Fri 13 Nov |
| B8 | Vector original of the ADMMIS.TECH logo (SVG/AI/CDR/Canva), if it exists | We use a careful redraw meanwhile | `design/inputs/` | any time |
| B9 | Hero model: transparent cut-outs, 2000 px tall, 2–3 poses (current image is 768 px, slightly soft on sharp phones) | Hero sharpness | `design/inputs/` | Fri 20 Nov |
| B10 | Lead handling (Q10): team chat (Slack free?), sales email, CRM (HubSpot Free?), who answers leads | Lead alerts | lead chat | Fri 20 Nov |

## Do (accounts, installs)

| # | What | Why | How | Deadline |
|---|---|---|---|---|
| C0 | To see the Nepali page locally, add `ENABLED_LOCALES=en,ne` to your `.env` (the team doesn't edit your `.env`) | Without it, /ne returns 404 on your Mac | Open `.env`, add the line, restart `pnpm dev` | today |
| C1 | Install Docker Desktop (free) | Needed for the CMS admin (`/admin`) and the local database | Guide ready: `docs/runbooks/local-dev-mac.md` (free for businesses < 250 staff and < USD 10M revenue) | Mon 9 Nov |
| C2 | Push the commits to GitHub (`git push`) | First CI run; proves the build pipeline | `git push origin main` | Mon 16 Nov |
| C3 | Move admmis.org DNS to Cloudflare Free (whole domain; Free plan can't move only `tech.`). First tell raj: where admmis.org is registered, who runs its DNS today, and whether DNSSEC is on | Staging/production, SSL, spam protection | Guide ready: `docs/runbooks/dns-cloudflare.md` (≈ 1 h for you + up to 24 h waiting; email records kept) | registrar info Fri 13 Nov; move by Mon 23 Nov |
| C4 | Free account setup actions (Cloudflare, Sentry, uptime monitor, Bitwarden…) | Infra | revised list in raj's v0.2 runbook, Tue 10 Nov | Mon 23 Nov |

## Answered (last 7 days)

| Date | Item | Answer |
|---|---|---|
| 2026-11-07 | A2 Voice-and-tone guide | Approved |
| 2026-11-07 | A3 Homepage copy | Approved (gaps B1–B7 still open) |
| 2026-11-07 | A4 Logo redraw | Accepted; vector original swapped in later if it exists (B8) |
| 2026-11-07 | A5 Remove unused `AGENTS.md` | Yes |
| 2026-11-07 | A10 Homepage heading | Sudip's version: "Software, apps and AI built in Nepal" + eyebrow "Software development company, Nepal" |
| 2026-11-07 | Soft launch | As early as possible, target ≤ Mon 14 Dec; Sprint 2 pulled forward |
| 2026-11-07 | A1 Homepage | Approved; add EN/नेपाली switch + Nepali homepage now (ADR-041) |
| 2026-11-07 | Gate 1 | PASSED with PM recommendations → ADR-030..040 |
| 2026-11-07 | Brand direction | Sindoor Studio layout in ADMMIS colours (ADR-031) |
| 2026-11-07 | Spending | Free services only (ADR-037) |
| 2026-11-07 | DNS owner (Q17) | Roshan manages admmis.org |
| 2026-11-07 | Brand files (Q18) | Signboard, ADMMIS.TECH logo PNG, 3 model images in `design/inputs/` |
| 2026-11-07 | Copywriter | AI writer joins (ADR-038) |
| 2026-11-07 | Disk space | 100 GB freed |
| 2026-11-06 | Scaffold, sitemap, prices admin-only, auto-reply, one repo/brand at build time, font list | ADR-024..029 |
