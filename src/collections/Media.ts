import type { CollectionConfig } from 'payload'

import { hasRole, isAdmin, isEditorOrAdmin } from './access'
import { loc } from './fields/helpers'

const MB = 1024 * 1024

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Media file', plural: 'Media' },
  admin: { useAsTitle: 'filename', defaultColumns: ['filename', 'alt', 'mimeType'] },
  // Public read: files are served to visitors. Documents about them are not content.
  access: { read: () => true, create: isEditorOrAdmin, update: isEditorOrAdmin, delete: isAdmin },
  upload: {
    mimeTypes: [
      'image/avif',
      'image/webp',
      'image/png',
      'image/jpeg',
      'image/svg+xml',
      'video/mp4',
      'video/webm',
      'application/pdf',
    ],
    focalPoint: true,
    imageSizes: [480, 768, 1280, 1920].map((width) => ({
      name: `w${width}`,
      width,
      formatOptions: { format: 'webp' as const },
    })),
  },
  hooks: {
    beforeValidate: [
      ({ data, req }) => {
        const file = req.file
        if (!file) return data
        const limit = file.mimetype.startsWith('video/') ? 50 * MB : 10 * MB
        if (file.size > limit) throw new Error(`File is too large. Limit is ${limit / MB} MB.`)
        return data
      },
    ],
  },
  fields: [
    loc('alt', 200, {
      validate: (value: unknown, { siblingData }: { siblingData: { decorative?: boolean } }) =>
        siblingData?.decorative || (typeof value === 'string' && value.trim())
          ? true
          : 'Describe the image, or tick "Decorative".',
      admin: { description: 'Describe what the image shows for someone who cannot see it.' },
    }),
    {
      name: 'decorative',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Tick if the image is only decoration. Then alt text can stay empty.' },
    },
    loc('caption', 200),
    {
      name: 'credit',
      type: 'text',
      admin: { description: 'Photographer, or "AI-generated (tool, date)".' },
    },
    {
      name: 'provenance',
      type: 'textarea',
      admin: {
        description: 'For AI-generated images: tool, prompt and date.',
        condition: (_d, _s, { user }) => hasRole(user, 'admin', 'editor'),
      },
    },
  ],
}
