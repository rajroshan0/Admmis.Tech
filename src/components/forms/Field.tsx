import type { ReactNode } from 'react'

import { Icon } from '@/components/ui/Icon'

export type FieldBase = {
  /** id of the control; the error is `${id}-error` and the hint `${id}-hint` */
  id: string
  label: string
  /** e.g. "required"; shown as text in brackets, never only a star */
  requiredLabel?: string
  /** e.g. "optional" */
  optionalLabel?: string
  required?: boolean
  hint?: string
  error?: string
}

export const controlClass =
  'block min-h-12 w-full rounded-field border-2 border-line-strong bg-surface px-4 py-2.5 text-fg ' +
  'text-[1rem] aria-[invalid=true]:border-danger focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus'

/** aria-describedby for the control: error first, then hint */
export function describedBy({ id, hint, error }: Pick<FieldBase, 'id' | 'hint' | 'error'>) {
  const ids = [error ? `${id}-error` : '', hint ? `${id}-hint` : ''].filter(Boolean)
  return ids.length > 0 ? ids.join(' ') : undefined
}

/** Label above, control (children), hint, then the error with icon and words. Width is always 100 percent. */
export function Field({
  id,
  label,
  requiredLabel,
  optionalLabel,
  required,
  hint,
  error,
  children,
}: FieldBase & { children: ReactNode }) {
  const mark = required ? requiredLabel : optionalLabel
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="font-bold text-fg">
        {label}
        {mark ? <span className="ms-1 font-normal text-muted">({mark})</span> : null}
      </label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="text-small text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="flex items-start gap-2 text-small font-bold text-danger">
          <Icon name="alert" className="mt-0.5 size-4" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  )
}
