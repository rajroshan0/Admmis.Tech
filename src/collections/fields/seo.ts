import type { Field } from 'payload'

import { loc, locArea } from './helpers'

// SEO group on every public document (content-model §4). Sudip confirms the final list (T-70x).
export const seo: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  fields: [
    loc('metaTitle', 60, {
      help: 'Browser and search title. Start with the main keyword. Leave empty to use the page title.',
    }),
    locArea('metaDescription', 160, {
      admin: { description: 'Search result text. Up to 160 characters.' },
    }),
    {
      name: 'primaryKeyword',
      type: 'text',
      admin: { description: 'For editors only. Not shown on the site.' },
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Social share image. Falls back to the site default.' },
    },
    {
      name: 'canonicalPath',
      type: 'text',
      admin: { description: 'Only if this page should point to another URL.' },
    },
    {
      name: 'noindex',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Hide from search engines and the sitemap.' },
    },
    { name: 'nofollow', type: 'checkbox', defaultValue: false },
  ],
}
