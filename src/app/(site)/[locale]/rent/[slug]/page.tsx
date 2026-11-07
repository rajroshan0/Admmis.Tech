import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  CtaBandBlock,
  FaqBlock,
  HeroBlock,
  PricingTeaserBlock,
  ProcessStepsBlock,
} from '@/components/blocks'
import { Price, ServiceFacts } from '@/components/ui'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n/config'
import { getMessages } from '@/lib/i18n/messages'
import { buildRentProductView, rentSlugs } from '@/lib/routes/rent-view'
import { buildPageMetadata } from '@/lib/seo/page-metadata'
import { IntroSection } from '@/app/(site)/[locale]/_templates/IntroSection'
import { PriceAside } from '@/app/(site)/[locale]/_templates/PriceAside'
import { toneCycle } from '@/app/(site)/[locale]/_templates/tones'

// Rental product page (template rent-product). Minimum term and setup rows are TODO(roshan): omitted.
type Props = { params: Promise<{ locale: string; slug: string }> }

export const dynamicParams = false

export async function generateStaticParams() {
  const home = await getMessages(DEFAULT_LOCALE, 'home')
  return rentSlugs(home).map((slug) => ({ locale: DEFAULT_LOCALE, slug }))
}

async function load(params: Props['params']) {
  const { locale, slug } = await params
  if (!isLocale(locale) || locale !== DEFAULT_LOCALE) notFound()
  const [home, rent] = await Promise.all([getMessages(locale, 'home'), getMessages(locale, 'rent')])
  const view = buildRentProductView(locale, slug, home, rent)
  if (!view) notFound()
  return { locale, view }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, view } = await load(params)
  return buildPageMetadata(locale, `/rent/${view.slug}`, view.seo)
}

export default async function RentProductPage({ params }: Props) {
  const { view } = await load(params)
  const { ui } = view
  const tone = toneCycle()
  const facts = (
    <ServiceFacts
      label={ui.factsLabel}
      title={ui.factsTitle}
      rows={[{ label: ui.startsFrom, value: <Price quoteLabel={ui.requestQuote} /> }]}
    />
  )
  return (
    <>
      <HeroBlock data={view.hero} aside={facts} />
      <IntroSection
        tone={tone()}
        heading={view.intro.heading}
        text={view.intro.text}
        placeholder={{ title: ui.placeholderTitle, text: ui.placeholderText }}
      />
      <ProcessStepsBlock data={view.process} tone={tone()} />
      <PricingTeaserBlock
        data={{ ...view.pricing, secondary: undefined }}
        tone={tone()}
        aside={<PriceAside label={ui.requestQuote} />}
      />
      <FaqBlock data={view.faq} tone={tone()} />
      <CtaBandBlock data={view.cta} />
    </>
  )
}
