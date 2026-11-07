import { Icon, type IconName } from '@/components/ui/Icon'

export type StickyItem = {
  kind: 'whatsapp' | 'call' | 'quote'
  label: string
  ariaLabel: string
  href: string
}

const ICON: Record<StickyItem['kind'], IconName> = {
  whatsapp: 'whatsapp',
  call: 'phone',
  quote: 'quote',
}

// Below 768 px only. CSS-only: no client JS. body padding in base.css keeps content clear of the bar.
export function MobileStickyBar({ items }: { items: StickyItem[] }) {
  if (items.length === 0) return null
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-line bg-surface px-gutter pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 shadow-[0_-6px_16px_-10px_color-mix(in_srgb,var(--color-fg)_35%,transparent)] md:hidden">
      {items.map((item) => (
        <a
          key={item.kind}
          href={item.href}
          aria-label={item.ariaLabel}
          className={`inline-flex min-h-12 items-center justify-center gap-1.5 rounded-button border-2 border-fg px-2 text-small font-bold leading-none text-fg no-underline ${
            item.kind === 'quote' ? 'flex-[1.5] bg-primary text-on-primary' : 'flex-1 bg-surface'
          }`}
        >
          <Icon name={ICON[item.kind]} className="size-5" />
          {item.label}
        </a>
      ))}
    </div>
  )
}
