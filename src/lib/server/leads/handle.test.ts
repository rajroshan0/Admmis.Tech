import { describe, expect, it, vi } from 'vitest'

import { HONEYPOT_FIELD } from '@/lib/schemas/lead'

import { devanagariToAscii, normalizePhone } from './normalize'
import { handleLead, type Deps } from './handle'

const valid = {
  name: 'Sita Rai',
  email: 'Sita@Example.com',
  message: 'We need a new website for our shop.',
  formKind: 'contact',
  locale: 'en',
  consent: { contact: true, policyVersion: '2026-12-01' },
  turnstileToken: 'tok',
  idempotencyKey: '3f9b2c1e-6f1d-4a6e-9a55-2d7b1f0c8e11',
}

const deps = (o: Partial<Deps> = {}): Deps => ({
  findByIdempotency: async () => null,
  hitRate: async () => ({ m10: 1, h1: 1, h24: 1 }),
  hitGlobal: async () => 1,
  countRecentByContact: async () => 0,
  countUnverifiedLastHour: async () => 0,
  verify: async () => 'valid',
  store: vi.fn(async () => {}),
  newPublicId: () => 'ld_test',
  log: vi.fn(),
  ...o,
})
const ctx = { ipHash: 'h', noJs: false }

describe('handleLead', () => {
  it('stores a valid lead and returns 201', async () => {
    const d = deps()
    const r = await handleLead(d, valid, ctx)
    expect(r.status).toBe(201)
    expect(r.body).toMatchObject({ ok: true, leadId: 'ld_test' })
    expect(d.store).toHaveBeenCalledWith(expect.objectContaining({ email: 'sita@example.com' }), {
      publicId: 'ld_test',
      verification: 'verified',
    })
  })
  it('honeypot looks like success and stores nothing', async () => {
    const d = deps()
    const r = await handleLead(d, { ...valid, [HONEYPOT_FIELD]: 'http://spam' }, ctx)
    expect(r.status).toBe(201)
    expect(d.store).not.toHaveBeenCalled()
  })
  it('rejects unknown keys and missing contact with field keys, no values echoed', async () => {
    const r = await handleLead(deps(), { ...valid, email: undefined, evil: 1 }, ctx)
    expect(r.status).toBe(400)
    expect(JSON.stringify(r.body)).not.toContain('Sita')
  })
  it('requires consent', async () => {
    const r = await handleLead(
      deps(),
      { ...valid, consent: { contact: false, policyVersion: 'x' } },
      ctx,
    )
    expect(r.status).toBe(400)
    expect((r.body.fields as Record<string, string>).consent).toBe('leads.field.consent_required')
  })
  it('replays on a known idempotency key without a second store', async () => {
    const d = deps({ findByIdempotency: async () => ({ publicId: 'ld_old' }) })
    const r = await handleLead(d, valid, ctx)
    expect(r.status).toBe(200)
    expect(r.headers).toEqual({ 'Idempotent-Replay': 'true' })
    expect(d.store).not.toHaveBeenCalled()
  })
  it('rate limits with Retry-After', async () => {
    const r = await handleLead(
      deps({ hitRate: async () => ({ m10: 6, h1: 6, h24: 6 }) }),
      valid,
      ctx,
    )
    expect(r.status).toBe(429)
    expect(r.headers?.['Retry-After']).toBe('600')
  })
  it('invalid Turnstile token is 403 and nothing is stored', async () => {
    const d = deps({ verify: async () => 'invalid' })
    expect((await handleLead(d, valid, ctx)).status).toBe(403)
    expect(d.store).not.toHaveBeenCalled()
  })
  it('Turnstile unreachable stores as unverified', async () => {
    const d = deps({ verify: async () => 'unreachable' })
    expect((await handleLead(d, valid, ctx)).status).toBe(201)
    expect(d.store).toHaveBeenCalledWith(expect.anything(), {
      publicId: 'ld_test',
      verification: 'unverified-turnstile-unavailable',
    })
  })
  it('misconfigured Turnstile stores the lead as unverified instead of rejecting it', async () => {
    const d = deps({ verify: async () => 'misconfigured' })
    expect((await handleLead(d, valid, ctx)).status).toBe(201)
    expect(d.log).toHaveBeenCalledWith('turnstile_misconfigured')
  })
  it('unknown IP skips per-IP limits', async () => {
    const d = deps({ hitRate: vi.fn() as never })
    expect((await handleLead(d, valid, { ipHash: null, noJs: false })).status).toBe(201)
    expect(d.hitRate).not.toHaveBeenCalled()
  })
  it('circuit breaker returns 503 with fallback', async () => {
    const d = deps({ verify: async () => 'unreachable', countUnverifiedLastHour: async () => 20 })
    const r = await handleLead(d, valid, ctx)
    expect(r.status).toBe(503)
    expect(r.body).toMatchObject({ code: 'verification_unavailable', fallback: { whatsapp: true } })
  })
  it('no-JS path without token is unverified-no-js and has the stricter limit', async () => {
    const noToken = { ...valid, turnstileToken: undefined }
    const d = deps()
    expect((await handleLead(d, noToken, { ...ctx, noJs: true })).status).toBe(201)
    expect(d.store).toHaveBeenCalledWith(expect.anything(), {
      publicId: 'ld_test',
      verification: 'unverified-no-js',
    })
    const strict = deps({ hitRate: async () => ({ m10: 4, h1: 4, h24: 4 }) })
    expect((await handleLead(strict, noToken, { ...ctx, noJs: true })).status).toBe(429)
  })
  it('fails open when the rate-limit store throws', async () => {
    const d = deps({
      hitRate: async () => {
        throw new Error('db')
      },
    })
    expect((await handleLead(d, valid, ctx)).status).toBe(201)
    expect(d.log).toHaveBeenCalledWith('ratelimit_store_failed')
  })
  it('JSON without a token is not allowed', async () => {
    const noToken = { ...valid, turnstileToken: undefined }
    expect((await handleLead(deps(), noToken, ctx)).status).toBe(403)
  })
  it('storage failure is 503 and not acknowledged', async () => {
    const d = deps({
      store: async () => {
        throw new Error('db')
      },
    })
    expect((await handleLead(d, valid, ctx)).body).toMatchObject({ code: 'storage_unavailable' })
  })
  it('suppresses the 4th contact in 24 h silently', async () => {
    const d = deps({ countRecentByContact: async () => 3 })
    expect((await handleLead(d, valid, ctx)).status).toBe(201)
    expect(d.store).not.toHaveBeenCalled()
  })
  it('accepts Devanagari digits in the phone field', async () => {
    const d = deps()
    await handleLead(d, { ...valid, email: undefined, phone: '९८४१२३४५६७' }, ctx)
    expect(d.store).toHaveBeenCalledWith(
      expect.objectContaining({ phone: '9841234567' }),
      expect.anything(),
    )
  })
})

describe('phone normalisation', () => {
  it('converts Devanagari digits', () => expect(devanagariToAscii('९८४१')).toBe('9841'))
  it('keeps +977 as E.164', () =>
    expect(normalizePhone('+977 98-4123 4567')).toBe('+9779841234567'))
  it('00 prefix becomes +', () => expect(normalizePhone('00977 9841234567')).toBe('+9779841234567'))
  it('rejects letters and short numbers', () => {
    expect(normalizePhone('abc12345678')).toBeNull()
    expect(normalizePhone('12345')).toBeNull()
  })
})
