import type { Metadata } from 'next'

import { CtaBandBlock, HeroBlock, ProcessStepsBlock } from '@/components/blocks'
import { Callout, Section } from '@/components/ui'
import { pathFor } from '@/lib/routes/path'
import { buildSharedSections } from '@/lib/routes/section-pages'
import {
  loadPage,
  pageMeta,
  staticEn,
  type LocaleParams,
} from '@/app/(site)/[locale]/_templates/load'

// About. Team, numbers and client logos stay hidden until Roshan confirms them (about-spec §1).
export const dynamicParams = false
export const generateStaticParams = staticEn

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, pages } = await loadPage(params)
  return pageMeta(locale, '/about', pages.about.seoTitle, pages.about.metaDescription)
}

export default async function AboutPage({ params }: LocaleParams) {
  const { locale, home, pages } = await loadPage(params)
  const a = pages.about
  const shared = buildSharedSections(locale, home, pages.ui.getQuote, '/contact')
  return (
    <>
      <HeroBlock
        data={{
          variant: 'plain',
          eyebrow: a.eyebrow,
          heading: a.heading,
          subheading: a.calloutText,
        }}
      />
      <Section tone="bg">
        <div className="max-w-[40rem]">
          <Callout title={a.calloutTitle}>{a.calloutText}</Callout>
        </div>
      </Section>
      <ProcessStepsBlock data={shared.process} tone="surface" />
      <CtaBandBlock
        data={{
          heading: a.ctaHeading,
          text: a.ctaText,
          primary: { label: pages.ui.getQuote, href: pathFor(locale, '/contact') },
        }}
      />
    </>
  )
}
