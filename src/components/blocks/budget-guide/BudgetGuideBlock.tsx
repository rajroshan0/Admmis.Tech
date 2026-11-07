import { useId } from 'react'

import type { BlockProps } from '../shared-types'
import type { BudgetGuideData } from './types'
import { Price } from '@/components/ui/Price'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'

// "label : from price" rows. Wraps, never truncates. `children` is the cost-drivers text beside it.
export function BudgetGuideBlock({
  data,
  headingLevel = 2,
  tone = 'surface',
  children,
}: BlockProps<BudgetGuideData> & { children?: React.ReactNode }) {
  const headingId = useId()
  return (
    <Section tone={tone} labelledBy={headingId}>
      <SectionHeader
        id={headingId}
        eyebrow={data.eyebrow}
        heading={data.heading}
        intro={data.intro}
        level={headingLevel}
      />
      <div className={children ? 'grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-12' : ''}>
        <dl className="max-w-[40rem] border-t border-line">
          {data.rows.map((r) => (
            <div
              key={r.label}
              className="flex min-h-14 flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-line py-2"
            >
              <dt className="font-bold">{r.label}</dt>
              <dd className="m-0">
                <Price
                  prefix={data.pricePrefix}
                  amount={r.quoteOnly ? undefined : r.price?.amount}
                  secondary={r.price?.secondary}
                  unit={r.price?.unit}
                  quoteLabel={r.quoteOnly ? data.quoteOnlyLabel : data.priceFallback}
                />
              </dd>
            </div>
          ))}
        </dl>
        {children ? <div>{children}</div> : null}
      </div>
    </Section>
  )
}
