import type { CollectionConfig } from 'payload'

import { contentAccess } from './access'
import { loc, order, rich } from './fields/helpers'
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate'

// No prices in answers in v1: link to /pricing instead (ADR-014).
export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  admin: { useAsTitle: 'question', defaultColumns: ['question', 'topic'] },
  access: contentAccess,
  versions: { drafts: true, maxPerDoc: 20 },
  hooks: {
    afterChange: [revalidateAfterChange('faqs', () => ['collection:pages', 'collection:services'])],
    afterDelete: [revalidateAfterDelete('faqs')],
  },
  fields: [
    loc('question', 98, { required: true }),
    rich('answer', {
      required: true,
      admin: {
        description:
          'Keep it short, about 45 words. Do not type prices here; link to the pricing page.',
      },
    }),
    {
      name: 'topic',
      type: 'select',
      required: true,
      options: ['pricing', 'timelines', 'ownership', 'support', 'rent', 'general'],
    },
    order(),
  ],
}
