import { randomUUID } from 'node:crypto'

// Request helpers for the route: origin check, client IP, and the no-JS form-encoded mapping.
export function originAllowed(headers: Headers, allowedHosts: string[]): boolean {
  const site = headers.get('sec-fetch-site')
  if (site && !['same-origin', 'same-site', 'none'].includes(site)) return false
  const origin = headers.get('origin')
  if (!origin) return site === 'same-origin' || site === 'none'
  try {
    return allowedHosts.includes(new URL(origin).host)
  } catch {
    return false
  }
}

/** CF-Connecting-IP is trusted only behind Cloudflare (TRUSTED_PROXY=cloudflare). */
export function clientIp(headers: Headers, trustCloudflare: boolean): string {
  if (trustCloudflare) return headers.get('cf-connecting-ip') ?? 'unknown'
  // Rightmost entry: the one our own proxy appended. The leftmost is client-controlled.
  const parts = headers
    .get('x-forwarded-for')
    ?.split(',')
    .map((p) => p.trim())
    .filter(Boolean)
  return parts?.[parts.length - 1] || 'unknown'
}

/**
 * Maps a plain HTML form post to the JSON shape. Field names: the schema keys, plus
 * `consentContact` (checkbox), `policyVersion`, and `source.<key>`. Empty strings are dropped.
 */
export function formToLead(fd: FormData): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  const source: Record<string, string> = {}
  for (const [k, v] of fd.entries()) {
    if (typeof v !== 'string' || v === '') continue
    if (k === 'consentContact' || k === 'policyVersion') continue
    if (k.startsWith('source.')) source[k.slice(7)] = v
    else if (k === 'cf-turnstile-response') out.turnstileToken = v
    else out[k] = v
  }
  const consent = fd.get('consentContact')
  out.consent = {
    contact: consent === 'on' || consent === 'true',
    policyVersion: String(fd.get('policyVersion') ?? ''),
  }
  if (Object.keys(source).length) out.source = source
  // A plain form cannot send a key. Double-submit protection is then the 303 redirect plus rate limits.
  out.idempotencyKey ??= randomUUID()
  return out
}
