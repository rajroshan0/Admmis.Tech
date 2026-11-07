import type { BlockProps } from '../shared-types'
import type { FeatureListData } from './types'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Card, IconTile } from '@/components/ui/Card'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'

const DEFAULT_ICONS: IconName[] = ['check', 'code', 'pin', 'calendar']

// Not links, so no hover lift. The 6 px top rule cycles through the brand colours (decoration only).
export function FeatureListBlock({
  data,
  headingLevel = 2,
  tone = 'bg',
}: BlockProps<FeatureListData>) {
  return (
    <Section tone={tone} labelledBy="features-heading">
      <SectionHeader
        id="features-heading"
        eyebrow={data.eyebrow}
        heading={data.heading}
        intro={data.intro}
        level={headingLevel}
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {data.items.map((item, i) => (
          <li key={item.title}>
            <Card className="block h-full border-t-6 border-t-primary max-sm:grid max-sm:grid-cols-[3rem_1fr] max-sm:items-start max-sm:gap-x-4 max-sm:p-4 nth-2:border-t-accent nth-3:border-t-green nth-4:border-t-fg">
              <span className="max-sm:row-span-2">
                <IconTile>
                  <Icon
                    name={item.icon ?? DEFAULT_ICONS[i % DEFAULT_ICONS.length] ?? 'check'}
                    className="size-6.5"
                  />
                </IconTile>
              </span>
              <h3 className="mb-1 mt-3 text-[1.125rem] font-bold max-sm:mt-0 sm:text-h3">
                {item.title}
              </h3>
              <p className="text-card text-muted">{item.text}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  )
}
