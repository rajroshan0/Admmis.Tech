import { describe, expect, it } from 'vitest'

import { errorTarget, successTarget } from './redirect'

describe('no-JS redirects', () => {
  it('success is locale aware and fixed', () => {
    expect(successTarget('ne')).toBe('/ne/contact/thank-you')
    expect(successTarget('https://evil.test')).toBe('/contact/thank-you')
  })
  it('error goes back to a whitelisted form page with a code only', () => {
    expect(
      errorTarget(
        'https://tech.admmis.org/ne/contact',
        'https://tech.admmis.org',
        'validation_failed',
      ),
    ).toBe('/ne/contact?error=validation_failed')
    expect(
      errorTarget(
        'https://tech.admmis.org/rent/website',
        'https://tech.admmis.org',
        'rate_limited',
      ),
    ).toBe('/rent/website?error=rate_limited')
  })
  it('never redirects to another host or unknown page', () => {
    expect(errorTarget('https://evil.test/steal', 'https://tech.admmis.org', 'x')).toBe(
      '/contact?error=x',
    )
    expect(errorTarget('//evil.test', 'https://tech.admmis.org', 'x')).toBe('/contact?error=x')
    expect(errorTarget(null, 'https://tech.admmis.org', 'x')).toBe('/contact?error=x')
  })
})
