# Inbox — writer

Append-only. Format and rules: CLAUDE.md §5. Newest at the bottom.


### 2026-11-07 10:40 MSK · sharwan → writer · T-603 · REQUEST
I read content/pages/home.md: the structure matches my layout 1:1, no section changes. Text-length limits for the home design (EN; allow +30% for Nepali). Spec will be design/homepage/home-spec.md, mock design/homepage/home.html (uses your current copy).
Header: nav label ≤ 14 chars; CTA ≤ 16 chars. Hero: eyebrow ≤ 40 chars; H1 ≤ 8 words and ≤ 40 chars (fits 3 lines at 360 px); sub ≤ 25 words / 150 chars; CTAs ≤ 22 chars each. Section title (all) ≤ 8 words / 50 chars; section intro ≤ 25 words / 150 chars. Service cards (9): title ≤ 22 chars, text ≤ 16 words / 100 chars. Rent cards (3): title ≤ 22 chars, text ≤ 18 words / 110 chars. Why us (4): title ≤ 28 chars, text ≤ 20 words / 120 chars. Process (4): title ≤ 18 chars, text ≤ 18 words / 110 chars. Work cards (4): title ≤ 45 chars, text ≤ 16 words / 100 chars, result line ≤ 40 chars (a number + unit, e.g. "x hours saved", only when real and approved). Pricing teaser: text ≤ 35 words / 220 chars. Event: title ≤ 6 words, text ≤ 20 words / 120 chars, date/venue/time lines ≤ 40 chars each. FAQ: question ≤ 70 chars, answer ≤ 45 words / 280 chars (home shows 6). Final CTA: title ≤ 8 words, text ≤ 20 words. Sticky bar labels ≤ 10 chars. Footer about ≤ 20 words.
Your current copy already fits except: services.cards[8].text (~17 words) and rent.cards[1].text (~18 words, ok) — trim the first by 2 words if you can. Reply: not needed.

### 2026-11-07 10:38 MSK · pm → writer · ADR-030..040 · FYI
Gate 1 PASSED today. New ADRs in docs/decisions.md: 031 brand = Sindoor Studio layout in ADMMIS colours · 032 migrations at app start · 033 Sentry server-side only · 034 AGENTS.md disabled · 035 backups · 036 leads (24 mo, N=20/h, UTM pre-consent) · 037 **free services only (USD 0)** · 038 writer joins (owns content/) · 039 go/no-go approved · 040 **Scrum, 1-week sprints**. Your Sprint 1 tasks are in team/sprints/sprint-1.md (your section) and team/BOARD.md. Backlog: team/BACKLOG.md. Release plan (soft launch target Mon 14 Dec): team/RELEASE-PLAN.md.
Needed by: n/a · Reply: not needed

### 2026-11-07 11:00 MSK · sudip → writer · T-707 / T-1002 · REVIEW
SEO check of content/pages/home.md against seo/keyword-map.md (primary keyword: software development company Nepal). Verdict: title and meta are good; the keyword is missing from everything the visitor reads. Changes below; all fit sharwan's limits (H1 ≤ 8 words / 40 chars; eyebrow ≤ 40 chars).
1. Title (51 chars): KEEP "Software Development Company in Nepal | ADMMIS.TECH". It starts with the keyword.
2. Meta description (136 chars): REWRITE so the phrase appears in it. New (136 chars): "ADMMIS.TECH is a software development company in Nepal. We build websites, apps and AI agents and run your marketing. Get a quote today." The "pay by project or monthly" idea stays on the page (pricing teaser, rent section).
3. Which element carries the keyword? Split it. The EYEBROW carries the exact phrase, the H1 stays a human benefit line with a close variant. Reason: an H1 that reads "Software development company in Nepal" is correct but flat, and the hero is our one chance to speak to a small-business owner; the title tag, the eyebrow and the H2 below already give search engines the exact phrase. Exact-match in the H1 is not required for ranking; a clear H1 on the same topic is.
   - hero.eyebrow: "Software development company, Nepal" (35 chars)
   - hero.headline: "Software, apps and AI built in Nepal" (36 chars, 7 words). Replaces "Websites, apps and AI for Nepal": "software" is the core noun of the target phrase, and "built in" signals we are makers, not resellers.
   - hero.subheadline: keep. It already names website, app, AI agent and marketing.
   - Alternative if Roshan wants the exact phrase in the H1: "Software development company in Nepal" (37 chars, 5 words). Valid, but I do not recommend it.
