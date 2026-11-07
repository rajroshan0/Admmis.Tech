import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { HeroBlock } from '@/components/blocks'
import { Price, ServiceFacts } from '@/components/ui'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n/config'
import { getMessages } from '@/lib/i18n/messages'
import { buildRentProductView, rentSlugs } from '@/lib/routes/rent-view'
import { buildPageMetadata } from '@/lib/seo/page-metadata'
import { PageBlocks, PageTail } from '@/app/(site)/[locale]/_templates/PageBlocks'
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
      rows={[
        { label: ui.startsFrom, value: <Price quoteLabel={ui.requestQuote} /> },
        ...view.facts,
      ]}
    />
  )
  return (
    <>
      <HeroBlock data={view.hero} aside={facts} />
      <PageBlocks
        blocks={view.blocks}
        tone={tone}
        introHeading={ui.introHeading}
        notIncludedHeading={ui.notIncludedHeading}
      />
      <PageTail
        tone={tone}
        pricing={view.pricing}
        priceLabel={ui.requestQuote}
        crossSell={view.crossSell}
        crossSellHeading={ui.crossSellHeading}
        faq={view.faq}
        cta={view.cta}
      />
    </>
  )
}
