import type { Cta, HeadingLevel, SectionTone } from '@/components/ui/types'

export type { Cta, HeadingLevel, SectionTone }

/** Every block: `data` is built by resolveBlocks() (mahendra); `headingLevel` is 1 only for the page hero. */
export type BlockProps<TData> = {
  data: TData
  headingLevel?: HeadingLevel
  /** overrides the block's default tone */
  tone?: SectionTone
}

export type SectionHead = { eyebrow?: string; heading: string; intro?: string }

/** Minimal serialized rich text. Rendering is added with the Lexical renderer (T-401 follow-up). */
export type RichTextData = { root: unknown }
