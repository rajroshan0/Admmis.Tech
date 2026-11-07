import { ServiceFacts } from './ServiceFacts'

export type CaseFactRow = {
  label: string
  value?: string
  links?: { label: string; href: string }[]
}

/** ServiceFacts for a case study. Rows with no value and no links are omitted; services render as links. */
export function CaseFacts({
  label,
  title,
  rows,
}: {
  label: string
  title: string
  rows: CaseFactRow[]
}) {
  return (
    <ServiceFacts
      label={label}
      title={title}
      rows={rows.map((r) => ({
        label: r.label,
        value:
          r.links && r.links.length > 0 ? (
            <ul className="grid gap-1">
              {r.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-flex min-h-11 items-center text-fg underline underline-offset-4"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            r.value
          ),
      }))}
    />
  )
}
