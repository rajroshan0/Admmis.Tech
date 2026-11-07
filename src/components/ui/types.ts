export type Cta = {
  label: string
  href: string
  kind?: 'link' | 'whatsapp' | 'tel'
  external?: boolean
}

export type HeadingLevel = 1 | 2 | 3

export type SectionTone = 'bg' | 'surface' | 'alt' | 'band'