4. H2s: services.title is "Everything your business needs online", which has no search term. Proposed: "Software development and marketing, in one team" (47 chars, 7 words). Other H2s are fine for conversion; do not stuff keywords into them. Keep "Know the cost before you start" (pricing intent) and "Questions we hear often".
5. Internal links: good. Home links to all 9 services, the 3 rent pages, /pricing, /work, /opening-event, /contact. Fixes:
   - footer.columns[2].links still lists "FAQ /faq". REMOVE. There is no /faq at launch (ADR-029); the link would 404. Also check nav and sitemap strings in messages for any /faq.
   - Anchor text: use descriptive anchors where space allows, for example card links "Website development" instead of "Websites", "Mobile app development" instead of "Mobile apps". Keep the card title short, but make the link or aria-label descriptive. Not blocking.
   - All four case cards link to /work (no case pages yet). Fine now; when case pages exist, link each card to its page.
6. Local signal, a QUESTION for Roshan (through pm): contact.address is Janakpurdham, while the keyword map uses "Kathmandu" modifiers. Do NOT write "Kathmandu" in home copy as our location unless we have a Kathmandu office. The current copy says only "Nepal" and mentions Kathmandu in the offline-marketing card (where the activity happens), which is acceptable.
7. FAQ: first question "How much does a website or app cost?" matches a real search. Keep the first six. The TODO(roshan) answers (timeline, ownership, support) are what a searcher wants; unanswered they make the FAQ weak. Please do not publish vague answers.
8. Length of page text is fine for a home page (no minimum). Do not add keyword paragraphs.
Needed by: Mon 9 Nov (so mahendra can wire title and meta) · Reply: tell me which of the two H1 options you adopt, or send objections

### 2026-11-07 15:58 MSK · pm → writer · T-1001, T-1002 · FYI
Roshan approved: voice-and-tone guide (A2), homepage copy (A3), and sudip's H1 "Software, apps and AI built in Nepal" (A10). Mark both files final and remove the "pending Roshan" note and the alternative-heading comment in content/pages/home.md at your next session. Next for you: T-1003 service copy (due Tue 10 Nov), then T-1005 rent copy.
Needed by: next session · Reply: not needed

### 2026-11-07 18:30 MSK · sudip → writer · T-708 · REVIEW
SEO review of T-1003 copy (services hub + 5 P0). Decisions on your three points, then fixes.
(a) Metas. None of the three claims is confirmed, so drop them. Replace `metaDescription` as follows:
- mobile-app-development: "Android and iPhone apps built in Nepal. Clear plan, clear price, support after launch. Get a quote." (98 chars). Also: keep Flutter/React Native in the compare table only as neutral explanation; the TODO(roshan) stays. Do not claim we have shipped them anywhere.
- digital-marketing: "SEO, social media, Facebook and Google ads and influencer campaigns for Nepali businesses. Clear plans, clear prices. Get a quote." (131)
- outstaffing: "Hire dedicated developers, designers, QA and DevOps from Nepal. Pay a clear monthly rate per person. Talk to us." (112). Keep the time-zone section as an overlap-of-hours explanation; "in your time zone" is out of the meta and H1/hero.
Also remove the matching "raise with sudip/Roshan" HTML comments once applied. I will update the three briefs to match.
(b) FAQ length: ACCEPTED. Answers may be 30 to 45 words (layout limit 280 chars wins over my 40 to 80). Each must still answer in its first sentence. Briefs for new pages use 30 to 45.
(c) Card counts: ACCEPTED, 4 cards on marketing and outstaffing. Keep the five secondary terms alive elsewhere: outstaffing roles card "QA and DevOps" already covers both; for marketing keep "Influencers and content" as one card. Check that "offshore developers" and "staff augmentation" each appear once in outstaffing body text (intro or detail1), since the card for them was merged away.
(d) FAQ JSON-LD rule is now in seo/sitemap.md §6 (for mahendra). Nothing to change in copy; do not shorten shared FAQs for markup.
Also: briefs for custom-software, qa-testing, audit, offline-marketing, rent/ai-agent, rent/team are in seo/briefs/ (status ready for writer).
Needed by: Mon 9 Nov · Reply: not needed

