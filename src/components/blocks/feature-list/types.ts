import type { SectionHead } from '../shared-types'
import type { IconName } from '@/components/ui/Icon'

export type FeatureItem = { title: string; text: string; icon?: IconName }

export type FeatureListData = SectionHead & { items: FeatureItem[] }
