# T-111 Review: components wave 2 (T-208, satish)
Reviewer: hritik · 2026-11-07 · Verdict: **APPROVED WITH NITS** (fixes 1 and 2 before the contact form, T-308; not blocking commit)
Read forms/, Gallery, Pagination, Table, components.css table rules. Did not re-run build or tests (satish: vitest 94/94, only the client code is GalleryViewer). Skimmed the other new blocks by grep for hard-coded strings: none found.

## Passes
Forms: real `<label for>`, hint and error ids chained in `aria-describedby` (error first), `aria-invalid`, "(required)/(optional)" as words not stars, error has icon plus text, 44+ px targets (48 px controls, 24 px checkbox in an 44 px row), native controls submit without JS, consent label takes a node for the privacy link, honeypot is `aria-hidden` with `tabIndex=-1` (passes axe aria-hidden-focus). Devanagari: no fixed heights, wrapping, grapheme initials. Gallery: native `<dialog>` (Esc, trap, focus return, plus explicit `onClose` refocus), close button autofocus, JS is the one small client file, thumbnails lazy. Pagination and Table use real links and `caption`. No hard-coded copy.

## Fix before T-308 (contact form)
1. `ErrorSummary` has no `id` or `tabIndex={-1}` and no script moves focus (its comment claims one). On the no-JS path (my T-407 conditions: 303 back with `?error=<code>`) the page reloads with focus at the top. Add `id` and `tabIndex={-1}`, render it first in the form, and use `autoFocus`-style focus in the form's client enhancement (mahendra) so keyboard and screen reader users land on it.
2. Honeypot default name `website`: browsers autofill that for users with a saved URL, which would drop real leads as spam. Use a neutral name (e.g. `company_fax`, or what neha's schema defines) and keep it one constant shared with `src/lib/schemas/lead.ts`. Tell neha before her route ships.

## Nits
3. Stacked table: `display:block` on table parts drops table semantics in Safari/VoiceOver, and `::before` labels are not reliably read. Add `role` attributes (table, rowgroup, row, columnheader, cell) on the elements, or keep the table layout and scroll on phones. Check with rajaros.
4. Gallery without JS: thumbnails are inert buttons. Render them as `<a href={full image}>` and let the client enhance them. Add Left/Right keys in the dialog. `aria-label` is built as `${open}: ${alt}`; move the pattern into the message ("Open image: {alt}") for Nepali punctuation.
5. `SubmitButton` busy state is `disabled`, which drops focus; prefer `aria-disabled` plus ignoring clicks. Callers must pass `autoComplete` tokens (name, email, tel) on contact fields: add to mahendra's checklist. Re-measure JS when the first route uses Gallery.
