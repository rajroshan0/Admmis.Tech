import { describe, expect, it } from 'vitest'

import { pathFor } from '@/lib/routes/path'

describe('pathFor', () => {
  it('leaves EN paths unprefixed', () => {
    expect(pathFor('en', '/')).toBe('/')
    expect(pathFor('en', '/services')).toBe('/services')
  })
  it('prefixes NE paths', () => {
    expect(pathFor('ne', '/')).toBe('/ne')
    expect(pathFor('ne', '/services')).toBe('/ne/services')
  })
})
