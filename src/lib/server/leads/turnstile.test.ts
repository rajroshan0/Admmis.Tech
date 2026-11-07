import { describe, expect, it } from 'vitest'

import { verifyTurnstile } from './turnstile'

const base = { secret: 's', expectedHosts: ['tech.admmis.org'] }
const res = (status: number, json: unknown) =>
  (async () => new Response(JSON.stringify(json), { status })) as unknown as typeof fetch

describe('verifyTurnstile', () => {
  it('valid', async () =>
    expect(
      await verifyTurnstile('t', {
        ...base,
        fetchImpl: res(200, { success: true, hostname: 'tech.admmis.org' }),
      }),
    ).toBe('valid'))
  it('invalid token', async () =>
    expect(await verifyTurnstile('t', { ...base, fetchImpl: res(200, { success: false }) })).toBe(
      'invalid',
    ))
  it('bad secret is misconfigured, not invalid', async () => {
    for (const code of ['invalid-input-secret', 'missing-input-secret', 'internal-error'])
      expect(
        await verifyTurnstile('t', {
          ...base,
          fetchImpl: res(200, { success: false, 'error-codes': [code] }),
        }),
      ).toBe('misconfigured')
  })
  it('only response errors are invalid', async () => {
    for (const code of ['invalid-input-response', 'timeout-or-duplicate'])
      expect(
        await verifyTurnstile('t', {
          ...base,
          fetchImpl: res(200, { success: false, 'error-codes': [code] }),
        }),
      ).toBe('invalid')
  })
  it('empty secret is misconfigured', async () =>
    expect(await verifyTurnstile('t', { ...base, secret: '' })).toBe('misconfigured'))
  it('wrong hostname is invalid', async () =>
    expect(
      await verifyTurnstile('t', {
        ...base,
        fetchImpl: res(200, { success: true, hostname: 'evil.test' }),
      }),
    ).toBe('invalid'))
  it('5xx is unreachable', async () =>
    expect(await verifyTurnstile('t', { ...base, fetchImpl: res(503, {}) })).toBe('unreachable'))
  it('network error is unreachable', async () =>
    expect(
      await verifyTurnstile('t', {
        ...base,
        fetchImpl: (async () => {
          throw new Error('x')
        }) as unknown as typeof fetch,
      }),
    ).toBe('unreachable'))
  it('missing token is invalid', async () =>
    expect(await verifyTurnstile('', base)).toBe('invalid'))
})
