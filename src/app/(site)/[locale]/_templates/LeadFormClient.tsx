'use client'

import { useEffect, useRef, useSyncExternalStore } from 'react'

import { ErrorSummary } from '@/components/forms/FormParts'

// Field the summary link jumps to, by error code. The server sends the code only, so a generic
// validation failure goes to the first field; contact_required (if the API sends it) goes to email.
const FIELD_FOR_CODE: Record<string, string> = {
  validation_failed: 'name',
  contact_required: 'email',
}

// The only client leaf of the form: a fresh idempotency key per visit (a static page cannot make one)
// and the error summary when the no-JS redirect comes back with ?error=<code>.
export function LeadFormClient({
  title,
  errors,
  contactRequired,
}: {
  title: string
  errors: Record<string, string>
  contactRequired: string
}) {
  const keyRef = useRef<HTMLInputElement>(null)
  // window.location instead of next/navigation: keeps the router hooks out of this page's JS budget.
  const search = useSyncExternalStore(
    () => () => {},
    () => window.location.search,
    () => '',
  )
  const code = new URLSearchParams(search).get('error')
  useEffect(() => {
    if (keyRef.current) keyRef.current.value = crypto.randomUUID()
    // Email or phone is required, but neither field alone: block the submit in the browser so the
    // typed message is kept (the server check still runs for no-JS visitors).
    const email = document.getElementById('email') as HTMLInputElement | null
    const phone = document.getElementById('phone') as HTMLInputElement | null
    if (!email || !phone) return
    const sync = () => {
      const missing = !email.value.trim() && !phone.value.trim()
      email.setCustomValidity(missing ? contactRequired : '')
    }
    sync()
    email.addEventListener('input', sync)
    phone.addEventListener('input', sync)
    return () => {
      email.removeEventListener('input', sync)
      phone.removeEventListener('input', sync)
      email.setCustomValidity('')
    }
  }, [contactRequired])
  const message = code ? (errors[code] ?? errors.fallback ?? '') : ''
  return (
    <>
      <input ref={keyRef} type="hidden" name="idempotencyKey" defaultValue="" />
      {message ? <ErrorSummary title={title} items={[{ id: FIELD_FOR_CODE[code ?? ''] ?? 'name', message }]} /> : null}
    </>
  )
}
