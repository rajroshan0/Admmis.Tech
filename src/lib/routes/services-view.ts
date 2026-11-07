import { SERVICE_ICONS } from '@/lib/routes/home-view'
import type { PageCopy } from '@/lib/routes/page-copy'
import {
  applyCopy,
  buildSharedSections,
  COPY_READY,
  slugOf,
  type PageSeo,
} from '@/lib/routes/section-pages'
import type { Locale } from '@/lib/i18n/config'
import type { Messages } from '@/lib/i18n/messages'
import { pathFor } from '@/lib/routes/path'

type HubCopy = {
  seoTitle: string
  metaDescription: string
  hero: { eyebrow: string; heading: string; sub: string }
  choices: { heading: string; items: { question: string; label: string; link: string }[] }
  price: { heading: string; text: string }
  rent: { heading: string; intro: string }
  faq: { heading: string; items: { q: string; a: string }[] }
  cta: { heading: string; text: string }
}

/** Service slugs come from the nine home cards (same order as seo/sitemap.md rows 9 to 17). */
export function serviceSlugs(home: Messages['home']): string[] {
  return home.services.cards.map((c) => slugOf(c.link))
}

export function buildServicesHubView(
  locale: Locale,
  home: Messages['home'],
  svc: Messages['services'],
) {
  const href = (path: string) => pathFor(locale, path)
  const hub = svc.hub as HubCopy
  const shared = buildSharedSections(locale, home, svc.ui.getQuote, '/contact')
  const seo: PageSeo = { title: hub.seoTitle, description: hub.metaDescription, indexable: true }
  return {
    seo,
    hero: {
      variant: 'plain' as const,
      eyebrow: hub.hero.eyebrow,
      heading: hub.hero.heading,
      subheading: hub.hero.sub,
      primaryCta: { label: svc.ui.getQuote, href: href('/contact') },
    },
    grid: {
      heading: svc.ui.listHeading,
      items: home.services.cards.map((card, i) => ({
        href: href(card.link),
        title: card.title,
        summary: card.text,
        icon: SERVICE_ICONS[i],
        linkLabel: card.linkLabel,
      })),
    },
    choices: {
      heading: hub.choices.heading,
      items: hub.choices.items.map((c) => ({ ...c, href: href(c.link) })),
    },
    process: shared.process,
    pricing: {
      ...shared.pricing,
      heading: hub.price.heading,
      text: hub.price.text,
      secondary: undefined,
    },
    rent: {
      heading: hub.rent.heading,
      eyebrow: home.rent.eyebrow,
      intro: hub.rent.intro,
      items: home.rent.cards.map((card) => ({
        href: href(card.link),
        title: card.title,
        summary: card.text,
      })),
      cta: { label: home.rent.ctaLabel, href: href(home.rent.ctaLink) },
    },
    faq: {
      heading: hub.faq.heading,
      items: hub.faq.items.map((i, n) => ({ id: `faq-${n}`, question: i.q, answer: i.a })),
    },
    cta: {
      heading: hub.cta.heading,
      text: hub.cta.text,
      primary: shared.cta.primary,
    },
    ui: svc.ui,
  }
}

export function buildServiceView(
  locale: Locale,
  slug: string,
  home: Messages['home'],
  svc: Messages['services'],
) {
  if (!serviceSlugs(home).includes(slug)) return null
  const copy = (svc.items as unknown as Record<string, PageCopy | undefined>)[slug]
  if (!copy) return null
  const href = (path: string) => pathFor(locale, path)
  const seo: PageSeo = {
    title: copy.seoTitle,
    description: copy.metaDescription,
    indexable: COPY_READY.services.has(slug),
  }
  const quote = `/contact?service=${slug}`
  return {
    seo,
    slug,
    hero: {
      variant: 'plain' as const,
      eyebrow: copy.hero.eyebrow ?? svc.ui.eyebrow,
      // seo/sitemap.md rule 7: H1 = heroHeading
      heading: copy.hero.heading,
      subheading: copy.hero.sub,
      primaryCta: { label: svc.ui.getQuote, href: href(quote) },
    },
    facts: [
      { label: svc.ui.timeLabel, value: copy.facts?.time },
      { label: svc.ui.bestForLabel, value: copy.facts?.bestFor },
    ],
    blocks: copy.blocks,
    ...applyCopy(buildSharedSections(locale, home, svc.ui.getQuote, quote), copy, locale),
    ui: svc.ui,
  }
}
