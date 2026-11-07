import type { Metadata } from 'next'

import { CaseCardsBlock, CtaBandBlock, HeroBlock } from '@/components/blocks'
import { Callout, Section } from '@/components/ui'
import { listCases } from '@/lib/routes/cms-lists'
import { pathFor } from '@/lib/routes/path'
import {
  loadPage,
  pageMeta,
  staticEn,
  type LocaleParams,
} from '@/app/(site)/[locale]/_templates/load'

// Work hub. With 0 cases it shows an empty state and stays noindex (pm decision).
export const dynamicParams = false
export const generateStaticParams = staticEn

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, pages } = await loadPage(params)
  return pageMeta(locale, '/work', pages.work.seoTitle, pages.work.metaDescription)
}

export default async function WorkPage({ params }: LocaleParams) {
  const { locale, pages } = await loadPage(params)
  const w = pages.work
  const cases = await listCases()
  return (
    <>
      <HeroBlock
        data={{ variant: 'plain', eyebrow: w.eyebrow, heading: w.heading, subheading: w.sub }}
      />
      {cases.length > 0 ? (
        <CaseCardsBlock
          data={{
            heading: w.heading,
            items: cases.map((c) => ({
              href: pathFor(locale, `/work/${c.slug}`),
              title: c.title,
              summary: c.summary,
            })),
          }}
        />
      ) : (
        <Section tone="bg">
          <div className="max-w-[40rem]">
            <Callout title={w.emptyTitle}>{w.emptyText}</Callout>
          </div>
        </Section>
      )}
      <CtaBandBlock
        data={{
          heading: w.ctaHeading,
          text: w.ctaText,
          primary: { label: pages.ui.getQuote, href: pathFor(locale, '/contact') },
        }}
      />
    </>
  )
}
