import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { getServerEnv } from './lib/env'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const env = getServerEnv()

// Media goes to Cloudflare R2 only when all R2 vars are set; local disk otherwise (dev).
const r2 =
  env.R2_ACCOUNT_ID && env.R2_BUCKET && env.R2_ACCESS_KEY_ID && env.R2_SECRET_ACCESS_KEY
    ? s3Storage({
        collections: { media: true },
        bucket: env.R2_BUCKET,
        config: {
          region: 'auto',
          endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
          credentials: {
            accessKeyId: env.R2_ACCESS_KEY_ID,
            secretAccessKey: env.R2_SECRET_ACCESS_KEY,
          },
        },
      })
    : null

export default buildConfig({
  admin: { user: Users.slug, importMap: { baseDir: path.resolve(dirname) } },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: env.PAYLOAD_SECRET,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({ pool: { connectionString: env.DATABASE_URL } }),
  localization: { locales: ['en', 'ne'], defaultLocale: 'en', fallback: true },
  sharp,
  plugins: r2 ? [r2] : [],
})
