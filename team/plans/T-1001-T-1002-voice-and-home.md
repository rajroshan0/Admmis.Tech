# Plan — T-1001 Voice guide + T-1002 Homepage copy (writer)

**Goal:** a one-page voice guide for Roshan's approval, and finished homepage copy keyed by section and field so Satish and Mahendra can map it 1:1 to message keys.

**Inputs read:** CLAUDE.md, writer role file, inbox (empty), docs/company-info.md, seo/sitemap.md, seo/keyword-map.md, docs/pricing-model.md, docs/decisions.md (ADR-004/012/014/018), design/brand-directions/01-sindoor-studio.html, docs/reference-fittin.md §3.4 (structure only).

**Approach:** voice guide first, then home.md in the requested section order, then microcopy. Count words per field by script against limits (hero headline ≤8, sub ≤25, card text ≤30).

**Deliverables:** `content/voice-and-tone.md`, `content/pages/home.md`, `content/microcopy.md`, `team/reports/T-1002-home-copy.md`.

**Acceptance:** limits met; title ≤60 and meta ≤155 chars; no invented facts or prices; every link is a sitemap URL; every unknown is `TODO(roshan)`.

**Assumptions:**
- ASSUMPTION: Sharwan's limits not yet received; using role-file limits.
- ASSUMPTION: the pricing model names no price ids yet, so no `{{price:…}}` placeholders appear on home.
- ASSUMPTION: Home title avoids "web development company" (cannibalisation rule, keyword-map §4).

**Risks:** claims in whyUs that depend on Gate 1 decisions (public prices, rental terms) are marked.
**Estimate:** about 3 hours.
