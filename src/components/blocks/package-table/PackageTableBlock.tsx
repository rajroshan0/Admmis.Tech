import { useId } from 'react'

import type { BlockProps } from '../shared-types'
import type { PackageTableData } from './types'
import { LinkButton } from '@/components/ui/Button'
import { Price } from '@/components/ui/Price'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Table } from '@/components/ui/Table'

// All bands stay in the DOM. With a BandSelectBlock on the page and :has() support, CSS shows the checked
// band only; otherwise every band is listed with its label (components.css .band-price).
export function PackageTableBlock({
  data,
  headingLevel = 2,
  tone = 'bg',
}: BlockProps<PackageTableData>) {
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
      <Table
        caption={data.caption}
        columns={data.columns}
        rows={data.packages.map((p) => ({
          key: p.id,
          header: (
            <>
              <span className="block font-bold">{p.name}</span>
              {p.forWho ? <span className="block text-small text-muted">{p.forWho}</span> : null}
            </>
          ),
          cells: [
            <ul key="inc" className="grid gap-1">
              {p.inclusions.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>,
            <div key="price" className="grid gap-3">
              {data.bandLabels.map((label, i) => (
                <div key={label} className="band-price" data-i={i + 1}>
                  {data.bandLabels.length > 1 ? (
                    <span className="block text-small text-muted">{label}</span>
                  ) : null}
                  <Price
                    prefix={data.pricePrefix}
                    amount={p.quoteOnly ? undefined : p.prices[i]?.amount}
                    secondary={p.prices[i]?.secondary}
                    unit={p.prices[i]?.unit}
                    quoteLabel={p.quoteOnly ? data.quoteOnlyLabel : data.priceFallback}
                  />
                </div>
              ))}
              <LinkButton cta={p.cta} variant="secondary" className="w-full sm:w-auto" />
            </div>,
          ],
        }))}
      />
    </Section>
  )
}
