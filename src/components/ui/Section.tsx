import type { ReactNode } from 'react'

import { Container } from './Container'
import type { SectionTone } from './types'

// Tone scopes live in styles/base.css: alt and band remap the semantic tokens for everything inside.
const toneClass: Record<SectionTone, string> = {
  bg: 'bg-bg',
  surface: 'bg-surface',
  alt: 'bg-bg',
  band: 'bg-bg',
}

type Props = {
  tone?: SectionTone
  children: ReactNode
  className?: string
  /** id of the heading that names the section (landmark label) */
  labelledBy?: string
  /** false: caller controls padding and container (hero, footer) */
  contained?: boolean
}

export function Section({
  tone = 'bg',
  children,
  className = '',
  labelledBy,
  contained = true,
}: Props) {
  return (
    <section
      aria-labelledby={labelledBy}
      data-tone={tone === 'alt' || tone === 'band' ? tone : undefined}
      className={`${toneClass[tone]} text-fg ${contained ? 'py-section' : ''} ${className}`}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  )
}
