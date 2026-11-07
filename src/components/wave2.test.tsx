import { renderToStaticMarkup as r } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import {
  AgendaBlock,
  BandSelectBlock,
  BudgetGuideBlock,
  PackageTableBlock,
  ProcessStepsBlock,
  ServicesGridBlock,
  StatRowBlock,
  TeamGridBlock,
} from './blocks'
import {
  ConsentField,
  ErrorSummary,
  FormCard,
  Honeypot,
  SelectField,
  TextField,
  TextareaField,
} from './forms'
import {
  AuthorBox,
  CaseFacts,
  ContactChannels,
  FilterLinks,
  initialsOf,
  Pagination,
  PostCard,
} from './ui'

describe('forms', () => {
  it('links label, hint and error to the control', () => {
    const html = r(
      <TextField
        id="n"
        name="name"
        label="Name"
        required
        requiredLabel="required"
        hint="Hi"
        error="Too short"
      />,
    )
    expect(html).toContain('for="n"')
    expect(html).toContain('(required)')
    expect(html).toContain('aria-invalid="true"')
    expect(html).toContain('aria-describedby="n-error n-hint"')
    expect(html).toContain('id="n-error"')
  })
  it('select and textarea render with native names', () => {
    expect(
      r(
        <SelectField
          id="s"
          name="s"
          label="S"
          options={[{ value: 'a', label: 'A' }]}
          placeholder="Pick"
        />,
      ),
    ).toContain('<option value="">Pick')
    expect(r(<TextareaField id="m" name="m" label="M" />)).toContain('rows="5"')
  })
  it('form card submits without JS and the consent has a 24 px box', () => {
    const html = r(
      <FormCard action="/api/x" method="post">
        <ConsentField id="c" name="consent" label="OK" />
      </FormCard>,
    )
    expect(html).toContain('method="post"')
    expect(html).toContain('size-6')
  })
  it('summary is an alert and renders nothing when empty', () => {
    expect(r(<ErrorSummary title="Fix 1" items={[{ id: 'n', message: 'Name' }]} />)).toContain(
      'role="alert"',
    )
    expect(r(<ErrorSummary title="Fix" items={[]} />)).toBe('')
  })
  it('honeypot is hidden from assistive tech and the tab order', () => {
    const html = r(<Honeypot label="Leave empty" />)
    expect(html).toContain('aria-hidden="true"')
    expect(html).toContain('tabindex="-1"')
  })
})

describe('ContactChannels', () => {
  it('omits empty rows', () => {
    const html = r(
      <ContactChannels
        heading="Reach us"
        rows={[{ label: 'Phone', value: '1', href: 'tel:1' }, { label: 'Fax' }]}
      />,
    )
    expect(html).toContain('Phone')
    expect(html).not.toContain('Fax')
  })
})

describe('pricing', () => {
  const m = (a: string) => ({ amount: a })
  it('lists every band price and falls back without a number', () => {
    const html = r(
      <PackageTableBlock
        data={{
          heading: 'P',
          caption: 'c',
          columns: ['Package', 'What', 'Price'],
          bandLabels: ['S', 'M'],
          priceFallback: 'Request a quote',
          quoteOnlyLabel: 'Quote only',
          packages: [
            { id: 'a', name: 'Site', inclusions: ['x'], prices: [m('NPR 1'), undefined] },
            { id: 'b', name: 'Big', inclusions: ['y'], prices: [], quoteOnly: true },
          ],
        }}
      />,
    )
    expect(html).toContain('data-i="2"')
    expect(html).toContain('Request a quote')
    expect(html).toContain('Quote only')
    expect(html).toContain('data-label="Package"')
    expect(html).toContain('scope="row"')
  })
  it('band select has one checked radio; guide shows fallback', () => {
    const html = r(
      <BandSelectBlock
        data={{
          heading: 'B',
          legend: 'Size',
          bands: [
            { id: 's', label: 'S' },
            { id: 'm', label: 'M' },
          ],
          selectedId: 'm',
        }}
      />,
    )
    expect(html.match(/checked=""/g)).toHaveLength(1)
    expect(
      r(
        <BudgetGuideBlock
          data={{
            heading: 'G',
            rows: [{ label: 'App' }],
            priceFallback: 'Request a quote',
            quoteOnlyLabel: 'Q',
          }}
        />,
      ),
    ).toContain('Request a quote')
  })
})

describe('unique heading ids', () => {
  it('ProcessSteps and ServicesGrid can repeat on a page', () => {
    const html = r(
      <>
        <ProcessStepsBlock data={{ heading: 'A', steps: [{ title: 't', text: 'x' }] }} />
        <ProcessStepsBlock data={{ heading: 'B', steps: [{ title: 't', text: 'x' }] }} />
        <ServicesGridBlock data={{ heading: 'C', items: [] }} />
        <ServicesGridBlock data={{ heading: 'D', items: [] }} />
      </>,
    )
    const ids = [...html.matchAll(/<h2 id="([^"]+)"/g)].map((x) => x[1])
    expect(ids).toHaveLength(4)
    expect(new Set(ids).size).toBe(4)
  })
})

describe('about, cases, blog, event parts', () => {
  it('TeamGrid shows initials without a photo, grapheme-safe for Devanagari', () => {
    expect(initialsOf('राज रोशन')).toBe('रारो')
    const html = r(
      <TeamGridBlock
        data={{
          heading: 'Team',
          members: [
            { name: 'Ada Lovelace', links: [{ label: 'LinkedIn', href: '/l', icon: 'web' }] },
          ],
        }}
      />,
    )
    expect(html).toContain('AL')
    expect(html).toContain('aria-label="Ada Lovelace: LinkedIn"')
  })
  it('StatRow and Agenda render nothing when empty', () => {
    expect(r(<StatRowBlock data={{ items: [] }} />)).toBe('')
    expect(r(<AgendaBlock data={{ heading: 'A', items: [] }} />)).toBe('')
    expect(r(<StatRowBlock data={{ items: [{ value: '12', label: 'Sites' }] }} />)).toContain('<dl')
  })
  it('CaseFacts links services and drops empty rows', () => {
    const html = r(
      <CaseFacts
        label="Facts"
        title="At a glance"
        rows={[
          { label: 'Client', value: 'A' },
          { label: 'Year' },
          { label: 'Services', links: [{ label: 'Web', href: '/w' }] },
        ]}
      />,
    )
    expect(html).toContain('href="/w"')
    expect(html).not.toContain('Year')
  })
  it('FilterLinks marks the current one; Pagination marks the page and disables an edge', () => {
    expect(
      r(<FilterLinks label="Filter" items={[{ label: 'All', href: '/', current: true }]} />),
    ).toContain('aria-current="true"')
    const html = r(
      <Pagination
        label="Pagination"
        previous={{ label: 'Previous' }}
        next={{ label: 'Next', href: '?page=2' }}
        pages={[{ label: '1', href: '?page=1', current: true }]}
      />,
    )
    expect(html).toContain('aria-current="page"')
    expect(html).toContain('aria-disabled="true"')
  })
  it('PostCard links via the title; AuthorBox is an aside with a named label', () => {
    const html = r(<PostCard post={{ href: '/b/1', title: 'Hello', excerpt: 'e', tag: 'SEO' }} />)
    expect(html).toContain('href="/b/1"')
    expect(html).toContain('line-clamp-3')
    expect(r(<AuthorBox label="About the author" name="Sam" />)).toContain(
      '<aside aria-label="About the author"',
    )
  })
})
