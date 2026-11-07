import type { Metadata } from 'next'

import { OG_LOCALE, type Locale } from '@/lib/i18n/config'
import { pathFor } from '@/lib/routes/path'

type Input = {
  siteUrl: string
  locale: Locale
  path: string
  title: string
  description: string
  siteName: string
  image?: { url: string; width: number; height: number; alt: string }
}

// Title and description come from the page's SEO fields; canonical is absolute and self-referencing.
// hreflang is added only for translated locales (i18n.md §6); with EN only there is none.
export function buildMetadata(input: Input): Metadata {
  const url = new URL(pathFor(input.locale, input.path), input.siteUrl).toString()
  return {
    metadataBase: new URL(input.siteUrl),
    title: { absolute: input.title },
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: input.siteName,
      title: input.title,
      description: input.description,
      locale: OG_LOCALE[input.locale],
      ...(input.image ? { images: [input.image] } : {}),
    },
    twitter: { card: 'summary_large_image', title: input.title, description: input.description },
  }
}
