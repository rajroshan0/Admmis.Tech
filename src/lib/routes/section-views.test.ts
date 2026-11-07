import { describe, expect, it } from 'vitest'

import home from '@/messages/en/home.json'
import rent from '@/messages/en/rent.json'
import services from '@/messages/en/services.json'
import { buildRentProductView, rentSlugs } from './rent-view'
import { buildServiceView, buildServicesHubView, serviceSlugs } from './services-view'

describe('service and rent views', () => {
  it('lists the nine service and three rent slugs from the sitemap', () => {
    expect(serviceSlugs(home)).toHaveLength(9)
    expect(serviceSlugs(home)).toContain('web-development')
    expect(rentSlugs(home)).toEqual(['website', 'ai-agent', 'team'])
  })

  it('uses the brief SEO fields; every page is noindex until it is in COPY_READY', () => {
    const v = buildServiceView('en', 'web-development', home, services)
    expect(v?.seo.title).toBe('Web Development Company in Nepal | ADMMIS.TECH')
    expect(v?.seo.indexable).toBe(false)
    expect(v?.hero.heading).toBe(services.items['web-development'].heroHeading)
  })

  it('keeps pages without a brief noindex and falls back to the title for the H1', () => {
    const v = buildServiceView('en', 'audit', home, services)
    expect(v?.seo.indexable).toBe(false)
    expect(v?.hero.heading).toBe(home.services.cards[5]?.title)
    expect(buildRentProductView('en', 'team', home, rent)?.seo.indexable).toBe(false)
  })

  it('returns null for an unknown slug and links the hub to every service', () => {
    expect(buildServiceView('en', 'nope', home, services)).toBeNull()
    expect(buildServicesHubView('en', home, services).grid.items).toHaveLength(9)
  })
})
