import { describe, expect, it } from 'vitest'

import { deepMerge, getMessages } from '@/lib/i18n/messages'

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
  it('falls back to EN while NE has no files', async () => {
    expect(await getMessages('ne', 'common')).toEqual(await getMessages('en', 'common'))
  })
  it('never contains an unresolved TODO marker', async () => {
    for (const ns of ['common', 'home'] as const) {
      expect(JSON.stringify(await getMessages('en', ns))).not.toContain('TODO(')
    }
  })
})
