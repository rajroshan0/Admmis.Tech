import type { SectionHead } from '../shared-types'
import type { MoneyView } from '../package-table/types'

export type BudgetRow = { label: string; price?: MoneyView; quoteOnly?: boolean }

export type BudgetGuideData = SectionHead & {
  rows: BudgetRow[]
  priceFallback: string
  quoteOnlyLabel: string
  pricePrefix?: string
}
