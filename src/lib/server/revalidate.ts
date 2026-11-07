// Tag revalidation for published content (content-model §1). Payload never calls the frontend over HTTP.
// next/cache is imported lazily so Payload CLI commands (generate:types, migrate) work outside Next.
export const tagsFor = (collection: string, slug?: string | null): string[] => [
  `collection:${collection}`,
  ...(slug ? [`doc:${collection}:${slug}`] : []),
]

export async function revalidateContent(
  collection: string,
  slug?: string | null,
  extraTags: string[] = [],
) {
  try {
    const { revalidateTag } = await import('next/cache')
    for (const tag of [...tagsFor(collection, slug), ...extraTags]) revalidateTag(tag, 'max')
  } catch {
    // Outside a Next runtime (CLI, tests) there is nothing to revalidate.
  }
}
