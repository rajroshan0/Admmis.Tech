import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

// T-803. Day-1 homepage. Contracts: content/pages/home.md, design/homepage/home-spec.md, qa/test-plan.md.
// Known failures are marked test.fail() with their bug id, so CI stays green now and goes red
// ("expected to fail but passed") the moment the bug is fixed and the marker must be removed.

const MOBILE = { width: 360, height: 740 }
const TABLET = { width: 768, height: 1024 }
const DESKTOP = { width: 1280, height: 800 }

// Routes the homepage links to that do not exist yet (Sprint 2+). Shrink this list as pages land.
// Anything else that 404s fails the link test.
const FUTURE_ROUTES = [
  '/services', '/rent', '/pricing', '/work', '/about', '/contact', '/opening-event',
  '/careers', '/blog', '/privacy', '/terms', '/cookies',
  '/services/web-development', '/services/mobile-app-development', '/services/custom-software',
  '/services/ai-agents', '/services/qa-testing', '/services/audit', '/services/outstaffing',
  '/services/digital-marketing', '/services/offline-marketing',
  '/rent/website', '/rent/ai-agent', '/rent/team',
]

/** Reads `- field: value` lines from content/pages/home.md into a map keyed "section.field". */
function homeCopy(): Record<string, string> {
  const md = readFileSync(join(process.cwd(), 'content/pages/home.md'), 'utf8')
  const out: Record<string, string> = {}
  let section = ''
  for (const line of md.split('\n')) {
    const h = /^## (\w+)/.exec(line)
    if (h) section = h[1]!
    const f = /^- ([\w[\].]+): (.*)$/.exec(line)
    if (f) out[`${section}.${f[1]}`] = f[2]!
  }
  return out
}

async function focusRingMissing(page: Page): Promise<string[]> {
  // Tab through the whole page; report stops with no outline on the element or its stretched-link ::after.
  const missing: string[] = []
  await page.locator('body').click({ position: { x: 1, y: 1 } })
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press('Tab')
    const r = await page.evaluate(() => {
      const e = document.activeElement as HTMLElement | null
      if (!e || e === document.body) return null
      const visible = (cs: CSSStyleDeclaration) => cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0
      const own = visible(getComputedStyle(e))
      const after = visible(getComputedStyle(e, '::after'))
      // The ring is only useful if no ancestor clips it.
      let clipped = false
      if (!own && after) {
        for (let p = e.parentElement; p; p = p.parentElement) {
          if (getComputedStyle(p).overflow !== 'visible') { clipped = true; break }
        }
      }
      return { label: (e.textContent || e.getAttribute('aria-label') || e.tagName).trim().slice(0, 40), ok: (own || after) && !clipped }
    })
    if (!r) break
    if (!r.ok) missing.push(r.label)
  }
  return missing
}

