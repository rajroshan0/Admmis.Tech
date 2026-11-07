import { fieldErrors, HONEYPOT_FIELD, leadSchema, type LeadInput } from '@/lib/schemas/lead'

import {
  GLOBAL_PER_HOUR,
  retryAfter,
  UNVERIFIED_BREAKER_PER_HOUR,
  type Counts,
  type Verification,
} from './ratelimit'
import type { TurnstileResult } from './turnstile'

// Pipeline of docs/api/leads.md §3.1 with all I/O injected, so it is unit tested without a DB.
export type Deps = {
  findByIdempotency(key: string): Promise<{ publicId: string } | null>
  /** Increments the counters for this IP hash and returns them (including this request). */
  hitRate(ipHash: string): Promise<Counts>
  hitGlobal(): Promise<number>
  countRecentByContact(email?: string, phone?: string): Promise<number>
  countUnverifiedLastHour(): Promise<number>
  verify(token: string): Promise<TurnstileResult>
  /** One transaction: lead + email/chat jobs (+ crm job unless unverified). */
  store(lead: LeadInput, meta: { publicId: string; verification: Verification }): Promise<void>
  newPublicId(): string
  log(event: string, meta?: Record<string, string | number | boolean>): void
}

/** ipHash is null when the client IP is unknown: then nothing is rate limited per IP (one shared bucket would block everyone). */
export type Ctx = { ipHash: string | null; noJs: boolean }
export type Result = {
  status: number
  body: Record<string, unknown>
  headers?: Record<string, string>
}

const fallback = { whatsapp: true, phone: true }
const err = (
  status: number,
  code: string,
  extra: Record<string, unknown> = {},
  headers?: Record<string, string>,
): Result => ({
  status,
  headers,
  body: {
    ok: false,
    code,
    message_key: `leads.error.${code}`,
    retryable: status >= 500 || status === 429 || code === 'captcha_failed',
    ...extra,
  },
})
const success = (publicId: string, formKind?: string): Result => ({
  status: 201,
  body: {
    ok: true,
    leadId: publicId,
    next: { redirect: '/contact/thank-you', whatsapp: formKind !== 'event' },
  },
})

export async function handleLead(deps: Deps, raw: unknown, ctx: Ctx): Promise<Result> {
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) return err(400, 'invalid_json')

  // 3. Honeypot: look like success, store nothing.
  const hp = (raw as Record<string, unknown>)[HONEYPOT_FIELD]
  if (typeof hp === 'string' && hp.length > 0) {
    deps.log('honeypot_hit')
    return success(deps.newPublicId())
  }

  // 4. Validation
  const parsed = leadSchema.safeParse(raw)
  if (!parsed.success)
    return err(400, 'validation_failed', { fields: fieldErrors(parsed.error.issues) })
  const lead = parsed.data

  // 5. Idempotency (before rate limit and Turnstile: tokens are single use)
  const replay = await deps.findByIdempotency(lead.idempotencyKey)
  if (replay)
    return {
      ...success(replay.publicId, lead.formKind),
      status: 200,
      headers: { 'Idempotent-Replay': 'true' },
    }

  // 6. Rate limit (normal limits first, unverified limits once we know the state)
  // Fail open: a broken limiter must never lose a lead (hritik T-407).
  let counts: Counts = { m10: 0, h1: 0, h24: 0 }
  let global = 0
  try {
    if (ctx.ipHash) counts = await deps.hitRate(ctx.ipHash)
    else deps.log('ip_unknown')
    global = await deps.hitGlobal()
  } catch {
    deps.log('ratelimit_store_failed')
  }
  const wait = retryAfter(counts, 'verified')
  if (wait || global > GLOBAL_PER_HOUR) {
    deps.log('rate_limited')
    return err(429, 'rate_limited', { fallback }, { 'Retry-After': String(wait || 3600) })
  }

  // 7. Turnstile. No token is only acceptable on the no-JS form path.
  let verification: Verification = 'verified'
  if (ctx.noJs && !lead.turnstileToken) {
    verification = 'unverified-no-js'
  } else if (!lead.turnstileToken) {
    return err(403, 'captcha_failed')
  } else {
    const outcome = await deps.verify(lead.turnstileToken)
    if (outcome === 'invalid') return err(403, 'captcha_failed')
    if (outcome === 'misconfigured') {
      deps.log('turnstile_misconfigured')
      verification = 'unverified-turnstile-unavailable'
    } else if (outcome === 'unreachable') {
      deps.log('turnstile_unreachable')
      verification = 'unverified-turnstile-unavailable'
    }
  }
  if (verification !== 'verified') {
    const stricter = retryAfter(counts, verification)
    if (stricter) return err(429, 'rate_limited', { fallback }, { 'Retry-After': String(stricter) })
    if ((await deps.countUnverifiedLastHour()) >= UNVERIFIED_BREAKER_PER_HOUR) {
      deps.log('circuit_breaker_open')
      return err(503, 'verification_unavailable', { fallback })
    }
  }

  // Repeat contact: the 4th in 24 h looks like success but stores nothing.
  if ((await deps.countRecentByContact(lead.email, lead.phone)) >= 3) {
    deps.log('repeat_contact_suppressed')
    return success(deps.newPublicId(), lead.formKind)
  }

  // 8. Commit. Failure means nothing was acknowledged.
  const publicId = deps.newPublicId()
  try {
    await deps.store(lead, { publicId, verification })
  } catch {
    deps.log('storage_failed')
    return err(503, 'storage_unavailable', { fallback })
  }
  if (verification !== 'verified') deps.log('unverified_lead_stored', { verification })
  return success(publicId, lead.formKind)
}
