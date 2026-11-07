# Report — T-1001 Voice and tone guide, T-1002 Homepage copy (writer)

**Date:** 2026-11-07 · **Status:** done, in `review`

## Deliverables
- `content/voice-and-tone.md` (status review, for Roshan)
- `content/pages/home.md` (status review; sections header, hero, services, rent, whyUs, process, work, pricingTeaser, event, faq, finalCta, footer, stickyBar; format `field: text`)
- `content/microcopy.md` (common, faq, sticky bar labels)

## Verification (by script)
| Check | Result |
|---|---|
| Title | 51 characters (limit 60) |
| Meta description | 136 characters (limit 155) |
| Hero headline | 6 words (limit 8) |
| Hero sub-headline | 19 words (limit 25) |
| Card, intro and FAQ answer text | all 30 words or fewer (one FAQ answer was 31, trimmed) |
| Average sentence length | 12.4 words |
| Links | all internal links are URLs in `seo/sitemap.md` |
| Prices | none typed; pricing model names no price ids, so no `{{price:…}}` used |
| Invented facts | none: no years, team size, client counts, awards, results |

## ASSUMPTIONS
- Sharwan's per-section limits not received; used role-file limits.
- Title avoids "web development company" (keyword-map cannibalisation rule).
- Case teasers describe only what the project title says; the client type and results are TODO.
- whyUs "Prices you can see" depends on Gate 1 approval of public prices. FAQ "on rent" and "outside Nepal" answers follow ADR-012/018 and README §2.
- Hero image alt text updated (PM request) to match `design/inputs/female sari.jpeg`: smiling woman in a maroon sari with a gold border, talking on a mobile phone.

## TODO(roshan) batch
1. Confirm the PAN (12 digits on file, Nepal PANs have 9). Not published.
2. Is "Registered in Nepal" correct?
3. Is Janaki Chowk, Janakpurdham-3 also the ADMMIS.TECH address?
4. Which phone number(s) to publish for ADMMIS.TECH?
5. WhatsApp number for the click-to-chat link.
6. ADMMIS.TECH social accounts (the ones on file are ADMMIS.FASHION).
7. Opening event venue, city, start and end time.
8. Case studies 1 to 4: client type or anonymised name, what it does, result numbers, permission to show, screenshots.
9. FAQ: typical project time for a website, app and AI agent.
10. FAQ: confirm ownership terms (content and domain yours; code buyout).
11. FAQ: confirm support terms after launch (hours, response time, channels).
12. Voice guide: OK to promise "we reply the same working day"? Currently not used on the site.

## Fix round 1 (sudip T-707 review, PM request, 2026-11-07 11:15 MSK)
Changed in `content/pages/home.md`: meta description (136 chars, now contains "software development company in Nepal"); hero.eyebrow; hero.headline (alternative kept in a comment, pending Roshan A10); services.title; "FAQ /faq" removed from footer.columns[2].links; whyUs points[2].text no longer mentions WhatsApp; new `services.cards[n].linkLabel` (9 keys).
Re-checked: title 51, meta 136, eyebrow 35 chars, headline 36 chars and 7 words, all limits met, no `/faq` left. Note: finalCta.ctaSecondary ("Chat on WhatsApp") and stickyBar.whatsapp still depend on Roshan's WhatsApp number (TODO already listed).
