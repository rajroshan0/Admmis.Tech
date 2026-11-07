import { Logo } from './Logo'
import { MobileNav } from './MobileNav'
import { LinkButton } from '@/components/ui/Button'
import type { Cta } from '@/components/ui/types'

export type NavItem = { label: string; href: string; current?: boolean }

type Props = {
  homeHref: string
  logoAlt: string
  nav: NavItem[]
  cta: Cta
  labels: { menuOpen: string; menuClose: string; menuLabel: string }
}

export function Header({ homeHref, logoAlt, nav, cta, labels }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface text-fg">
      <div className="mx-auto flex h-header w-full max-w-page items-center justify-between px-gutter">
        <a href={homeHref} className="inline-flex items-center">
          <Logo alt={logoAlt} />
        </a>

        <nav aria-label={labels.menuLabel} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className="nav-link inline-flex min-h-11 items-center rounded-button px-3 text-[0.9375rem] font-semibold leading-none text-fg no-underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="ms-3">
              <LinkButton cta={cta} className="min-h-11 px-5" />
            </li>
          </ul>
        </nav>

        {/* No JavaScript: the menu button would be inert, so hide it and show the links in a row below. */}
        <noscript>
          <style>{'.menu-btn{display:none!important}'}</style>
        </noscript>
        <MobileNav
          openLabel={labels.menuOpen}
          closeLabel={labels.menuClose}
          menuLabel={labels.menuLabel}
        >
          <ul>
            {nav.map((item) => (
              <li key={item.href} className="border-b border-line">
                <a
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className="flex min-h-13 items-center text-lg font-bold text-fg no-underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <LinkButton cta={cta} className="mt-6 w-full" />
        </MobileNav>
      </div>
      <noscript>
        <nav aria-label={labels.menuLabel} className="border-t border-line px-gutter lg:hidden">
          <ul className="flex flex-wrap gap-x-5">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 items-center font-semibold text-fg no-underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </noscript>
    </header>
  )
}
