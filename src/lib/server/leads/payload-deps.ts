import { randomUUID } from 'node:crypto'

import type { Payload, PayloadRequest, Where } from 'payload'

import { HONEYPOT_FIELD } from '@/lib/schemas/lead'

import type { Deps } from './handle'
import { verifyTurnstile } from './turnstile'

// Binds the pure pipeline (handle.ts) to Payload/Postgres. Needs a database, so it is verified once Docker exists (C1).
const MIN = 60_000
const HOUR = 60 * MIN

export function buildDeps(
  payload: Payload,
  o: {
    turnstileSecret?: string
    allowedHosts: string[]
    ip: string
    userAgent: string
    ipHash: string
  },
): Deps {
  const bump = async (key: string, ttlMs: number): Promise<number> => {
    const existing = await payload.find({
      collection: 'leadRateLimits',
      where: { key: { equals: key } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
    const row = existing.docs[0]
    if (row) {
      const next = row.count + 1
      await payload.update({
        collection: 'leadRateLimits',
        id: row.id,
        data: { count: next },
        overrideAccess: true,
      })
      return next
    }
    await payload.create({
      collection: 'leadRateLimits',
      data: { key, count: 1, expiresAt: new Date(Date.now() + ttlMs).toISOString() },
      overrideAccess: true,
    })
    return 1
  }
  const bucket = (ms: number) => Math.floor(Date.now() / ms)
  const since = (ms: number) => new Date(Date.now() - ms).toISOString()

  return {
    async findByIdempotency(key) {
      const r = await payload.find({
        collection: 'leads',
        where: { idempotencyKey: { equals: key } },
        limit: 1,
        depth: 0,
        overrideAccess: true,
      })
      return r.docs[0] ? { publicId: r.docs[0].publicId } : null
    },
    async hitRate(ipHash) {
      const [m10, h1, h24] = await Promise.all([
        bump(`${ipHash}:m10:${bucket(10 * MIN)}`, 10 * MIN),
        bump(`${ipHash}:h1:${bucket(HOUR)}`, HOUR),
        bump(`${ipHash}:h24:${bucket(24 * HOUR)}`, 24 * HOUR),
      ])
      return { m10, h1, h24 }
    },
    hitGlobal: () => bump(`global:h1:${bucket(HOUR)}`, HOUR),
    async countRecentByContact(email, phone) {
      const or: Where[] = []
      if (email) or.push({ email: { equals: email } })
      if (phone) or.push({ phone: { equals: phone } })
      if (!or.length) return 0
      const r = await payload.count({
        collection: 'leads',
        where: { and: [{ createdAt: { greater_than: since(24 * HOUR) } }, { or }] },
        overrideAccess: true,
      })
      return r.totalDocs
    },
    async countUnverifiedLastHour() {
      const r = await payload.count({
        collection: 'leads',
        where: {
          and: [
            { createdAt: { greater_than: since(HOUR) } },
            { verification: { not_equals: 'verified' } },
          ],
        },
        overrideAccess: true,
      })
      return r.totalDocs
    },
    verify: (token) =>
      verifyTurnstile(token, {
        secret: o.turnstileSecret ?? '',
        remoteIp: o.ip === 'unknown' ? undefined : o.ip,
        expectedHosts: o.allowedHosts.map((h) => h.split(':')[0]!),
      }),
    async store(lead, meta) {
      const txID = await payload.db.beginTransaction()
      const req = { payload, transactionID: txID ?? undefined } as unknown as PayloadRequest
      try {
        const { consent, source, idempotencyKey, ...rest } = lead
        delete (rest as Record<string, unknown>).turnstileToken
        delete (rest as Record<string, unknown>)[HONEYPOT_FIELD]
        const created = await payload.create({
          collection: 'leads',
          overrideAccess: true,
          req,
          data: {
            ...rest,
            publicId: meta.publicId,
            idempotencyKey,
            source,
            consent: {
              contactConsent: consent.contact,
              policyVersion: consent.policyVersion,
              consentAt: new Date().toISOString(),
            },
            verification: meta.verification,
            status: 'new',
            ipHash: o.ipHash,
            userAgent: o.userAgent.slice(0, 200),
          },
        })
        // CRM only for verified leads: sales promotes an unverified one by hand (leads.md §4).
        const channels =
          meta.verification === 'verified'
            ? (['email', 'chat', 'crm'] as const)
            : (['email', 'chat'] as const)
        for (const channel of channels) {
          await payload.create({
            collection: 'leadJobs',
            overrideAccess: true,
            req,
            data: {
              lead: created.id,
              channel,
              status: 'pending',
              attempts: 0,
              nextAttemptAt: new Date().toISOString(),
            },
          })
        }
        if (txID) await payload.db.commitTransaction(txID)
      } catch (e) {
        if (txID) await payload.db.rollbackTransaction(txID)
        throw e
      }
    },
    newPublicId: () => `ld_${randomUUID().replace(/-/g, '').slice(0, 20)}`,
    log: (event, meta) => console.warn(JSON.stringify({ scope: 'leads', event, ...meta })), // no PII
  }
}
