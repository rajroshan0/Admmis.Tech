import type { CollectionConfig } from 'payload'

// Starter media collection so the storage adapter has a target. Final fields: neha (content-model §3).
export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  upload: true,
  fields: [{ name: 'alt', type: 'text', localized: true, required: true }],
}
