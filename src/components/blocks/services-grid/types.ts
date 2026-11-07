import type { Cta, SectionHead } from '../shared-types'
import type { IconName } from '@/components/ui/Icon'

export type ServiceItem = { href: string; title: string; summary: string; icon?: IconName }

export type ServicesGridData = SectionHead & { items: ServiceItem[]; cta?: Cta }
