import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
  /** adds the hover lift; pair it with a CardLink */
  interactive?: boolean
}

export function Card({ children, className = '', interactive }: CardProps) {
  return (
    <div
      className={`relative rounded-card border border-line bg-surface p-5 lg:p-6 ${
        interactive ? 'transition-transform motion-safe:hover:-translate-y-0.75' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

/** Title link stretched over the whole Card. The focus ring is drawn on the card edge, no :has() needed. */
export function CardLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="text-inherit no-underline after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-3 focus-visible:after:outline-offset-3 focus-visible:after:outline-focus"
    >
      {children}
    </a>
  )
}

/** 48 px icon tile: navy with amber icon on light sections, amber with navy icon inside alt scopes. */
export function IconTile({ children }: { children: ReactNode }) {
  return (
    <span className="grid size-12 flex-none place-items-center rounded-button bg-fg text-accent [[data-tone=alt]_&]:bg-accent [[data-tone=alt]_&]:text-alt">
      {children}
    </span>
  )
}
