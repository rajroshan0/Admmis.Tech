import bundleAnalyzer from '@next/bundle-analyzer'
import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const withAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig: NextConfig = {
  output: 'standalone', // TODO(hritik): confirm outputFileTracingIncludes needs for Payload + sharp from a real build
  poweredByHeader: false,
  agentRules: false, // ADR-034: stop `next dev` writing the managed block into AGENTS.md
  images: { formats: ['image/avif', 'image/webp'] },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      // BUG-007: prerendered HTML defaults to s-maxage=1 year. Keep the edge copy short so a deploy
      // or CMS edit shows within minutes even if Cloudflare is set to cache HTML.
      {
        source: '/((?!_next/|api/|admin|.*\\..*).*)',
        headers: [{ key: 'Cache-Control', value: HTML_CACHE_CONTROL }],
      },
    ]
  },
}

const HTML_CACHE_CONTROL = 'public, max-age=0, s-maxage=300, stale-while-revalidate=3600'

// BUG-002: withPayload adds Accept-CH, Vary and Critical-CH (Sec-CH-Prefers-Color-Scheme) to every
// path. Critical-CH makes Chrome restart the first request (~600 ms of LCP). Only the admin UI
// uses the hint (theme detection), so keep it there and strip it from the public site.
const CLIENT_HINT_HEADERS = new Set(['accept-ch', 'vary', 'critical-ch'])
const withPayloadConfig = withPayload(nextConfig)
const payloadHeaders = withPayloadConfig.headers
withPayloadConfig.headers = async () => {
  const rules = (await payloadHeaders?.()) ?? []
  return rules.flatMap((rule) => {
    const hints = rule.headers.filter((h) => CLIENT_HINT_HEADERS.has(h.key.toLowerCase()))
    if (hints.length === 0) return [rule]
    const rest = rule.headers.filter((h) => !CLIENT_HINT_HEADERS.has(h.key.toLowerCase()))
    return [
      ...(rest.length > 0 ? [{ ...rule, headers: rest }] : []),
      { source: '/admin/:path*', headers: hints },
    ]
  })
}

export default withAnalyzer(withPayloadConfig)
