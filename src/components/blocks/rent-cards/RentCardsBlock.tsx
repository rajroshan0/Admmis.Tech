import type { BlockProps } from '../shared-types'
import type { RentCardsData } from './types'
import { Icon, type IconName } from '@/components/ui/Icon'
import { LinkButton } from '@/components/ui/Button'
import { Card, CardLink, IconTile } from '@/components/ui/Card'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'

// Default icons by position (website, AI agent, team) when the CMS gives none.
const DEFAULT_ICONS: IconName[] = ['web', 'ai', 'team']

export function RentCardsBlock({
  data,
  headingLevel = 2,
  tone = 'alt',
}: BlockProps<RentCardsData>) {
  return (
    <Section tone={tone} labelledBy="rent-heading">
      <SectionHeader
        id="rent-heading"
        eyebrow={data.eyebrow}
        heading={data.heading}
        intro={data.intro}
        level={headingLevel}
      />
      <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
        {data.items.map((item, i) => (
          <li key={item.href}>
            <Card interactive className="h-full p-6">
              <IconTile>
                <Icon
                  name={item.icon ?? DEFAULT_ICONS[i % DEFAULT_ICONS.length] ?? 'web'}
                  className="size-6.5"
                />
              </IconTile>
              <h3 className="mb-2 mt-3 text-h3 font-bold">
                <CardLink href={item.href}>{item.title}</CardLink>
              </h3>
              <p className="text-card text-muted">{item.summary}</p>
            </Card>
          </li>
        ))}
      </ul>
      {data.cta ? (
        <div className="mt-8 text-center">
          <LinkButton cta={data.cta} />
        </div>
      ) : null}
    </Section>
  )
}
