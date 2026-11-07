import type { Cta, SectionHead } from '../shared-types'

export type RentalPlan = {
  /** stable key, e.g. "m" */
  id: string
  /** band label on the radio card, e.g. "6 to 15 staff" (CMS max 56) */
  label: string
  /** short line under the label on the radio card */
  sub?: string
  /** plan card title, e.g. "Website, size M" */
  title: string
  /** formatted by the server from the price collection; both missing = "price on request" state */
  price?: { amount: string; secondary?: string; unit?: string }
  /** quote-only band (XL): shows `priceFallback`-style text from `quoteOnlyLabel`, never a number */
  quoteOnly?: boolean
  setupText?: string
  /** 4 to 6 items */
  inclusions: string[]
  supportText?: string
  cta: Cta
}

export type RentalPlansData = SectionHead & {
  /** legend of the band radio group, e.g. "Choose your size" */
  legend: string
  help?: string
  /** badge text on the selected plan, e.g. "Your size" */
  selectedLabel: string
  /** text when a plan has no price: "Price on request" */
  priceFallback: string
  /** text for quote-only plans: "Quote only" */
  quoteOnlyLabel: string
  /** accessible name of each inclusion list, e.g. "Included" */
  inclusionsLabel: string
  /** prefix before the amount, e.g. "From" */
  pricePrefix?: string
  plans: RentalPlan[]
  /** id of the plan checked first (from `?plan=`); default is the first */
  selectedId?: string
}
