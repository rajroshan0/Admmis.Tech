import type { CollectionConfig } from 'payload'

import { hasRole, isAdmin } from './access'

// Roles per ADR-017/025. 2FA is mandatory later (ADR-017); mechanism is hritik/raj week 2.
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: { useAsTitle: 'email', defaultColumns: ['email', 'name', 'roles'] },
  access: {
    // Only admins list or create users. The first user (empty table) may register and becomes admin.
    create: async ({ req }) => {
      if (hasRole(req.user, 'admin')) return true
      if (req.user) return false
      const { totalDocs } = await req.payload.count({
        collection: 'users',
        req,
        overrideAccess: true,
      })
      return totalDocs === 0
    },
    read: ({ req }) =>
      hasRole(req.user, 'admin') ? true : req.user ? { id: { equals: req.user.id } } : false,
    update: ({ req }) =>
      hasRole(req.user, 'admin') ? true : req.user ? { id: { equals: req.user.id } } : false,
    delete: isAdmin,
  },
  hooks: {
    // The very first user created (Payload "first register" screen) becomes admin; everyone else
    // defaults to editor. Without this the first account could not manage the others.
    beforeValidate: [
      async ({ data, operation, req }) => {
        if (operation !== 'create') return data
        const { totalDocs } = await req.payload.count({ collection: 'users', req })
        return totalDocs === 0 ? { ...data, roles: 'admin' } : data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      admin: { description: 'Shown in the admin and in version history.' },
    },
    {
      name: 'roles',
      type: 'select',
      options: ['admin', 'editor', 'sales'],
      defaultValue: 'editor',
      required: true,
      saveToJWT: true,
      access: { update: ({ req }) => hasRole(req.user, 'admin') },
      admin: {
        description:
          'Admin: everything. Editor: content, no leads. Sales: leads and read-only content.',
      },
    },
  ],
}
