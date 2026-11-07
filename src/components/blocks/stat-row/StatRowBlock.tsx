import { useId } from 'react'

import type { BlockProps, SectionHead } from '../shared-types'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'

/** Real figures only. Value max 8 characters, label max 32. */
export type StatItem = { value: string; label: string }
export type StatRowData = Partial<SectionHead> & { items: StatItem[] }

export function StatRowBlock({
  data,
  headingLevel = 2,
  tone = 'surface',
}: BlockProps<StatRowData>) {
  const headingId = useId()
  if (data.items.length === 0) return null
  return (
    <Section tone={tone} labelledBy={data.heading ? headingId : undefined}>
      {data.heading ? (
        <SectionHeader
          id={headingId}
          eyebrow={data.eyebrow}
          heading={data.heading}
          intro={data.intro}
          level={headingLevel}
        />
      ) : null}
      <dl className="grid grid-cols-2 gap-y-6 lg:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] lg:gap-y-0">
        {data.items.map((s) => (
          <div key={s.label} className="px-4 lg:border-s lg:border-line lg:first:border-s-0">
            <dd className="m-0 text-[2.5rem] font-bold leading-tight text-fg">{s.value}</dd>
            <dt className="text-card text-muted">{s.label}</dt>
          </div>
        ))}
      </dl>
    </Section>
  )
}
