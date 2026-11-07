---
slug: /cookies
template: legal
title: "Cookie Policy | ADMMIS.TECH"
metaDescription: "Which cookies and similar tools ADMMIS.TECH uses, why, and how to accept, refuse or change your choice."
policyVersion: 2026-11-draft-1
status: draft
legalStatus: DRAFT - not approved. Needs Roshan's approval and, ideally, a lawyer's review before publishing.
index: true
openTodos: confirm tools actually installed at launch; cookie names and lifetimes (rajaros/mahendra audit); consent banner design; lawyer review
---

<!-- Format: `field: text`. Based on ADR-006: GA4, Meta Pixel and Microsoft Clarity load only after consent. Cookie names and lifetimes must be filled from a real browser audit before publishing. Do not list a tool that is not installed. -->

## banner
- draftNotice: DRAFT. This policy is not final. It must be approved by Roshan, and ideally reviewed by a lawyer, before the site goes live.

## intro
- title: Cookie Policy
- updated: Policy version 2026-11-draft-1. TODO(roshan): date it takes effect.
- intro: A cookie is a small file that a website saves in your browser. Some similar tools, such as local storage, work in the same way. This page lists what we use and how you can choose.

## necessary
- necessaryHeading: Always on (needed for the site)
- necessary[0]: Your language choice and your currency choice (NPR or USD), saved in your browser so the site remembers them. TODO(rajaros): confirm the exact names.
- necessary[1]: The spam check on our forms (Cloudflare Turnstile). It protects the forms from bots. TODO(raj): confirm if Turnstile sets any cookie.
- necessary[2]: Your cookie choice, so we do not ask you again.
- necessary[3]: Campaign tags from the web address, kept for the visit in session storage and attached to a form only if you send one.
- necessaryNote: These do not need your consent because the site cannot work properly without them. TODO(lawyer): confirm this applies to the campaign tags.

## optional
- optionalHeading: Only with your consent
- optionalIntro: We load these tools only after you click Accept. If you refuse, they do not load.
- optional[0].name: Google Analytics 4
- optional[0].text: Shows us which pages people visit, so we can improve the site. TODO(rajaros): names and lifetimes.
- optional[1].name: Meta Pixel
- optional[1].text: Tells Meta which visits came from our ads, so we can measure and improve our campaigns. TODO(rajaros): names and lifetimes.
- optional[2].name: Microsoft Clarity
- optional[2].text: Shows how people move and click on pages, so we can find confusing parts. TODO(rajaros): names and lifetimes.
- optionalNote: TODO(roshan): confirm which of these three will be live on 1 Jan 2027. Remove any that are not.

## choice
- choiceHeading: Your choice
- choice: You can accept or refuse optional cookies in the banner. You can change your mind at any time with the "Cookie settings" link in the footer (TODO(mahendra): link). You can also delete cookies in your browser settings.

## moreInfo
- moreInfo: For how we handle personal data, read our Privacy Policy.
- link: /privacy
