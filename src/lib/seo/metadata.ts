import type { Metadata } from 'next'

import { DEFAULT_LOCALE, OG_LOCALE, type Locale } from '@/lib/i18n/config'
import { pathFor } from '@/lib/routes/path'

type Input = {
  siteUrl: string
  locale: Locale
  path: string
  title: string
  description: string
  siteName: string
  /** Locales in which this page is fully translated; hreflang is emitted only when there are two or more. */
  translatedLocales?: Locale[]
  /** Untranslated page: reachable, but kept out of the index (i18n.md §5, hritik rule A). */
  noindex?: boolean
  image?: { url: string; width: number; height: number; alt: string }
}

// Title and description come from the page's SEO fields; canonical is absolute and self-referencing.
// hreflang is added only for translated locales (i18n.md §6); with EN only there is none.
export function buildMetadata(input: Input): Metadata {
  const absolute = (locale: Locale) => new URL(pathFor(locale, input.path), input.siteUrl).toString()
  const url = absolute(input.locale)
  const translated = input.translatedLocales ?? []
  const languages =
    translated.length > 1
      ? {
          ...Object.fromEntries(translated.map((l) => [l, absolute(l)])),
          'x-default': absolute(DEFAULT_LOCALE),
        }
      : undefined
  return {
    metadataBase: new URL(input.siteUrl),
    title: { absolute: input.title },
    description: input.description,
    ...(input.noindex ? { robots: { index: false, follow: true } } : {}),
    alternates: { canonical: url, ...(languages ? { languages } : {}) },
    openGraph: {
      type: 'website',
      url,
      siteName: input.siteName,
      title: input.title,
      description: input.description,
      locale: OG_LOCALE[input.locale],
      ...(input.image ? { images: [input.image] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      ...(input.image ? { images: [input.image.url] } : {}),
    },
    icons: { apple: '/apple-touch-icon.png' },
  }
}
