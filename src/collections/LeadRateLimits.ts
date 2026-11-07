import type { CollectionConfig } from 'payload'

import { hasRole } from './access'

// Fixed-window counters (leads.md §5). Key = sha256(ip + salt) + window; the raw IP is never stored.
// Cleanup of expired rows: lead worker, daily (T-410).
export const LeadRateLimits: CollectionConfig = {
  slug: 'leadRateLimits',
  admin: { hidden: ({ user }) => !hasRole(user, 'admin'), group: 'Leads' },
  access: { read: () => false, create: () => false, update: () => false, delete: () => false },
  fields: [
    { name: 'key', type: 'text', required: true, unique: true, index: true },
    { name: 'count', type: 'number', required: true, defaultValue: 0 },
    { name: 'expiresAt', type: 'date', required: true, index: true },
  ],
}
