# Report T-604a: service and rent template specs (sharwan) · 2026-11-07
Done: `design/templates/service-spec.md` (service page + services hub), `rent-spec.md` (rent hub + rent product), mocks `service.html` (Web development) and `rent.html` (hub). Plan: `team/plans/T-604a-templates.md`.
Contents: section order and tone, 360/768/1280 layouts, states, a11y, Nepali allowance (CMS maxLength = EN x 1.4), field lists with limits for neha.
New components (for satish): `hero` variant `plain`, `ServiceFacts`, `ChoiceList`, `Callout`, band radio card + plan card (inside `rental-plans`), checklist variant of `feature-list`. All else reuses the home/inventory blocks.
PRICE RULE, needs pm/Roshan: the brief said "not public"; ADR-005/014 make prices public, ADR-025 only restricts who EDITS. I designed public CMS prices with a "Price on request" fallback state. Rent band prices stay a proposal, so mocks use placeholders (NPR 00,000).
Verified: mocks render at 1280 in headless Chrome. 360 px not pixel-checked (headless min width); layouts are mobile-first CSS from the home mock.
Not done: rent product page and services hub have no mock (specified only); three rental example screens (rent-spec open item 3).
Open: typical times, rent terms (TODO(roshan)); Marketing on rent is in pricing-model but not ADR-029 (not designed).
