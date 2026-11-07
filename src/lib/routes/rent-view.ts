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

/** Rental product slugs come from the three home rent cards (sitemap rows 18 to 20). */
export function rentSlugs(home: Messages['home']): string[] {
  return home.rent.cards.map((c) => slugOf(c.link))
}

export function buildRentHubView(locale: Locale, home: Messages['home'], rent: Messages['rent']) {
  const href = (path: string) => pathFor(locale, path)
  const copy = rent.hub as unknown as PageCopy
  const seo: PageSeo = { title: copy.seoTitle, description: copy.metaDescription, indexable: true }
  const quote = '/contact?type=rent'
  return {
    seo,
    hero: {
      variant: 'plain' as const,
      eyebrow: copy.hero.eyebrow ?? rent.ui.eyebrow,
      heading: copy.hero.heading,
      subheading: copy.hero.sub,
      primaryCta: { label: rent.ui.getQuote, href: href(quote) },
    },
    // Card text comes from the home rent cards; the hub heading and intro from the synced copy.
    cards: {
      heading: copy.products?.productsHeading ?? rent.ui.cardsHeading,
      intro: copy.products?.productsIntro ?? home.rent.intro,
      items: home.rent.cards.map((card) => ({
        href: href(card.link),
        title: card.title,
        summary: card.text,
      })),
    },
    blocks: copy.blocks,
    ...applyCopy(buildSharedSections(locale, home, rent.ui.getQuote, quote), copy, locale),
    ui: rent.ui,
  }
}

export function buildRentProductView(
  locale: Locale,
  slug: string,
  home: Messages['home'],
  rent: Messages['rent'],
) {
  if (!rentSlugs(home).includes(slug)) return null
  const copy = (rent.items as unknown as Record<string, PageCopy | undefined>)[slug]
  if (!copy) return null
  const href = (path: string) => pathFor(locale, path)
  const seo: PageSeo = {
    title: copy.seoTitle,
    description: copy.metaDescription,
    indexable: COPY_READY.rent.has(slug),
  }
  const quote = `/contact?type=rent&product=${slug}`
  return {
    seo,
    slug,
    hero: {
      variant: 'plain' as const,
      eyebrow: copy.hero.eyebrow ?? rent.ui.eyebrow,
      heading: copy.hero.heading,
      subheading: copy.hero.sub,
      primaryCta: { label: rent.ui.getQuote, href: href(quote) },
    },
    facts: [
      { label: rent.ui.minTermLabel, value: copy.facts?.minTerm },
      { label: rent.ui.setupLabel, value: copy.facts?.setup },
    ],
    blocks: copy.blocks,
    ...applyCopy(buildSharedSections(locale, home, rent.ui.getQuote, quote), copy, locale),
    ui: rent.ui,
  }
}