test.describe('home: structure and content', () => {
  test.use({ viewport: DESKTOP })

  test('title, description, language, one h1, heading order', async ({ page }) => {
    const c = homeCopy()
    await page.goto('/')
    await expect(page).toHaveTitle(c['meta.title'] ?? 'Software Development Company in Nepal | ADMMIS.TECH')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /ADMMIS\.TECH builds websites, apps and AI agents in Nepal/)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toHaveText(c['hero.headline']!)
    const levels = await page.$$eval('h1,h2,h3,h4', (els) => els.map((e) => Number(e.tagName[1])))
    levels.forEach((lvl, i) => {
      if (i > 0) expect(lvl - levels[i - 1]!, `heading ${i} jumps a level`).toBeLessThanOrEqual(1)
    })
  })

  test('landmarks: header, labelled nav, one main, footer', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('header').first()).toBeVisible()
    await expect(page.locator('main')).toHaveCount(1)
    await expect(page.locator('footer')).toHaveCount(1)
    await expect(page.locator('nav[aria-label]').first()).toBeVisible()
  })

  test('copy matches content/pages/home.md (hero, services, rent, why us, process, final CTA)', async ({ page }) => {
    const c = homeCopy()
    await page.goto('/')
    const body = (await page.locator('main').innerText()).replace(/\s+/g, ' ')
    const keys = Object.keys(c).filter((k) =>
      /^(hero\.(eyebrow|headline|subheadline|ctaPrimary|ctaSecondary)|services\.(title|intro|cards\[\d\]\.(title|text))|rent\.(title|intro|cards\[\d\]\.(title|text))|whyUs\.(title|points\[\d\]\.(title|text))|process\.(title|steps\[\d\]\.(title|text))|pricingTeaser\.(title|text)|event\.(title|text)|finalCta\.(title|text))$/.test(k),
    )
    expect(keys.length).toBeGreaterThan(40)
    for (const k of keys) {
      // eyebrows are upper-cased by CSS and innerText follows CSS, so compare case-insensitively
      expect(body.toLowerCase(), `missing copy ${k}`).toContain(c[k]!.toLowerCase())
    }
  })

  test('no TODO text, no PAN, no placeholders, no pending FAQ answers', async ({ page }) => {
    await page.goto('/')
    const text = await page.locator('body').innerText()
    expect(text).not.toMatch(/TODO|TBD|lorem ipsum|undefined|\[object/i)
    expect(text).not.toMatch(/\b\d{9,12}\b/) // PAN or phone numbers must not appear until Roshan confirms
    expect(text).not.toMatch(/\bPAN\b/)
    // FAQ with an unconfirmed answer is hidden: only the three confirmed questions are shown.
    await expect(page.locator('details')).toHaveCount(3)
  })

  test('images have alt text, hero is eager and sized', async ({ page }) => {
    await page.goto('/')
    const imgs = await page.$$eval('img', (els) => els.map((i) => ({ alt: i.getAttribute('alt'), loading: i.loading, w: i.getAttribute('width'), h: i.getAttribute('height') })))
    for (const i of imgs) expect(i.alt, 'img without alt').toBeTruthy()
    const hero = page.locator('main img').first()
    await expect(hero).toHaveAttribute('alt', homeCopy()['hero.imageAlt']!)
    await expect(hero).not.toHaveAttribute('loading', 'lazy')
    await expect(hero).toHaveAttribute('width', /\d+/)
    await expect(hero).toHaveAttribute('height', /\d+/)
  })

  test('internal links: only known future routes may 404', async ({ page, request }) => {
    await page.goto('/')
    const hrefs = [...new Set(await page.$$eval('a[href^="/"]', (as) => as.map((a) => a.getAttribute('href')!)))]
    const unexpected: string[] = []
    for (const h of hrefs) {
      const res = await request.get(h, { maxRedirects: 0 })
      if (h === '/faq') continue // covered by the BUG-003 test below
      if (res.status() >= 400 && !FUTURE_ROUTES.includes(h)) unexpected.push(`${h} -> ${res.status()}`)
    }
    expect(unexpected, 'unexpected broken links').toEqual([])
  })

  // BUG-003: footer links to /faq, which ADR-029 says will not exist. Passes (flips) when the link is removed.
  test.fail('no link to /faq (ADR-029) [BUG-003]', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('a[href="/faq"]')).toHaveCount(0)
  })
})

test.describe('home: layout', () => {
  for (const vp of [{ name: '360', ...MOBILE }, { name: '768', ...TABLET }, { name: '1280', ...DESKTOP }]) {
    test(`no horizontal page scroll at ${vp.name} px`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      await page.goto('/')
      const { sw, cw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }))
      expect(sw).toBeLessThanOrEqual(cw)
    })
  }

  test('sticky action bar shows below 768 px only', async ({ page }) => {
    const bar = page.locator('div.fixed.bottom-0:not([role="region"])').filter({ hasText: 'Get a quote' })
    await page.setViewportSize(MOBILE)
    await page.goto('/')
    await expect(bar).toBeVisible()
    await page.setViewportSize(TABLET)
    await expect(bar).toBeHidden()
    await page.setViewportSize(DESKTOP)
    await expect(bar).toBeHidden()
  })

  test('burger below 1024 px, full nav from 1024 px', async ({ page }) => {
    const burger = page.locator('header button[aria-expanded]')
    await page.setViewportSize({ width: 1023, height: 800 })
    await page.goto('/')
    await expect(burger).toBeVisible()
    await page.setViewportSize({ width: 1024, height: 800 })
    await expect(burger).toBeHidden()
    await expect(page.locator('header nav a', { hasText: 'Pricing' })).toBeVisible()
  })

  test('reduced motion: no transitions or animations', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    const moving = await page.evaluate(() =>
      [...document.querySelectorAll('*')].filter((e) => {
        const cs = getComputedStyle(e)
        return parseFloat(cs.transitionDuration) > 0.011 || parseFloat(cs.animationDuration) > 0.011
      }).length,
    )
    expect(moving).toBe(0)
  })
})

