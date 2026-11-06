import type { CollectionConfig } from 'payload'

// Starter collection. Roles per ADR-017/025; real access control and 2FA: neha (T-4xx).
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: { useAsTitle: 'email' },
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
      name: 'roles',
      type: 'select',
      options: ['admin', 'editor', 'sales'],
      defaultValue: 'editor',
      required: true,
      saveToJWT: true,
    },
    // TODO(neha): 2FA hook placeholder (ADR-017), see docs/gates/gate-1-tech-review.md
  ],
}
