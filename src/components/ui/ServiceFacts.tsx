import type { ReactNode } from 'react'

export type FactRow = { label: string; value?: ReactNode }

type Props = {
  /** accessible name of the aside, e.g. "At a glance" */
  label: string
  /** visible title (a <p>, not a heading) */
  title: string
  /** rows without a value are omitted, never shown empty. Pass a <Price/> as value for the price row. */
  rows: FactRow[]
}

// Lives in the hero `aside` slot (alt tone). Colours come from the tone scope.
export function ServiceFacts({ label, title, rows }: Props) {
  const visible = rows.filter((r) => r.value)
  if (visible.length === 0) return null
  return (
    <aside
      aria-label={label}
      className="rounded-card border border-line-strong bg-surface p-5 lg:p-6"
    >
      <p className="eyebrow mb-3 !text-accent">{title}</p>
      <dl className="m-0">
        {visible.map((row) => (
          <div
            key={row.label}
            className="border-t border-line-strong py-3 first:border-t-0 first:pt-0 last:pb-0"
          >
            <dt className="text-small text-muted">{row.label}</dt>
            <dd className="m-0 font-bold text-fg">{row.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  )
}
