import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'

import { Icon } from '@/components/ui/Icon'
import { controlClass, describedBy, Field, type FieldBase } from './Field'

// Uncontrolled and native: a form made of these submits without JS (action + method on FormCard).

type TextProps = FieldBase & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'required'>

export function TextField({
  id,
  label,
  requiredLabel,
  optionalLabel,
  required,
  hint,
  error,
  className = '',
  ...input
}: TextProps) {
  return (
    <Field {...{ id, label, requiredLabel, optionalLabel, required, hint, error }}>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy({ id, hint, error })}
        className={`${controlClass} ${className}`}
        {...input}
      />
    </Field>
  )
}

type SelectProps = FieldBase &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id' | 'required'> & {
    options: { value: string; label: string }[]
    /** first empty option, e.g. "Choose one" */
    placeholder?: string
  }

export function SelectField({
  id,
  label,
  requiredLabel,
  optionalLabel,
  required,
  hint,
  error,
  options,
  placeholder,
  className = '',
  ...select
}: SelectProps) {
  return (
    <Field {...{ id, label, requiredLabel, optionalLabel, required, hint, error }}>
      <select
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy({ id, hint, error })}
        className={`${controlClass} ${className}`}
        {...select}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  )
}

type AreaProps = FieldBase & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'required'>

export function TextareaField({
  id,
  label,
  requiredLabel,
  optionalLabel,
  required,
  hint,
  error,
  rows = 5,
  className = '',
  ...area
}: AreaProps) {
  return (
    <Field {...{ id, label, requiredLabel, optionalLabel, required, hint, error }}>
      <textarea
        id={id}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy({ id, hint, error })}
        className={`${controlClass} resize-y ${className}`}
        {...area}
      />
    </Field>
  )
}

/** 24 px box inside a 44 px+ label area. `label` is a node so the caller can put the privacy link in it. */
export function ConsentField({
  id,
  label,
  error,
  name,
}: {
  id: string
  label: ReactNode
  error?: string
  name: string
}) {
  return (
    <div className="grid gap-1.5">
      <div className="flex min-h-11 items-start gap-3">
        <input
          id={id}
          type="checkbox"
          name={name}
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 size-6 flex-none accent-primary"
        />
        <label htmlFor={id} className="py-1 text-card">
          {label}
        </label>
      </div>
      {error ? (
        <p id={`${id}-error`} className="flex items-start gap-2 text-small font-bold text-danger">
          <Icon name="alert" className="mt-0.5 size-4" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  )
}

/** Off-screen bot trap. Not focusable, hidden from assistive tech. `label` is only for crawlers that read labels. */
/** `name` is LEAD_FORM.honeypot from src/lib/schemas/lead.ts (one shared constant, a neutral name browsers do not autofill). */
export function Honeypot({ name, label }: { name: string; label: string }) {
  return (
    <div aria-hidden="true" className="absolute -start-[9999px] h-0 w-0 overflow-hidden">
      <label>
        {label}
        <input type="text" name={name} tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  )
}
