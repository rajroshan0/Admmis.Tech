import type { ReactNode } from 'react'

import type { Cta } from './types'

type Variant = 'primary' | 'secondary' | 'link'

const base =
  'inline-flex items-center justify-center gap-2 text-center font-bold no-underline transition-transform'
const variants: Record<Variant, string> = {
  primary:
    'min-h-12 rounded-button border-2 border-edge bg-primary px-6 leading-none text-on-primary shadow-hard ' +
    'hover:bg-primary-hover motion-safe:hover:-translate-x-px motion-safe:hover:-translate-y-px ' +
    'active:translate-x-1 active:translate-y-1 active:bg-primary-active active:shadow-none',
  secondary:
    'min-h-12 rounded-button border-2 border-fg px-6 leading-none text-fg hover:bg-hover-soft',
  link: 'min-h-11 text-fg underline decoration-2 underline-offset-4 hover:decoration-4',
}

type Props = {
  children: ReactNode
  variant?: Variant
  className?: string
  /** With `href` it renders a link, without it a <button>. */
  href?: string
  external?: boolean
  disabled?: boolean
  /** keeps focus (unlike `disabled`); use with type="button" so it does nothing */
  ariaDisabled?: boolean
  type?: 'button' | 'submit'
  iconEnd?: ReactNode
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  href,
  external,
  disabled,
  ariaDisabled,
  type = 'button',
  iconEnd,
}: Props) {
  const cls = `${base} ${variants[variant]} ${disabled || ariaDisabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`
  const content = (
    <>
      {children}
      {iconEnd}
    </>
  )
  if (href && !disabled) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    )
  }
  return (
    <button
      type={type}
      className={cls}
      disabled={disabled}
      aria-disabled={ariaDisabled || undefined}
    >
      {content}
    </button>
  )
}

/** Renders a CMS/view Cta as a link-styled Button. Nothing when the Cta is absent. */
export function LinkButton({
  cta,
  variant = 'primary',
  className,
  iconEnd,
}: {
  cta?: Cta
  variant?: Variant
  className?: string
  iconEnd?: ReactNode
}) {
  if (!cta) return null
  return (
    <Button
      href={cta.href}
      external={cta.external}
      variant={variant}
      className={className}
      iconEnd={iconEnd}
    >
      {cta.label}
    </Button>
  )
}
