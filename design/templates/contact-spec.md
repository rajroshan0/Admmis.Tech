# Template spec: Contact (`/contact`) and thank-you (`/contact/thank-you`) (T-604b)

Owner: sharwan · v1.0 · 2026-11-07 · Shared rules: `service-spec.md`. API contract: `docs/api/leads.md` (formKind `contact`, `quote`, `rent`, `event`; `callback` not shown at launch).

## 0. Decisions
| Topic | Decision |
|---|---|
| Purpose | One page for every enquiry. Form first, direct channels beside it. The same `LeadForm` powers quote, rent and event forms with different fields |
| Primary CTA | The submit button "Send message". WhatsApp and call are secondary (outline) |
| Short form | 5 visible fields maximum plus consent |
| Success | Redirect to `/contact/thank-you` (`noindex`); the conversion event fires there once, after consent (templates-and-routes §6) |

## 1. Page layout
| # | Section | Tone | Component |
|---|---|---|---|
| 0 | Breadcrumbs | surface | `Breadcrumbs` |
| 1 | Header band | alt | `hero plain` compact: H1 + 1 sentence, no CTAs (the form is the action) |
| 2 | Form + channels | bg | Form card and `ContactChannels` (**NEW**, small) |
| 3 | What happens next | surface | `process-steps` (3: we read it, we reply, we agree a plan) |
| 4 | FAQ | bg | `faq` (3 to 4) |
| 5 | Footer, sticky bar | | global; the sticky bar "Get a quote" link scrolls to the form on this page |

Layout: 360 px: H1, then form card, then channels. 1024 px: two columns 7 / 5, form left, channels right (channels sticky is **not** used). Order on phone puts the form first because it is the goal.

`ContactChannels` (**NEW** for satish): a card (`--surface`, 1 px `--line`, `--r2`, padding 20) with a `<dl>` from `docs/company-info.md` only: WhatsApp (button, outline, icon), Phone (`tel:` link), Email (`mailto:`), Address, Opening hours. Empty values are omitted. Each link 48 px tall. Placeholders in mock until Roshan gives the numbers: TODO(roshan).

## 2. Form fields (`kind="contact"`)
| Field | Type | Req | Limits (contract) | Notes |
|---|---|---|---|---|
| Name | text, `autocomplete=name` | yes | 2 to 100 | |
| Phone or email | **one visible field** | yes (one of) | email 254; phone 7 to 20 digits | UI detects `@` and maps to `email` or `phone`; hint "We reply on the one you give" |
| Company | text | no | 150 | label "Company (optional)" |
| I need help with | select, from `src/config/services.ts` + "Something else" | no | | prefilled from `?service=`; on rent pages `kind=rent` |
| Message | textarea 5 rows | yes | 10 to 3000 | counter only after 2500 characters |
| Consent | checkbox 24 px, label links to `/privacy` | yes | `consent.contact` true | text from `leads.consent` microcopy; unchecked by default |
| Turnstile | invisible/managed widget under the consent | yes | | never blocks typing |
| Honeypot `website` | hidden | n/a | | off-screen, `tabindex=-1`, `aria-hidden`, `autocomplete=off` |

Style: labels above, 16 px text, 48 px fields, border `--line-strong`, errors `--danger` with icon and words, submit full width on 360 (52 px). Fields keep values on every error.

## 3. States (all in the form card; builder: mahendra for logic, satish for visuals)
| State | Design |
|---|---|
| Idle | as above |
| Field focus | 3 px `--focus` ring, offset 2 |
| Field error (`validation_failed`) | message under the field with icon, `aria-describedby`, `aria-invalid`; focus moves to the first invalid field; a one-line summary above the form ("Please fix 2 fields") with `role="alert"` |
| Submitting | button disabled, label "Sending...", spinner (CSS, reduced-motion safe), `aria-busy` on the form |
| Success | navigate to `/contact/thank-you` |
| `captcha_failed` | Callout amber "Check failed. Please try again", widget resets; form data kept |
| `rate_limited` (429) | Callout amber with wait time from `Retry-After`; button re-enabled when time ends |
| `internal_error`, `storage_unavailable`, `verification_unavailable` (500/503) | Callout amber "We could not send your message. Your text is still here." + **fallback panel** with WhatsApp and phone buttons (from `fallback`); Retry button |
| Network offline | same as 500 with "You seem to be offline" |
| JS off | A no-JS submit is **not** required at launch (ASSUMPTION; mahendra confirms). Show the WhatsApp and phone channels prominently inside `<noscript>` |

## 4. Thank-you page (`thank-you`)
Light page: breadcrumb none; one centred column (max 36rem): green check badge (graphic), H1 "Thank you. We got your message." (`heroHeading`), text with reply time (TODO(roshan)), no echo of what the visitor typed (avoids showing personal data); "What happens next" 3 steps, then two buttons: primary "Back to home", secondary "See our work". WhatsApp link for urgent cases. `noindex`, no nav changes. Focus is set to the H1 on load. Auto-reply email (ADR-026) is mentioned: "Check your email for a confirmation" only when an email was given (state: email given / phone only).

## 5. Fields for neha
| Field | EN max | CMS max | Req |
|---|---|---|---|
| `heroHeading` / `heroSub` | 60 / 120 | 84 / 170 | yes |
| `formHeading` / `formIntro` | 50 / 140 | 70 / 195 | yes |
| `nextSteps[]` (3): `title` / `text` | 18 / 110 | 26 / 155 | yes |
| `faqs` (3 to 4) | question 70, answer 280 | 98 / 390 | yes |
| `thanks.heading` / `thanks.text` / `thanks.next[]` | 50 / 160 / 3 x 110 | 70 / 225 / 155 | yes |
| `thanks.emailNote` / `thanks.phoneNote` | 90 | 126 | yes |
| Channels | from `siteSettings` (phone, WhatsApp, email, address, hours); none typed in the page | | |
| Form strings (labels, hints, errors, consent) | i18n keys `leads.*`, not page fields | | |

## 6. Accessibility and Nepali
Visible labels (no placeholder labels); required marked with text "(required)" not just `*`; error text and icon; focus order: fields, consent, Turnstile, submit; autocomplete tokens (`name`, `tel`, `email`, `organization`); touch targets 48 px; Turnstile non-interactive mode where possible so keyboard users are not blocked. Nepali: labels grow ~40 percent, buttons wrap to 2 lines, field widths are always 100 percent; error messages avoid fixed heights; phone field accepts Devanagari digits (server normalises; confirm with neha).

## 7. Components used
Existing: `Breadcrumbs`, `hero plain`, `LeadForm`, `process-steps`, `faq`, `Callout`, `Button`, `StickyActionBar`. New: `ContactChannels`.
