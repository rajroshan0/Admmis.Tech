import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config'

/** Locale-aware path (i18n.md §2.2): EN is unprefixed, NE lives under /ne. `path` starts with "/". */
export function pathFor(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) return path
  return path === '/' ? `/${locale}` : `/${locale}${path}`
}
