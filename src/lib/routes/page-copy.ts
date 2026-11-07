// Shape of one synced copy page (content/pages/services*, rent*), as stored in the services and
// rent message files. It mirrors the CMS fields (service-spec / rent-spec §5); fields that were
// TODO(roshan) in the copy are absent, never placeholders. The CMS swap replaces the loader only.
export type CopyItem = { title: string; text?: string }

export type CopyBlock = {
  /** prose: text only. cards/rule/steps: items. check/dash: plain lists. callout: title and text. */
  kind: 'prose' | 'cards' | 'rule' | 'steps' | 'check' | 'dash' | 'callout'
  key: string
  heading?: string
  intro?: string
  text?: string
  title?: string
  items?: CopyItem[]
}

export type PageCopy = {
  seoTitle: string
  metaDescription: string
  hero: { eyebrow?: string; heading: string; sub?: string }
  facts?: { time?: string; bestFor?: string; minTerm?: string; setup?: string }
  blocks: CopyBlock[]
  price?: { heading?: string; text?: string; cta?: string; ctaLink?: string }
  crossSell?: { title: string; text: string; href: string }[]
  faq?: { heading?: string; items: { q: string; a: string }[] }
  form?: { heading: string; text?: string }
  products?: { productsHeading?: string; productsIntro?: string }
}
