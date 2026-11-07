import type { CollectionConfig } from 'payload'

import { isAdmin, isEditorOrAdmin, isStaff } from './access'

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: { useAsTitle: 'from', defaultColumns: ['from', 'to', 'status', 'auto'] },
  access: { read: isStaff, create: isEditorOrAdmin, update: isEditorOrAdmin, delete: isAdmin },
  fields: [
    {
      name: 'from',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Old path without language, for example /services/old-name.' },
    },
    { name: 'to', type: 'text', required: true, admin: { description: 'New path or full URL.' } },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: '301',
      options: ['301', '302'],
    },
    {
      name: 'auto',
      type: 'checkbox',
      defaultValue: false,
      admin: { readOnly: true, description: 'Created automatically when a web address changed.' },
    },
  ],
}
