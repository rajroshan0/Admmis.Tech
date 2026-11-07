import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config'

/** Locale-aware path (i18n.md §2.2): EN is unprefixed, NE lives under /ne. `path` starts with "/". */
export function pathFor(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) return path
  return path === '/' ? `/${locale}` : `/${locale}${path}`
}

/**
 * Items for the language switch (ADR-041). Until other pages have NE versions, each item points to
 * the homepage of its locale. `names` are native names from common.languages.
 */
export function languageItems(
  current: Locale,
  enabled: readonly Locale[],
  names: Record<Locale, string>,
) {
  return enabled.map((locale) => ({
    locale,
    name: names[locale],
    href: pathFor(locale, '/'),
    current: locale === current,
  }))
}
