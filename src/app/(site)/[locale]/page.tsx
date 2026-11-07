import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  CaseCardsBlock,
  CtaBandBlock,
  EventTeaserBlock,
  FaqBlock,
  FeatureListBlock,
  HeroBlock,
  PricingTeaserBlock,
  ProcessStepsBlock,
  RentCardsBlock,
  ServicesGridBlock,
} from '@/components/blocks'
import { brand } from '@/brands/admmis-tech/brand'
import { isLocale } from '@/lib/i18n/config'
import { getMessages } from '@/lib/i18n/messages'
import { getServerEnv } from '@/lib/env'
import { buildHomeView } from '@/lib/routes/home-view'
import { buildMetadata } from '@/lib/seo/metadata'

const HERO_IMAGE = { src: '/images/hero-model.webp', width: 640, height: 800 }

// Default share image (lockup on brand navy). Alt text is the brand name, not copy.
const OG_IMAGE = { url: '/og-default.png', width: 1200, height: 630, alt: brand.name }

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const home = await getMessages(locale, 'home')
  return buildMetadata({
    siteUrl: getServerEnv().NEXT_PUBLIC_SITE_URL,
    locale,
    path: '/',
    title: home.meta.title,
    description: home.meta.metaDescription,
    siteName: brand.name,
    image: OG_IMAGE,
  })
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const [home, common] = await Promise.all([
    getMessages(locale, 'home'),
    getMessages(locale, 'common'),
  ])
  const view = buildHomeView(locale, home, common, HERO_IMAGE)

  return (
    <>
      <HeroBlock data={view.hero} />
      <ServicesGridBlock data={view.services} />
      <RentCardsBlock data={view.rent} />
      <FeatureListBlock data={view.whyUs} />
      <ProcessStepsBlock data={view.process} />
      <CaseCardsBlock data={view.work} />
      <PricingTeaserBlock data={view.pricingTeaser} />
      <EventTeaserBlock data={view.event} />
      <FaqBlock data={view.faq} />
      <CtaBandBlock data={view.finalCta} />
    </>
  )
}
