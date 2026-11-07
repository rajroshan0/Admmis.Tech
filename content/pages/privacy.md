---
slug: /privacy
template: legal
title: "Privacy Policy | ADMMIS.TECH"
metaDescription: "How ADMMIS.TECH collects, uses and keeps your personal data when you use our website and contact forms, and what rights you have."
policyVersion: 2026-11-draft-1
status: draft
legalStatus: DRAFT - not approved. Needs Roshan's approval and, ideally, a lawyer's review before publishing.
index: true
openTodos: legal entity name, address, PAN; privacy contact email; processors (email, chat, CRM, Q10); hosting country; retention of backups; lawyer review; data-subject request process
---

<!-- Format: `field: text` (sections as headings; body as plain paragraphs). This is a DRAFT written by the content writer, not a lawyer. The facts in "What we collect" come from docs/api/leads.md v0.2 (2026-11-06). If the lead API changes, this text must change and policyVersion must increase: the contact form sends policyVersion with every consent. -->

## banner
- draftNotice: DRAFT. This policy is not final. It must be approved by Roshan, and ideally reviewed by a lawyer, before the site goes live.

## intro
- title: Privacy Policy
- updated: Policy version 2026-11-draft-1. TODO(roshan): date it takes effect.
- intro: This policy explains what personal data ADMMIS.TECH collects on this website, why, how long we keep it and what rights you have. We try to use plain words. If something is not clear, write to us.

## who
- who: The controller is ADMMIS.TECH, the technology and marketing unit of ADMMIS, in Nepal. TODO(roshan): legal entity name, registered address and PAN. Contact for privacy questions: TODO(roshan): privacy email address.

## whatWeCollect
- intro: When you send us a form, we collect only what you type, plus a few technical details to protect the site.
- fields: Name. Email address or phone number (at least one). Company name, if you add it. The service you ask about, your company size and a budget range, if you choose them. Your message. The form you used (contact, quote, rent, event or callback). The plan you clicked, if any. The language of the page. Your consent and the policy version you agreed to.
- source: Where you came from: campaign tags in the web address (UTM tags), the page that sent you, the first page you visited and the page you sent the form from.
- technical: A hashed form of your IP address, and a shortened version of your browser's user agent. We do not store your full IP address or your full user agent. We do not store the Cloudflare Turnstile token.
- notCollect: We do not ask for payment details, ID numbers or sensitive data on our forms. Please do not put them in the message box.

## whyWeUse
- intro: We use your data for these purposes:
- purposes[0]: To reply to your request and send you a quote.
- purposes[1]: To manage our sales contacts, in a customer record.
- purposes[2]: To protect the site from spam and abuse, and to limit how often a form can be sent.
- purposes[3]: To understand which pages and campaigns bring enquiries.
- basis: Our basis is your consent when you tick the box on the form, and our legitimate interest in keeping the site safe. TODO(roshan) with lawyer: confirm the legal basis for each purpose.

## utm
- utm: When you arrive from a campaign link, we keep the campaign tags in your browser (session storage) for that visit. We attach them to a form only if you send one. They are not sent to analytics before you consent. TODO(roshan): re-check with the privacy review (ADR-036).

## who-sees
- intro: Your form is stored in our database. We use these services to receive and manage it:
- processors[0]: Cloudflare, for DNS, security and the spam check (Turnstile). 
- processors[1]: TODO(roshan): email service that sends us the alert (decision Q10).
- processors[2]: TODO(roshan): team chat tool that receives the alert (decision Q10).
- processors[3]: TODO(roshan): CRM that stores contacts (decision Q10; the default plan is HubSpot Free).
- processors[4]: TODO(roshan): hosting company and country of the server.
- note: We do not sell your data. Final list of processors and countries: TODO(roshan).

## transfers
- transfers: Some of these services may process data outside Nepal. TODO(roshan) with lawyer: list the countries and the safeguards.

## keep
- keep: We keep a form and its details for 24 months. After that we delete it or remove your personal details. You can ask us to delete your details earlier. The spam-control counters are deleted within days. TODO(roshan): confirm retention of backups, and the rule for leads that become customers.

## rights
- intro: You may ask us to:
- rights[0]: Tell you what data we hold about you.
- rights[1]: Correct data that is wrong.
- rights[2]: Delete your data.
- rights[3]: Stop using your data for a purpose, or take back your consent.
- rights[4]: Give you a copy of your data. Visitors from the EU or UK also have the right to limit use, to move data and to complain to their data protection authority.
- how: Write to TODO(roshan): privacy email. We reply within TODO(roshan): days (GDPR uses one month). We may ask you to prove who you are.

## cookies
- cookies: For cookies and similar tools, read our Cookie Policy.
- link: /cookies

## children
- children: This site is for businesses. We do not knowingly collect data from children. TODO(roshan): confirm wording.

## security
- security: We limit who can see leads, we use encrypted connections, and we do not write your name, email, phone or message to our logs. No system is 100% safe, and we cannot promise that. TODO(roshan) with raj: confirm each statement before publishing.

## changes
- changes: When we change this policy, we change the version and the date at the top. If a change is important, we say so on the site.

## laws
- laws: We follow the Individual Privacy Act, 2075 (2018) of Nepal. Because visitors come from other countries, we also follow the main ideas of the EU General Data Protection Regulation (GDPR): clear information, a stated purpose, consent, limited keeping time and your rights. This does not mean that the GDPR applies to every part of our work. TODO(roshan) with lawyer: confirm.

## sources
- sources[0]: Individual Privacy Act, 2075 (2018), Nepal Law Commission: https://lawcommission.gov.np/en/?cat=628 (checked 2026-11-07; listing page found by search, full text not read by the writer). ADB mirror of the English text: https://lpr.adb.org/sites/default/files/resource/%5Bnid%5D/nepal-the-privacy-act-2075-2018-english.pdf (checked 2026-11-07 in search results only).
- sources[1]: GDPR Article 13, information to give when data is collected: https://gdpr-info.eu/art-13-gdpr/ (checked 2026-11-07). Regulation (EU) 2016/679: https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (checked 2026-11-07).
- note: Sources are for the team and the lawyer. Do not show this section on the public page. Section numbers of the Nepal Act differ between secondary sources: use the official text. The Individual Privacy Regulation, 2077 (2020) may add rules on consent: TODO(lawyer).
