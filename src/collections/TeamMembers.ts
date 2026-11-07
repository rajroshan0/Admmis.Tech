import type { CollectionConfig } from 'payload'

import { contentAccess } from './access'
import { list, loc, locArea, order } from './fields/helpers'
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate'

// Personal data: publish only with consent (TODO(roshan): which members are public).
export const TeamMembers: CollectionConfig = {
  slug: 'teamMembers',
  labels: { singular: 'Team member', plural: 'Team members' },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'role', 'showOnAbout'], group: 'Proof' },
  access: contentAccess,
  hooks: {
    afterChange: [
      revalidateAfterChange('teamMembers', () => ['collection:pages', 'collection:posts']),
    ],
    afterDelete: [revalidateAfterDelete('teamMembers')],
  },
  fields: [
    loc('name', 56, { required: true }),
    loc('role', 56, { required: true }),
    locArea('bio', 140),
    { name: 'photo', type: 'upload', relationTo: 'media' },
    list(
      'links',
      [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: ['linkedin', 'github', 'x', 'website'],
        },
        { name: 'url', type: 'text', required: true },
      ],
      { maxRows: 4 },
    ),
    {
      name: 'showOnAbout',
      type: 'checkbox',
      defaultValue: false,
      required: true,
      admin: { description: "Show on the About page. Needs the person's consent." },
    },
    order(),
  ],
}
