# Roshan's to-do list

Owner: pm · Rebuilt 2026-11-07 (Sat) after the day-1 build · Sorted by deadline within each section.
Reply in the lead chat, e.g. "A1 yes, A2 option A, B3: +977 98…". PM records your answers and moves them to **Answered**.

## Approve / decide

| # | What | Why it matters / what it blocks | Options + PM recommendation | Where to see it | Deadline |
|---|---|---|---|---|---|
| A1 | Look at the homepage and accept it or list the changes you want | This is the base for every other page | Accept, or say what to change (colours, text, layout) | `pnpm dev --port 3100` → http://localhost:3100 · screenshots in `team/reports/assets/` | Sun 8 Nov |
| A2 | Approve the voice-and-tone guide | All copy follows it | Recommend: approve | `content/voice-and-tone.md` | Sun 8 Nov |
| A3 | Approve the homepage copy | It goes live as written | Recommend: approve; fill the gaps in B1–B7 | `content/pages/home.md` | Sun 8 Nov |
| A4 | Accept the logo redraw of your PNG | Used in header, footer, favicon | Recommend: accept now, swap in your vector original later if one exists (B8) | `design/logo/index.html` | Sun 8 Nov |
| A10 | Homepage heading: sudip (SEO) suggests "Software, apps and AI built in Nepal" with the eyebrow "Software development company, Nepal" | Puts the main search phrase on the page | Recommend: sudip's version (applied after QA today); alternative: "Software development company in Nepal" | `team/inbox/writer.md` (sudip 11:00) | Sun 8 Nov |
| A5 | OK for the unused `AGENTS.md` file to be removed automatically (you chose "disable" at Gate 1) | Next.js removes it on the next `pnpm dev`; it is untracked and contains only generated text | Recommend: yes | repo root `AGENTS.md` | Sun 8 Nov |
| A6 | Prices: bands, rental prices, team-on-rent option, terms (P1–P6) | Pricing and rent pages. Team-on-rent may be **3–4× underpriced for foreign clients** | Recommend: P1–P4 yes, team option A + a separate USD rate card | `docs/pricing-summary.md` | Fri 13 Nov |
| A7 | Budget plan and team pay model (Q19, Q20) | Real cash plan | Free-services-only for now (ADR-037) | `docs/budget.md` | Fri 13 Nov |
| A8 | Free host proposal (raj delivers Tue 10 Nov) | Staging server; soft launch 14 Dec depends on it | PM will recommend after raj's comparison | `docs/runbooks/infra-setup.md` (v0.2, Tue) | Mon 23 Nov latest |
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
| B8 | Vector original of the ADMMIS.TECH logo (SVG/AI/CDR/Canva), if it exists | We use a careful redraw meanwhile | `design/inputs/` | any time |
| B9 | Hero model: transparent cut-outs, 2000 px tall, 2–3 poses (current image is 768 px, slightly soft on sharp phones) | Hero sharpness | `design/inputs/` | Fri 20 Nov |
| B10 | Lead handling (Q10): team chat (Slack free?), sales email, CRM (HubSpot Free?), who answers leads | Lead alerts | lead chat | Fri 20 Nov |

## Do (accounts, installs)

| # | What | Why | How | Deadline |
|---|---|---|---|---|
| C1 | Install Docker Desktop (free) | Needed for the CMS admin (`/admin`) and the local database | https://www.docker.com/products/docker-desktop/ — raj sends a short note Mon 9 Nov | Mon 9 Nov |
| C2 | Push the commits to GitHub (`git push`) | First CI run; proves the build pipeline | `git push origin main` | Mon 16 Nov |
| C3 | Move admmis.org DNS to Cloudflare Free | Staging/production, SSL, spam protection | raj's step-by-step guide arrives Mon 9 Nov (`docs/runbooks/dns-cloudflare.md`) | after the guide |
| C4 | Free account setup actions (Cloudflare, Sentry, uptime monitor, Bitwarden…) | Infra | revised list in raj's v0.2 runbook, Tue 10 Nov | Mon 23 Nov |

## Answered (last 7 days)

| Date | Item | Answer |
|---|---|---|
| 2026-11-07 | Gate 1 | PASSED with PM recommendations → ADR-030..040 |
| 2026-11-07 | Brand direction | Sindoor Studio layout in ADMMIS colours (ADR-031) |
| 2026-11-07 | Spending | Free services only (ADR-037) |
| 2026-11-07 | DNS owner (Q17) | Roshan manages admmis.org |
| 2026-11-07 | Brand files (Q18) | Signboard, ADMMIS.TECH logo PNG, 3 model images in `design/inputs/` |
| 2026-11-07 | Copywriter | AI writer joins (ADR-038) |
| 2026-11-07 | Disk space | 100 GB freed |
| 2026-11-06 | Scaffold, sitemap, prices admin-only, auto-reply, one repo/brand at build time, font list | ADR-024..029 |
