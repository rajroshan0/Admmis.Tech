import type { Payload } from 'payload'
import { describe, expect, it, vi } from 'vitest'

import { findPublished, publishedWhere, resolvePublished } from './content'

describe('findPublished', () => {
  it('always filters to published and disables drafts', async () => {
    const find = vi.fn().mockResolvedValue({ docs: [] })
    await findPublished({ find } as unknown as Payload, 'services', {
      where: { slug: { equals: 'web' } },
    })
    const args = find.mock.calls[0]![0]
    expect(args.draft).toBe(false)
    expect(args.where).toEqual({
      and: [{ _status: { equals: 'published' } }, { slug: { equals: 'web' } }],
    })
  })
  it('cannot be widened by the caller', () => {
    expect(publishedWhere().and?.[0]).toEqual({ _status: { equals: 'published' } })
  })
  it('never populates relations (depth 0)', async () => {
    const find = vi.fn().mockResolvedValue({ docs: [] })
    await findPublished({ find } as unknown as Payload, 'services')
    expect(find.mock.calls[0]![0].depth).toBe(0)
  })
  it('resolvePublished drops unpublished ids and keeps order', async () => {
    const find = vi.fn().mockResolvedValue({ docs: [{ id: 3 }, { id: 1 }] })
    const out = await resolvePublished({ find } as unknown as Payload, 'faqs', [1, 2, 3])
    expect(out.map((d) => d.id)).toEqual([1, 3])
    expect(find.mock.calls[0]![0].where.and[0]).toEqual({ _status: { equals: 'published' } })
    expect(await resolvePublished({ find } as unknown as Payload, 'faqs', [])).toEqual([])
  })
})
