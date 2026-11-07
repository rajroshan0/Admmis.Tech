import { describe, expect, it } from 'vitest'

import { slugChangeBlocked, slugPattern } from './slug'

describe('slug rules', () => {
  it('accepts clean slugs and one nested level only for pages', () => {
    expect(slugPattern(false).test('web-development')).toBe(true)
    expect(slugPattern(false).test('rent/website')).toBe(false)
    expect(slugPattern(true).test('rent/website')).toBe(true)
    expect(slugPattern(true).test('a/b/c')).toBe(false)
    expect(slugPattern(false).test('Bad_Slug')).toBe(false)
  })
  it('locks published slugs unless confirmed', () => {
    const base = { prevSlug: 'a', nextSlug: 'b', prevStatus: 'published' }
    expect(slugChangeBlocked(base)).toBe(true)
    expect(slugChangeBlocked({ ...base, confirmed: true })).toBe(false)
    expect(slugChangeBlocked({ ...base, prevStatus: 'draft' })).toBe(false)
    expect(slugChangeBlocked({ ...base, nextSlug: 'a' })).toBe(false)
  })
})
