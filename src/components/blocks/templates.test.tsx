import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { ChoiceListBlock, FeatureListBlock, HeroBlock, RentalPlansBlock } from './index'
import { Callout } from '@/components/ui/Callout'
import { Price } from '@/components/ui/Price'
import { ServiceFacts } from '@/components/ui/ServiceFacts'

const cta = { label: 'Get a quote', href: '/contact' }

describe('hero plain', () => {
  it('renders one h1, no image, and the aside slot', () => {
    const html = renderToStaticMarkup(
      <HeroBlock
        data={{ variant: 'plain', heading: 'Websites', primaryCta: cta }}
        aside={
          <ServiceFacts
            label="At a glance"
            title="At a glance"
            rows={[{ label: 'Time', value: '2 weeks' }]}
          />
        }
      />,
    )
    expect(html.match(/<h1/g)).toHaveLength(1)
    expect(html).not.toContain('<img')
    expect(html).toContain('aria-label="At a glance"')
  })
})

describe('ServiceFacts and Price', () => {
  it('omits rows without a value and renders nothing when all are empty', () => {
    const html = renderToStaticMarkup(
      <ServiceFacts label="L" title="T" rows={[{ label: 'A', value: 'x' }, { label: 'B' }]} />,
    )
    expect(html).toContain('A')
    expect(html).not.toContain('>B<')
    expect(renderToStaticMarkup(<ServiceFacts label="L" title="T" rows={[{ label: 'B' }]} />)).toBe(
      '',
    )
  })
  it('shows the fallback, never a zero, when there is no amount', () => {
    const html = renderToStaticMarkup(<Price quoteLabel="Price on request" />)
    expect(html).toContain('Price on request')
    expect(html).not.toMatch(/\b0\b/)
  })
})

describe('Callout', () => {
  it('is a note with an icon and a title', () => {
    const html = renderToStaticMarkup(<Callout title="Exit">text</Callout>)
    expect(html).toContain('role="note"')
    expect(html).toContain('<svg')
  })
})

describe('ChoiceList', () => {
  it('renders one link per row', () => {
    const html = renderToStaticMarkup(
      <ChoiceListBlock
        data={{
          heading: 'Which?',
          items: [
            { question: 'Q1', label: 'Web', href: '/a' },
            { question: 'Q2', label: 'App', href: '/b' },
          ],
        }}
      />,
    )
    expect(html.match(/<a /g)).toHaveLength(2)
  })
})

describe('FeatureList variants', () => {
  it('gives two lists on one page different heading ids', () => {
    const one = renderToStaticMarkup(
      <>
        <FeatureListBlock data={{ heading: 'A', items: [{ title: 'x' }] }} />
        <FeatureListBlock data={{ heading: 'B', items: [{ title: 'y' }] }} />
      </>,
    )
    const ids = [...one.matchAll(/<h2 id="([^"]+)"/g)].map((m) => m[1])
    expect(new Set(ids).size).toBe(2)
  })
  it('checklist renders a labelled list with dash markers', () => {
    const html = renderToStaticMarkup(
      <FeatureListBlock
        data={{
          heading: 'No',
          variant: 'checklist',
          marker: 'dash',
          listLabel: 'Not included',
          items: [{ title: 'Ads' }],
        }}
      />,
    )
    expect(html).toContain('aria-label="Not included"')
    expect(html).toContain('M6 12h12')
  })
})

describe('RentalPlans', () => {
  const plan = (id: string, price?: boolean, quoteOnly?: boolean) => ({
    id,
    label: `Band ${id}`,
    title: `Plan ${id}`,
    inclusions: ['One'],
    cta,
    quoteOnly,
    price: price ? { amount: 'NPR 1,000', secondary: 'USD 8' } : undefined,
  })
  const data = {
    heading: 'Plans',
    legend: 'Choose',
    selectedLabel: 'Your size',
    priceFallback: 'Price on request',
    quoteOnlyLabel: 'Quote only',
    inclusionsLabel: 'Included',
    plans: [plan('s', true), plan('m'), plan('xl', false, true)],
  }
  it('renders all plans, a radio per band, first checked by default', () => {
    const html = renderToStaticMarkup(<RentalPlansBlock data={data} />)
    expect(html.match(/type="radio"/g)).toHaveLength(3)
    expect(html.match(/checked=""/g)).toHaveLength(1)
    expect(html).toContain('<legend')
    expect(html).toContain('NPR 1,000')
    expect(html).toContain('Price on request')
    expect(html).toContain('Quote only')
  })
  it('checks the plan named by selectedId', () => {
    const html = renderToStaticMarkup(<RentalPlansBlock data={{ ...data, selectedId: 'm' }} />)
    const checked = html.match(/<input[^>]*checked=""[^>]*>/)?.[0] ?? ''
    expect(checked).toContain('value="m"')
  })
})
