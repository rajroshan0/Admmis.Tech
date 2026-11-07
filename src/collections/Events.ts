import type { CollectionConfig } from 'payload'

import { contentAccess } from './access'
import { list, loc, rich } from './fields/helpers'
import { seo } from './fields/seo'
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate'
import { lockSlug, redirectOnSlugChange, slugFields } from './hooks/slug'

// design/templates/event-spec.md §5. One document at launch (the opening event).
export const Events: CollectionConfig = {
  slug: 'events',
  labels: { singular: 'Event', plural: 'Events' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'startsAt', '_status'], group: 'Pages' },
  access: contentAccess,
  versions: { drafts: true, maxPerDoc: 20 },
  hooks: {
    beforeChange: [lockSlug],
    afterChange: [redirectOnSlugChange('/events'), revalidateAfterChange('events')],
    afterDelete: [revalidateAfterDelete('events')],
  },
  fields: [
    loc('title', 84, { required: true }),
    ...slugFields(false),
    loc('heroSub', 210),
    {
      name: 'startsAt',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    { name: 'endsAt', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
    loc('venue', 84, { required: true }),
    loc('address', 170, { required: true }),
    loc('locationNote', 225),
    { name: 'online', type: 'checkbox', defaultValue: false },
    rich('description', { required: true }),
    list('agenda', [
      { name: 'time', type: 'text', required: true, maxLength: 17 },
      loc('title', 98, { required: true }),
      { name: 'speaker', type: 'relationship', relationTo: 'teamMembers' },
    ]),
    {
      name: 'registration',
      type: 'select',
      required: true,
      defaultValue: 'form',
      options: ['form', 'link', 'none'],
    },
    {
      name: 'registrationLink',
      type: 'text',
      admin: { condition: (d) => d?.registration === 'link' },
    },
    loc('archiveNote', 170, { help: 'Shown after the event has ended.' }),
    { name: 'cover', type: 'upload', relationTo: 'media' },
    { name: 'faqs', type: 'relationship', relationTo: 'faqs', hasMany: true, maxRows: 3 },
    loc('formHeading', 70),
    loc('formText', 170),
    seo,
  ],
}
