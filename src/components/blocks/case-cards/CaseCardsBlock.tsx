import type { BlockProps } from '../shared-types'
import type { CaseCardsData } from './types'
import { Icon, type IconName } from '@/components/ui/Icon'
import { LinkButton } from '@/components/ui/Button'
import { Card, CardLink } from '@/components/ui/Card'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'

// Covers are CSS only (no photos until a client gives screenshots and permission).
const COVERS = [
  'bg-fg text-accent',
  'bg-green text-surface',
  'bg-primary text-fg',
  'bg-muted text-surface',
]
const COVER_ICONS: IconName[] = ['web', 'mobile', 'ai', 'megaphone']

export function CaseCardsBlock({ data, headingLevel = 2, tone = 'bg' }: BlockProps<CaseCardsData>) {
  return (
    <Section tone={tone} labelledBy="work-heading">
      <SectionHeader
        id="work-heading"
        eyebrow={data.eyebrow}
        heading={data.heading}
        intro={data.intro}
        level={headingLevel}
      />
      <ul className="scroll-row">
        {data.items.map((item, i) => (
          <li key={item.href}>
            <Card interactive className="flex h-full flex-col p-0 lg:p-0">
              <div
                className={`cover rounded-t-[calc(var(--radius-card)-1px)] ${COVERS[i % COVERS.length]}`}
                aria-hidden="true"
              >
                <Icon
                  name={item.icon ?? COVER_ICONS[i % COVER_ICONS.length] ?? 'web'}
                  className="size-14 stroke-[1.6]"
                />
              </div>
              <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                {item.tag ? (
                  <span className="mb-2 inline-flex min-h-6.5 items-center self-start rounded-chip bg-line px-2.5 text-xs font-bold text-fg">
                    {item.tag}
                  </span>
                ) : null}
                <h3 className="my-2 text-[1.0625rem] font-bold leading-snug">
                  <CardLink href={item.href}>{item.title}</CardLink>
                </h3>
                <p className="mb-4 text-card text-muted">{item.summary}</p>
                {item.result ? (
                  <p className="mt-auto border-t border-line pt-3 text-small font-bold text-fg">
                    {item.result}
                  </p>
                ) : null}
              </div>
            </Card>
          </li>
        ))}
      </ul>
      {data.cta ? (
        <div className="mt-6 text-center">
          <LinkButton cta={data.cta} variant="link" />
        </div>
      ) : null}
    </Section>
  )
}
