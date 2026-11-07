# Page brief: Contact and quote form (+ thank-you)

Owner: sudip · Writer: writer · Status: ready for writer · Version: v1 · Date: 2026-11-07
Rules that always apply: `content/voice-and-tone.md`, CLAUDE.md §8 (Truth, Writing). Never invent prices, clients, results, team names or testimonials; write `TODO(roshan): …` instead. All text is original. Field names and limits: `design/templates/contact-spec.md` (EN max column wins). FAQ answers 30 to 45 words.

## 1. Page facts

| Field | Value |
|---|---|
| URL | `/contact` |
| Template | `contact` |
| Parent | `/` |
| Priority / Index | P1 / Y (thank-you: N) |
| Word-count target | 250 to 400 plus thank-you |

## 2. Goal and audience

- **Goal:** Make it easy to send a message or quote request; reassure on reply time and privacy.
- **Primary conversion:** Form submit (`generate_lead`, fired on `/contact/thank-you`); WhatsApp and phone clicks.
- **Audience and search intent:** Ready buyers and navigational searchers ("contact ADMMIS.TECH", "software company Kathmandu"). They want the form, the phone/WhatsApp and the address fast.

## 3. Keywords (ESTIMATE volumes in `seo/keyword-map.md`)

- **Primary:** contact software company Kathmandu
- **Secondary:** get a quote; software company contact Kathmandu; ADMMIS.TECH contact
- **Do not target here:** Service keywords.

## 4. Metadata and headings

| Element | Text | Count / limit |
|---|---|---|
| title (`seoTitle`) | Contact a Software Company in Kathmandu | ADMMIS.TECH | 53 / 60 |
| Meta description | Tell us what you need and get a reply from our Kathmandu team. Send a message, call or write on WhatsApp for a quote. | 117 / 155 |
| H1 | Contact our Kathmandu team for a quote | 38 / 70 |
| Hero sub | Tell us what you need. We reply with next steps and a clear price. | per spec |

## 5. Section outline (spec order; hidden sections stay empty until facts exist)

- hero: `heroHeading` 60, `heroSub` 120
- form: `formHeading` 50, `formIntro` 140 (form strings are i18n keys, not yours)
- nextSteps: 3 x `title` 18 / `text` 110 (what happens after sending; reply time TODO(roshan))
- faqs: 3 to 4, question 70 / answer 280 chars
- channels: phone, WhatsApp, email, address, hours come from `siteSettings`; never typed
- Thank-you (`/contact/thank-you`): `thanks.heading` 50 (H1 e.g. "Thank you. We got your message."), `thanks.text` 160, `thanks.next[]` 3 x 110, `thanks.emailNote` 90, `thanks.phoneNote` 90; do not echo typed data

## 6. Proof points and facts needed

TODO(roshan): reply time, office address and hours, phone, WhatsApp number, whether quotes are free (do not say "free" until confirmed).

## 7. CTA and internal links

Primary: submit. Links: `/services`, `/pricing`, `/rent`, `/privacy` (consent label).

## 8. Schema and CMS fields

`ContactPage`, `BreadcrumbList`. Thank-you: none, `noindex`, excluded from sitemap.xml, not blocked in robots.txt. Events: see `seo/analytics` plan / sitemap §7.

## 9. FAQ

Suggested: How fast do you reply? · How much does a project cost? (link `/pricing`) · Can I contact you on WhatsApp? · Do you work with clients outside Nepal?

## 10. Notes for the writer

Thank-you page has no SEO job; only keep it short and accessible. Avoid the word "free" and "guarantee".
