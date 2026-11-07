import type { CollectionConfig, Field } from 'payload'

import { SIZE_BANDS } from '../config/size-bands'
import { hasRole, isAdmin, isSalesOrAdmin } from './access'

// PII. Admin and sales only; editors see nothing (not even the menu entry). Rows are created by server
// code only (POST /api/leads uses the local API); nobody creates leads through REST or the admin UI.
// Full contract: docs/api/leads.md. Retention: 24 months (ADR-036), purge job is a later task.
const readOnly = { update: () => false } // locked after creation, even for admin/sales
const ro = (f: Field): Field =>
  ({ ...f, access: { ...readOnly, ...((f as { access?: object }).access ?? {}) } }) as Field

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Lead', plural: 'Leads' },
  admin: {
    useAsTitle: 'name',
    // Defaults show no contact details in list view.
    defaultColumns: ['name', 'formKind', 'status', 'verification', 'createdAt'],
    hidden: ({ user }) => !hasRole(user, 'admin', 'sales'),
    group: 'Leads',
  },
  access: { read: isSalesOrAdmin, create: () => false, update: isSalesOrAdmin, delete: isAdmin },
  timestamps: true,
  hooks: {
    // Note author and time come from the server, never from the client (hritik T-112).
    beforeChange: [
      ({ data, originalDoc, req }) => {
        const before = (originalDoc?.notes ?? []).length
        const notes = (data.notes ?? []) as { by?: unknown; at?: string }[]
        notes.forEach((n, i) => {
          if (i >= before) {
            n.by = req.user?.id
            n.at = new Date().toISOString()
          }
        })
        return data
      },
    ],
  },
  fields: [
    ro({ name: 'publicId', type: 'text', required: true, unique: true, index: true }),
    ro({ name: 'name', type: 'text', required: true }),
    ro({ name: 'company', type: 'text' }),
    ro({ name: 'email', type: 'email', index: true }),
    ro({ name: 'phone', type: 'text', index: true }),
    ro({ name: 'service', type: 'text' }),
    ro({ name: 'sizeBand', type: 'select', options: [...SIZE_BANDS] }),
    ro({ name: 'budgetRange', type: 'text' }),
    ro({ name: 'message', type: 'textarea' }),
    ro({ name: 'locale', type: 'select', options: ['en', 'ne'], required: true }),
    ro({
      name: 'formKind',
      type: 'select',
      required: true,
      options: ['contact', 'quote', 'rent', 'event', 'callback'],
    }),
    ro({
      name: 'pricingKey',
      type: 'text',
      admin: { description: 'Plan the visitor clicked, if any.' },
    }),
    ro({
      name: 'source',
      type: 'group',
      fields: [
        'utmSource',
        'utmMedium',
        'utmCampaign',
        'utmTerm',
        'utmContent',
        'referrer',
        'landingPath',
        'pagePath',
      ].map((name) => ({ name, type: 'text' as const })),
    }),
    ro({
      name: 'consent',
      type: 'group',
      fields: [
        { name: 'contactConsent', type: 'checkbox' },
        { name: 'consentAt', type: 'date' },
        { name: 'policyVersion', type: 'text' },
      ],
    }),
    ro({
      name: 'verification',
      type: 'select',
      required: true,
      options: ['verified', 'unverified-turnstile-unavailable', 'unverified-no-js'],
      admin: { description: 'Unverified leads had no spam check. Check them before replying.' },
    }),
    // The only fields sales may change.
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: ['new', 'contacted', 'qualified', 'won', 'lost', 'spam'],
      index: true,
    },
    { name: 'assignee', type: 'relationship', relationTo: 'users' },
    {
      name: 'notes',
      type: 'array',
      fields: [
        { name: 'by', type: 'relationship', relationTo: 'users' },
        { name: 'at', type: 'date' },
        { name: 'text', type: 'textarea', required: true },
      ],
    },
    { name: 'crmId', type: 'text', access: { update: ({ req }) => hasRole(req.user, 'admin') } },
    {
      name: 'ipHash',
      type: 'text',
      access: { read: () => false, update: () => false },
      admin: { condition: () => false },
    },
    {
      name: 'userAgent',
      type: 'text',
      maxLength: 200,
      access: { read: () => false, update: () => false },
      admin: { condition: () => false },
    },
    ro({
      name: 'idempotencyKey',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { condition: () => false },
    }),
  ],
}
