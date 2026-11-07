import type { SectionHead } from '../shared-types'
import type { IconName } from '@/components/ui/Icon'

export type FeatureItem = {
  title: string
  text?: string
  icon?: IconName
  /** `cards` variant only: makes the whole card a link */
  href?: string
}

export type FeatureListData = SectionHead & {
  items: FeatureItem[]
  /**
   * rule (default): 4 columns with a coloured top rule. cards: icon cards, 2 to 3 columns.
   * checklist: plain list with check or dash markers.
   */
  variant?: 'rule' | 'cards' | 'checklist'
  /** checklist only: `dash` is for "not included" lists */
  marker?: 'check' | 'dash'
  /** checklist only: accessible name of the list ("Included", "Not included") */
  listLabel?: string
}
