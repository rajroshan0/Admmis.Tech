import {
  CtaBandBlock,
  FaqBlock,
  FeatureListBlock,
  PricingTeaserBlock,
  ProcessStepsBlock,
} from '@/components/blocks'
import { Callout, Section } from '@/components/ui'
import type { SectionTone } from '@/components/ui'
import type { CopyBlock } from '@/lib/routes/page-copy'
import { PriceAside } from '@/app/(site)/[locale]/_templates/PriceAside'

type Props = {
  blocks: CopyBlock[]
  tone: () => SectionTone
  introHeading: string
  notIncludedHeading?: string
}

// Renders the synced copy blocks in file order. Only one process-steps block per page: the block
// has a fixed heading id, so a second one (rent "launch steps") is left out until it takes an id.
export function PageBlocks({ blocks, tone, introHeading, notIncludedHeading }: Props) {
  const firstSteps = blocks.findIndex((b) => b.kind === 'steps' && (b.items?.length ?? 0) >= 2)
  return (
    <>
      {blocks.map((b, index) => {
        const heading = b.heading ?? (b.kind === 'prose' ? introHeading : undefined)
        const items = b.items ?? []
        switch (b.kind) {
          case 'prose':
            return (
              <Section key={b.key} tone={tone()}>
                <div className="max-w-[40rem]">
                  {heading ? <h2 className="mb-3 text-h2 font-bold">{heading}</h2> : null}
                  <p className="text-lead text-muted">{b.text}</p>
                </div>
              </Section>
            )
          case 'callout':
            return (
              <Section key={b.key} tone={tone()}>
                <div className="max-w-[40rem]">
                  {b.heading ? <h2 className="mb-4 text-h2 font-bold">{b.heading}</h2> : null}
                  {b.title ? (
                    <Callout title={b.title}>{b.text}</Callout>
                  ) : (
                    <p className="text-lead text-muted">{b.text}</p>
                  )}
                </div>
              </Section>
            )
          case 'steps':
            if (index !== firstSteps) return null
            return (
              <ProcessStepsBlock
                key={b.key}
                tone={tone()}
                data={{
                  heading: heading ?? introHeading,
                  steps: items.map((i) => ({ title: i.title, text: i.text ?? '' })),
                }}
              />
            )
          case 'check':
          case 'dash': {
            const h = heading ?? notIncludedHeading
            if (!h) return null
            return (
              <FeatureListBlock
                key={b.key}
                tone={tone()}
                data={{
                  heading: h,
                  items,
                  variant: 'checklist',
                  marker: b.kind === 'dash' ? 'dash' : 'check',
                  listLabel: h,
                }}
              />
            )
          }
          default:
            // cards and rule need two or more items to make a grid worth showing
            if (items.length < 2 || !heading) return null
            return (
              <FeatureListBlock
                key={b.key}
                tone={tone()}
                data={{
                  heading,
                  intro: b.intro,
                  items,
                  variant: b.kind === 'rule' ? 'rule' : 'cards',
                }}
              />
            )
        }
      })}
    </>
  )
}

type TailProps = {
  tone: () => SectionTone
  pricing: React.ComponentProps<typeof PricingTeaserBlock>['data']
  priceLabel: string
  crossSell: { title: string; text: string; href: string }[]
  crossSellHeading: string
  faq: React.ComponentProps<typeof FaqBlock>['data']
  cta: React.ComponentProps<typeof CtaBandBlock>['data']
}

/** Closing sequence (service-spec §0): price, cross-sell, FAQ, closing band. */
export function PageTail({
  tone,
  pricing,
  priceLabel,
  crossSell,
  crossSellHeading,
  faq,
  cta,
}: TailProps) {
  return (
    <>
      <PricingTeaserBlock data={pricing} tone={tone()} aside={<PriceAside label={priceLabel} />} />
      {crossSell.length >= 1 ? (
        <FeatureListBlock
          tone={tone()}
          data={{ heading: crossSellHeading, items: crossSell, variant: 'cards' }}
        />
      ) : null}
      <FaqBlock data={faq} tone={tone()} />
      <CtaBandBlock data={cta} />
    </>
  )
}
