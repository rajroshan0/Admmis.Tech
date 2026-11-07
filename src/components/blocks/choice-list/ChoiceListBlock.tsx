import { useId } from 'react'

import type { BlockProps } from '../shared-types'
import type { ChoiceListData } from './types'
import { Icon } from '@/components/ui/Icon'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'

// Each row is one link; question and service name wrap, they never truncate (Devanagari).
export function ChoiceListBlock({
  data,
  headingLevel = 2,
  tone = 'surface',
}: BlockProps<ChoiceListData>) {
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
      <ul className="max-w-[60rem] border-t border-line">
        {data.items.map((item) => (
          <li key={item.href + item.question} className="border-b border-line">
            <a
              href={item.href}
              className="group grid min-h-16 gap-1 px-2 py-3 text-fg no-underline hover:bg-bg focus-visible:outline-offset-[-3px] lg:grid-cols-[1fr_auto] lg:items-center lg:gap-6 lg:px-4"
            >
              <span className="font-bold">{item.question}</span>
              <span className="flex items-center gap-2 font-bold text-fg">
                {item.label}
                <Icon
                  name="arrow"
                  className="size-5 transition-transform motion-safe:group-hover:translate-x-1"
                />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
