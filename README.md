# ADMMIS.TECH — Company Website (tech.admmis.org)

Marketing website for **ADMMIS.TECH** (`tech.admmis.org`), the technology and marketing agency of ADMMIS (registered as a sub-organisation of ADMMIS).
Structure and UX are loosely inspired by fittin.ru. All brand, copy, photos and design are original.

> **This README is the single source of truth.** Every decision, architecture change, tool and status update is recorded here or in `/docs`, and linked from here.
> Rule for everyone: if it isn't in the repo, it wasn't decided.

---

## 1. Project at a glance

| Item | Value |
|---|---|
| Launch | **1 January 2027** — public launch at the opening event |
| Soft launch (live, unannounced) | 29 December 2026 |
| Language at launch | English. Nepali added ~February 2027 (earlier if time allows) |
| Final approval | Roshan (Founder + CTO), within 12 hours; tech review by Hritik |
| Repository | https://github.com/rajroshan0/Admmis.Tech |
| Daily standup | 10:00 MSK / 12:45 NPT |
| Project manager | Claude (PM) — single point of contact between team and stakeholders |
| Status | 🟢 Kickoff Mon 9 Nov 2026 — team confirmed, stack approved |

## 2. What the company sells (site scope)

- **Development:** websites, web platforms, mobile apps (any tech: Flutter, React Native, native), SaaS
- **AI:** AI products, AI agents, chatbots, AI integrations
- **Quality & audit:** QA/testing, code audit, UX/UI audit, SEO audit
- **Outstaffing:** dedicated developers, designers, QA, DevOps on contract
- **Marketing:** digital (SEO, social media, paid ads, influencer/affiliate) and offline (events, print, BTL)
- **On rent (monthly subscription, from launch):** website on rent · AI agent on rent · team on rent — priced **by company size**, each service separately (ADR-018, proposal in [docs/pricing-model.md](docs/pricing-model.md))

**Target clients:** Nepali SMEs, retailers and small businesses, plus international clients outsourcing to Nepal (Asia, Europe, Americas).

**Pricing on site:** fixed packages for smaller services in **NPR and USD**; "Request a quote" for larger projects.

## 3. Tech stack (decided — see [ADR-003](docs/decisions.md))

| Layer | Choice |
|---|---|
| Language | TypeScript on **Node.js** (one language for the whole site) |
| Frontend | Next.js (App Router), static generation + ISR, Tailwind CSS |
| CMS / admin | Payload CMS (runs inside the same Next.js app) |
| Database | PostgreSQL |
| Media storage | Cloudflare R2 (S3-compatible) |
| CDN, DNS, WAF, spam protection | Cloudflare (+ Turnstile on forms) |
| Hosting | VPS in Mumbai region (production + staging), Docker, GitHub Actions CI/CD, backups every 24 h, 2FA everywhere |
| Lead alerts | Email + team chat, WhatsApp click-to-chat for visitors |
| Analytics | Google Analytics 4, Meta Pixel, Microsoft Clarity (behind cookie consent) |
| Monitoring | Sentry (errors), uptime monitor |

Details: [docs/architecture.md](docs/architecture.md)

## 4. Documents

| File | What's in it |
|---|---|
| [docs/project-history.md](docs/project-history.md) | Full story from the first request to today: every step, finding and decision |
| [docs/kickoff-pack.md](docs/kickoff-pack.md) | Start plan, questions per person, stakeholder brief, kickoff agenda, team message, hiring briefs |
| [docs/decisions.md](docs/decisions.md) | Decision log (ADRs): every approved decision, who approved, when |
| [docs/architecture.md](docs/architecture.md) | System diagram, components, lead pipeline, content model, performance rules |
| [docs/timeline.md](docs/timeline.md) | 8-week plan to 1 Jan, milestones, approval gates |
| [docs/team-and-tools.md](docs/team-and-tools.md) | Roles, responsibilities, tools and accounts |
| [docs/budget.md](docs/budget.md) | Budget: where the money goes, cash-flow by month, week-1 payments |
| [docs/pricing-model.md](docs/pricing-model.md) | Client pricing: size bands, rental prices, terms (proposal) |
| [docs/progress-log.md](docs/progress-log.md) | Dated log of progress, blockers, changes |
| [docs/open-questions.md](docs/open-questions.md) | Questions waiting on stakeholders |
| [CLAUDE.md](CLAUDE.md) · [team/](team/) | AI team: rulebook, role files (`.claude/agents/`), task board, inboxes — start with [team/START-TEAM.md](team/START-TEAM.md) |
| [docs/reference-fittin.md](docs/reference-fittin.md) | Full study of fittin.ru: pages, features, pricing, what we adopt |
| [docs/references/](docs/references/) | Raw reference material (e.g. the ChatGPT analysis we compared against) |

## 5. How we work

- **Tasks:** GitHub Projects board. Every task is an issue; every change is a pull request.
- **Decisions:** proposed in an issue → approved by CTO + Founder → recorded in `docs/decisions.md` in the same PR.
- **Rituals:** daily standup 15 min (10:00 NPT) · sprint demo every second Friday · weekly status note in `docs/progress-log.md` (Fridays).
- **Branches:** `main` = production, `staging` = staging site, feature branches `feat/…`, `fix/…`.
- **Definition of done:** reviewed PR, passes CI (lint, types, tests, Lighthouse budget), works on a low-end Android phone, docs updated if behaviour changed.

## 6. Getting started (developers)

Requirements: Node 24 LTS (`nvm use`, version in `.nvmrc`), pnpm 12 (`corepack enable`, version pinned in `package.json`), Docker (for the local database). About 1.5 GB of free disk for `node_modules` and the pnpm store.

```bash
nvm use                                   # Node 24
corepack enable                           # provides the pinned pnpm
pnpm install --frozen-lockfile
cp .env.example .env                      # then set PAYLOAD_SECRET (32+ random characters)
docker compose -f docker-compose.dev.yml up -d   # Postgres 17 on 127.0.0.1:5432
pnpm dev                                  # http://localhost:3000
```

| URL | What |
|---|---|
| `/` | Public site (placeholder page until templates land) |
| `/admin` | Payload CMS. The first account you create becomes `admin` |
| `/api/health` | Liveness check (`{"status":"ok","sha":"dev"}`) |

Quality commands (CI runs the same): `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm format:check`, `pnpm build`. All script names: `docs/standards.md` §14. `.env` is never committed; `.env.example` lists names and safe placeholders only. In dev, Payload creates tables automatically; migrations come with the content model (neha).
