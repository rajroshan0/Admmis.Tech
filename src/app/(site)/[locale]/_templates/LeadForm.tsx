import {
  ConsentField,
  FormCard,
  Honeypot,
  SelectField,
  SubmitButton,
  TextField,
  TextareaField,
} from '@/components/forms'
import { LEAD_FORM } from '@/lib/schemas/lead'
import { SERVICE_KEYS } from '@/config/services'
import type { Messages } from '@/lib/i18n/messages'
import { LeadFormClient } from '@/app/(site)/[locale]/_templates/LeadFormClient'

type Props = {
  form: Messages['pages']['form']
  kind: 'contact' | 'quote' | 'event'
  locale: string
  privacyHref: string
  /** contact and quote ask for service, company and a message; event only for name and contact */
  full?: boolean
}

// Plain HTML POST to /api/leads: works without JS (303 flows, docs/api/leads.md v0.3). Turnstile slot:
// the widget adds `cf-turnstile-response` here later. No values are echoed on the success path.
export function LeadForm({ form, kind, locale, privacyHref, full = true }: Props) {
  const f = { requiredLabel: form.required, optionalLabel: form.optional }
  return (
    <FormCard action={form.action} method="post" id="form">
      <input type="hidden" name="formKind" value={kind} />
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name={LEAD_FORM.policyVersion} value={form.policyVersion} />
      <LeadFormClient title={form.errorTitle} errors={form.errors}
        contactRequired={form.contactRequired}
      />
      <TextField
        id="name"
        name="name"
        label={form.name}
        required
        autoComplete="name"
        maxLength={100}
        {...f}
      />
      <TextField
        id="email"
        name="email"
        type="email"
        label={form.email}
        hint={form.contactHint}
        autoComplete="email"
        maxLength={254}
        {...f}
      />
      <TextField
        id="phone"
        name="phone"
        type="tel"
        label={form.phone}
        autoComplete="tel"
        maxLength={20}
        {...f}
      />
      {full ? (
        <>
          <TextField
            id="company"
            name="company"
            label={form.company}
            autoComplete="organization"
            maxLength={150}
            {...f}
          />
          <SelectField
            id="service"
            name="service"
            label={form.service}
            placeholder={form.servicePlaceholder}
            options={SERVICE_KEYS.map((k) => ({ value: k, label: form.services[k] }))}
            {...f}
          />
          <TextareaField
            id="message"
            name="message"
            label={form.message}
            required
            minLength={10}
            maxLength={3000}
            {...f}
          />
        </>
      ) : null}
      <ConsentField
        id="consent"
        name={LEAD_FORM.consent}
        label={
          <>
            {form.consent} <a href={privacyHref}>{form.privacyLabel}</a>.
          </>
        }
      />
      <Honeypot name={LEAD_FORM.honeypot} label={form.honeypot} />
      <SubmitButton label={form.submit} />
    </FormCard>
  )
}
