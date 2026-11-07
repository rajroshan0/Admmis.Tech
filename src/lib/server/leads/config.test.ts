import { afterEach, describe, expect, it, vi } from 'vitest'

import { getLeadConfig } from './config'

afterEach(() => vi.unstubAllEnvs())

describe('getLeadConfig in production', () => {
  const prod = (o: Record<string, string>) => {
    vi.stubEnv('NODE_ENV', 'production')
    for (const [k, v] of Object.entries({
      IP_HASH_SALT: 'x'.repeat(32),
      TRUSTED_PROXY: 'cloudflare',
      TURNSTILE_SECRET_KEY: 's',
      ...o,
    }))
      vi.stubEnv(k, v)
  }
  it('accepts a complete setup', () => {
    prod({})
    expect(getLeadConfig().trustCloudflare).toBe(true)
  })
  it('refuses a short or default salt', () => {
    prod({ IP_HASH_SALT: 'dev-only-salt' })
    expect(() => getLeadConfig()).toThrow(/IP_HASH_SALT/)
  })
  it('refuses TRUSTED_PROXY other than cloudflare', () => {
    prod({ TRUSTED_PROXY: 'none' })
    expect(() => getLeadConfig()).toThrow(/TRUSTED_PROXY/)
  })
  it('refuses a missing Turnstile secret', () => {
    prod({ TURNSTILE_SECRET_KEY: '' })
    expect(() => getLeadConfig()).toThrow(/TURNSTILE/)
  })
})
