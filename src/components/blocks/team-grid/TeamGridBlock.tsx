import { useId } from 'react'

import type { BlockProps } from '../shared-types'
import type { TeamGridData } from './types'
import { Icon } from '@/components/ui/Icon'
import { Avatar } from '@/components/ui/Initials'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'

// Cards are not links; only the social links are, as 44 px icon buttons named by `label`.
export function TeamGridBlock({ data, headingLevel = 2, tone = 'bg' }: BlockProps<TeamGridData>) {
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
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {data.members.map((m) => (
          <li key={m.name} className="rounded-card border border-line bg-surface p-3 lg:p-4">
            <Avatar
              name={m.name}
              photo={m.photo}
              sizes="(min-width: 1024px) 200px, 45vw"
              className="max-w-[12.5rem]"
            />
            <h3 className="mt-3 text-[1.125rem] font-bold">{m.name}</h3>
            {m.role ? <p className="text-small text-muted">{m.role}</p> : null}
            {m.bio ? <p className="mt-2 text-card text-muted">{m.bio}</p> : null}
            {m.links && m.links.length > 0 ? (
              <ul className="mt-2 flex flex-wrap gap-1">
                {m.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      aria-label={`${m.name}: ${l.label}`}
                      className="grid size-11 place-items-center rounded-button text-fg hover:bg-bg"
                    >
                      <Icon name={l.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </Section>
  )
}
