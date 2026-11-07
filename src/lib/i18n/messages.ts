import type common from '@/messages/en/common.json'
import type home from '@/messages/en/home.json'
import type rent from '@/messages/en/rent.json'
import type services from '@/messages/en/services.json'

import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config'

// Typed server-side message loader (T-303). It stands in for next-intl's request config (T-304):
// the message files in src/messages/<locale>/<namespace>.json stay exactly as they are, and
// getMessages() is the only function pages call. EN is the base; a locale file is merged over it,
// so a missing NE key renders the EN string (i18n.md §3.3).
export type Messages = {
  common: typeof common
  home: typeof home
  services: typeof services
  rent: typeof rent
}
export type Namespace = keyof Messages

const loaders: Record<Locale, { [N in Namespace]?: () => Promise<{ default: unknown }> }> = {
  en: {
    common: () => import('@/messages/en/common.json'),
    home: () => import('@/messages/en/home.json'),
    services: () => import('@/messages/en/services.json'),
    rent: () => import('@/messages/en/rent.json'),
  },
  // NE homepage draft (ADR-041): same keys as EN; keys missing here fall back to EN.
  ne: {
    common: () => import('@/messages/ne/common.json'),
    home: () => import('@/messages/ne/home.json'),
  },
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** Deep merge; objects merge key by key, arrays and strings in `over` replace `base`. */
export function deepMerge<T>(base: T, over: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(over)) return (over ?? base) as T
  const out: Record<string, unknown> = { ...base }
  for (const [key, value] of Object.entries(over)) {
    if (value === undefined || value === '') continue
    out[key] = deepMerge(out[key], value)
  }
  return out as T
}

export async function getMessages<N extends Namespace>(
  locale: Locale,
  namespace: N,
): Promise<Messages[N]> {
  const loadBase = loaders[DEFAULT_LOCALE][namespace]
  if (!loadBase) throw new Error(`Missing base messages for namespace "${namespace}"`)
  const base = (await loadBase()).default as Messages[N]
  if (locale === DEFAULT_LOCALE) return base
  const loadLocale = loaders[locale][namespace]
  if (!loadLocale) return base
  return deepMerge(base, (await loadLocale()).default)
}

/** True when the locale has its own file for the namespace (not just the EN fallback). */
export function hasMessages(locale: Locale, namespace: Namespace): boolean {
  return locale === DEFAULT_LOCALE || loaders[locale][namespace] !== undefined
}
