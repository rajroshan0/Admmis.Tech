import { getPayload } from 'payload'

import config from '@payload-config'

import { getLeadConfig } from './config'
import { handleLead, type Result } from './handle'
import { buildDeps } from './payload-deps'
import { hashIp } from './ratelimit'

// The one entry point for every submit path: JS fetch (route), server action, no-JS form post.
// Callers pass the raw (unvalidated) object; validation happens inside handleLead.
export async function submitLead(
  raw: unknown,
  o: { ip: string; userAgent: string; noJs: boolean },
): Promise<Result> {
  const cfg = getLeadConfig()
  const ipHash = o.ip === 'unknown' ? null : hashIp(o.ip, cfg.ipSalt)
  try {
    const payload = await getPayload({ config })
    const deps = buildDeps(payload, {
      ...cfg,
      ip: o.ip,
      ipHash: ipHash ?? '',
      userAgent: o.userAgent,
    })
    return await handleLead(deps, raw, { ipHash, noJs: o.noJs })
  } catch (e) {
    console.error(
      JSON.stringify({
        scope: 'leads',
        event: 'submit_failed',
        error: e instanceof Error ? e.name : 'unknown',
      }),
    ) // name only, no PII
    // Nothing was acknowledged; the form keeps the visitor's data.
    return {
      status: 503,
      body: {
        ok: false,
        code: 'storage_unavailable',
        message_key: 'leads.error.storage_unavailable',
        retryable: true,
        fallback: { whatsapp: true, phone: true },
      },
    }
  }
}
