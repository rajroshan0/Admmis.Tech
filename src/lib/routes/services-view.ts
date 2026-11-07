import { SERVICE_ICONS } from '@/lib/routes/home-view'
import { buildSharedSections, COPY_READY, slugOf, type PageSeo } from '@/lib/routes/section-pages'
import type { Locale } from '@/lib/i18n/config'
import type { Messages } from '@/lib/i18n/messages'
import { pathFor } from '@/lib/routes/path'

type Items = Messages['services']['items']

const BRAND_SUFFIX = ' | ADMMIS.TECH'

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
  const seo: PageSeo = {
    title: svc.hub.seoTitle,
    description: svc.hub.metaDescription,
    indexable: true,
  }
  return {
    seo,
    hero: {
      variant: 'plain' as const,
      eyebrow: svc.ui.hubEyebrow,
      heading: svc.hub.heroHeading,
      subheading: svc.hub.heroSub,
      primaryCta: { label: svc.ui.getQuote, href: href('/contact') },
    },
    grid: {
      heading: svc.hub.listHeading,
      items: home.services.cards.map((card, i) => ({
        href: href(card.link),
        title: card.title,
        summary: card.text,
        icon: SERVICE_ICONS[i],
        linkLabel: card.linkLabel,
      })),
    },
    ...buildSharedSections(locale, home, svc.ui.getQuote, '/contact'),
    rent: {
      heading: home.rent.title,
      eyebrow: home.rent.eyebrow,
      intro: home.rent.intro,
      items: home.rent.cards.map((card) => ({
        href: href(card.link),
        title: card.title,
        summary: card.text,
      })),
      cta: { label: home.rent.ctaLabel, href: href(home.rent.ctaLink) },
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
  const index = serviceSlugs(home).indexOf(slug)
  if (index < 0) return null
  const card = home.services.cards[index]
  if (!card) return null
  const entry = (svc.items as Record<string, Items[keyof Items] | undefined>)[slug]
  const href = (path: string) => pathFor(locale, path)

  // No brief entry: title and description fall back to the card. Indexing depends only on COPY_READY.
  const seo: PageSeo = {
    title: entry?.seoTitle ?? `${card.linkLabel}${BRAND_SUFFIX}`,
    description: entry?.metaDescription ?? card.text,
    indexable: COPY_READY.services.has(slug),
  }
  return {
    seo,
    slug,
    hero: {
      variant: 'plain' as const,
      eyebrow: svc.ui.eyebrow,
      // seo/sitemap.md rule 7: H1 = heroHeading, fallback title
      heading: entry?.heroHeading ?? card.title,
      subheading: entry?.heroSub ?? card.text,
      primaryCta: { label: svc.ui.getQuote, href: href(`/contact?service=${slug}`) },
    },
    intro: { heading: svc.ui.introHeading, text: card.text },
    ...buildSharedSections(locale, home, svc.ui.getQuote, `/contact?service=${slug}`),
    ui: svc.ui,
  }
}
