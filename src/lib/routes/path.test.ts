import { describe, expect, it } from 'vitest'

import { languageItems, pathFor } from '@/lib/routes/path'

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

describe('languageItems', () => {
  const names = { en: 'English', ne: 'नेपाली' }
  it('links each locale to its homepage and marks the current one', () => {
    expect(languageItems('ne', ['en', 'ne'], names)).toEqual([
      { locale: 'en', name: 'English', href: '/', current: false },
      { locale: 'ne', name: 'नेपाली', href: '/ne', current: true },
    ])
  })
})
