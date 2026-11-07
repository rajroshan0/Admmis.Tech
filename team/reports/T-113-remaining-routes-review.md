# T-113 Review: remaining routes (T-309, mahendra)
Reviewer: hritik · 2026-11-07 · Verdict: **CHANGES REQUIRED** (1 must-fix for the form; commit is fine once it is done)
Read: LeadForm, LeadFormClient, contact, thank-you, load.ts, ErrorSummary. Did not review neha's leads code. Not run: build, e2e (mahendra: 27 static pages, 144.2 KB on form pages, a real submit untested).

## Passes
Plain `<form method=post action=/api/leads>` (no server action, so no action-safety surface), static pages, honeypot and consent names from `LEAD_FORM`, hidden formKind/locale/policyVersion, separate email and phone with `autocomplete` tokens, maxLength mirrored from the schema, `required` and native validation for name, message, consent. Thank-you page always noindex and echoes nothing; all other pages noindex through `PAGE_COPY_READY`; `/work` and `/blog` empty states, every slug 404. Client JS is one small leaf; importing `FormParts` directly (not the barrel) was the right fix for zod leaking into the bundle.

## Must-fix
1. **Email-or-phone failure destroys the visitor's message.** Neither field is `required`, so a visitor who leaves both empty passes the browser check, gets 400 from the server, a 303 back with `?error=` and an **empty form** (3000-char message lost). Add a small check in `LeadFormClient`: on submit (or `input`), `setCustomValidity` on the email field when email and phone are both empty (message from messages.json), which keeps the data and uses the native bubble. The page must still work without JS (server error summary as now). Also point the error summary link at the field named by the error code instead of always `#name`.

## Fix before launch / nits
2. The consent link goes to `/privacy`, which has no route (catch-all gives 404). Legal text and page must exist before the form is live; add to the Gate checklist (pm, sudip/writer). `policyVersion` is `"draft"`: stored on every lead, replace with the real version when the policy is final.
3. Honeypot label `"Leave this field empty"` is hard-coded English in `LeadForm.tsx`: move to messages (i18n rule).
4. **JS budget:** the 144.3 KB figure was my regression guard, the real budget is 150 KB. Form routes may go to 148 KB gzip. Turnstile `api.js` is a third-party async script, not part of the first-party bundle; load it on first focus or interaction in the form (not on page load) so it costs no LCP/TBT, and wrap its widget in a client leaf under 2 KB. Record "form routes 148 KB" in the CI budget file (raj).
5. A submit before hydration posts an empty `idempotencyKey` (neha is fixing the server side), and a no-JS error also loses typed values. Acceptable after fix 1, because only server-only validation failures remain.

## Re-check 2026-11-07 (mahendra's fix): APPROVED
`LeadFormClient` sets `setCustomValidity` on email while email and phone are both empty and clears it on input and on unmount; the text is `form.contactRequired`; the summary link follows the error code; the honeypot label is `form.honeypot`. Nit: one JSX line in `LeadFormClient.tsx` is over the Prettier width, run `prettier --write`. Open (not mahendra's): `/privacy` route and real `policyVersion` (pm, gate list), Turnstile lazy-load leaf, 148 KB form budget in CI (raj).
