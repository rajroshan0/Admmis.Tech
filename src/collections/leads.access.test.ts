import type { PayloadRequest } from 'payload'
import { describe, expect, it } from 'vitest'

import { LeadJobs } from './LeadJobs'
import { LeadRateLimits } from './LeadRateLimits'
import { Leads } from './Leads'

const call = (fn: unknown, roles?: string) =>
  (fn as (a: { req: PayloadRequest }) => unknown)({
    req: { user: roles ? { roles } : null } as unknown as PayloadRequest,
  })

describe('lead access', () => {
  it('editors and anonymous cannot read leads', () => {
    expect(call(Leads.access?.read, 'editor')).toBe(false)
    expect(call(Leads.access?.read)).toBe(false)
  })
  it('sales and admin read and update leads; only admin deletes', () => {
    for (const r of ['sales', 'admin']) {
      expect(call(Leads.access?.read, r)).toBe(true)
      expect(call(Leads.access?.update, r)).toBe(true)
    }
    expect(call(Leads.access?.delete, 'sales')).toBe(false)
    expect(call(Leads.access?.delete, 'admin')).toBe(true)
  })
  it('nobody creates leads, jobs or counters through the API', () => {
    for (const c of [Leads, LeadJobs, LeadRateLimits])
      expect(call(c.access?.create, 'admin')).toBe(false)
  })
  it('rate-limit counters are closed to every role', () => {
    for (const k of ['read', 'create', 'update', 'delete'] as const)
      expect(call(LeadRateLimits.access?.[k], 'admin')).toBe(false)
  })
  it('sales cannot see delivery jobs', () => {
    expect(call(LeadJobs.access?.read, 'sales')).toBe(false)
    expect(call(LeadJobs.access?.read, 'admin')).toBe(true)
  })
  it('personal fields are locked after creation', () => {
    const f = Leads.fields.find((x) => 'name' in x && x.name === 'email') as {
      access?: { update?: () => boolean }
    }
    expect(f.access?.update?.()).toBe(false)
  })
})
