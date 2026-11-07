import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CtaBandBlock, HeroBlock, StatRowBlock } from '@/components/blocks'
import { CaseFacts, Section } from '@/components/ui'
import { DEFAULT_LOCALE } from '@/lib/i18n/config'
import { listCases } from '@/lib/routes/cms-lists'
import { pathFor } from '@/lib/routes/path'
import { loadPage, pageMeta, type LocaleParams } from '@/app/(site)/[locale]/_templates/load'

// Case page. No approved case exists, so there are no static params and every slug is a 404.
type Props = { params: Promise<{ locale: string; slug: string }> }
export const dynamicParams = false

export async function generateStaticParams() {
  return (await listCases()).map((c) => ({ locale: DEFAULT_LOCALE, slug: c.slug }))
}

async function load(params: Props['params']) {
  const { slug } = await params
  const base = await loadPage(params as LocaleParams['params'])
  const item = (await listCases()).find((c) => c.slug === slug)
  if (!item) notFound()
  return { ...base, item }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, item } = await load(params)
  return pageMeta(locale, `/work/${item.slug}`, item.title, item.summary)
}

export default async function CasePage({ params }: Props) {
  const { locale, pages, item } = await load(params)
  const l = pages.work.labels
  const sections = [
    [l.challenge, item.challenge],
    [l.solution, item.solution],
    [l.result, item.result],
  ] as const
  return (
    <>
      <HeroBlock
        data={{ variant: 'plain', heading: item.title, subheading: item.summary }}
        aside={
          <CaseFacts
            label={l.facts}
            title={l.facts}
            rows={[
              { label: l.client, value: item.client },
              { label: l.industry, value: item.industry },
              { label: l.year, value: item.year },
            ]}
          />
        }
      />
      {sections.map(([heading, text]) =>
        text ? (
          <Section key={heading} tone="bg">
            <div className="max-w-[40rem]">
              <h2 className="mb-3 text-h2 font-bold">{heading}</h2>
              <p className="text-lead text-muted">{text}</p>
            </div>
          </Section>
        ) : null,
      )}
      <StatRowBlock data={{ heading: l.metrics, items: item.metrics ?? [] }} tone="surface" />
      <CtaBandBlock
        data={{
          heading: pages.work.ctaHeading,
          text: pages.work.ctaText,
          primary: { label: pages.ui.getQuote, href: pathFor(locale, '/contact') },
        }}
      />
    </>
  )
}
