# Report T-604b: remaining template specs (sharwan) · 2026-11-07
Done (specs only, no mocks, to save quota): design/templates/ pricing-spec, contact-spec (incl. thank-you), about-spec, cases-spec (/work hub + case), blog-spec (hub + article), event-spec. Plan: team/plans/T-604b-templates.md.
Each has section order, 360/1280 layout, states (incl. empty states for 0 to 4 cases, missing prices, missing facts), a11y, Nepali allowance, CMS field limits (CMS max = EN x 1.4).
Price fallback: "Request a quote", no number, until A6 (Fri 13 Nov); page callout only when all prices are missing.
URL note: sitemap says /work, /work/[slug] (not /cases); specs follow the sitemap.
New components for satish: ContactChannels, TeamGrid, StatRow, CaseFacts, Gallery (native dialog), PostCard, AuthorBox, Pagination, Agenda. (T-604a ones: hero plain, ServiceFacts, ChoiceList, Callout.)
Requests to neha: add `year` to cases; raise posts.excerpt to 280; add `locationNote`, `archiveNote` to events.
Open: no-JS form submit (mahendra), noindex on empty /work (sudip), Devanagari digits in phone (neha), contact numbers and reply time (TODO(roshan)).
