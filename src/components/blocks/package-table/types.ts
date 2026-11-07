import type { Cta, SectionHead } from '../shared-types'

export type MoneyView = { amount: string; secondary?: string; unit?: string }

export type PackageItem = {
  id: string
  name: string
  forWho?: string
  inclusions: string[]
  /** one entry per band, in band order; undefined = no price row (shows the fallback) */
  prices: (MoneyView | undefined)[]
  quoteOnly?: boolean
  cta?: Cta
}

export type PackageTableData = SectionHead & {
  caption: string
  /** [package, what you get, price] */
  columns: [string, string, string]
  /** band labels in order, same length as each `prices` */
  bandLabels: string[]
  priceFallback: string
  quoteOnlyLabel: string
  pricePrefix?: string
  packages: PackageItem[]
}
