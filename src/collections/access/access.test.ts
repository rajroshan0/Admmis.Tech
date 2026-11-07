import type { PayloadRequest } from 'payload'
import { describe, expect, it } from 'vitest'

import { contentAccess, deleteDraftsOrAdmin, hasRole, isAdmin, priceAccess } from './index'

const req = (roles?: string): PayloadRequest =>
  ({ user: roles ? { roles } : null }) as unknown as PayloadRequest
const run = (fn: unknown, roles?: string) =>
  (fn as (a: { req: PayloadRequest }) => unknown)({ req: req(roles) })

describe('access rules', () => {
  it('anonymous gets nothing', () => {
    for (const fn of [contentAccess.read, contentAccess.create, priceAccess.read, isAdmin]) {
      expect(run(fn)).toBe(false)
    }
  })
  it('only admin can write prices (ADR-025)', () => {
    expect(run(priceAccess.update, 'admin')).toBe(true)
    expect(run(priceAccess.update, 'editor')).toBe(false)
    expect(run(priceAccess.create, 'sales')).toBe(false)
    expect(run(priceAccess.read, 'editor')).toBe(true)
  })
  it('sales reads content but cannot write it', () => {
    expect(run(contentAccess.read, 'sales')).toBe(true)
    expect(run(contentAccess.update, 'sales')).toBe(false)
    expect(run(contentAccess.create, 'editor')).toBe(true)
  })
  it('editors delete drafts only', () => {
    expect(run(deleteDraftsOrAdmin, 'admin')).toBe(true)
    expect(run(deleteDraftsOrAdmin, 'editor')).toEqual({ _status: { equals: 'draft' } })
    expect(run(deleteDraftsOrAdmin, 'sales')).toBe(false)
  })
  it('hasRole handles missing user', () => {
    expect(hasRole(null, 'admin')).toBe(false)
  })
})
