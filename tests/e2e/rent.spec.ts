import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

// T-805. Rent templates (T-307). Placeholder copy by design; every slug page is noindex until listed in COPY_READY.
const ROUTES = ['/rent','/rent/website','/rent/ai-agent','/rent/team']
const HUB = '/rent'

for (const route of ROUTES) {
  test.describe(route, () => {
    test('200, one h1, canonical, no visible TODO text', async ({ page }) => {
      const res = await page.goto(route)
      expect(res?.status()).toBe(200)
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1)
      await expect(page.locator('main')).not.toContainText(/TODO|lorem ipsum|undefined|\[object/i)
    })

    test('robots: hub indexable, rent slugs noindex', async ({ page }) => {
      if (route === HUB) { await page.goto(route); await expect(page.locator('meta[name="robots"]')).toHaveCount(0); return }
      await page.goto(route)
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
    })

    test('axe: no violations (WCAG 2.2 AA)', async ({ page }) => {
      await page.goto(route)
      const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze()
      expect(r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`)).toEqual([])
    })

    test('no horizontal scroll at 360 px', async ({ page }) => {
      await page.setViewportSize({ width: 360, height: 740 })
      await page.goto(route)
      const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(over).toBeLessThanOrEqual(0)
    })
  })
}
