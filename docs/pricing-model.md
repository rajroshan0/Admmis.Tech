# Pricing model — PM proposal (for approval at Gate 1, Fri 13 Nov)

**Decided (ADR-018):** every service is charged separately, and the price depends on the client's company size.
**Proposed below:** the size bands, the price for each band, and the rental terms. Numbers are a starting point for Roshan to adjust.

## 1. Company size bands

| Band | Who | How we decide |
|---|---|---|
| **S — Micro / starter** | Shops, freelancers, startups, 1–10 staff | Staff count or annual turnover below NPR 1 crore |
| **M — Small business** | 11–50 staff, small chains | Turnover NPR 1–10 crore |
| **L — Medium business** | 51–250 staff, regional brands | Turnover NPR 10–50 crore |
| **XL — Large / international** | 250+ staff, enterprises, foreign clients | Quote |

The client chooses the band on the pricing page; sales confirms on the first call.

## 2. Rental services — monthly price per band (NPR, USD for international)

Anchor: Roshan's **NPR 100,000/month** = band L (medium business).

| Service on rent | S | M | L | XL |
|---|---|---|---|---|
| Website on rent (ready-made site, hosting, updates, support) | 25,000 | 50,000 | 100,000 | from 180,000 / quote |
| AI agent on rent (one agent, one channel, knowledge base) | 30,000 | 60,000 | 100,000 | quote |
| Marketing on rent (social + content + ads management, ad spend extra) | 35,000 | 60,000 | 100,000 | quote |
| Team on rent — **priced per person**, not per band | Senior engineer ≈ 180,000 · Designer ≈ 150,000 · QA ≈ 120,000 per person/month | | | |

USD for international clients: shown separately (suggest ≈ NPR ÷ 150 × 1.3, i.e. international pricing ~30% higher).

**Why team rental is per person:** one senior costs us ≈ NPR 120,000/month. Selling at 180,000 gives ~33% margin. A fixed 100k for a whole team would lose money.

## 3. Rental terms (proposal — still needed from Roshan)

| Term | Proposal |
|---|---|
| Setup fee (one-time) | Website: 1× monthly price · AI agent: 1× monthly price · Team: none |
| Minimum term | 6 months (12 months = 10% discount) |
| Included support | S: 4 h/month · M: 8 h · L: 16 h. Extra work at hourly rates |
| Critical issue response | Within 4 working hours (L: 1 hour) |
| Payment | Monthly in advance; NPR via bank / eSewa / Khalti; USD via bank transfer or Wise |
| If the client leaves | Content and domain are always theirs. **Code buyout** option = 6× monthly price |
| Not included (shown on the page) | Payment-gateway fees, SMS, ad spend, paid plugins, new custom features |

## 4. Project work (not rental)
- Small fixed packages with public prices (landing page, audit, logo + brand kit, SEO audit…) — list to be agreed at Gate 1.
- Larger projects: "Request a quote", with a budget guide table ("from NPR …").
- Hourly rates per role (NPR + USD), including **AI prompt engineer**.

All prices are stored once in the CMS (`pricingPackages`, `rentalPlans`, `hourlyRates`) — ADR-014.
