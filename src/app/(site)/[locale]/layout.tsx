import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import { getServerEnv } from '@/lib/env'
import '@/styles/globals.css'

// This layout is the root layout of the public site; (payload) has its own root layout.
// TODO(mahendra): next-intl, setRequestLocale, metadata (docs/frontend/i18n.md §2.2).
export function generateStaticParams() {
  return getServerEnv().ENABLED_LOCALES.map((locale) => ({ locale }))
}

export const dynamicParams = false

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!getServerEnv().ENABLED_LOCALES.some((l) => l === locale)) notFound()
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  )
}
