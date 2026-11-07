# Page brief: Opening event

Owner: sudip · Writer: writer · Status: ready for writer · Version: v1 · Date: 2026-11-07
Rules that always apply: `content/voice-and-tone.md`, CLAUDE.md §8 (Truth, Writing). Never invent prices, clients, results, team names or testimonials; write `TODO(roshan): …` instead. All text is original. Field names and limits: `design/templates/event-spec.md` (EN max column wins). FAQ answers 30 to 45 words.

## 1. Page facts

| Field | Value |
|---|---|
| URL | `/opening-event` |
| Template | `event` |
| Parent | `/` |
| Priority / Index | P1 / Y |
| Word-count target | 350 to 550 |

## 2. Goal and audience

- **Goal:** Inform and get registrations for the ADMMIS.TECH opening event on 1 January 2027; after the event, become an archive page.
- **Primary conversion:** Register (`LeadForm kind=event`).
- **Audience and search intent:** Invited guests, local business owners, press and partners searching "ADMMIS.TECH opening event" or arriving from social posts. They want date, venue, time, agenda and how to register.

## 3. Keywords (ESTIMATE volumes in `seo/keyword-map.md`)

- **Primary:** ADMMIS.TECH opening event
- **Secondary:** tech event Kathmandu 1 January 2027; ADMMIS.TECH launch event
- **Do not target here:** Marketing-service keywords.

## 4. Metadata and headings

| Element | Text | Count / limit |
|---|---|---|
| title (`seoTitle`) | ADMMIS.TECH Opening Event, 1 January 2027 | 41 / 60 |
| Meta description | Join the opening of ADMMIS.TECH on 1 January 2027 in Kathmandu. See the agenda, venue and time, and register your place. | 120 / 155 |
| H1 | ADMMIS.TECH opening event: 1 January 2027 | 41 / 70 |
| Hero sub | Meet the team, see our work and hear what we are building. Register to get your place. | per spec |

## 5. Section outline (spec order; hidden sections stay empty until facts exist)

- hero: `title` 60 (the H1 above), `heroSub` 150, date tile, facts `venue` 60, `address` 120, time
- about: `description` 900 chars; why we hold it, who should come
- agenda: `agenda[]` time 12 / title 70 / speaker; empty until Roshan confirms
- speakers: from team members, empty until confirmed
- location: `locationNote` 160 (directions in words; map is a link)
- register: `registration` mode, `formHeading` 50, `formText` 140
- faqs: 3 (cost, who can come, what to bring)
- archive state: `archiveNote` 120 for after the event

## 6. Proof points and facts needed

TODO(roshan): venue, address, start and end time, agenda, speakers, entry free or paid, capacity, registration deadline, contact. Do not state any of these until given.

## 7. CTA and internal links

Primary "Register". Links: `/about`, `/services`, `/work`, `/contact`.

## 8. Schema and CMS fields

`Event` (name, startDate 2027-01-01, location, eventStatus, eventAttendanceMode, organizer = Organization `@id`), `BreadcrumbList`. Complete only with confirmed fields; omit the rest rather than guess.

## 9. FAQ

Is entry free? · Who can attend? · Can I bring guests? (answers TODO(roshan) until confirmed).

## 10. Notes for the writer

Date appears in title, meta and H1; keep the year. After 1 Jan 2027 switch to archive wording (past tense) and link to `/blog`. Do not invent speakers or guests.
