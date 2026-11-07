export type TurnstileResult = 'valid' | 'invalid' | 'unreachable' | 'misconfigured'

type Opts = {
  secret: string
  remoteIp?: string
  expectedHosts: string[]
  timeoutMs?: number
  fetchImpl?: typeof fetch
}

/** Cloudflare siteverify. Invalid/expired/reused/missing token -> invalid. Timeout, network error, 5xx -> unreachable. */
export async function verifyTurnstile(token: string, o: Opts): Promise<TurnstileResult> {
  if (!o.secret) return 'misconfigured'
  if (!token) return 'invalid'
  const f = o.fetchImpl ?? fetch
  try {
    const body = new URLSearchParams({ secret: o.secret, response: token })
    if (o.remoteIp) body.set('remoteip', o.remoteIp)
    const res = await f('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(o.timeoutMs ?? 3000),
    })
    if (res.status >= 500) return 'unreachable'
    const json = (await res.json()) as {
      success?: boolean
      hostname?: string
      'error-codes'?: string[]
    }
    if (!json.success) {
      const codes = json['error-codes'] ?? []
      // Our own configuration is wrong: do not blame the visitor, do not reject real leads.
      if (
        codes.some((c) =>
          ['invalid-input-secret', 'missing-input-secret', 'internal-error'].includes(c),
        )
      )
        return 'misconfigured'
      return 'invalid'
    }
    if (json.hostname && o.expectedHosts.length && !o.expectedHosts.includes(json.hostname))
      return 'invalid'
    return 'valid'
  } catch {
    return 'unreachable'
  }
}
