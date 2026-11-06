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
