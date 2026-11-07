import type { Metadata } from 'next'

import { CtaBandBlock, FaqBlock, FeatureListBlock, HeroBlock } from '@/components/blocks'
import { Callout, Section } from '@/components/ui'
import { pathFor } from '@/lib/routes/path'
import { buildSharedSections } from '@/lib/routes/section-pages'
import { LeadForm } from '@/app/(site)/[locale]/_templates/LeadForm'
import {
  loadPage,
  pageMeta,
  staticEn,
  type LocaleParams,
} from '@/app/(site)/[locale]/_templates/load'

// Pricing (template pricing). No price rows exist until Roshan's decision A6: every price slot is "Request a quote".
export const dynamicParams = false
export const generateStaticParams = staticEn

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, pages } = await loadPage(params)
  return pageMeta(locale, '/pricing', pages.pricing.seoTitle, pages.pricing.metaDescription)
}

export default async function PricingPage({ params }: LocaleParams) {
  const { locale, home, pages } = await loadPage(params)
  const p = pages.pricing
  const shared = buildSharedSections(locale, home, pages.ui.getQuote, '/pricing#form')
  return (
    <>
      <HeroBlock
        data={{
          variant: 'plain',
          eyebrow: p.eyebrow,
          heading: p.heading,
          subheading: p.sub,
          primaryCta: { label: pages.ui.getQuote, href: '#form' },
        }}
      />
      <FeatureListBlock tone="bg" data={{ heading: p.howHeading, items: p.how }} />
      <Section tone="surface">
        <div className="max-w-[40rem]">
          <Callout title={p.pendingTitle}>{p.pendingText}</Callout>
        </div>
      </Section>
      <FaqBlock data={shared.faq} tone="bg" />
      <Section tone="surface" labelledBy="quote-heading">
        <div className="grid gap-8 lg:grid-cols-[5fr_7fr]">
          <div>
            <h2 id="quote-heading" className="mb-3 text-h2 font-bold">
              {p.formHeading}
            </h2>
            <p className="text-lead text-muted">{p.formText}</p>
          </div>
          <LeadForm
            form={pages.form}
            kind="quote"
            locale={locale}
            privacyHref={pathFor(locale, '/privacy')}
          />
        </div>
      </Section>
      <CtaBandBlock data={shared.cta} />
    </>
  )
}
