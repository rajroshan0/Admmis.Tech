import { getLeadConfig } from '@/lib/server/leads/config'
import { errorTarget, successTarget } from '@/lib/server/leads/redirect'
import { submitLead } from '@/lib/server/leads/submit'
import { clientIp, formToLead, originAllowed } from '@/lib/server/leads/request'

// POST /api/leads — contract: docs/api/leads.md. Never cached.
export const dynamic = 'force-dynamic'
const MAX_BYTES = 16 * 1024
const NO_STORE = { 'Cache-Control': 'no-store' }

const json = (status: number, body: unknown, headers: Record<string, string> = {}) =>
  Response.json(body, { status, headers: { ...NO_STORE, ...headers } })
const fail = (status: number, code: string) =>
  json(status, { ok: false, code, message_key: `leads.error.${code}`, retryable: false })

export async function POST(req: Request) {
  const cfg = getLeadConfig()
  if (!originAllowed(req.headers, cfg.allowedHosts)) return fail(403, 'origin_not_allowed')

  const type = req.headers.get('content-type') ?? ''
  const isForm =
    type.includes('application/x-www-form-urlencoded') || type.includes('multipart/form-data')
  if (!isForm && !type.includes('application/json')) return fail(415, 'unsupported_media_type')
  if (Number(req.headers.get('content-length') ?? 0) > MAX_BYTES)
    return fail(413, 'payload_too_large')

  const text = await req.text()
  if (text.length > MAX_BYTES) return fail(413, 'payload_too_large')

  let raw: unknown
  try {
    raw = isForm
      ? formToLead(
          await new Request(req.url, {
            method: 'POST',
            headers: { 'content-type': type },
            body: text,
          }).formData(),
        )
      : JSON.parse(text)
  } catch {
    return fail(400, 'invalid_json')
  }

  const ip = clientIp(req.headers, cfg.trustCloudflare)
  const result = await submitLead(raw, {
    ip,
    userAgent: req.headers.get('user-agent') ?? '',
    noJs: isForm,
  })

  if (isForm) {
    // Plain HTML form: 303 redirect, no personal data in the URL.
    const target = result.body.ok
      ? successTarget((raw as { locale?: unknown }).locale)
      : errorTarget(req.headers.get('referer'), req.url, String(result.body.code))
    return new Response(null, { status: 303, headers: { ...NO_STORE, Location: target } })
  }
  return json(result.status, result.body, result.headers)
}
