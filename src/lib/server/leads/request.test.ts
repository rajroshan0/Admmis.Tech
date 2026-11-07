import { describe, expect, it } from 'vitest'

import { clientIp, formToLead, originAllowed } from './request'

const h = (o: Record<string, string>) => new Headers(o)

describe('request helpers', () => {
  it('allows our origin, blocks others', () => {
    expect(originAllowed(h({ origin: 'https://tech.admmis.org' }), ['tech.admmis.org'])).toBe(true)
    expect(originAllowed(h({ origin: 'https://evil.test' }), ['tech.admmis.org'])).toBe(false)
    expect(originAllowed(h({ 'sec-fetch-site': 'cross-site' }), ['tech.admmis.org'])).toBe(false)
    expect(originAllowed(h({}), ['tech.admmis.org'])).toBe(false)
  })
  it('trusts CF-Connecting-IP only behind Cloudflare', () => {
    const headers = h({ 'cf-connecting-ip': '1.1.1.1', 'x-forwarded-for': '2.2.2.2' })
    expect(clientIp(headers, true)).toBe('1.1.1.1')
    expect(clientIp(headers, false)).toBe('2.2.2.2')
    expect(clientIp(h({ 'x-forwarded-for': '9.9.9.9, 3.3.3.3' }), false)).toBe('3.3.3.3')
    expect(clientIp(h({}), false)).toBe('unknown')
  })
  it('maps a form post and drops empty values', () => {
    const fd = new FormData()
    fd.set('name', 'Sita')
    fd.set('company', '')
    fd.set('consentContact', 'on')
    fd.set('policyVersion', 'v1')
    fd.set('source.utmSource', 'fb')
    expect(formToLead(fd)).toEqual({
      name: 'Sita',
      consent: { contact: true, policyVersion: 'v1' },
      source: { utmSource: 'fb' },
    })
  })
})
