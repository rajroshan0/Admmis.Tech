import { createHmac } from 'node:crypto'

// Fixed-window counters (leads.md §5). Pure decision here; storage is injected so it is testable.
// HMAC with a server secret (IP_HASH_SALT): the raw IP is never stored or logged.
export const hashIp = (ip: string, secret: string): string =>
  createHmac('sha256', secret).update(ip).digest('hex')

export type Counts = { m10: number; h1: number; h24: number }
export type Verification = 'verified' | 'unverified-turnstile-unavailable' | 'unverified-no-js'

export const LIMITS = {
  normal: { m10: 5, h24: 20 },
  unverified: { h1: 3, h24: 5 }, // stricter while the spam check is missing; 3 because CGNAT shares IPs
} as const

/** Counts INCLUDE the current request. Returns Retry-After seconds, or 0 when allowed. */
export function retryAfter(c: Counts, v: Verification): number {
  if (c.m10 > LIMITS.normal.m10) return 600
  if (c.h24 > LIMITS.normal.h24) return 3600
  if (v !== 'verified') {
    if (c.h1 > LIMITS.unverified.h1) return 3600
    if (c.h24 > LIMITS.unverified.h24) return 3600
  }
  return 0
}

export const GLOBAL_PER_HOUR = 300
export const UNVERIFIED_BREAKER_PER_HOUR = 20 // TODO(roshan) confirm N (ADR-036 says 20)
