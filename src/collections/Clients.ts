import type { CollectionConfig } from 'payload'

import { contentAccess } from './access'
import { order } from './fields/helpers'
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate'

// A client appears on the public site only if permissionConfirmed is true (CLAUDE.md "Truth").
export const Clients: CollectionConfig = {
  slug: 'clients',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'permissionConfirmed', 'showInLogoStrip'],
    group: 'Proof',
  },
  access: contentAccess,
  hooks: {
    afterChange: [revalidateAfterChange('clients', () => ['collection:pages', 'collection:cases'])],
    afterDelete: [revalidateAfterDelete('clients')],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'One image, usable in greyscale (SVG or transparent PNG).' },
    },
    { name: 'website', type: 'text' },
    { name: 'showInLogoStrip', type: 'checkbox', defaultValue: false },
    {
      name: 'permissionConfirmed',
      type: 'checkbox',
      defaultValue: false,
      required: true,
      admin: {
        description:
          'Tick only when the client agreed in writing to be shown. Otherwise nothing about them is public.',
      },
    },
    order(),
  ],
}
