import type { Cta } from '@/components/ui'
import type { Locale } from '@/lib/i18n/config'
import type { Messages } from '@/lib/i18n/messages'
import { pathFor } from '@/lib/routes/path'
import type { PageCopy } from '@/lib/routes/page-copy'

// Shared by the service and rent templates. Pure and server-side. The data shapes mirror the CMS
// fields (design/templates/*-spec.md section 5), so swapping the CMS in later only changes the loaders.

export type PageSeo = {
  title: string
  description: string
  /** false until the page is in COPY_READY (final copy, no placeholder) */
  indexable: boolean
}

/**
 * Pages whose final copy is in (default: none, so every service and rent page is noindex).
 * Add a slug here when the writer's copy for that page is synced and the placeholder is gone.
 */
export const COPY_READY: { services: ReadonlySet<string>; rent: ReadonlySet<string> } = {
  // All nine service pages are SEO-reviewed (sudip T-709).
  services: new Set([
    'custom-software',
    'qa-testing',
    'audit',
    'offline-marketing',
    'web-development',
    'ai-agents',
    'mobile-app-development',
    'outstaffing',
    'digital-marketing',
  ]),
  // Rent pages stay out: sudip review pending and rent terms are TODO(roshan).
  rent: new Set<string>(),
}

export const slugOf = (link: string) => link.split('/').filter(Boolean).pop() ?? ''

/** Process, FAQ, pricing teaser and closing band are shared copy from the home messages. */
export function buildSharedSections(
  locale: Locale,
  home: Messages['home'],
  getQuote: string,
  quoteHref: string,
) {
  const href = (path: string) => pathFor(locale, path)
  const cta = (label: string, path: string): Cta => ({ label, href: href(path) })
  return {
    process: {
      heading: home.process.title,
      eyebrow: home.process.eyebrow,
      steps: home.process.steps.map((s) => ({ title: s.title, text: s.text })),
    },
    faq: {
      heading: home.faq.title,
      items: home.faq.items.map((item, i) => ({
        id: `faq-${i}`,
        question: item.q,
        answer: item.a,
      })),
    },
    cta: {
      heading: home.finalCta.title,
      text: home.finalCta.text,
      primary: { label: getQuote, href: href(quoteHref) } satisfies Cta,
    },
    pricing: {
      eyebrow: home.pricingTeaser.eyebrow,
      heading: home.pricingTeaser.title,
      text: home.pricingTeaser.text,
      primary: cta(home.pricingTeaser.ctaPrimary, home.pricingTeaser.ctaPrimaryLink),
      secondary: cta(home.pricingTeaser.ctaSecondary, home.pricingTeaser.ctaSecondaryLink),
    },
  }
}

/** Page-specific FAQ, price teaser and closing band from the synced copy; shared home copy fills any gap. */
export function applyCopy(
  shared: ReturnType<typeof buildSharedSections>,
  copy: PageCopy,
  locale: Locale,
) {
  const href = (path: string) => pathFor(locale, path)
  return {
    ...shared,
    faq: copy.faq
      ? {
          heading: copy.faq.heading ?? shared.faq.heading,
          items: copy.faq.items.map((i, n) => ({ id: `faq-${n}`, question: i.q, answer: i.a })),
        }
      : shared.faq,
    pricing: {
      ...shared.pricing,
      ...(copy.price?.heading ? { heading: copy.price.heading } : {}),
      ...(copy.price?.text ? { text: copy.price.text } : {}),
      ...(copy.price?.cta && copy.price.ctaLink
        ? { primary: { label: copy.price.cta, href: href(copy.price.ctaLink) } }
        : {}),
      secondary: undefined,
    },
    cta: {
      ...shared.cta,
      ...(copy.form ? { heading: copy.form.heading, text: copy.form.text ?? shared.cta.text } : {}),
    },
    crossSell: (copy.crossSell ?? []).map((c) => ({ ...c, href: href(c.href) })),
  }
}

/** Paths of the T-309 pages whose final copy is in (default none: all noindex; thank-you is always noindex). */
export const PAGE_COPY_READY: ReadonlySet<string> = new Set<string>()
