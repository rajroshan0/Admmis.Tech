import type { BlockProps } from '../shared-types'
import type { FaqData } from './types'
import { Icon } from '@/components/ui/Icon'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'

// Native <details name="faq">: one open at a time, zero JavaScript, works before hydration.
export function FaqBlock({ data, headingLevel = 2, tone = 'bg' }: BlockProps<FaqData>) {
  if (data.items.length === 0) return null
  return (
    <Section tone={tone} labelledBy={data.heading ? 'faq-heading' : undefined}>
      {data.heading ? (
        <SectionHeader
          id="faq-heading"
          eyebrow={data.eyebrow}
          heading={data.heading}
          level={headingLevel}
        />
      ) : null}
      <div className="max-w-[52rem]">
        {data.items.map((item, i) => (
          <details
            key={item.id}
            name="faq"
            open={i === 0}
            className="mb-3 rounded-button border border-line bg-surface open:border-2 open:border-fg"
          >
            <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 rounded-button px-5 py-3 font-bold leading-snug hover:bg-bg">
              {item.question}
              <Icon name="chevron" className="chev size-5 transition-transform" />
            </summary>
            {/* TODO(satish): render RichTextData with the Lexical renderer; the home page only sends strings */}
            {typeof item.answer === 'string' ? (
              <p className="px-5 pb-5 text-muted">{item.answer}</p>
            ) : null}
          </details>
        ))}
      </div>
    </Section>
  )
}
