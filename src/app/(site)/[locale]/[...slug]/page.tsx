import { notFound } from 'next/navigation'

// Catch-all for URLs without a page yet. Real pages and the redirects lookup arrive with the
// template routes (templates-and-routes.md §7); until then every unknown path is a real 404.
export function generateStaticParams() {
  return []
}

export default function UnknownPage() {
  notFound()
}
