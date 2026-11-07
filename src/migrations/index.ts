import type { Migration } from 'payload'

// Committed Payload migrations, run at app start in production (ADR-032).
// `payload migrate:create <name>` appends to this list. Empty until the first DB exists (T-404 note).
export const migrations: Migration[] = []
