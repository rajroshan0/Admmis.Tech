import { brand } from '@/brands/admmis-tech/brand'

// Placeholder home page: no user-facing copy beyond the brand name (copy comes from the CMS, later).
export default function HomePage() {
  return (
    <main>
      <h1>{brand.name}</h1>
    </main>
  )
}
