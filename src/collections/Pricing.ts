import type { CollectionConfig } from 'payload'

import { RENTAL_PRODUCTS, SIZE_BANDS } from '../config/size-bands'
import { priceAccess } from './access'
import { list, loc, locArea, order } from './fields/helpers'
import { validatePricing } from './hooks/pricing'
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate'

// ADR-014: the ONE price source. ADR-025: only admins edit. No other collection stores an amount.
export const Pricing: CollectionConfig = {
  slug: 'pricing',
  labels: { singular: 'Price', plural: 'Prices' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'kind', 'key', 'visibility'],
    group: 'Prices',
  },
  access: priceAccess,
  versions: { drafts: true, maxPerDoc: 20 },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data._status !== 'published') return data
        const errors = validatePricing(data)
        if (errors.length) throw new Error(errors.join(' '))
        return data
      },
    ],
    afterChange: [revalidateAfterChange('pricing', (doc) => [`pricing:${String(doc.key)}`])],
    afterDelete: [revalidateAfterDelete('pricing')],
  },
  fields: [
    {
      name: 'kind',
      type: 'select',
      required: true,
      options: ['package', 'rental', 'hourly'],
      admin: {
        description: 'Package = one-time project. Rental = monthly plan. Hourly = per hour.',
      },
    },
    loc('name', 80, { required: true, help: 'Shown to visitors, for example "Landing page".' }),
    {
      name: 'key',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Machine key, for example rent-website-m. Do not change after publishing.',
      },
    },
    locArea('description', 240),
    {
      name: 'unit',
      type: 'select',
      required: true,
      options: ['one-time', 'month', 'hour', 'person-month'],
    },
    {
      name: 'rentalProduct',
      type: 'select',
      options: [...RENTAL_PRODUCTS],
      admin: {
        condition: (d) => d?.kind === 'rental',
        description: 'Which /rent page uses this price.',
      },
    },
    {
      name: 'sizeBand',
      type: 'select',
      options: [...SIZE_BANDS],
      admin: { condition: (d) => d?.kind === 'rental' },
    },
    {
      name: 'role',
      type: 'text',
      admin: {
        condition: (d) => d?.kind === 'hourly' || d?.rentalProduct === 'team',
        description: 'For example engineer, designer, QA.',
      },
    },
    list(
      'amounts',
      [
        { name: 'currency', type: 'select', required: true, options: ['NPR', 'USD'] },
        {
          name: 'minorUnits',
          type: 'number',
          required: true,
          min: 0,
          admin: { step: 1, description: 'Whole number in paisa or cents. NPR 15,000 is 1500000.' },
        },
      ],
      {
        maxRows: 2,
        admin: {
          description:
            'One row per currency. Both NPR and USD are needed unless the price is "request a quote".',
        },
      },
    ),
    {
      name: 'quoteOnly',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'No amount shown. The page says "Request a quote".' },
    },
    {
      name: 'fromPrice',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Show as "from ...".' },
    },
    list(
      'setupFee',
      [
        { name: 'currency', type: 'select', required: true, options: ['NPR', 'USD'] },
        { name: 'minorUnits', type: 'number', required: true, min: 0, admin: { step: 1 } },
      ],
      { maxRows: 2 },
    ),
    { name: 'minTermMonths', type: 'number', min: 0 },
    { name: 'supportHours', type: 'number', min: 0 },
    list('features', [loc('text', 84, { required: true })], {
      admin: { description: 'What is included.' },
    }),
    list('excludes', [loc('text', 84, { required: true })], {
      admin: { description: 'What is not included.' },
    }),
    {
      name: 'highlight',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Highlight this price in a table.' },
    },
    order(),
    {
      name: 'visibility',
      type: 'select',
      required: true,
      defaultValue: 'public',
      options: ['public', 'hidden'],
      admin: { position: 'sidebar', description: 'Hidden prices are not shown anywhere.' },
    },
  ],
}
