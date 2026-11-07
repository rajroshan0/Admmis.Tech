import { describe, expect, it } from 'vitest'

import { buildMetadata } from '@/lib/seo/metadata'

const base = {
  siteUrl: 'https://tech.admmis.org',
  title: 'T',
  description: 'D',
  siteName: 'S',
}

describe('buildMetadata', () => {
  it('builds an absolute self canonical for EN home', () => {
    const m = buildMetadata({ ...base, locale: 'en', path: '/' })
    expect(m.alternates?.canonical).toBe('https://tech.admmis.org/')
  })
  it('prefixes the NE canonical', () => {
    const m = buildMetadata({ ...base, locale: 'ne', path: '/services' })
    expect(m.alternates?.canonical).toBe('https://tech.admmis.org/ne/services')
  })
  it('emits no hreflang with one locale', () => {
    expect(buildMetadata({ ...base, locale: 'en', path: '/' }).alternates?.languages).toBeUndefined()
  })
  it('emits hreflang for translated locales plus x-default pointing to EN', () => {
    const m = buildMetadata({ ...base, locale: 'ne', path: '/', translatedLocales: ['en', 'ne'] })
    expect(m.alternates?.canonical).toBe('https://tech.admmis.org/ne')
    expect(m.alternates?.languages).toEqual({
      en: 'https://tech.admmis.org/',
      ne: 'https://tech.admmis.org/ne',
      'x-default': 'https://tech.admmis.org/',
    })
  })
})
