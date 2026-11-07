import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  CtaBandBlock,
  FaqBlock,
  HeroBlock,
  ProcessStepsBlock,
  RentCardsBlock,
} from '@/components/blocks'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n/config'
import { getMessages } from '@/lib/i18n/messages'
import { buildRentHubView } from '@/lib/routes/rent-view'
import { buildPageMetadata } from '@/lib/seo/page-metadata'
import { PageBlocks } from '@/app/(site)/[locale]/_templates/PageBlocks'
import { toneCycle } from '../_templates/tones'

// On-rent hub (template rent-hub). The plans block and rent-vs-buy table wait for approved prices and copy.
type Props = { params: Promise<{ locale: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: DEFAULT_LOCALE }]
}

async function load(params: Props['params']) {
  const { locale } = await params
  if (!isLocale(locale) || locale !== DEFAULT_LOCALE) notFound()
  const [home, rent] = await Promise.all([getMessages(locale, 'home'), getMessages(locale, 'rent')])
  return { locale, view: buildRentHubView(locale, home, rent) }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, view } = await load(params)
  return buildPageMetadata(locale, '/rent', view.seo)
}

export default async function RentHubPage({ params }: Props) {
  const { view } = await load(params)
  const tone = toneCycle()
  return (
    <>
      <HeroBlock data={view.hero} />
      <RentCardsBlock data={view.cards} tone={tone()} />
      <PageBlocks blocks={view.blocks} tone={tone} introHeading={view.ui.introHeading} />
      <ProcessStepsBlock data={view.process} tone={tone()} />
      <FaqBlock data={view.faq} tone={tone()} />
      <CtaBandBlock data={view.cta} />
    </>
  )
}
