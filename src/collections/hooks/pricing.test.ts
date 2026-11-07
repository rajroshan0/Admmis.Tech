import { describe, expect, it } from 'vitest'

import { validatePricing } from './pricing'

const ok = {
  kind: 'package',
  unit: 'one-time',
  amounts: [
    { currency: 'NPR', minorUnits: 1 },
    { currency: 'USD', minorUnits: 1 },
  ],
}

describe('validatePricing', () => {
  it('accepts a valid package', () => expect(validatePricing(ok)).toEqual([]))
  it('rejects wrong unit for kind', () =>
    expect(validatePricing({ ...ok, unit: 'hour' })).toHaveLength(1))
  it('rental needs band and product', () =>
    expect(validatePricing({ ...ok, kind: 'rental', unit: 'month' }).join()).toContain('size band'))
  it('quote-only forbids amounts and needs none', () => {
    expect(validatePricing({ ...ok, quoteOnly: true }).join()).toContain('cannot have amounts')
    expect(validatePricing({ kind: 'package', unit: 'one-time', quoteOnly: true })).toEqual([])
  })
  it('rejects duplicate currency and floats', () => {
    expect(
      validatePricing({
        ...ok,
        amounts: [
          { currency: 'NPR', minorUnits: 1 },
          { currency: 'NPR', minorUnits: 1.5 },
        ],
      }).length,
    ).toBeGreaterThan(1)
  })
  it('needs both currencies', () =>
    expect(
      validatePricing({ ...ok, amounts: [{ currency: 'NPR', minorUnits: 1 }] }).join(),
    ).toContain('NPR and USD'))
})
