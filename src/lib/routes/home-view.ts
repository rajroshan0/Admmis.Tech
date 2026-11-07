import type { Locale } from '@/lib/i18n/config'
import type { Messages } from '@/lib/i18n/messages'
import type { Cta } from '@/components/ui'
import { languageItems, pathFor } from '@/lib/routes/path'

// Maps the home message namespaces to block props (docs/frontend/component-inventory.md §3.1).
// Pure and server-side. Fields still marked TODO(roshan) are absent from the message files, so
// every optional value below is simply omitted until Roshan answers; nothing is invented.

// Day, month label and year for the date tile, from an ISO date (Gregorian, UTC so no time zone shift).
export function dateParts(locale: Locale, iso: string) {
  const d = new Date(`${iso}T00:00:00Z`)
  const fmt = (o: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale, { ...o, timeZone: 'UTC' }).format(d)
  return {
    day: fmt({ day: '2-digit' }),
    month: fmt({ month: 'short' }).toLocaleUpperCase(locale),
    year: fmt({ year: 'numeric' }),
  }
}

export type HomeView = ReturnType<typeof buildHomeView>

const SERVICE_ICONS = [
  'web',
  'mobile',
  'code',
  'ai',
  'test',
  'audit',
  'team',
  'megaphone',
  'event',
] as const

export type HeroImage = { src: string; width: number; height: number; alt: string }

export function buildHomeView(
  locale: Locale,
  home: Messages['home'],
  common: Messages['common'],
  heroImage: Omit<HeroImage, 'alt'>,
) {
  const href = (path: string) => pathFor(locale, path)
  const cta = (label: string, path: string): Cta => ({ label, href: href(path) })

  const hero = {
    eyebrow: home.hero.eyebrow,
    heading: home.hero.headline,
    subheading: home.hero.subheadline,
    primaryCta: cta(home.hero.ctaPrimary, home.hero.ctaPrimaryLink),
    secondaryCta: cta(home.hero.ctaSecondary, home.hero.ctaSecondaryLink),
    image: { ...heroImage, alt: home.hero.imageAlt },
    variant: 'model' as const,
  }

  const services = {
    heading: home.services.title,
    eyebrow: home.services.eyebrow,
    intro: home.services.intro,
    items: home.services.cards.map((card, i) => ({
      href: href(card.link),
      title: card.title,
      summary: card.text,
      icon: SERVICE_ICONS[i],
      linkLabel: card.linkLabel,
    })),
    cta: cta(home.services.allLinkLabel, home.services.allLink),
  }

  const rent = {
    heading: home.rent.title,
    eyebrow: home.rent.eyebrow,
    intro: home.rent.intro,
    items: home.rent.cards.map((card) => ({
      href: href(card.link),
      title: card.title,
      summary: card.text,
    })),
    cta: cta(home.rent.ctaLabel, home.rent.ctaLink),
  }

  const whyUs = {
    heading: home.whyUs.title,
    eyebrow: home.whyUs.eyebrow,
    items: home.whyUs.points.map((p) => ({ title: p.title, text: p.text })),
  }

  const process = {
    heading: home.process.title,
    eyebrow: home.process.eyebrow,
    steps: home.process.steps.map((s) => ({ title: s.title, text: s.text })),
  }

  const work = {
    heading: home.work.title,
    eyebrow: home.work.eyebrow,
    intro: home.work.intro,
    items: home.work.cases.map((c) => ({ href: href(c.link), title: c.title, summary: c.text })),
    cta: cta(home.work.ctaLabel, home.work.ctaLink),
  }

  const pricingTeaser = {
    eyebrow: home.pricingTeaser.eyebrow,
    heading: home.pricingTeaser.title,
    text: home.pricingTeaser.text,
    primary: cta(home.pricingTeaser.ctaPrimary, home.pricingTeaser.ctaPrimaryLink),
    secondary: cta(home.pricingTeaser.ctaSecondary, home.pricingTeaser.ctaSecondaryLink),
  }

  // venue and time are TODO(roshan): not in the message files, so not passed.
  const event = {
    eyebrow: home.event.eyebrow,
    title: home.event.title,
    summary: home.event.text,
    dateLabel: home.event.date,
    dateParts: dateParts(locale, home.event.dateIso),
    registerCta: cta(home.event.ctaLabel, home.event.ctaLink),
  }

  // Items with a TODO(roshan) answer were left out of home.json by the loader of the copy file.
  const faq = {
    heading: home.faq.title,
    items: home.faq.items.map((item, i) => ({ id: `faq-${i}`, question: item.q, answer: item.a })),
  }

  // WhatsApp link is TODO(roshan): the secondary CTA is omitted until the number is confirmed.
  const finalCta = {
    heading: home.finalCta.title,
    text: home.finalCta.text,
    primary: cta(home.finalCta.ctaPrimary, home.finalCta.ctaPrimaryLink),
  }

  return { hero, services, rent, whyUs, process, work, pricingTeaser, event, faq, finalCta, common }
}

export function buildChrome(
  locale: Locale,
  common: Messages['common'],
  enabledLocales: readonly Locale[],
) {
  const href = (path: string) => pathFor(locale, path)
  const header = {
    homeHref: href('/'),
    logoAlt: common.header.logoAlt,
    nav: common.header.nav.map((n) => ({ label: n.label, href: href(n.link) })),
    cta: { label: common.header.ctaLabel, href: href(common.header.ctaLink) } satisfies Cta,
    languages: {
      label: common.languageSwitchAria,
      items: languageItems(locale, enabledLocales, common.languages),
    },
    labels: {
      menuOpen: common.common.menuOpen,
      menuClose: common.common.menuClose,
      menuLabel: common.common.menuLabel,
    },
  }

  // Address, phone, PAN, registration and social links are TODO(roshan): absent from the messages,
  // so they are not rendered. Email and main website are confirmed.
  const footer = {
    about: common.footer.about,
    columns: common.footer.columns.map((col) => ({
      title: col.title,
      links: col.links.map((l) => ({ label: l.label, href: href(l.link) })),
    })),
    contact: [
      {
        label: common.footer.contact.emailLabel,
        value: common.footer.contact.email,
        href: `mailto:${common.footer.contact.email}`,
      },
      {
        label: common.footer.contact.websiteLabel,
        value: common.footer.contact.website,
        href: `https://${common.footer.contact.website}`,
      },
    ],
    copyright: common.footer.copyright,
  }

  // WhatsApp and Call need numbers (TODO(roshan)); only the quote action exists for now.
  const stickyBar = {
    label: common.stickyBar.navLabel,
    items: [
      {
        kind: 'quote' as const,
        label: common.stickyBar.quote,
        ariaLabel: common.stickyBar.quoteAria,
        href: href(common.header.ctaLink),
      },
    ],
  }

  return { header, footer, stickyBar, skipToContent: common.common.skipToContent }
}
