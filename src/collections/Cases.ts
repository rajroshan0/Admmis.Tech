import type { CollectionConfig } from 'payload'

import { INDUSTRIES } from '../config/industries'
import { contentAccess } from './access'
import { list, loc, locArea, rich } from './fields/helpers'
import { seo } from './fields/seo'
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate'
import { lockSlug, redirectOnSlugChange, slugFields } from './hooks/slug'

// Limits: design/templates/cases-spec.md §5 (CMS max = EN x 1.4). Facts only, real figures only.
export const Cases: CollectionConfig = {
  slug: 'cases',
  labels: { singular: 'Case study', plural: 'Case studies' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'publishedAt', '_status'],
    group: 'Proof',
  },
  access: contentAccess,
  versions: { drafts: true, maxPerDoc: 20 },
  hooks: {
    beforeChange: [lockSlug],
    afterChange: [
      redirectOnSlugChange('/work'),
      revalidateAfterChange('cases', () => ['collection:pages', 'collection:services']),
    ],
    afterDelete: [revalidateAfterDelete('cases')],
  },
  fields: [
    loc('title', 98, { required: true, help: 'The page H1.' }),
    ...slugFields(false),
    { name: 'client', type: 'relationship', relationTo: 'clients', required: true },
    {
      name: 'clientNameVisible',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Show the client name only after the client gave permission.' },
    },
    { name: 'industry', type: 'select', options: [...INDUSTRIES] },
    { name: 'year', type: 'number', min: 2000, max: 2100, admin: { step: 1 } },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      required: true,
    },
    locArea('summary', 225, { required: true }),
    { name: 'cover', type: 'upload', relationTo: 'media', required: true },
    rich('challenge', { required: true }),
    rich('solution', { required: true }),
    rich('result', { required: true }),
    list('metrics', [loc('label', 45, { required: true }), loc('value', 12, { required: true })], {
      maxRows: 4,
      admin: { description: 'Real figures only. Leave empty if none.' },
    }),
    { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true, maxRows: 8 },
    { name: 'testimonial', type: 'relationship', relationTo: 'testimonials' },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
    seo,
  ],
}
