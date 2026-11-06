import { z } from 'zod'

// Single source of truth for environment variables (standards §3).
// Parsed lazily so `next build` can run with dummy values from .env.ci and so
// importing this file never touches secrets in client bundles. Errors list names, never values.

const csv = z
  .string()
  .default('en')
  .transform((v) =>
    v
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  )
  .pipe(z.array(z.enum(['en', 'ne'])).min(1))

const serverSchema = z.object({
  DATABASE_URL: z.string().min(1),
  PAYLOAD_SECRET: z.string().min(32),
  BRAND: z.string().min(1).default('admmis-tech'),
  ENABLED_LOCALES: csv,
  NEXT_PUBLIC_SITE_URL: z.url(),
  BUILD_SHA: z.string().default('dev'),
  // Optional until the feature that needs them lands (neha, raj)
  R2_ACCOUNT_ID: z.string().optional(),
  R2_BUCKET: z.string().optional(),
  R2_ACCESS_KEY_ID: z.string().optional(),
  R2_SECRET_ACCESS_KEY: z.string().optional(),
})

export type ServerEnv = z.infer<typeof serverSchema>

export function parseServerEnv(source: Record<string, string | undefined>): ServerEnv {
  const result = serverSchema.safeParse(source)
  if (!result.success) {
    const names = [...new Set(result.error.issues.map((i) => i.path.join('.')))]
    throw new Error(`Invalid environment variables: ${names.join(', ')}`)
  }
  return result.data
}

let cached: ServerEnv | undefined

/** Server-side only. Call from server code, never from a client component. */
export function getServerEnv(): ServerEnv {
  cached ??= parseServerEnv(process.env)
  return cached
}