### 2026-11-07 20:00 MSK · sudip → writer · T-709 · REVIEW
SEO review of T-1003b/T-1005. Titles, H1s, FAQ lengths (all ≤ 45 words), FAQ counts, keyword placement, and "audit" ownership are OK. Fixes only for unconfirmed claims:
1. rent/website.md `metaDescription` -> "Get a ready-made, professional website on monthly rent in Nepal. Hosting and support in one monthly price. See plans and apply." (setup fee and "updates included" unconfirmed). `heroHeading` -> "Website on rent in Nepal: pay month by month". `heroSub`: drop "live fast" unless Roshan confirms a launch time.
2. rent.md `metaDescription` -> "Rent a ready-made website, an AI agent or a development team and pay every month. See plans by company size." (drop "No big payment at the start" until setup fees are confirmed).
3. rent/team.md `metaDescription` -> "Rent developers, designers or QA from Nepal on a monthly plan. Choose the roles you need and start with a short call." (rates may be quote-only; do not promise "see the monthly rate").
4. rent/ai-agent.md `metaDescription`: drop "set up for you" -> "Rent an AI agent for WhatsApp, Telegram or your website on one monthly plan. See plans and get started."
5. Briefs updated to match. All other fields: no change.
Needed by: Tue 10 Nov · Reply: not needed
### 2026-11-07 21:00 MSK · sudip → writer · T-705c · HANDOFF
Brief ready: seo/briefs/about.md (status ready for writer). Unknown facts are TODO(roshan); leave hidden sections empty.
Needed by: after current tasks · Reply: not needed

### 2026-11-07 21:00 MSK · sudip → writer · T-705c · HANDOFF
Brief ready: seo/briefs/contact.md (status ready for writer). Unknown facts are TODO(roshan); leave hidden sections empty.
Needed by: after current tasks · Reply: not needed

### 2026-11-07 21:00 MSK · sudip → writer · T-705c · HANDOFF
Brief ready: seo/briefs/opening-event.md (status ready for writer). Unknown facts are TODO(roshan); leave hidden sections empty.
Needed by: after current tasks · Reply: not needed

### 2026-11-07 21:00 MSK · sudip → writer · T-705c · HANDOFF
Brief ready: seo/briefs/work.md (status ready for writer). Unknown facts are TODO(roshan); leave hidden sections empty.
Needed by: after current tasks · Reply: not needed

### 2026-11-07 21:00 MSK · sudip → writer · T-705c · HANDOFF
Brief ready: seo/briefs/blog.md (status ready for writer). Unknown facts are TODO(roshan); leave hidden sections empty.
Needed by: after current tasks · Reply: not needed

### 2026-11-07 21:00 MSK · sudip → writer · T-705c · HANDOFF
Brief ready: seo/briefs/privacy.md (status ready for writer). Unknown facts are TODO(roshan); leave hidden sections empty.
Needed by: after current tasks · Reply: not needed

### 2026-11-07 21:00 MSK · sudip → writer · T-705c · HANDOFF
Brief ready: seo/briefs/terms.md (status ready for writer). Unknown facts are TODO(roshan); leave hidden sections empty.
Needed by: after current tasks · Reply: not needed

### 2026-11-07 21:00 MSK · sudip → writer · T-705c · HANDOFF
Brief ready: seo/briefs/cookies.md (status ready for writer). Unknown facts are TODO(roshan); leave hidden sections empty.
Needed by: after current tasks · Reply: not needed

### 2026-11-07 21:05 MSK · sudip → writer · T-705c · FYI
Launch blog topics (primary keyword, from seo/keyword-map.md §2; briefs when you reach them): (1) How much does a website cost in Nepal (2027) · "website cost in Nepal". (2) Outsourcing software development to Nepal: a buyer's guide · "outsource software development to Nepal". (3) Website on rent or buy: what suits a small business in Nepal · "website rental vs buying a website". Prices only from the CMS; no invented statistics.
Needed by: backlog · Reply: not needed
