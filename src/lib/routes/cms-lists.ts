// Case studies and blog posts, in the shape of the CMS fields (cases-spec §5, blog-spec §5).
// Both lists are empty at soft launch (no approved case, no article yet); the CMS swap replaces
// these two loaders with findPublished reads. Empty lists keep /work noindex-with-empty-state and
// /blog/[slug] and /work/[slug] with no static params (pm decision).
export type CaseCopy = {
  slug: string
  title: string
  summary: string
  client?: string
  industry?: string
  year?: string
  challenge?: string
  solution?: string
  result?: string
  metrics?: { value: string; label: string }[]
}

export type PostCopy = {
  slug: string
  title: string
  excerpt: string
  date?: string
  readTime?: string
  tag?: string
  body: string[]
}

export async function listCases(): Promise<CaseCopy[]> {
  return []
}

export async function listPosts(): Promise<PostCopy[]> {
  return []
}
