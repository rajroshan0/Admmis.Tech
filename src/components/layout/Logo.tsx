import { brand } from '@/brands/admmis-tech/brand'

type Props = {
  onDark?: boolean
  alt?: string
  /** Tailwind height classes, e.g. 'h-8.5 md:h-10' */
  className?: string
  /** below-the-fold uses (footer) */
  lazy?: boolean
}

// Plain <img>: a 2 KB SVG gains nothing from next/image. Width and height reserve the space (no layout shift).
export function Logo({ onDark, alt = brand.name, className = 'h-8.5 md:h-10', lazy }: Props) {
  const logo = onDark ? brand.logoOnDark : brand.logo
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.src}
      width={logo.width}
      height={logo.height}
      alt={alt}
      loading={lazy ? 'lazy' : undefined}
      decoding="async"
      className={`w-auto ${className}`}
    />
  )
}
