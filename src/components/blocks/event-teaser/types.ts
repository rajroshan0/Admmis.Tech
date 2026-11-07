import type { Cta } from '../shared-types'

export type EventTeaserData = {
  eyebrow?: string
  title: string
  summary?: string
  /** full date as text, e.g. "1 January 2027"; read by screen readers */
  dateLabel: string
  /** the big tile; falls back to the label when absent */
  dateParts?: { day: string; month: string; year: string }
  /** only confirmed facts: never "TBD" */
  venue?: string
  time?: string
  registerCta?: Cta
}
