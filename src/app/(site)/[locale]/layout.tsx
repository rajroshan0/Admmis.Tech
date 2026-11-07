import { notFound } from 'next/navigation'
import type { Viewport } from 'next'
import type { ReactNode } from 'react'

import { devanagari, latin } from '@/brands/admmis-tech/fonts'
import { Footer, Header, MobileStickyBar, SkipLink } from '@/components/layout'
import { isLocale } from '@/lib/i18n/config'
import { getMessages } from '@/lib/i18n/messages'
import { getServerEnv } from '@/lib/env'
import { buildChrome } from '@/lib/routes/home-view'
import '@/styles/globals.css'

// This layout is the root layout of the public site; (payload) has its own root layout.
// Static: no cookies(), headers() or searchParams here (templates-and-routes.md §7).
export function generateStaticParams() {
  return getServerEnv().ENABLED_LOCALES.map((locale) => ({ locale }))
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1 }

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale) || !getServerEnv().ENABLED_LOCALES.some((l) => l === locale)) notFound()

  const common = await getMessages(locale, 'common')
  const chrome = buildChrome(locale, common, getServerEnv().ENABLED_LOCALES)

  return (
    <html
      lang={locale}
      className={locale === 'ne' ? `${latin.variable} ${devanagari.variable}` : latin.variable}
    >
      <body>
        <SkipLink label={chrome.skipToContent} />
        <Header {...chrome.header} />
        <main id="main">{children}</main>
        <Footer {...chrome.footer} />
        <MobileStickyBar {...chrome.stickyBar} />
      </body>
    </html>
  )
}
