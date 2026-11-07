import type { GlobalConfig } from 'payload'

import { hasRole, isStaff } from '../collections/access'
import { list, loc } from '../collections/fields/helpers'
import { seo } from '../collections/fields/seo'

// Header, footer and contacts (content-model §5.1). Never put secrets here: env vars only.
// Brand neutral: no defaults. Analytics IDs are NEXT_PUBLIC_* env vars.
const link = [
  loc('label', 40, { required: true }),
  { name: 'href', type: 'text' as const, required: true },
]

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  label: 'Site settings',
  access: { read: isStaff, update: ({ req }) => hasRole(req.user, 'admin', 'editor') },
  versions: { drafts: false },
  fields: [
    loc('siteName', 60, { required: true }),
    loc('tagline', 120),
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'logoDark', type: 'upload', relationTo: 'media' },
    { name: 'favicon', type: 'upload', relationTo: 'media' },
    {
      name: 'header',
      type: 'group',
      fields: [
        list('items', [...link, list('children', link)], {
          maxRows: 6,
          admin: { description: 'Up to six top-level items.' },
        }),
        { name: 'cta', type: 'group', fields: link },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      fields: [
        list('columns', [loc('title', 40, { required: true }), list('links', link)], {
          maxRows: 4,
        }),
        list('legalLinks', link),
        loc('note', 120),
      ],
    },
    {
      name: 'contacts',
      type: 'group',
      fields: [
        {
          name: 'salesEmail',
          type: 'email',
          admin: {
            description:
              'Public contact email only. The internal lead alert address is an environment setting.',
          },
        },
        { name: 'phone', type: 'text' },
        { name: 'whatsapp', type: 'text' },
        { name: 'address', type: 'textarea', localized: true },
        loc('hours', 80),
      ],
    },
    list('social', [
      { name: 'platform', type: 'text', required: true },
      { name: 'url', type: 'text', required: true },
    ]),
    {
      name: 'stickyBar',
      type: 'group',
      fields: [
        { name: 'whatsapp', type: 'checkbox', defaultValue: true },
        { name: 'call', type: 'checkbox', defaultValue: true },
        { name: 'quote', type: 'checkbox', defaultValue: true },
      ],
    },
    {
      name: 'announcement',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        loc('text', 140),
        { name: 'link', type: 'text' },
      ],
    },
    {
      name: 'thankYou',
      type: 'group',
      fields: [loc('heading', 70), loc('text', 200), loc('whatsappLabel', 40)],
    },
    { name: 'defaultSeo', ...seo, type: 'group' } as never,
  ],
}
