# BUG-003 Footer links to /faq but ADR-029 says there is no standalone FAQ at launch

| Field | Value |
|---|---|
| Severity | S3 |
| Owner | writer (content), mahendra (messages) |
| Found | 2026-11-07 by rajaros, T-802 |
| Build | commit 5fdd40a, production build, `next start` on port 3102 |
| Environment | Any. |
| Status | OPEN |

## Steps
1. Open `/`, scroll to the footer, Company column.
2. Click "FAQ".

## Expected
No link to a page that will not exist (ADR-029, seo/sitemap.md: `/faq` reserved for Phase 2).

## Actual
Link `/faq` is in the footer (from `content/pages/home.md` footer.columns[2]) and will 404 permanently at launch. Remove it from content and messages. The design spec section 3.1 also lists FAQ in the About dropdown: sharwan to drop it there too.
