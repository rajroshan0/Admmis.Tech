// Locale constants (docs/frontend/i18n.md §2.2). Which locales are enabled is a deploy-time
// setting read by lib/env.ts (ENABLED_LOCALES); this file holds only the static facts.
export const ALL_LOCALES = ['en', 'ne'] as const
export type Locale = (typeof ALL_LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'

export function isLocale(value: string): value is Locale {
  return (ALL_LOCALES as readonly string[]).includes(value)
}

/** og:locale values (i18n.md §6). */
export const OG_LOCALE: Record<Locale, string> = { en: 'en_US', ne: 'ne_NP' }
