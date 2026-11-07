import type { CollectionConfig } from 'payload'

import { contentAccess } from './access'
import { icon, list, loc, order, rich } from './fields/helpers'
import { seo } from './fields/seo'
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate'
import { lockSlug, redirectOnSlugChange, slugFields } from './hooks/slug'

// Field names and groups follow design/templates/service-spec.md §5.1 one to one. CMS max = EN x 1.4.
// Brand-neutral: no default copy here (ADR-013). Prices are only referenced (ADR-014).
const iconTitleText = (title: number, text: number) => [
  loc('title', title, { required: true }),
  loc('text', text, { required: true }),
  icon(),
]

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Service', plural: 'Services' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'group', 'order', '_status'],
    group: 'Pages',
  },
  access: contentAccess,
  versions: { drafts: true, maxPerDoc: 20 },
  hooks: {
    beforeChange: [lockSlug],
    afterChange: [
      redirectOnSlugChange('/services'),
      revalidateAfterChange('services', () => ['collection:pages']),
    ],
    afterDelete: [revalidateAfterDelete('services')],
  },
  fields: [
    loc('title', 56, {
      required: true,
      help: 'Name of the service. Used in cards, menu and breadcrumb.',
    }),
    ...slugFields(false),
    loc('cardTitle', 30, {
      required: true,
      help: 'Short title for cards on the home page and services page.',
    }),
    loc('cardText', 140, { required: true, help: 'One line for the card, about 16 words.' }),
    icon({ required: true }),
    {
      name: 'group',
      type: 'select',
      required: true,
      options: ['build', 'quality', 'team-marketing'],
      admin: { description: 'Which group it appears in on the services page.' },
    },
    order(),
    loc('heroEyebrow', 42, { help: 'Small line above the heading. Defaults to the group name.' }),
    loc('heroHeading', 98, { required: true, help: 'The page H1. Include the main keyword.' }),
    loc('heroSub', 210, { required: true }),
    {
      name: 'facts',
      type: 'group',
      fields: [
        {
          name: 'startsFromPriceRef',
          type: 'relationship',
          relationTo: 'pricing',
          admin: {
            description:
              'Pick a price. If empty the page says "Price on request". Never type a number.',
          },
        },
        loc('time', 42),
        loc('bestFor', 56),
      ],
    },
    rich('intro', { required: true }),
    loc('typesHeading', 84, { required: true }),
    loc('typesIntro', 170),
    list('types', iconTitleText(40, 170), { minRows: 3, maxRows: 6, required: true }),
    loc('benefitsHeading', 84, { required: true }),
    list('benefits', iconTitleText(40, 170), { minRows: 4, maxRows: 4, required: true }),
    loc('processHeading', 84, { required: true }),
    list(
      'steps',
      [loc('title', 26, { required: true }), loc('text', 155, { required: true }), loc('time', 28)],
      { minRows: 3, maxRows: 5, required: true },
    ),
    loc('detailHeading', 84),
    rich('detail'),
    // TODO(neha): relatedCases (max 3) once the `cases` collection exists (post-launch scope check with pm).
    loc('priceHeading', 84, { required: true }),
    loc('priceText', 310, {
      required: true,
      help: 'Do not type a number. Prices come from the price entries below.',
    }),
    {
      name: 'pricingRefs',
      type: 'relationship',
      relationTo: 'pricing',
      hasMany: true,
      maxRows: 3,
      admin: { description: 'One to three prices shown in the price teaser.' },
    },
    list(
      'crossSell',
      [loc('title', 42), loc('text', 155), { name: 'href', type: 'text' }, loc('cta', 34)],
      { maxRows: 2 },
    ),
    {
      name: 'faqs',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
      minRows: 4,
      maxRows: 6,
      required: true,
      admin: { description: 'Four to six questions.' },
    },
    loc('formHeading', 70, { required: true }),
    loc('formText', 170, { required: true }),
    list('promises', [loc('text', 70, { required: true })], { minRows: 3, maxRows: 3 }),
    seo,
  ],
}
