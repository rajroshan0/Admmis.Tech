import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidateContent } from '@/lib/server/revalidate'

// Only published content (or a change away from published) can alter the live site.
export const revalidateAfterChange =
  (
    collection: string,
    extra?: (doc: Record<string, unknown>) => string[],
  ): CollectionAfterChangeHook =>
  async ({ doc, previousDoc }) => {
    if (doc._status === 'published' || previousDoc?._status === 'published') {
      await revalidateContent(collection, doc.slug, extra?.(doc))
    }
    return doc
  }

export const revalidateAfterDelete =
  (collection: string): CollectionAfterDeleteHook =>
  async ({ doc }) => {
    await revalidateContent(collection, doc.slug)
  }
