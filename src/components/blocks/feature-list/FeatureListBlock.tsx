import { useId } from 'react'

import type { BlockProps } from '../shared-types'
import type { FeatureListData } from './types'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Card, CardLink, IconTile } from '@/components/ui/Card'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'

const DEFAULT_ICONS: IconName[] = ['check', 'code', 'pin', 'calendar']

// Not links by default, so no hover lift. In the `rule` variant the 6 px top rule cycles through the
// brand colours (decoration only). A page may hold several lists, so the heading id is generated.
export function FeatureListBlock({
  data,
  headingLevel = 2,
  tone = 'bg',
}: BlockProps<FeatureListData>) {
  const headingId = useId()
  const variant = data.variant ?? 'rule'
  return (
    <Section tone={tone} labelledBy={headingId}>
      <SectionHeader
        id={headingId}
        eyebrow={data.eyebrow}
        heading={data.heading}
        intro={data.intro}
        level={headingLevel}
      />
      {variant === 'checklist' ? (
        <ul
          aria-label={data.listLabel}
          className="grid max-w-[52rem] gap-x-8 gap-y-3 sm:grid-cols-2"
        >
          {data.items.map((item) => (
            <li key={item.title} className="flex gap-3">
              <span className="mt-0.5 grid size-6 flex-none place-items-center rounded-chip bg-surface text-fg">
                <Icon name={data.marker === 'dash' ? 'minus' : 'check'} className="size-4" />
              </span>
              <span>
                <span className="font-bold text-fg">{item.title}</span>
                {item.text ? <span className="block text-card text-muted">{item.text}</span> : null}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <ul
          className={`grid gap-4 sm:grid-cols-2 lg:gap-6 ${
            variant === 'cards' ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
          }`}
        >
          {data.items.map((item, i) => (
            <li key={item.title}>
              <Card
                interactive={Boolean(item.href)}
                className={`block h-full max-sm:grid max-sm:grid-cols-[3rem_1fr] max-sm:items-start max-sm:gap-x-4 max-sm:p-4 ${
                  variant === 'rule'
                    ? 'border-t-6 border-t-primary nth-2:border-t-accent nth-3:border-t-green nth-4:border-t-fg'
                    : ''
                }`}
              >
                <span className="max-sm:row-span-2">
                  <IconTile>
                    <Icon
                      name={item.icon ?? DEFAULT_ICONS[i % DEFAULT_ICONS.length] ?? 'check'}
                      className="size-6.5"
                    />
                  </IconTile>
                </span>
                <h3 className="mb-1 mt-3 text-[1.125rem] font-bold max-sm:mt-0 sm:text-h3">
                  {item.href ? <CardLink href={item.href}>{item.title}</CardLink> : item.title}
                </h3>
                {item.text ? <p className="text-card text-muted">{item.text}</p> : null}
              </Card>
            </li>
          ))}
        </ul>
      )}
    </Section>
  )
}
