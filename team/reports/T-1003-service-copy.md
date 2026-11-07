# T-1003 service copy: report (writer)

Status: DONE (draft, review). Date: 2026-11-07.

## Files
- content/pages/services.md (hub)
- content/pages/services/web-development.md, ai-agents.md, mobile-app-development.md, outstaffing.md, digital-marketing.md
- Housekeeping: home.md and voice-and-tone.md set to `approved`; the "ALTERNATIVE (pending Roshan)" comment removed from home.md.

## Format
`field: text`, field names from design/templates/service-spec.md section 5 (5.1 service, 5.2 hub). Limits respected: card/benefit text ≤ 120 chars, steps ≤ 110, FAQ answers ≤ 45 words. Prices never typed. SEO titles, metas, H1s and subs are sudip's, unchanged.

## Deviations to know
1. FAQ answers are ≤ 45 words (spec 280 chars), not sudip's 40 to 80. Layout limit wins; sudip please accept.
2. Card counts: layout allows 4 or 6, not 5. Outstaffing roles (5 in brief) and marketing services (5 in brief) were merged to 4.
3. Section groups the spec does not list (industries, channels, how-it-works, compare table, examples) are extra fields. Mahendra: build only what the template supports; the rest can wait for a template update (ask sharwan).
4. Meta descriptions: mobile names Flutter and React Native; marketing says "free quote"; outstaffing says "in your time zone". All are unconfirmed facts. Roshan to confirm or sudip to reword.

## Open TODO(roshan) (grouped)
- WhatsApp number (all pages)
- Typical times per service and per step; reply-time promise in the form
- Ownership terms (website, domain, app code, store accounts, IP); support terms; trial/replacement terms
- Tech facts: client-site stack, Flutter / React Native / native shipped, payment gateways (eSewa, Khalti), models and data hosting for AI agents, tools used for teams
- Whether our AI agents speak Nepali
- Case results and permission to show (3 AI cases, 1 e-commerce); a sample marketing report
- SEO timing message, account ownership, ad money handling, contract lock-in (marketing)
- Team: roles and seniority we can supply, NDA and legal wording (needs legal review)

## Not done
Remaining 4 service pages (custom-software, qa-testing, audit, offline-marketing) are P1; not in this batch.

## Update 2026-11-07 (T-708 fixes, T-1003b, T-1005)
- T-708 applied: 3 metas reworded (mobile, marketing, outstaffing), matching comments removed. "Staff augmentation" and "offshore development" each appear once in the outstaffing intro. The 6 service files and the hub are `status: reviewed`.
- T-1003b: content/pages/services/{custom-software,qa-testing,audit,offline-marketing}.md. Offline: no portfolio claimed; cases hidden until Roshan supplies real ones.
- T-1005: content/pages/rent.md and content/pages/rent/{website,ai-agent,team}.md. Format per design/templates/rent-spec.md section 5. No price typed. All terms (setup fee, minimum term, support hours, cancellation, code buyout, ownership) are TODO(roshan); the band staff ranges are marked as a proposal.
- Deviations: rent/ai-agent has 4 "what it can do" cards and rent/team has 4 role cards where the template wants 3 or 6 (noted in the files; ask sharwan/satish). Rent pages carry extra fields (channels, compare text, intro) beyond the spec.
- New TODOs: approved rental terms (pricing-model section 3), plan inclusions per product, Nepali support for AI agents, report/checklist samples for audit, printing and cities for offline, tools and devices for QA.
- Not run: typo and link check.
