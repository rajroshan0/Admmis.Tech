import type { ReactNode } from 'react'

import type { BlockProps } from '../shared-types'
import type { PricingTeaserData } from './types'
import { LinkButton } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'

// No price numbers until the price list is approved (ADR-025): the price box is an optional `aside` slot
// that the pricing templates fill from the CMS. Without it the text column stands alone.
export function PricingTeaserBlock({
  data,
  headingLevel = 2,
  tone = 'surface',
  aside,
}: BlockProps<PricingTeaserData> & { aside?: ReactNode }) {
  const Tag = `h${headingLevel}` as 'h2' | 'h3'
  return (
    <Section tone={tone} labelledBy="pricing-heading">
      <div className={aside ? 'grid items-center gap-8 lg:grid-cols-2 lg:gap-16' : ''}>
        <div className="max-w-[52rem]">
          {data.eyebrow ? <p className="eyebrow mb-3">{data.eyebrow}</p> : null}
          <Tag id="pricing-heading" className="text-h2 font-bold">
            {data.heading}
          </Tag>
          {data.text ? (
            <p className="mt-3 max-w-[40rem] text-lead text-muted">{data.text}</p>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-4">
            <LinkButton cta={data.primary} className="flex-1 basis-45 sm:flex-none" />
            <LinkButton
              cta={data.secondary}
              variant="secondary"
              className="flex-1 basis-45 sm:flex-none"
            />
          </div>
        </div>
        {aside}
      </div>
    </Section>
  )
}
