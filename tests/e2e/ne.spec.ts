import { expect, test } from '@playwright/test'

// T-306 (ADR-041). Needs a build with ENABLED_LOCALES=en,ne (deploy-time setting, static params).
// While the Nepali copy is not in src/messages/ne, /ne renders the EN fallback and is noindex.

test.describe('nepali homepage route', () => {
  test('/ne serves a page with lang=ne, one h1 and a self canonical', async ({ page }) => {
    const res = await page.goto('/ne')
    expect(res?.status()).toBe(200)
    await expect(page.locator('html')).toHaveAttribute('lang', 'ne')
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/ne$/)
  })

  test('EN homepage keeps lang=en and requests no Devanagari font file', async ({ page }) => {
    const fonts: string[] = []
    page.on('request', (r) => {
      if (/\.woff2?(\?|$)/.test(r.url())) fonts.push(r.url())
    })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    const css = await page.evaluate(() =>
      [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family),
    )
    expect(css.join(' ')).not.toMatch(/Mukta/i)
    expect(fonts.length).toBeGreaterThan(0) // the Latin file loads
  })

  test('unknown NE path is a real 404', async ({ request }) => {
    const res = await request.get('/ne/does-not-exist')
    expect(res.status()).toBe(404)
  })

  test('no horizontal scroll at 360 px on /ne', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 })
    await page.goto('/ne')
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(over).toBeLessThanOrEqual(0)
  })
})
