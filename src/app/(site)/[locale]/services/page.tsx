import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  CtaBandBlock,
  FaqBlock,
  HeroBlock,
  PricingTeaserBlock,
  ProcessStepsBlock,
  RentCardsBlock,
  ServicesGridBlock,
} from '@/components/blocks'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n/config'
import { getMessages } from '@/lib/i18n/messages'
import { buildServicesHubView } from '@/lib/routes/services-view'
import { buildPageMetadata } from '@/lib/seo/page-metadata'
import { toneCycle } from '../_templates/tones'

// Services hub (template services-hub). English only until the Nepali pages exist.
type Props = { params: Promise<{ locale: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: DEFAULT_LOCALE }]
}

async function load(params: Props['params']) {
  const { locale } = await params
  if (!isLocale(locale) || locale !== DEFAULT_LOCALE) notFound()
  const [home, svc] = await Promise.all([
    getMessages(locale, 'home'),
    getMessages(locale, 'services'),
  ])
  return { locale, view: buildServicesHubView(locale, home, svc) }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, view } = await load(params)
  return buildPageMetadata(locale, '/services', view.seo)
}

export default async function ServicesHubPage({ params }: Props) {
  const { view } = await load(params)
  const tone = toneCycle()
  return (
    <>
      <HeroBlock data={view.hero} />
      <ServicesGridBlock data={view.grid} tone={tone()} />
      <PricingTeaserBlock data={{ ...view.pricing, secondary: undefined }} tone={tone()} />
      <RentCardsBlock data={view.rent} tone={tone()} />
      <ProcessStepsBlock data={view.process} tone={tone()} />
      <FaqBlock data={view.faq} tone={tone()} />
      <CtaBandBlock data={view.cta} />
    </>
  )
}
