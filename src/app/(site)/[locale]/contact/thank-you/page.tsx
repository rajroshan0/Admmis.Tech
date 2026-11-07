import type { Metadata } from 'next'

import { LinkButton, Section } from '@/components/ui'
import { SuccessPanel } from '@/components/forms'
import { pathFor } from '@/lib/routes/path'
import {
  loadPage,
  pageMeta,
  staticEn,
  type LocaleParams,
} from '@/app/(site)/[locale]/_templates/load'

// Success page after the 303 from /api/leads. Always noindex; never echoes what the visitor typed.
export const dynamicParams = false
export const generateStaticParams = staticEn

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, pages } = await loadPage(params)
  return pageMeta(
    locale,
    '/contact/thank-you',
    pages.contact.thanks.seoTitle,
    pages.contact.thanks.text,
    true,
  )
}

export default async function ThankYouPage({ params }: LocaleParams) {
  const { locale, pages } = await loadPage(params)
  const t = pages.contact.thanks
  return (
    <Section tone="bg">
      <div className="mx-auto max-w-[36rem]">
        <SuccessPanel heading={t.heading}>
          <p className="mb-6 text-lead text-muted">{t.text}</p>
          <div className="flex flex-wrap gap-4">
            <LinkButton cta={{ label: pages.ui.home, href: pathFor(locale, '/') }} />
            <LinkButton
              variant="secondary"
              cta={{ label: t.work, href: pathFor(locale, '/work') }}
            />
          </div>
        </SuccessPanel>
      </div>
    </Section>
  )
}
