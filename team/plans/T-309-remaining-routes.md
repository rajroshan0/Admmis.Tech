# Plan T-309: remaining page routes (mahendra), 2026-11-07
Goal: /pricing, /about, /work, /work/[slug], /blog, /blog/[slug], /opening-event (sitemap path), /contact, /contact/thank-you; static, EN only, all noindex via PAGE_COPY_READY (empty).
Approach: one messages namespace `pages` (minimal neutral placeholders), shared LeadForm (plain POST to /api/leads, client leaf only for idempotency key + ?error= summary), case and post templates typed from the CMS shape with empty loaders (0 cases, 0 posts).
ASSUMPTIONS: form uses separate Email and Phone fields (no-JS cannot split one field); service prefill from ?service= not built (static); policyVersion is a draft constant until pages.legalVersion exists.
Not built: pricing tables and plans (no price data), logo strip, testimonials, breadcrumbs, JSON-LD, Turnstile (slot only).