test.describe('home: keyboard', () => {
  test('skip link is the first tab stop and moves focus to main', async ({ page }) => {
    await page.setViewportSize(DESKTOP)
    await page.goto('/')
    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: /skip to main content/i })
    await expect(skip).toBeFocused()
    await expect(skip).toBeVisible()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/#main$/)
  })

  // BUG-001: case cards clip their focus ring. Remove test.fail when fixed.
  test.fail('every tab stop shows a visible focus ring, 1280 px [BUG-001]', async ({ page }) => {
    await page.setViewportSize(DESKTOP)
    await page.goto('/')
    expect(await focusRingMissing(page)).toEqual([])
  })

  test('mobile menu: opens, traps focus, Escape closes and returns focus to the button', async ({ page }) => {
    await page.setViewportSize(MOBILE)
    await page.goto('/')
    const burger = page.locator('header button[aria-expanded]')
    await expect(burger).toHaveAttribute('aria-expanded', 'false')
    await burger.focus()
    await page.keyboard.press('Enter')
    await expect(burger).toHaveAttribute('aria-expanded', 'true')
    const panelId = (await burger.getAttribute('aria-controls')) ?? ''
    const panel = page.locator(`[id="${panelId}"]`)
    await expect(panel.getByRole('link', { name: 'Services' })).toBeVisible()
    // Focus stays inside the panel (or the close button) for a full cycle of Tab presses.
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab')
      const inside = await page.evaluate((id) => {
        const a = document.activeElement
        return !!a && (document.getElementById(id)?.contains(a) || a.closest('header') !== null)
      }, panelId)
      expect(inside, `focus escaped the menu on Tab ${i + 1}`).toBe(true)
    }
    await page.keyboard.press('Escape')
    await expect(burger).toHaveAttribute('aria-expanded', 'false')
    await expect(burger).toBeFocused()
  })

  test('FAQ: native details, first open, one at a time, Enter and Space toggle', async ({ page }) => {
    await page.setViewportSize(MOBILE)
    await page.goto('/')
    const items = page.locator('details')
    await expect(items.first()).toHaveJSProperty('open', true)
    const second = items.nth(1).locator('summary')
    await second.focus()
    await page.keyboard.press('Enter')
    await expect(items.nth(1)).toHaveJSProperty('open', true)
    await expect(items.first()).toHaveJSProperty('open', false)
    await page.keyboard.press('Space')
    await expect(items.nth(1)).toHaveJSProperty('open', false)
  })
})

test.describe('home: accessibility (axe, WCAG 2.2 AA)', () => {
  for (const vp of [{ name: '360', ...MOBILE }, { name: '1280', ...DESKTOP }]) {
    test(`no axe violations at ${vp.name} px`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      await page.goto('/')
      const res = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze()
      expect(res.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([])
    })
  }

  // BUG-009: axe best-practice "region" on the sticky bar at 360 px.
  test.fail('best-practice rules clean at 360 px [BUG-009]', async ({ page }) => {
    await page.setViewportSize(MOBILE)
    await page.goto('/')
    const res = await new AxeBuilder({ page }).withTags(['best-practice']).analyze()
    expect(res.violations.map((v) => v.id)).toEqual([])
  })
})
