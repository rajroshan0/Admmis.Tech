import type { CollectionConfig } from 'payload'

import { contentAccess } from './access'
import { list, loc, locArea, rich } from './fields/helpers'
import { seo } from './fields/seo'
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate'
import { lockSlug, redirectOnSlugChange, slugFields } from './hooks/slug'

// design/templates/blog-spec.md §5: excerpt 280 (EN 200), tags 3 x 34.
export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Article', plural: 'Articles' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedAt', '_status'],
    group: 'Pages',
  },
  access: contentAccess,
  versions: { drafts: { schedulePublish: true }, maxPerDoc: 20 },
  hooks: {
    beforeChange: [lockSlug],
    afterChange: [redirectOnSlugChange('/blog'), revalidateAfterChange('posts')],
    afterDelete: [revalidateAfterDelete('posts')],
  },
  fields: [
    loc('title', 98, { required: true }),
    ...slugFields(false),
    locArea('excerpt', 280, { required: true }),
    { name: 'cover', type: 'upload', relationTo: 'media', required: true },
    rich('body', {
      required: true,
      admin: { description: 'Headings H2 and H3 only. Every image needs alt text.' },
    }),
    { name: 'author', type: 'relationship', relationTo: 'teamMembers', required: true },
    list('tags', [loc('text', 34, { required: true })], { maxRows: 3 }),
    { name: 'relatedServices', type: 'relationship', relationTo: 'services', hasMany: true },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
    seo,
  ],
}
