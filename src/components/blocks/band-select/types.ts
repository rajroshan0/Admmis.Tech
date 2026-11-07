import type { SectionHead } from '../shared-types'

export type Band = { id: string; label: string; sub?: string }

export type BandSelectData = SectionHead & {
  /** fieldset legend, e.g. "Choose your size" */
  legend: string
  help?: string
  bands: Band[]
  selectedId?: string
}
