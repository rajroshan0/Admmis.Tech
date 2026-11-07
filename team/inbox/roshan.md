# Inbox — roshan

Append-only. Format and rules: CLAUDE.md §5. Newest at the bottom.

Only the PM writes here (APPROVAL / DECISION requests). Roshan: reply in the lead chat, or add a line
`→ Roshan YYYY-MM-DD: <answer>` under the request.


### 2026-11-06 12:20 MSK · pm → roshan · T-601, T-602 · REQUEST
Brand inputs needed for Gate 1 (Fri 13 Nov):
1. ADMMIS logo (SVG), brand colours (hex), fonts (Q18) — blocks T-601 "AT" logo. Needed by: Tue 10 Nov.
2. Hero sari-model files (PNG ≥ 2000 px, 2–3 poses, ADR-009) — T-602 runs on a placeholder until then. Needed by: Wed 11 Nov.
Suggested drop location: `design/inputs/` (or send them in chat).
Impact if late: logo concepts shown at Gate 1 on assumed colours/type only; hero compositions shown with silhouettes.
Reply: in lead chat or `→ Roshan YYYY-MM-DD: …` below

### 2026-11-06 13:50 MSK · pm → roshan · T-101 · DECISION
Two technical choices from hritik's T-101 plan (team/plans/T-101-repo-foundation.md) that would become ADRs:
1. Node.js 24 LTS pinned (Payload 3.93 supports ^22.23 or >=24.22; 26 is the newer LTS). Recommendation: YES — inside Payload's supported range, long support window.
2. Single Next.js app with Payload embedded, no monorepo; rental clients reuse it as one repo with a per-deployment brand config (ADR-013). Recommendation: YES — fewer tools, fits ADR-003 "one codebase, one deploy".
Impact if NO: monorepo adds ~1–2 days of tooling setup in week 2.
Needed by: Fri 13 Nov (Gate 1) · Team proceeds assuming YES
Reply: in lead chat or `→ Roshan YYYY-MM-DD: …` below
→ Roshan 2026-11-06 (lead chat, recorded by pm 18:55 MSK): Item 2 APPROVED as "one repo, brand fixed at build time, one Docker image per client" → ADR-027. Item 1 (Node 24) not answered explicitly; T-103 approval covers the scaffold plan, which pins Node 24 → team proceeds on Node 24, PM asks for explicit confirmation at Gate 1.

### 2026-11-06 17:45 MSK · pm → roshan · T-401, T-402 · DECISION
Items from the CMS / lead API design (docs/api/). None blocks this week; full list goes into the Gate 1 pack.
1. Only admins may change prices (editors cannot). Recommendation: YES. Needed: Gate 1.
2. Q10: team chat tool, sales email, CRM (HubSpot Free proposed), who answers leads. Each provider is a data processor → named in the privacy policy, account needs your approval. Needed: Fri 20 Nov.
3. Lead retention period. Proposed 24 months. Needed: Gate 2.
4. Auto-reply email to people who submit the form? Recommendation: YES (plain confirmation, no marketing). Needed: Gate 2.
5. Circuit breaker N = 20 unverified leads/hour when Cloudflare Turnstile is down. Recommendation: accept. Needed: Gate 2.
6. UTM capture (first-party sessionStorage) before cookie consent. Recommendation: allowed for EN launch, re-check with privacy review. Needed: Gate 2.
Reply: in lead chat or `→ Roshan YYYY-MM-DD: …` below
→ Roshan 2026-11-06 (lead chat, recorded by pm 18:55 MSK): 1 YES (only admins change prices) → ADR-025. 4 YES (auto-reply email) → ADR-026. 3 retention, 5 circuit breaker, 6 UTM: DEFERRED — put in the Gate 1/Gate 2 pack with options; Roshan decides then. 2 (Q10) still open.

