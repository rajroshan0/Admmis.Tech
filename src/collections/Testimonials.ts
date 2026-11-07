import type { CollectionConfig } from 'payload'

import { contentAccess } from './access'
import { loc, locArea, order } from './fields/helpers'
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate'

// No invented testimonials. Public only when permissionConfirmed.
export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'permissionConfirmed'],
    group: 'Proof',
  },
  access: contentAccess,
  hooks: {
    afterChange: [
      revalidateAfterChange('testimonials', () => ['collection:pages', 'collection:cases']),
    ],
    afterDelete: [revalidateAfterDelete('testimonials')],
  },
  fields: [
    locArea('quote', 400, { required: true }),
    { name: 'authorName', type: 'text', required: true },
    loc('authorRole', 84),
    { name: 'client', type: 'relationship', relationTo: 'clients' },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    {
      name: 'permissionConfirmed',
      type: 'checkbox',
      defaultValue: false,
      required: true,
      admin: { description: 'Tick only when the person agreed in writing to be quoted.' },
    },
    order(),
  ],
}
