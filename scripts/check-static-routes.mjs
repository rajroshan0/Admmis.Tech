// CI gate (docs/ci-spec.md §9): every public (site) page must be prerendered (static/SSG/ISR), never
// rendered per request. Excluded: /api/*, Payload routes and the (preview) route group.
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

const nextDir = path.resolve('.next')
const appPaths = path.join(nextDir, 'server', 'app-paths-manifest.json')
const prerender = path.join(nextDir, 'prerender-manifest.json')
if (!existsSync(appPaths) || !existsSync(prerender)) {
  console.error('No .next build found. Run `pnpm build` first.')
  process.exit(2)
}

const pages = Object.keys(JSON.parse(readFileSync(appPaths, 'utf8'))).filter(
  (key) => key.startsWith('/(site)/') && key.endsWith('/page'),
)
const { routes, dynamicRoutes } = JSON.parse(readFileSync(prerender, 'utf8'))
const prerenderedSources = new Set([
  ...Object.values(routes).map((r) => r.srcRoute),
  ...Object.keys(dynamicRoutes),
])

// "/(site)/[locale]/services/page" -> "/[locale]/services"
const toRoute = (key) => key.replace('/(site)', '').replace(/\/page$/, '') || '/'

const dynamic = pages.map(toRoute).filter((route) => !prerenderedSources.has(route))
console.log(`${pages.length} (site) page(s) checked`)
if (pages.length === 0) {
  console.error('No (site) pages found: the check would pass vacuously.')
  process.exit(2)
}
if (dynamic.length > 0) {
  console.error(`Rendered per request (must be static or ISR): ${dynamic.join(', ')}`)
  console.error(
    'Look for cookies(), headers(), draftMode(), searchParams or dynamic = "force-dynamic" in (site).',
  )
  process.exit(1)
}
console.log('All public routes are prerendered.')
