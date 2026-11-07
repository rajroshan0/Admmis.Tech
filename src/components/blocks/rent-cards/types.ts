import type { Cta, SectionHead } from '../shared-types'
import type { IconName } from '@/components/ui/Icon'

export type RentItem = { href: string; title: string; summary: string; icon?: IconName }

export type RentCardsData = SectionHead & { items: RentItem[]; cta?: Cta }
