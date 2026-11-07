import Image from 'next/image'

import type { BlockProps } from '../shared-types'
import type { HeroData } from './types'
import { LinkButton } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

// The image is the LCP element: preloaded, never lazy, never animated, space reserved by aspect-ratio.
export function HeroBlock({ data, headingLevel = 1, tone = 'alt' }: BlockProps<HeroData>) {
  const Tag = `h${headingLevel}` as 'h1' | 'h2'
  return (
    <Section tone={tone} contained={false} className="overflow-hidden">
      <Container className="grid gap-8 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-12 lg:pt-16">
        <div className="pb-2 lg:self-center lg:pb-16">
          {data.eyebrow ? <p className="eyebrow mb-4">{data.eyebrow}</p> : null}
          <Tag className="mb-4 text-display font-bold text-fg">{data.heading}</Tag>
          {data.subheading ? (
            <p className="mb-6 max-w-[34rem] text-lead text-muted">{data.subheading}</p>
          ) : null}
          <div className="flex flex-wrap gap-4">
            <LinkButton cta={data.primaryCta} className="flex-1 basis-50 lg:flex-none" />
            <LinkButton
              cta={data.secondaryCta}
              variant="secondary"
              className="flex-1 basis-50 lg:flex-none"
            />
          </div>
          {data.chips && data.chips.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {data.chips.slice(0, 4).map((chip) => (
                <li
                  key={chip}
                  className="inline-flex min-h-8 items-center rounded-chip border border-line bg-surface px-3 text-small font-semibold text-fg"
                >
                  {chip}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="stage">
          <div className="stage-back" aria-hidden="true" />
          <div className="stage-sun" aria-hidden="true" />
          <div className="stage-arch">
            {data.image ? (
              <Image
                src={data.image.src}
                width={data.image.width}
                height={data.image.height}
                alt={data.image.alt}
                sizes="(min-width: 1024px) 460px, 360px"
                preload
                quality={80}
              />
            ) : null}
          </div>
          <div className="stage-base" aria-hidden="true" />
        </div>
      </Container>
    </Section>
  )
}
