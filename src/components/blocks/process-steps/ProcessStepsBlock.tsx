import type { BlockProps } from '../shared-types'
import type { ProcessStepsData } from './types'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'

// A real <ol>; the numbers are CSS counters (styles/components.css) so they are not read twice.
export function ProcessStepsBlock({
  data,
  headingLevel = 2,
  tone = 'surface',
}: BlockProps<ProcessStepsData>) {
  return (
    <Section tone={tone} labelledBy="process-heading">
      <SectionHeader
        id="process-heading"
        eyebrow={data.eyebrow}
        heading={data.heading}
        intro={data.intro}
        level={headingLevel}
      />
      <ol className="steps grid gap-4 lg:grid-cols-4 lg:gap-6">
        {data.steps.map((step) => (
          <li key={step.title}>
            <h3 className="mb-1 text-h3 font-bold">{step.title}</h3>
            <p className="text-card text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
