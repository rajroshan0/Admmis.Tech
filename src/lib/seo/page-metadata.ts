import type { Metadata } from 'next'

import { brand } from '@/brands/admmis-tech/brand'
import { getServerEnv } from '@/lib/env'
import type { Locale } from '@/lib/i18n/config'
import type { PageSeo } from '@/lib/routes/section-pages'
import { buildMetadata } from '@/lib/seo/metadata'

// Default share image (lockup on brand navy). Alt text is the brand name, not copy.
const OG_IMAGE = { url: '/og-default.png', width: 1200, height: 630, alt: brand.name }

/**
 * Metadata for the English-only template pages (T-307). Pages without final copy are noindex; no
 * hreflang because no Nepali version exists yet (i18n.md §5 and §6).
 */
export function buildPageMetadata(locale: Locale, path: string, seo: PageSeo): Metadata {
  return buildMetadata({
    siteUrl: getServerEnv().NEXT_PUBLIC_SITE_URL,
    locale,
    path,
    title: seo.title,
    description: seo.description,
    siteName: brand.name,
    image: OG_IMAGE,
    noindex: !seo.indexable,
  })
}
