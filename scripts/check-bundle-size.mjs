// CI gate (docs/ci-spec.md §4): first-load JS of every prerendered public route must be <= 150 KB gzip.
// Next 16 (Turbopack) no longer prints per-route sizes and has no app-build-manifest.json, so this reads the
// <script src> tags of each prerendered HTML file (the files a browser really downloads on first load).
// `noModule` polyfills are skipped: modern browsers do not fetch them.
// KB here is 1000 bytes (the stricter reading of the budget).
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { gzipSync } from 'node:zlib'

const BUDGET_BYTES = 150_000
const nextDir = path.resolve('.next')
const manifestPath = path.join(nextDir, 'prerender-manifest.json')
if (!existsSync(manifestPath)) {
  console.error('No .next build found. Run `pnpm build` first.')
  process.exit(2)
}

const { routes } = JSON.parse(readFileSync(manifestPath, 'utf8'))
const gzipSize = (file) => gzipSync(readFileSync(file)).length

const rows = []
for (const [route, info] of Object.entries(routes)) {
  // Public content routes only: skip Next internals (/_not-found, /_global-error) and Payload.
  if (route.startsWith('/_') || route.startsWith('/admin') || info.routeType !== 'page') continue
  const htmlFile = path.join(
    nextDir,
    'server',
    'app',
    route === '/' ? 'index.html' : `${route}.html`,
  )
  if (!existsSync(htmlFile)) continue
  const html = readFileSync(htmlFile, 'utf8')
  const scripts = [...html.matchAll(/<script\b[^>]*>/g)]
    .map((m) => m[0])
    .filter((tag) => !/\bnoModule\b/i.test(tag))
    .map((tag) => /\bsrc="([^"]+\.js)[^"]*"/.exec(tag)?.[1])
    .filter(Boolean)
  const unique = [...new Set(scripts)]
  const bytes = unique.reduce(
    (sum, src) => sum + gzipSize(path.join(nextDir, src.replace(/^\/_next\//, ''))),
    0,
  )
  rows.push({ route, files: unique.length, bytes })
}

if (rows.length === 0) {
  console.error('No public routes found to measure.')
  process.exit(2)
}

let failed = false
console.log('route'.padEnd(40), 'files', 'gzip KB', 'budget')
for (const { route, files, bytes } of rows.sort((a, b) => b.bytes - a.bytes)) {
  const over = bytes > BUDGET_BYTES
  failed ||= over
  console.log(
    route.padEnd(40),
    String(files).padStart(5),
    (bytes / 1000).toFixed(1).padStart(7),
    over ? 'OVER' : 'ok',
  )
}
if (failed) {
  console.error(`First-load JS above ${BUDGET_BYTES / 1000} KB gzip on at least one route.`)
  process.exit(1)
}
