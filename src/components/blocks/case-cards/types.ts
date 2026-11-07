import type { Cta, SectionHead } from '../shared-types'
import type { IconName } from '@/components/ui/Icon'

export type CaseItem = {
  href: string
  title: string
  summary: string
  tag?: string
  /** result line; omit until the client has approved a real number */
  result?: string
  icon?: IconName
}

export type CaseCardsData = SectionHead & { items: CaseItem[]; cta?: Cta }
