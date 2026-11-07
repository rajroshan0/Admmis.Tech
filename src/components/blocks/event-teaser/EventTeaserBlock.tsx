import type { BlockProps } from '../shared-types'
import type { EventTeaserData } from './types'
import { Icon } from '@/components/ui/Icon'
import { LinkButton } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'

export function EventTeaserBlock({
  data,
  headingLevel = 2,
  tone = 'alt',
}: BlockProps<EventTeaserData>) {
  const Tag = `h${headingLevel}` as 'h2' | 'h3'
  const parts = data.dateParts
  return (
    <Section tone={tone} labelledBy="event-heading">
      <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr_auto] lg:gap-14">
        <div
          role="img"
          aria-label={data.dateLabel}
          className="w-33 justify-self-start rounded-card border-2 border-primary bg-primary px-2 py-3.5 text-center text-on-primary shadow-[6px_6px_0_var(--color-accent)]"
        >
          {parts ? (
            <>
              <b className="block text-[3.5rem] font-bold leading-none">{parts.day}</b>
              <span className="block text-[0.9375rem] font-bold tracking-widest">
                {parts.month}
              </span>
              <span className="block text-[0.9375rem] font-bold tracking-widest">{parts.year}</span>
            </>
          ) : (
            <span className="block text-lg font-bold leading-snug">{data.dateLabel}</span>
          )}
        </div>

        <div>
          {data.eyebrow ? <p className="eyebrow mb-3">{data.eyebrow}</p> : null}
          <Tag id="event-heading" className="text-h2 font-bold">
            {data.title}
          </Tag>
          {data.summary ? (
            <p className="mt-3 max-w-[40rem] text-lead text-muted">{data.summary}</p>
          ) : null}
          {data.venue || data.time ? (
            <ul className="mt-4 grid gap-2 text-muted">
              {data.venue ? (
                <li className="flex items-center gap-2.5">
                  <Icon name="pin" className="text-accent" />
                  {data.venue}
                </li>
              ) : null}
              {data.time ? (
                <li className="flex items-center gap-2.5">
                  <Icon name="clock" className="text-accent" />
                  {data.time}
                </li>
              ) : null}
            </ul>
          ) : null}
          {data.registerCta ? (
            <div className="mt-6">
              <LinkButton cta={data.registerCta} />
            </div>
          ) : null}
        </div>

        {/* decorative hexagon emblem, desktop only */}
        <svg
          viewBox="0 0 100 100"
          aria-hidden="true"
          focusable="false"
          className="hidden w-55 lg:block"
        >
          <path
            d="M93 50 71.5 87.2h-43L7 50l21.500-37.200h43z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M36 68 50 32.500 64 68M43 50.500h14"
            fill="none"
            stroke="var(--color-green)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g fill="var(--color-accent)">
            <circle cx="50" cy="32.500" r="3.500" />
            <circle cx="36" cy="68" r="3.500" />
            <circle cx="64" cy="68" r="3.500" />
          </g>
        </svg>
      </div>
    </Section>
  )
}
