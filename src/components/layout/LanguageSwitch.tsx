export type LanguageItem = {
  locale: string
  /** native name: "English", "नेपाली" */
  name: string
  href: string
  current: boolean
}

type Props = {
  /** accessible name of the nav landmark, e.g. "Language" */
  label: string
  items: LanguageItem[]
  className?: string
}

// Server component, plain links, no client JS (works without JavaScript).
// `lang` makes screen readers pronounce each name in its own language; the current one keeps its link
// (stable touch target) and is marked with aria-current and a heavier underline.
export function LanguageSwitch({ label, items, className = '' }: Props) {
  if (items.length < 2) return null
  return (
    <nav aria-label={label} className={className}>
      <ul className="flex items-center">
        {items.map((item) => (
          <li key={item.locale}>
            <a
              href={item.href}
              lang={item.locale}
              hrefLang={item.locale}
              aria-current={item.current ? 'true' : undefined}
              className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-button px-3 text-[0.9375rem] leading-none text-fg underline-offset-4 ${
                item.current
                  ? 'font-bold underline decoration-primary decoration-[3px]'
                  : 'font-semibold no-underline hover:underline'
              }`}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
