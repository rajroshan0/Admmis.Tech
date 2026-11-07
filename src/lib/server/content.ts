import type { CollectionSlug, Payload, Where } from 'payload'

// The frontend's only way to read content. Local API calls default to overrideAccess: true, so
// "published only" must be enforced here, explicitly (hritik review, T-404).
export const publishedWhere = (where?: Where): Where => ({
  and: [{ _status: { equals: 'published' } }, ...(where ? [where] : [])],
})

// Depth is always 0: with overrideAccess true, populating relations would leak never-published
// draft documents into a published one (hritik T-109). Resolve relations with `resolvePublished`.
export async function findPublished(
  payload: Payload,
  collection: CollectionSlug,
  opts: { where?: Where; locale?: 'en' | 'ne'; limit?: number } = {},
) {
  return payload.find({
    collection,
    draft: false,
    overrideAccess: true,
    where: publishedWhere(opts.where),
    locale: opts.locale,
    limit: opts.limit ?? 100,
    depth: 0,
  })
}

// Turns relation ids into published docs only; unpublished or missing ones are dropped, order kept.
export async function resolvePublished(
  payload: Payload,
  collection: CollectionSlug,
  ids: (number | string)[] | null | undefined,
  opts: { locale?: 'en' | 'ne' } = {},
) {
  if (!ids?.length) return []
  const { docs } = await findPublished(payload, collection, {
    where: { id: { in: ids } },
    locale: opts.locale,
    limit: ids.length,
  })
  const byId = new Map(docs.map((d) => [String(d.id), d]))
  return ids.map((id) => byId.get(String(id))).filter((d) => !!d)
}
