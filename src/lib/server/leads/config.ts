import { z } from 'zod'

// Lead pipeline settings. Names are in .env.example. Secrets never leave the server.
const schema = z.object({
  TURNSTILE_SECRET_KEY: z.string().optional(),
  IP_HASH_SALT: z.string().default('dev-only-salt'),
  LEAD_ALLOWED_HOSTS: z.string().default('localhost:3000'),
  TRUSTED_PROXY: z.enum(['cloudflare', 'none']).default('none'),
})

export const getLeadConfig = () => {
  const e = schema.parse(process.env)
  if (process.env.NODE_ENV === 'production') {
    // Refuse to run with weak settings (hritik T-112): hashes and client IPs must be trustworthy.
    if (e.IP_HASH_SALT.length < 32 || e.IP_HASH_SALT === 'dev-only-salt')
      throw new Error('IP_HASH_SALT must be set (32+ characters) in production')
    if (e.TRUSTED_PROXY !== 'cloudflare')
      throw new Error('TRUSTED_PROXY must be "cloudflare" in production')
    if (!e.TURNSTILE_SECRET_KEY) throw new Error('TURNSTILE_SECRET_KEY must be set in production')
  }
  return {
    turnstileSecret: e.TURNSTILE_SECRET_KEY || undefined,
    ipSalt: e.IP_HASH_SALT,
    allowedHosts: e.LEAD_ALLOWED_HOSTS.split(',')
      .map((h) => h.trim())
      .filter(Boolean),
    trustCloudflare: e.TRUSTED_PROXY === 'cloudflare',
  }
}
