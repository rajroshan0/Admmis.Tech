import type { Metadata } from 'next'

import { FaqBlock, HeroBlock } from '@/components/blocks'
import { Section } from '@/components/ui'
import { dateParts } from '@/lib/routes/home-view'
import { pathFor } from '@/lib/routes/path'
import { buildSharedSections } from '@/lib/routes/section-pages'
import { LeadForm } from '@/app/(site)/[locale]/_templates/LeadForm'
import {
  loadPage,
  pageMeta,
  staticEn,
  type LocaleParams,
} from '@/app/(site)/[locale]/_templates/load'

// Opening event (sitemap /opening-event). Venue, time and agenda are TODO(roshan): hidden until they exist.
export const dynamicParams = false
export const generateStaticParams = staticEn

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, pages } = await loadPage(params)
  return pageMeta(locale, '/opening-event', pages.event.seoTitle, pages.event.metaDescription)
}

export default async function EventPage({ params }: LocaleParams) {
  const { locale, home, pages } = await loadPage(params)
  const e = pages.event
  const d = dateParts(locale, home.event.dateIso)
  const shared = buildSharedSections(locale, home, pages.ui.getQuote, '/opening-event#form')
  return (
    <>
      <HeroBlock
        data={{
          variant: 'plain',
          eyebrow: home.event.eyebrow,
          heading: home.event.title,
          subheading: home.event.text,
        }}
        aside={
          <p
            role="img"
            aria-label={home.event.date}
            className="w-33 rounded-card border-2 border-primary bg-primary px-2 py-3.5 text-center text-on-primary shadow-[6px_6px_0_var(--color-accent)]"
          >
            <b className="block text-[3.5rem] font-bold leading-none">{d.day}</b>
            <span className="block font-bold tracking-widest">{d.month}</span>
            <span className="block">{d.year}</span>
          </p>
        }
      />
      <Section tone="bg" labelledBy="register-heading">
        <div className="grid gap-8 lg:grid-cols-[5fr_7fr]">
          <div>
            <h2 id="register-heading" className="mb-3 text-h2 font-bold">
              {e.registerHeading}
            </h2>
            <p className="text-lead text-muted">{e.registerText}</p>
          </div>
          <LeadForm
            form={pages.form}
            kind="event"
            locale={locale}
            privacyHref={pathFor(locale, '/privacy')}
            full={false}
          />
        </div>
      </Section>
      <FaqBlock data={shared.faq} tone="surface" />
    </>
  )
}
