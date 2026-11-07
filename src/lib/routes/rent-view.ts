import { buildSharedSections, slugOf, type PageSeo } from '@/lib/routes/section-pages'
import type { Locale } from '@/lib/i18n/config'
import type { Messages } from '@/lib/i18n/messages'
import { pathFor } from '@/lib/routes/path'

type Items = Messages['rent']['items']

const BRAND_SUFFIX = ' | ADMMIS.TECH'

/** Rental product slugs come from the three home rent cards (sitemap rows 18 to 20). */
export function rentSlugs(home: Messages['home']): string[] {
  return home.rent.cards.map((c) => slugOf(c.link))
}

export function buildRentHubView(locale: Locale, home: Messages['home'], rent: Messages['rent']) {
  const href = (path: string) => pathFor(locale, path)
  const seo: PageSeo = {
    title: rent.hub.seoTitle,
    description: rent.hub.metaDescription,
    indexable: true,
  }
  return {
    seo,
    hero: {
      variant: 'plain' as const,
      eyebrow: rent.ui.eyebrow,
      heading: rent.hub.heroHeading,
      subheading: rent.hub.heroSub,
      primaryCta: { label: rent.ui.getQuote, href: href('/contact?type=rent') },
    },
    cards: {
      heading: rent.ui.cardsHeading,
      intro: home.rent.intro,
      items: home.rent.cards.map((card) => ({
        href: href(card.link),
        title: card.title,
        summary: card.text,
      })),
    },
    ...buildSharedSections(locale, home, rent.ui.getQuote, '/contact?type=rent'),
    ui: rent.ui,
  }
}

export function buildRentProductView(
  locale: Locale,
  slug: string,
  home: Messages['home'],
  rent: Messages['rent'],
) {
  const index = rentSlugs(home).indexOf(slug)
  if (index < 0) return null
  const card = home.rent.cards[index]
  if (!card) return null
  const entry = (rent.items as Record<string, Items[keyof Items] | undefined>)[slug]
  const href = (path: string) => pathFor(locale, path)
  const seo: PageSeo = {
    title: entry?.seoTitle ?? `${card.title}${BRAND_SUFFIX}`,
    description: entry?.metaDescription ?? card.text,
    indexable: Boolean(entry),
  }
  const quoteHref = `/contact?type=rent&product=${slug}`
  return {
    seo,
    slug,
    hero: {
      variant: 'plain' as const,
      eyebrow: rent.ui.eyebrow,
      heading: entry?.heroHeading ?? card.title,
      subheading: entry?.heroSub ?? card.text,
      primaryCta: { label: rent.ui.getQuote, href: href(quoteHref) },
    },
    intro: { heading: rent.ui.introHeading, text: card.text },
    ...buildSharedSections(locale, home, rent.ui.getQuote, quoteHref),
    ui: rent.ui,
  }
}
