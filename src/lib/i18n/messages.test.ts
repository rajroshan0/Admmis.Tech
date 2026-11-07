import { describe, expect, it } from 'vitest'

import { deepMerge, getMessages, hasMessages } from '@/lib/i18n/messages'

describe('deepMerge', () => {
  it('keeps EN keys the locale does not define', () => {
    expect(deepMerge({ a: { b: 'x', c: 'y' } }, { a: { b: 'z' } })).toEqual({
      a: { b: 'z', c: 'y' },
    })
  })
  it('ignores empty strings so an untranslated key falls back', () => {
    expect(deepMerge({ a: 'x' }, { a: '' })).toEqual({ a: 'x' })
  })
})

describe('getMessages', () => {
  it('serves NE strings and falls back to EN for keys NE does not define', async () => {
    const en = await getMessages('en', 'home')
    const ne = await getMessages('ne', 'home')
    expect(JSON.stringify(ne)).not.toEqual(JSON.stringify(en))
    // Same shape as EN: every EN key exists in the merged NE object.
    const keys = (o: unknown, p = ''): string[] =>
      typeof o === 'object' && o !== null && !Array.isArray(o)
        ? Object.entries(o).flatMap(([k, v]) => keys(v, `${p}.${k}`))
        : [p]
    expect(keys(ne)).toEqual(keys(en))
  })
  it('reports which locales have their own files', () => {
    expect(hasMessages('en', 'home')).toBe(true)
    expect(hasMessages('ne', 'home')).toBe(true)
  })
  it('never contains an unresolved TODO marker', async () => {
    for (const ns of ['common', 'home'] as const) {
      expect(JSON.stringify(await getMessages('en', ns))).not.toContain('TODO(')
    }
  })
})
