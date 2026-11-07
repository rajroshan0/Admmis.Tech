# Plan T-604a: service and rent template specs (sharwan) · FYI to pm, no wait
Goal: design specs builders can build from for service template, services hub, rent hub, rent product, reusing the homepage system (design/homepage/home-spec.md).
Inputs read: home-spec.md, home.html CSS, seo/briefs (services, rent, web-development, rent-website), templates-and-routes.md §3, component-inventory.md, decisions ADR-005/014/025/026-029, pricing-model.md.
Deliverables: design/templates/service-spec.md (service + hub), design/templates/rent-spec.md (rent hub + rent product), design/templates/service.html, rent.html (static mocks, 360 and desktop by resize).
Approach: reuse inventory components first (rental-plans, Table, Price, SegmentedControl, Breadcrumbs, PageHeader, RichText, PriceTeaser, faq, process-steps, cta-form). New only: ServiceFacts, ChoiceList, Callout, hero variant `plain`.
ASSUMPTION: lead note says prices are "not public"; ADR-005/014 make them public and ADR-025 only restricts who EDITS them. I spec public prices from CMS with a "price on request" fallback state. Rent band prices stay a proposal (pricing-model.md), so mocks show placeholders, not numbers.
Acceptance: section order, fields with max lengths, 360 + desktop layout, states, a11y, Nepali allowance, new components flagged. Estimate 2.5 h.
