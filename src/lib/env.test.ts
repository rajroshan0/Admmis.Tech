import { describe, expect, it } from 'vitest'

import { parseServerEnv } from '@/lib/env'

const valid = {
  DATABASE_URL: 'postgres://u:p@localhost:5432/db',
  PAYLOAD_SECRET: 'x'.repeat(32),
  NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
}

describe('parseServerEnv', () => {
  it('applies defaults', () => {
    const env = parseServerEnv(valid)
    expect(env.BRAND).toBe('admmis-tech')
    expect(env.ENABLED_LOCALES).toEqual(['en'])
  })

  it('parses ENABLED_LOCALES', () => {
    expect(parseServerEnv({ ...valid, ENABLED_LOCALES: 'en, ne' }).ENABLED_LOCALES).toEqual([
      'en',
      'ne',
    ])
  })

  it('reports names, never values', () => {
    const secret = 'short-secret-value'
    expect.assertions(2)
    try {
      parseServerEnv({ ...valid, PAYLOAD_SECRET: secret })
    } catch (e) {
      const message = (e as Error).message
      expect(message).toContain('PAYLOAD_SECRET')
      expect(message).not.toContain(secret)
    }
  })
})
