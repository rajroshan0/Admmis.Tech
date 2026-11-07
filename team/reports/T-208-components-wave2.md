# T-208 Components wave 2 (satish), 2026-11-07

Status: DONE. Props for mahendra: team/inbox/mahendra.md (18:10 entry).

T-108 nits: constant 2px plan border (only colour changes); fieldset `aria-describedby` points to the help text and the "Your size" badge is in the selected plan card's reading order (cannot link radio to card without JS; documented); `!text-accent` replaced by `.facts-title` (accent on navy surface about 7:1, computed by eye from luminance, rajaros's axe agrees); highlight cap exported as `MAX_HIGHLIGHTED_PLANS = 6` (the zod `max(6)` belongs in neha's data layer, please add). ProcessSteps and ServicesGrid ids now `useId`.

Built: forms (FormCard, TextField, TextareaField, SelectField, ConsentField, Honeypot, ErrorSummary, SubmitButton, SuccessPanel), ContactChannels; BandSelect, PackageTable, BudgetGuide, Table (stacked); TeamGrid, StatRow, CaseFacts, Gallery (client viewer, native dialog), FilterLinks; PostCard, AuthorBox, Pagination, Agenda. No hard-coded copy; Devanagari-safe (grapheme initials, wrapping, no fixed heights).

Verified: vitest 94/94; tsc clean for my files; eslint 0 errors (4 warnings, all in neha's src/lib/server/leads). `next build` compiles but fails the type step on neha's in-progress leads/collections files (stale payload-types), not on my code. JS budget not re-measured: only GalleryViewer is client code, and no route uses it yet.
Gaps: CurrencyToggle, Breadcrumbs, 360 px visual check, no-JS Turnstile fallback (mahendra/neha/hritik), Turnstile widget slot.
Note: I ran prettier on src/; it changed only my files.

## T-208-fix (hritik T-111)
Done: ErrorSummary id `form-errors`, tabIndex -1, autofocus (no-JS 303 must end in `#form-errors`); Honeypot `name` required, callers pass `LEAD_FORM.honeypot` (neha asked to rename it from `website`, open until she replies); Table roles; Gallery thumbnails are links, Left/Right keys, label template "Open image: {alt}"; busy submit uses aria-disabled + type button; autocomplete listed in mahendra's checklist.
Verified: vitest 101/101, tsc and eslint clean, build compiles and passes.
