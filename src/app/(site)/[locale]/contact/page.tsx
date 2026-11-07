import type { Metadata } from 'next'

import { CtaBandBlock, FaqBlock, HeroBlock, ProcessStepsBlock } from '@/components/blocks'
import { ContactChannels, Section } from '@/components/ui'
import { getMessages } from '@/lib/i18n/messages'
import { pathFor } from '@/lib/routes/path'
import { buildSharedSections } from '@/lib/routes/section-pages'
import { LeadForm } from '@/app/(site)/[locale]/_templates/LeadForm'
import {
  loadPage,
  pageMeta,
  staticEn,
  type LocaleParams,
} from '@/app/(site)/[locale]/_templates/load'

// Contact. Plain POST form; WhatsApp and phone rows stay hidden until Roshan's numbers exist.
export const dynamicParams = false
export const generateStaticParams = staticEn

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, pages } = await loadPage(params)
  return pageMeta(locale, '/contact', pages.contact.seoTitle, pages.contact.metaDescription)
}

export default async function ContactPage({ params }: LocaleParams) {
  const { locale, home, pages } = await loadPage(params)
  const common = await getMessages(locale, 'common')
  const c = pages.contact
  const shared = buildSharedSections(locale, home, pages.ui.getQuote, '/contact#form')
  return (
    <>
      <HeroBlock
        data={{ variant: 'plain', eyebrow: c.eyebrow, heading: c.heading, subheading: c.sub }}
      />
      <Section tone="bg">
        <div className="grid gap-8 lg:grid-cols-[7fr_5fr]">
          <LeadForm
            form={pages.form}
            kind="contact"
            locale={locale}
            privacyHref={pathFor(locale, '/privacy')}
          />
          <ContactChannels
            heading={c.channelsHeading}
            rows={[
              {
                label: common.footer.contact.emailLabel,
                value: common.footer.contact.email,
                href: `mailto:${common.footer.contact.email}`,
              },
            ]}
          />
        </div>
      </Section>
      <ProcessStepsBlock data={{ heading: c.nextHeading, steps: c.next }} tone="surface" />
      <FaqBlock data={shared.faq} tone="bg" />
      <CtaBandBlock data={shared.cta} />
    </>
  )
}
