import { useId } from 'react'

import type { BlockProps, SectionHead } from '../shared-types'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'

export type AgendaItem = { time: string; title: string; speaker?: string }
export type AgendaData = SectionHead & { items: AgendaItem[] }

// A plain <ol>: time above the title at 360 px, two columns from 768 px. Times are strings from the CMS.
export function AgendaBlock({ data, headingLevel = 2, tone = 'surface' }: BlockProps<AgendaData>) {
  const headingId = useId()
  if (data.items.length === 0) return null
  return (
    <Section tone={tone} labelledBy={headingId}>
      <SectionHeader
        id={headingId}
        eyebrow={data.eyebrow}
        heading={data.heading}
        intro={data.intro}
        level={headingLevel}
      />
      <ol className="max-w-[52rem] border-t border-line">
        {data.items.map((a) => (
          <li
            key={a.time + a.title}
            className="grid gap-1 border-b border-line py-4 md:grid-cols-[8rem_1fr] md:gap-6"
          >
            <p className="font-bold tabular-nums">{a.time}</p>
            <div>
              <p className="font-bold">{a.title}</p>
              {a.speaker ? <p className="text-small text-muted">{a.speaker}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
