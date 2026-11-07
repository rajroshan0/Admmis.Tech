import type { CollectionConfig } from 'payload'

import { RENTAL_PRODUCTS, SIZE_BANDS } from '../config/size-bands'
import { contentAccess } from './access'
import { list, loc, order } from './fields/helpers'
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate'

const MAX_BANDS = 6

// One plan per product and size band (rent-spec §5.2). The amount lives in `pricing`, never here.
export const RentalPlans: CollectionConfig = {
  slug: 'rentalPlans',
  labels: { singular: 'Rental plan', plural: 'Rental plans' },
  admin: { useAsTitle: 'label', defaultColumns: ['label', 'product', 'band'], group: 'Prices' },
  access: contentAccess,
  versions: { drafts: true, maxPerDoc: 20 },
  hooks: {
    // Highlight CSS supports at most 6 bands per product (hritik T-108 nit 4).
    beforeChange: [
      async ({ data, originalDoc, req }) => {
        if (originalDoc || !data.product) return data
        const { totalDocs } = await req.payload.count({
          collection: 'rentalPlans',
          where: { product: { equals: data.product } },
          req,
        })
        if (totalDocs >= MAX_BANDS)
          throw new Error(`A product can have at most ${MAX_BANDS} size bands.`)
        return data
      },
    ],
    afterChange: [
      revalidateAfterChange('rentalPlans', (doc) => [
        `collection:pages`,
        `plan:${String(doc.product)}`,
      ]),
    ],
    afterDelete: [revalidateAfterDelete('rentalPlans')],
  },
  fields: [
    { name: 'product', type: 'select', required: true, options: [...RENTAL_PRODUCTS] },
    { name: 'band', type: 'select', required: true, options: [...SIZE_BANDS] },
    loc('label', 30, { required: true, help: 'Plan name shown on the card.' }),
    loc('forWho', 56, { required: true, help: 'Who this plan suits.' }),
    {
      name: 'priceRef',
      type: 'relationship',
      relationTo: 'pricing',
      filterOptions: { kind: { equals: 'rental' } },
      admin: {
        description:
          'Missing or unpublished price shows "Price on request". The page still publishes.',
      },
    },
    loc('setupText', 56),
    list('inclusions', [loc('text', 84, { required: true })], { minRows: 4, maxRows: 6 }),
    loc('supportText', 56),
    { name: 'quoteOnly', type: 'checkbox', defaultValue: false },
    order(),
  ],
}
