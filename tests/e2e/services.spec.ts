import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

// T-805. Services templates (T-307). Every slug page is indexable once listed in COPY_READY (all 9 since T-308b).
const ROUTES = ['/services', ...['web-development', 'mobile-app-development', 'custom-software', 'ai-agents', 'qa-testing', 'audit', 'outstaffing', 'digital-marketing', 'offline-marketing'].map((s) => `/services/${s}`)]
const HUB = '/services'
const INDEXABLE = ROUTES // all nine slugs are in COPY_READY (T-308b)

for (const route of ROUTES) {
  test.describe(route, () => {
    test('200, one h1, canonical, no visible TODO text', async ({ page }) => {
      const res = await page.goto(route)
      expect(res?.status()).toBe(200)
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1)
      await expect(page.locator('main')).not.toContainText(/TODO|lorem ipsum|undefined|\[object/i)
    })

    test('robots: hub and all nine slugs indexable', async ({ page }) => {
      await page.goto(route)
      const robots = page.locator('meta[name="robots"]')
      if (route === HUB || INDEXABLE.includes(route)) await expect(robots).toHaveCount(0)
      else await expect(robots).toHaveAttribute('content', /noindex/)
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
