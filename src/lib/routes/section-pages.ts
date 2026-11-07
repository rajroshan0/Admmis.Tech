import type { Cta } from '@/components/ui'
import type { Locale } from '@/lib/i18n/config'
import type { Messages } from '@/lib/i18n/messages'
import { pathFor } from '@/lib/routes/path'

// Shared by the service and rent templates. Pure and server-side. The data shapes mirror the CMS
// fields (design/templates/*-spec.md section 5), so swapping the CMS in later only changes the loaders.

export type PageSeo = {
  title: string
  description: string
  /** false until the page has its SEO brief entry and final copy (ASSUMPTION in T-307) */
  indexable: boolean
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
