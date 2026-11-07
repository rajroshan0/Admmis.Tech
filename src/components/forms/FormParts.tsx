import type { FormHTMLAttributes, ReactNode } from 'react'

import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

/** Form card (service-spec 3). Pass `action` and `method="post"` so it submits without JS. */
export function FormCard({
  children,
  busy,
  className = '',
  ...form
}: FormHTMLAttributes<HTMLFormElement> & { busy?: boolean }) {
  return (
    <form
      aria-busy={busy || undefined}
      className={`relative grid gap-5 rounded-card border-2 border-fg bg-surface p-5 shadow-hard lg:p-7 ${className}`}
      {...form}
    >
      {children}
    </form>
  )
}

/**
 * One-line summary above the form. role="alert" so it is announced when it appears.
 * Each item links to its field; focus moves to the first invalid field in the form's own script.
 */
export function ErrorSummary({
  title,
  items,
}: {
  title: string
  items: { id: string; message: string }[]
}) {
  if (items.length === 0) return null
  return (
    <div role="alert" className="rounded-field border-2 border-danger p-4">
      <p className="flex items-center gap-2 font-bold text-danger">
        <Icon name="alert" className="size-5" />
        {title}
      </p>
      <ul className="mt-2 grid gap-1 ps-7">
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} className="font-bold text-fg underline underline-offset-4">
              {i.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Submit button: full width on phones. `busy` disables it and swaps the label (the caller passes both strings). */
export function SubmitButton({
  label,
  busyLabel,
  busy,
}: {
  label: string
  busyLabel?: string
  busy?: boolean
}) {
  return (
    <Button type="submit" disabled={busy} className="min-h-13 w-full sm:w-auto">
      {busy && busyLabel ? busyLabel : label}
    </Button>
  )
}

/** Success state: green check badge, heading and text; the page puts focus on the heading (tabIndex -1). */
export function SuccessPanel({
  heading,
  headingLevel = 1,
  children,
}: {
  heading: string
  headingLevel?: 1 | 2
  children?: ReactNode
}) {
  const Tag = `h${headingLevel}` as 'h1' | 'h2'
  return (
    <div className="mx-auto max-w-[36rem] text-center">
      <span className="mx-auto mb-5 grid size-16 place-items-center rounded-chip bg-success text-surface">
        <Icon name="check" className="size-8" />
      </span>
      <Tag tabIndex={-1} className="text-h2 font-bold outline-none">
        {heading}
      </Tag>
      {children ? <div className="mt-3 text-lead text-muted">{children}</div> : null}
    </div>
  )
}
