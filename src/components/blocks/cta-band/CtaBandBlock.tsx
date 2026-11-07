import type { BlockProps } from '../shared-types'
import type { CtaBandData } from './types'
import { LinkButton } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'

// The orange final band: the only primary action on its screen (tone scope turns the button navy).
export function CtaBandBlock({ data, headingLevel = 2, tone = 'band' }: BlockProps<CtaBandData>) {
  const Tag = `h${headingLevel}` as 'h2' | 'h3'
  return (
    <Section tone={tone} labelledBy="cta-heading">
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
        <div>
          {data.eyebrow ? <p className="eyebrow mb-3">{data.eyebrow}</p> : null}
          <Tag id="cta-heading" className="max-w-[22ch] text-h2 font-bold">
            {data.heading}
          </Tag>
          {data.text ? <p className="mt-2 max-w-[34rem] text-lead">{data.text}</p> : null}
        </div>
        <div className="flex flex-wrap gap-4">
          <LinkButton
            cta={data.primary}
            className="min-h-13 flex-1 basis-50 lg:min-w-55 lg:flex-none"
          />
          <LinkButton
            cta={data.secondary}
            variant="secondary"
            className="min-h-13 flex-1 basis-50 lg:min-w-55 lg:flex-none"
          />
        </div>
      </div>
    </Section>
  )
}
