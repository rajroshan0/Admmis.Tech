import type { Block, CollectionConfig, Field } from 'payload'

import { RENTAL_PRODUCTS } from '../config/size-bands'
import { contentAccess } from './access'
import { icon, list, loc, rich } from './fields/helpers'
import { seo } from './fields/seo'
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate'
import { lockSlug, redirectOnSlugChange, slugFields } from './hooks/slug'

const cta = (name: string): Field => ({
  name,
  type: 'group',
  fields: [
    loc('label', 34),
    { name: 'href', type: 'text', admin: { description: 'Path like /contact, or a full URL.' } },
  ],
})

// Free-form blocks for home, about, legal, contact. Data shapes: docs/frontend/component-inventory.md §3.1.
// No block holds a price amount. TODO(satish): remaining blocks after wireframes (content-model §6).
const block = (slug: string, fields: Field[]): Block => ({ slug, interfaceName: undefined, fields })
const blocks: Block[] = [
  block('hero', [
    loc('eyebrow', 42),
    loc('heading', 98, { required: true }),
    loc('subheading', 210),
    cta('primaryCta'),
    cta('secondaryCta'),
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'mobileImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional crop for phones.' },
    },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'centered',
      options: ['centered', 'split', 'model'],
    },
    list('chips', [loc('text', 34, { required: true })], { maxRows: 4 }),
  ]),
  block('services-grid', [
    loc('heading', 84),
    loc('intro', 170),
    { name: 'mode', type: 'select', defaultValue: 'all', options: ['all', 'pick'] },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: { condition: (_d, s) => s?.mode === 'pick' },
    },
  ]),
  block('feature-list', [
    loc('heading', 84),
    list('items', [
      icon(),
      loc('title', 40, { required: true }),
      loc('text', 170, { required: true }),
    ]),
  ]),
  block('process-steps', [
    loc('heading', 84),
    list('steps', [loc('title', 26, { required: true }), loc('text', 155, { required: true })]),
  ]),
  block('pricing-table', [
    loc('heading', 84),
    loc('intro', 170),
    { name: 'kind', type: 'select', required: true, options: ['package', 'hourly'] },
    { name: 'prices', type: 'relationship', relationTo: 'pricing', hasMany: true },
    { name: 'showCurrencyToggle', type: 'checkbox', defaultValue: true },
    cta('quoteCta'),
  ]),
  block('rental-plans', [
    loc('heading', 84),
    { name: 'product', type: 'select', required: true, options: [...RENTAL_PRODUCTS] },
    { name: 'highlightBand', type: 'select', options: ['S', 'M', 'L', 'XL'] },
  ]),
  block('faq', [
    loc('heading', 84),
    { name: 'faqs', type: 'relationship', relationTo: 'faqs', hasMany: true },
  ]),
  block('cta-form', [
    loc('heading', 70),
    loc('text', 170),
    {
      name: 'formKind',
      type: 'select',
      required: true,
      defaultValue: 'quote',
      options: ['contact', 'quote', 'rent', 'event', 'callback'],
    },
    { name: 'defaultService', type: 'relationship', relationTo: 'services' },
    { name: 'defaultPricing', type: 'relationship', relationTo: 'pricing' },
  ]),
  block('rich-text', [
    rich('content', { required: true }),
    { name: 'width', type: 'select', defaultValue: 'narrow', options: ['narrow', 'wide'] },
  ]),
  block('banner', [
    loc('text', 140, { required: true }),
    cta('link'),
    { name: 'tone', type: 'select', defaultValue: 'info', options: ['info', 'promo', 'notice'] },
  ]),
]

const onTemplate =
  (...t: string[]) =>
  (data: { template?: string } | undefined) =>
    !!data?.template && t.includes(data.template)

