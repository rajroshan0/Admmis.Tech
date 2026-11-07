/** Filter as a list of plain links (works without JS). "All" is the caller's first item. */
export function FilterLinks({
  label,
  items,
}: {
  label: string
  items: { label: string; href: string; current: boolean }[]
}) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-2">
        {items.map((i) => (
          <li key={i.href}>
            <a
              href={i.href}
              aria-current={i.current ? 'true' : undefined}
              className="inline-flex min-h-11 items-center rounded-chip border-2 border-line-strong px-4 font-bold text-fg no-underline hover:bg-hover-soft aria-[current=true]:border-fg aria-[current=true]:bg-fg aria-[current=true]:text-surface"
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
