import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { DEFAULT_LOCALE, isLocale, type Locale } from '@/lib/i18n/config'
import { getMessages } from '@/lib/i18n/messages'
import { PAGE_COPY_READY } from '@/lib/routes/section-pages'
import { buildPageMetadata } from '@/lib/seo/page-metadata'

// Shared by the T-309 pages: English only, static, noindex until the path is in PAGE_COPY_READY.
export type LocaleParams = { params: Promise<{ locale: string }> }

export const staticEn = () => [{ locale: DEFAULT_LOCALE }]

export async function loadPage(params: LocaleParams['params']) {
  const { locale } = await params
  if (!isLocale(locale) || locale !== DEFAULT_LOCALE) notFound()
  const [home, pages] = await Promise.all([
    getMessages(locale, 'home'),
    getMessages(locale, 'pages'),
  ])
  return { locale, home, pages }
}

export function pageMeta(
  locale: Locale,
  path: string,
  title: string,
  description: string,
  alwaysNoindex = false,
): Metadata {
  return buildPageMetadata(locale, path, {
    title,
    description,
    indexable: !alwaysNoindex && PAGE_COPY_READY.has(path),
  })
}
