import { useId } from 'react'

import type { BlockProps } from '../shared-types'
import type { RentalPlansData } from './types'
import { LinkButton } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Price } from '@/components/ui/Price'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'

// Zero client JS. The band picker is a native radio group; components.css (.plans) reads :has(:checked)
// to highlight the matching plan card. All plans stay in the DOM and in the reading order.
/** The highlight CSS covers this many bands; extra plans are still listed, just not highlighted. */
export const MAX_HIGHLIGHTED_PLANS = 6

export function RentalPlansBlock({
  data,
  headingLevel = 2,
  tone = 'bg',
}: BlockProps<RentalPlansData>) {
  const uid = useId()
  const headingId = `${uid}-h`
  const checked = data.plans.some((p) => p.id === data.selectedId)
    ? data.selectedId
    : data.plans[0]?.id
  return (
    <Section tone={tone} labelledBy={headingId}>
      <SectionHeader
        id={headingId}
        eyebrow={data.eyebrow}
        heading={data.heading}
        intro={data.intro}
        level={headingLevel}
      />
      <div className="plans">
        <fieldset
          aria-describedby={data.help ? `${uid}-help` : undefined}
          className="m-0 mb-6 min-w-0 border-0 p-0"
        >
          <legend className="mb-1 p-0 font-bold">{data.legend}</legend>
          {data.help ? (
            <p id={`${uid}-help`} className="mb-3 text-card text-muted">
              {data.help}
            </p>
          ) : null}
          <div className="plans-bands grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {data.plans.map((plan) => (
              <label key={plan.id} className="band-card">
                <input
                  type="radio"
                  name={`${uid}-band`}
                  value={plan.id}
                  defaultChecked={plan.id === checked}
                  className="sr-only"
                />
                <span className="font-bold text-fg">{plan.label}</span>
                {plan.sub ? <span className="text-small text-muted">{plan.sub}</span> : null}
                <Icon name="check" className="band-check size-5" />
              </label>
            ))}
          </div>
        </fieldset>

        <ul className="plans-list grid gap-4 lg:grid-cols-2 lg:gap-6 xl:grid-cols-4">
          {data.plans.map((plan) => (
            <li
              key={plan.id}
              className="plan-card rounded-card border-2 border-line bg-surface p-5 lg:p-6"
            >
              <p className="plan-badge mb-3 inline-block rounded-chip bg-accent px-3 py-1 text-small font-bold text-on-accent">
                {data.selectedLabel}
              </p>
              <h3 className="text-h3 font-bold">{plan.title}</h3>
              <div className="mt-3">
                <Price
                  prefix={data.pricePrefix}
                  amount={plan.quoteOnly ? undefined : plan.price?.amount}
                  secondary={plan.price?.secondary}
                  unit={plan.price?.unit}
                  quoteLabel={plan.quoteOnly ? data.quoteOnlyLabel : data.priceFallback}
                />
              </div>
              {plan.setupText ? (
                <p className="mt-1 text-small text-muted">{plan.setupText}</p>
              ) : null}
              <ul aria-label={data.inclusionsLabel} className="my-4 grid gap-2">
                {plan.inclusions.map((item) => (
                  <li key={item} className="flex gap-2 text-card">
                    <Icon name="check" className="mt-0.5 size-5 text-success" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {plan.supportText ? (
                <p className="mb-4 text-small text-muted">{plan.supportText}</p>
              ) : null}
              <LinkButton cta={plan.cta} className="w-full" />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
