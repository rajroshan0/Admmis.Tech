import type { CollectionConfig } from 'payload'

import { hasRole, isAdmin } from './access'

// Outbox (leads.md §6). Holds the lead id only, never a copy of PII. Created by server code only.
export const LeadJobs: CollectionConfig = {
  slug: 'leadJobs',
  labels: { singular: 'Lead delivery job', plural: 'Lead delivery jobs' },
  admin: {
    hidden: ({ user }) => !hasRole(user, 'admin'),
    defaultColumns: ['lead', 'channel', 'status', 'attempts', 'nextAttemptAt'],
    group: 'Leads',
  },
  access: { read: isAdmin, create: () => false, update: isAdmin, delete: isAdmin },
  indexes: [{ fields: ['lead', 'channel'], unique: true }, { fields: ['status', 'nextAttemptAt'] }],
  fields: [
    { name: 'lead', type: 'relationship', relationTo: 'leads', required: true, index: true },
    { name: 'channel', type: 'select', required: true, options: ['email', 'chat', 'crm'] },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: ['pending', 'sending', 'sent', 'failed', 'dead'],
    },
    { name: 'attempts', type: 'number', defaultValue: 0, required: true },
    { name: 'nextAttemptAt', type: 'date', required: true },
    { name: 'lockedAt', type: 'date' },
    {
      name: 'lastError',
      type: 'text',
      admin: { description: 'Provider error only. No personal data.' },
    },
    { name: 'sentAt', type: 'date' },
  ],
}
