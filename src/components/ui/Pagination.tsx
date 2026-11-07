export type PageLink = { label: string; href: string; current?: boolean }

const cell =
  'inline-flex size-11 min-w-11 items-center justify-center rounded-button border-2 border-line-strong px-3 font-bold no-underline'

/** Real links. Previous/Next are plain text with aria-disabled when there is no such page. */
export function Pagination({
  label,
  previous,
  next,
  pages,
}: {
  label: string
  previous: { label: string; href?: string }
  next: { label: string; href?: string }
  pages: PageLink[]
}) {
  const edge = (e: { label: string; href?: string }) =>
    e.href ? (
      <a href={e.href} className={`${cell} w-auto text-fg`}>
        {e.label}
      </a>
    ) : (
      <span aria-disabled="true" className={`${cell} w-auto border-transparent text-muted`}>
        {e.label}
      </span>
    )
  return (
    <nav aria-label={label}>
      <ol className="flex flex-wrap items-center gap-2">
        <li>{edge(previous)}</li>
        {pages.map((p) => (
          <li key={p.href}>
            <a
              href={p.href}
              aria-current={p.current ? 'page' : undefined}
              className={`${cell} text-fg aria-[current=page]:border-fg aria-[current=page]:bg-fg aria-[current=page]:text-surface`}
            >
              {p.label}
            </a>
          </li>
        ))}
        <li>{edge(next)}</li>
      </ol>
    </nav>
  )
}