const meaning = [loc('title', 40, { required: true }), loc('text', 155, { required: true }), icon()]
const exitFields = [
  loc('exitHeading', 70, { required: true }),
  loc('exitCallout', 126, { required: true }),
  loc('exitText', 560, { required: true }),
]
const formFields = [
  loc('formHeading', 70, { required: true }),
  loc('formText', 170, { required: true }),
]
const faqRel: Field = {
  name: 'faqs',
  type: 'relationship',
  relationTo: 'faqs',
  hasMany: true,
  required: true,
  maxRows: 6,
}
const crossSell = list(
  'crossSell',
  [loc('title', 42), loc('text', 155), { name: 'href', type: 'text' }, loc('cta', 34)],
  { maxRows: 2 },
)

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'template', '_status'],
    group: 'Pages',
  },
  access: contentAccess,
  versions: { drafts: true, maxPerDoc: 20 },
  hooks: {
    beforeChange: [lockSlug],
    afterChange: [redirectOnSlugChange(''), revalidateAfterChange('pages')],
    afterDelete: [revalidateAfterDelete('pages')],
  },
  fields: [
    loc('title', 98, { required: true, help: 'Admin label and default H1.' }),
    ...slugFields(true),
    {
      name: 'template',
      type: 'select',
      required: true,
      options: [
        'home',
        'services-hub',
        'pricing',
        'rent-hub',
        'rent-product',
        'about',
        'contact',
        'thank-you',
        'legal',
      ],
      admin: {
        position: 'sidebar',
        description: 'Decides the page layout. Only the fields for this layout are shown.',
      },
    },
    {
      name: 'legalVersion',
      type: 'text',
      admin: {
        position: 'sidebar',
        condition: onTemplate('legal'),
        description: 'Version label shown on the policy, for example 2026-12-01.',
      },
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks,
      admin: {
        condition: onTemplate('home', 'pricing', 'about', 'contact', 'thank-you', 'legal'),
        description: 'Build the page from blocks.',
      },
    },
    // design/templates/service-spec.md §5.2
    {
      name: 'servicesHub',
      type: 'group',
      admin: { condition: onTemplate('services-hub') },
      fields: [
        loc('heroHeading', 98, { required: true }),
        loc('heroSub', 210, { required: true }),
        list(
          'groups',
          [loc('title', 34, { required: true }), loc('text', 126, { required: true })],
          { minRows: 3, maxRows: 3, required: true },
        ),
        list(
          'choices',
          [
            loc('question', 84, { required: true }),
            { name: 'serviceRef', type: 'relationship', relationTo: 'services', required: true },
          ],
          { minRows: 5, maxRows: 6, required: true },
        ),
        loc('priceText', 310),
        { ...faqRel, minRows: 4, maxRows: 4 },
      ],
    },
    // design/templates/rent-spec.md §5.1
    {
      name: 'rentHub',
      type: 'group',
      admin: { condition: onTemplate('rent-hub') },
      fields: [
        loc('heroHeading', 98, { required: true }),
        loc('heroSub', 210, { required: true }),
        list('meaning', meaning, { minRows: 3, maxRows: 3, required: true }),
        loc('productsHeading', 84, { required: true }),
        loc('productsIntro', 170),
        list(
          'products',
          [
            {
              name: 'rentalProduct',
              type: 'select',
              required: true,
              options: [...RENTAL_PRODUCTS],
            },
            loc('cardTitle', 30, { required: true }),
            loc('cardFor', 56, { required: true }),
            list('cardBullets', [loc('text', 56, { required: true })], {
              minRows: 3,
              maxRows: 3,
              required: true,
            }),
            icon(),
          ],
          { minRows: 3, maxRows: 3, required: true },
        ),
        loc('compareHeading', 84, { required: true }),
        list(
          'compareRows',
          [
            loc('topic', 34, { required: true }),
            loc('rent', 98, { required: true }),
            loc('buy', 98, { required: true }),
          ],
          { minRows: 5, maxRows: 5, required: true },
        ),
        loc('plansHeading', 84, { required: true }),
        loc('plansIntro', 225),
        loc('bandHelp', 155, { required: true }),
        loc('includedHeading', 56, { required: true }),
        list('included', [loc('text', 84, { required: true })], {
          minRows: 4,
          maxRows: 8,
          required: true,
        }),
        loc('notIncludedHeading', 56, { required: true }),
        list('notIncluded', [loc('text', 84, { required: true })], {
          minRows: 4,
          maxRows: 8,
          required: true,
        }),
        ...exitFields,
        faqRel,
        ...formFields,
      ],
    },
    // design/templates/rent-spec.md §5.2
    {
      name: 'rentProduct',
      type: 'group',
      admin: { condition: onTemplate('rent-product') },
      fields: [
        { name: 'product', type: 'select', required: true, options: [...RENTAL_PRODUCTS] },
        loc('heroEyebrow', 42),
        loc('heroHeading', 98, { required: true }),
        loc('heroSub', 210, { required: true }),
        { name: 'facts', type: 'group', fields: [loc('minTerm', 42), loc('setup', 42)] },
        loc('howHeading', 84, { required: true }),
        list(
          'howSteps',
          [loc('title', 26, { required: true }), loc('text', 155, { required: true })],
          { minRows: 3, maxRows: 3, required: true },
        ),
        loc('includedHeading', 56, { required: true }),
        list('included', meaning, { minRows: 6, maxRows: 6, required: true }),
        loc('plansHeading', 84, { required: true }),
        loc('plansIntro', 225),
        list(
          'teamRoles',
          [
            loc('role', 40, { required: true }),
            { name: 'priceRef', type: 'relationship', relationTo: 'pricing' },
            loc('note', 84),
          ],
          {
            admin: {
              condition: (_d, s) => s?.product === 'team',
              description: 'Team rental only.',
            },
          },
        ),
        loc('examplesHeading', 84, { required: true }),
        list('examples', meaning, { minRows: 3, maxRows: 3, required: true }),
        loc('whyHeading', 84, { required: true }),
        list('why', [loc('title', 40, { required: true }), loc('text', 170, { required: true })], {
          minRows: 4,
          maxRows: 4,
          required: true,
        }),
        list(
          'launchSteps',
          [loc('title', 26, { required: true }), loc('text', 155, { required: true })],
          { maxRows: 4 },
        ),
        list('notIncluded', [loc('text', 84, { required: true })], {
          minRows: 4,
          maxRows: 8,
          required: true,
        }),
        ...exitFields,
        crossSell,
        faqRel,
        ...formFields,
      ],
    },
    seo,
  ],
}
