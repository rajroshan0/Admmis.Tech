import { Callout, Section } from '@/components/ui'
import type { SectionTone } from '@/components/ui'

type Props = {
  tone: SectionTone
  heading: string
  text: string
  /** marks the section as placeholder copy until the writer's text arrives (T-307) */
  placeholder: { title: string; text: string }
}

export function IntroSection({ tone, heading, text, placeholder }: Props) {
  return (
    <Section tone={tone} labelledBy="intro-heading">
      <div className="max-w-[40rem]">
        <h2 id="intro-heading" className="mb-3 text-h2 font-bold">
          {heading}
        </h2>
        <p className="mb-6 text-lead text-muted">{text}</p>
        <Callout title={placeholder.title}>{placeholder.text}</Callout>
      </div>
    </Section>
  )
}
