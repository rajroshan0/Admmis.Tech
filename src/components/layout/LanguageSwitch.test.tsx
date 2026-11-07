import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { LanguageSwitch } from './LanguageSwitch'

const items = [
  { locale: 'en', name: 'English', href: '/', current: true },
  { locale: 'ne', name: 'नेपाली', href: '/ne', current: false },
]

describe('LanguageSwitch', () => {
  it('renders lang, hreflang and aria-current on plain links', () => {
    const html = renderToStaticMarkup(<LanguageSwitch label="Language" items={items} />)
    expect(html).toContain('<nav aria-label="Language"')
    expect(html).toContain('lang="ne"')
    expect(html).toMatch(/hreflang="ne"/i)
    expect(html).toContain('aria-current="true"')
    expect(html.match(/aria-current/g)).toHaveLength(1)
    expect(html).toContain('नेपाली')
  })

  it('renders nothing for a single language', () => {
    expect(
      renderToStaticMarkup(<LanguageSwitch label="Language" items={items.slice(0, 1)} />),
    ).toBe('')
  })
})
