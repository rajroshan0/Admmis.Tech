import { useId } from 'react'

import type { BlockProps } from '../shared-types'
import type { BandSelectData } from './types'
import { Icon } from '@/components/ui/Icon'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'

// Native radio group, no JS. PackageTableBlock shows only the price of the checked band via body:has().
export function BandSelectBlock({
  data,
  headingLevel = 2,
  tone = 'surface',
}: BlockProps<BandSelectData>) {
  const uid = useId()
  const checked = data.bands.some((b) => b.id === data.selectedId)
    ? data.selectedId
    : data.bands[0]?.id
  return (
    <Section tone={tone} labelledBy={`${uid}-h`}>
      <SectionHeader
        id={`${uid}-h`}
        eyebrow={data.eyebrow}
        heading={data.heading}
        intro={data.intro}
        level={headingLevel}
      />
      <fieldset
        aria-describedby={data.help ? `${uid}-help` : undefined}
        className="m-0 min-w-0 border-0 p-0"
      >
        <legend className="mb-1 p-0 font-bold">{data.legend}</legend>
        {data.help ? (
          <p id={`${uid}-help`} className="mb-3 text-card text-muted">
            {data.help}
          </p>
        ) : null}
        <div className="band-select grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.bands.map((band) => (
            <label key={band.id} className="band-card">
              <input
                type="radio"
                name={`${uid}-band`}
                value={band.id}
                defaultChecked={band.id === checked}
                className="sr-only"
              />
              <span className="font-bold text-fg">{band.label}</span>
              {band.sub ? <span className="text-small text-muted">{band.sub}</span> : null}
              <Icon name="check" className="band-check size-5" />
            </label>
          ))}
        </div>
      </fieldset>
    </Section>
  )
}
