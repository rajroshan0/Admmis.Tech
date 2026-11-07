import type { SectionHead } from '../shared-types'

/** "If you need X (question), start with Y (label)". Question max 60 characters, label max 24 (CMS 84 / 34). */
export type ChoiceItem = { question: string; label: string; href: string }

export type ChoiceListData = SectionHead & { items: ChoiceItem[] }