### 2026-11-06 20:00 MSK · pm → roshan · T-101, T-202 · DECISION (addendum to 13:50 item 2)
Detail of the "one repo, brand per deployment" proposal: the brand is fixed at BUILD time, so each rental client gets its own Docker image built from the same commit (not one image with a runtime switch). Cost: one extra CI build per client per release (minutes, no money at our scale). Benefit: each client site ships only its own CSS/fonts (performance budget). Recommendation: accept as part of item 2.
Also for Q16 (rental scope): rental clients choose fonts from a short approved list (free Google Fonts with Devanagari), no custom font uploads. Recommendation: YES.
Reply: in lead chat or `→ Roshan YYYY-MM-DD: …` below
→ Roshan 2026-11-06 (lead chat, recorded by pm 18:55 MSK): Build-time brand, one image per client: APPROVED → ADR-027. Fonts from an approved list: YES → ADR-028. Team-on-rent pricing (pricing-model.md, Q16): DEFERRED to the Gate 1/Gate 2 pack with options.

### 2026-11-06 18:55 MSK · pm → roshan · T-103, T-702 · APPROVAL (record of lead-chat answers)
Recorded from Roshan's message in the lead chat, 2026-11-06:
1. T-103 app scaffold: APPROVED now (not after Gate 1). Scope: Next.js + Payload + Tailwind, pnpm, `.env.example`, docker compose for Postgres, README "Getting started", runnable locally with `pnpm dev`. No deploy, no accounts. → ADR-024.
2. Sitemap (seo/sitemap.md §6 calls 1, 2, 5): YES to /rent hub + 3 separate rental pages; YES to merging Development + Websites into web-development and adding a custom-software/SaaS page; NO standalone /faq at launch (FAQ blocks on pages only). → ADR-029.
→ Roshan 2026-11-06 (lead chat, recorded by pm): approved as above.

### 2026-11-06 19:17 MSK · pm → roshan · T-901 · APPROVAL
Gate 1 pack ready: docs/gates/gate-1.md (tech review: docs/gates/gate-1-tech-review.md). Questions grouped A–G with options and recommendations, incl. the items you deferred today (team-on-rent pricing E2, retention F1, circuit breaker F2, UTM F3) and new ones: migrations C1, browser error monitoring C2, AGENTS.md C3, hosting D1–D7 (Lightsail Mumbai ≈ USD 36–40/mo with staging), test phones G2.
Needed by: Fri 13 Nov 15:00 MSK · Reply: in lead chat or `→ Roshan YYYY-MM-DD: …` below

### 2026-11-07 10:38 MSK · pm → roshan · T-901 · APPROVAL (record of lead-chat answers)
→ Roshan 2026-11-07 (lead chat, recorded by pm): **Gate 1 PASSED** with PM recommendations → ADR-030..040:
brand Direction 1 in ADMMIS colours (ADR-031) · migrations at app start (ADR-032) · Sentry server-side (ADR-033) ·
AGENTS.md disabled (ADR-034) · backups as proposed (ADR-035) · lead options F1–F3 A (ADR-036) · free services only,
you manage DNS (ADR-037) · writer replaces copywriter hire (ADR-038) · QA/go-no-go approved (ADR-039) · Scrum (ADR-040).
Still open: pricing E1–E3 (1-page summary due Tue 10 Nov, T-904), hosting provider (free option first, T-503), G2 test phones, Q10.

### 2026-11-07 11:19 MSK · pm → roshan · US-401 · APPROVAL (record of lead-chat answer)
→ Roshan 2026-11-07 (lead chat, recorded by pm): homepage APPROVED. Add a language change option → chosen: EN / नेपाली switch + Nepali homepage now, other pages English until ~Feb → ADR-041.

### 2026-11-07 15:55 MSK · pm → roshan · ROSHAN-TODO · APPROVAL (record of lead-chat answers)
→ Roshan 2026-11-07 (lead chat, recorded by pm): A2 voice-and-tone guide APPROVED · A3 homepage copy APPROVED · A4 logo redraw ACCEPTED · A5 remove `AGENTS.md` YES · A10 homepage heading = sudip's version ("Software, apps and AI built in Nepal", eyebrow "Software development company, Nepal"). Also: soft launch as early as possible (target ≤ Mon 14 Dec); Sprint 2 work pulled forward in this order: language switch → template designs → service + rent templates → CMS collections → service copy → QA.
