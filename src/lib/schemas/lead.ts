import { z } from 'zod'

import { SERVICE_KEYS } from '@/config/services'
import { SIZE_BANDS } from '@/config/size-bands'
import { cleanText, normalizePhone } from '@/lib/server/leads/normalize'

// Shared by the API route and the form (mahendra). Error messages are i18n KEYS (standards §3).
const text = (min: number, max: number) =>
  z
    .string()
    .transform(cleanText)
    .pipe(z.string().min(min, 'leads.field.too_short').max(max, 'leads.field.too_long'))

const optionalText = (max: number) =>
  text(0, max)
    .optional()
    .transform((v) => v || undefined)

const phone = z.string().transform((v, ctx) => {
  const n = normalizePhone(v)
  if (!n) ctx.addIssue({ code: 'custom', message: 'leads.field.phone_invalid' })
  return n ?? ''
})

// Not `website`/`url`/`company`: browsers autofill those and real leads would be dropped (hritik T-111).
export const HONEYPOT_FIELD = 'contact_ref_hp'

export const FORM_KINDS = ['contact', 'quote', 'rent', 'event', 'callback'] as const

export const leadSchema = z
  .object({
    name: text(2, 100),
    email: z
      .string()
      .transform(cleanText)
      .pipe(z.email('leads.field.email_invalid').max(254, 'leads.field.too_long'))
      .transform((v) => v.toLowerCase())
      .optional(),
    phone: phone.optional(),
    company: optionalText(150),
    service: z.enum(SERVICE_KEYS, 'leads.field.service_invalid').optional(),
    sizeBand: z.enum(SIZE_BANDS).optional(),
    budgetRange: z
      .string()
      .regex(/^[a-z0-9-]{1,40}$/, 'leads.field.invalid')
      .optional(),
    message: optionalText(3000),
    formKind: z.enum(FORM_KINDS),
    pricingKey: z
      .string()
      .regex(/^[a-z0-9-]{1,80}$/, 'leads.field.invalid')
      .optional(),
    locale: z.enum(['en', 'ne']),
    consent: z
      .object({
        contact: z.literal(true, 'leads.field.consent_required'),
        policyVersion: z.string().max(40),
      })
      .strict(),
    source: z
      .object({
        utmSource: optionalText(100),
        utmMedium: optionalText(100),
        utmCampaign: optionalText(100),
        utmTerm: optionalText(100),
        utmContent: optionalText(100),
        referrer: optionalText(500),
        landingPath: optionalText(300),
        pagePath: optionalText(300),
      })
      .strict()
      .optional(),
    // Missing on the no-JS path (Turnstile needs JS); the route then marks the lead unverified-no-js.
    turnstileToken: z.string().max(2048).optional(),
    idempotencyKey: z.uuid('leads.field.invalid'),
    [HONEYPOT_FIELD]: z.string().optional(), // honeypot, handled before parsing
  })
  .strict()
  .refine((v) => v.email || v.phone, { path: ['email'], message: 'leads.field.contact_required' })
  .refine(
    (v) => !['contact', 'quote'].includes(v.formKind) || (!!v.message && v.message.length >= 10),
    {
      path: ['message'],
      message: 'leads.field.message_required',
    },
  )

export type LeadInput = z.infer<typeof leadSchema>

/** Maps zod issues to { field: i18nKey } for the 400 response. Never echoes submitted values. */
export function fieldErrors(issues: z.core.$ZodIssue[]): Record<string, string> {
  const out: Record<string, string> = {}
  for (const i of issues) {
    const key = String(i.path[0] ?? 'form')
    out[key] ??= i.message.startsWith('leads.') ? i.message : 'leads.field.invalid'
  }
  return out
}

/** Names for the plain HTML form (no-JS path), so markup matches the server. */
export const LEAD_FORM = {
  honeypot: HONEYPOT_FIELD, // hidden, must stay empty
  consent: 'consentContact', // checkbox, value "on"
  policyVersion: 'policyVersion',
  turnstile: 'cf-turnstile-response', // added by the Turnstile widget when JS runs
  sourcePrefix: 'source.', // e.g. source.utmSource
  fields: [
    'name',
    'email',
    'phone',
    'company',
    'service',
    'sizeBand',
    'budgetRange',
    'message',
    'formKind',
    'pricingKey',
    'locale',
    'idempotencyKey',
  ],
} as const
