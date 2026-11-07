import { useId } from 'react'

import type { BlockProps } from '../shared-types'
import type { ServicesGridData } from './types'
import { Icon } from '@/components/ui/Icon'
import { LinkButton } from '@/components/ui/Button'
import { Card, CardLink, IconTile } from '@/components/ui/Card'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'

// One column of compact rows at 360 px, two columns from 640, three from 1024.
export function ServicesGridBlock({
  data,
  headingLevel = 2,
  tone = 'bg',
}: BlockProps<ServicesGridData>) {
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
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {data.items.map((item) => {
          // WCAG 2.5.3: an accessible name must contain the visible text; otherwise append the label as hidden text.
          const labelContainsTitle = item.linkLabel
            ?.toLowerCase()
            .includes(item.title.toLowerCase())
          return (
            <li key={item.href}>
              <Card
                interactive
                className="block h-full max-sm:grid max-sm:grid-cols-[3rem_1fr] max-sm:items-start max-sm:gap-x-4 max-sm:p-4"
              >
                <span className="max-sm:row-span-2">
                  <IconTile>
                    {item.icon ? <Icon name={item.icon} className="size-6.5" /> : null}
                  </IconTile>
                </span>
                <h3 className="mb-1 mt-3 text-[1.125rem] font-bold sm:text-h3 max-sm:mt-0">
                  <CardLink
                    href={item.href}
                    ariaLabel={labelContainsTitle ? item.linkLabel : undefined}
                  >
                    {item.title}
                    {item.linkLabel && !labelContainsTitle ? (
                      <span className="sr-only"> – {item.linkLabel}</span>
                    ) : null}
                  </CardLink>
                </h3>
                <p className="text-card text-muted">{item.summary}</p>
              </Card>
            </li>
          )
        })}
      </ul>
      {data.cta ? (
        <div className="mt-8 text-center">
          <LinkButton
            cta={data.cta}
            variant="link"
            iconEnd={<Icon name="arrow" className="size-5" />}
          />
        </div>
      ) : null}
    </Section>
  )
}
