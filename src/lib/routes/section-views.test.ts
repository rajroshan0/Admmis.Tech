import { describe, expect, it } from 'vitest'

import home from '@/messages/en/home.json'
import rent from '@/messages/en/rent.json'
import services from '@/messages/en/services.json'
import { buildRentProductView, rentSlugs } from './rent-view'
import { buildServiceView, buildServicesHubView, serviceSlugs } from './services-view'

describe('service and rent views', () => {
  it('lists the nine service and three rent slugs from the sitemap', () => {
    expect(serviceSlugs(home)).toHaveLength(9)
    expect(rentSlugs(home)).toEqual(['website', 'ai-agent', 'team'])
  })

  it('indexes all nine service pages and no rent product page', () => {
    const indexable = serviceSlugs(home).filter(
      (s) => buildServiceView('en', s, home, services)?.seo.indexable,
    )
    expect(indexable).toHaveLength(9)
    for (const s of rentSlugs(home)) {
      expect(buildRentProductView('en', s, home, rent)?.seo.indexable).toBe(false)
    }
  })

  it('uses the synced H1 and never leaks TODO text into any page', () => {
    const v = buildServiceView('en', 'web-development', home, services)
    expect(v?.hero.heading).toBe('Web development in Nepal: fast websites that bring customers')
    expect(JSON.stringify([services, rent])).not.toContain('TODO')
  })

  it('returns null for an unknown slug and links the hub to every service', () => {
    expect(buildServiceView('en', 'nope', home, services)).toBeNull()
    expect(buildServicesHubView('en', home, services).grid.items).toHaveLength(9)
  })
})
