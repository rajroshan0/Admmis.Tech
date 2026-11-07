import type { RichTextData } from '../shared-types'

export type FaqItem = { id: string; question: string; answer: string | RichTextData }

export type FaqData = { eyebrow?: string; heading?: string; items: FaqItem[] }
