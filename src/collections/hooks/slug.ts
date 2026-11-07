import type { CollectionAfterChangeHook, CollectionBeforeChangeHook, Field } from 'payload'

// Slugs are English, lowercase, hyphenated, not localized. Pages may nest one level (rent/website).
const SEGMENT = '[a-z0-9]+(?:-[a-z0-9]+)*'
export const slugPattern = (nested: boolean) =>
  new RegExp(nested ? `^${SEGMENT}(?:/${SEGMENT})?$` : `^${SEGMENT}$`)

export const slugFields = (nested = false): Field[] => [
  {
    name: 'slug',
    type: 'text',
    required: true,
    unique: true,
    index: true,
    admin: {
      position: 'sidebar',
      description: nested
        ? 'The web address, English, lowercase, hyphens. One level of nesting allowed, for example rent/website. Use "home" for the homepage.'
        : 'The web address, English, lowercase, hyphens only. It is locked after publishing.',
    },
    validate: (value: unknown) =>
      typeof value === 'string' && slugPattern(nested).test(value)
        ? true
        : 'Use lowercase English letters, numbers and hyphens only.',
  },
  {
    name: 'confirmSlugChange',
    type: 'checkbox',
    defaultValue: false,
    admin: {
      position: 'sidebar',
      description: 'Tick only if you understand the old web address will redirect to the new one.',
      condition: (data) => !!data?.id,
    },
  },
]

// Pure rule so it can be unit tested without Payload.
export const slugChangeBlocked = (o: {
  prevSlug?: string
  nextSlug?: string
  prevStatus?: string
  confirmed?: boolean
}) =>
  !!o.prevSlug &&
  o.prevStatus === 'published' &&
  !!o.nextSlug &&
  o.nextSlug !== o.prevSlug &&
  !o.confirmed

export const lockSlug: CollectionBeforeChangeHook = ({ data, originalDoc, operation }) => {
  if (operation !== 'update' || !originalDoc) return data
  if (
    slugChangeBlocked({
      prevSlug: originalDoc.slug,
      nextSlug: data.slug,
      prevStatus: originalDoc._status,
      confirmed: data.confirmSlugChange,
    })
  ) {
    throw new Error(
      'This page is published, so its web address is locked. Tick "I understand the URL will change" to change it.',
    )
  }
  return { ...data, confirmSlugChange: false }
}

// Writes the old path to `redirects` when a published slug changes.
export const redirectOnSlugChange =
  (prefix: string): CollectionAfterChangeHook =>
  async ({ doc, previousDoc, operation, req }) => {
    if (operation !== 'update' || !previousDoc?.slug || previousDoc._status !== 'published')
      return doc
    if (doc.slug === previousDoc.slug || doc._status !== 'published') return doc
    const path = (slug: string) => (slug === 'home' ? '/' : `${prefix}/${slug}`)
    await req.payload.create({
      collection: 'redirects',
      data: { from: path(previousDoc.slug), to: path(doc.slug), status: '301', auto: true },
      req,
    })
    return doc
  }
