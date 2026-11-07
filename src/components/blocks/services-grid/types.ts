import type { Cta, SectionHead } from '../shared-types'
import type { IconName } from '@/components/ui/Icon'

export type ServiceItem = {
  href: string
  title: string
  summary: string
  icon?: IconName
  /** descriptive link name for screen readers; the title stays the visible text */
  linkLabel?: string
}

export type ServicesGridData = SectionHead & { items: ServiceItem[]; cta?: Cta }
