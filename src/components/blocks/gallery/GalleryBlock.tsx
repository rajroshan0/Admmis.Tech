import { useId } from 'react'

import type { BlockProps } from '../shared-types'
import { GalleryViewer } from './GalleryViewer'
import type { GalleryData } from './types'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'

// Server shell; hidden when there are no images. Without JS the thumbnails are inert (no links to follow).
export function GalleryBlock({ data, headingLevel = 2, tone = 'bg' }: BlockProps<GalleryData>) {
  const headingId = useId()
  if (data.images.length === 0) return null
  return (
    <Section tone={tone} labelledBy={headingId}>
      <SectionHeader
        id={headingId}
        eyebrow={data.eyebrow}
        heading={data.heading}
        intro={data.intro}
        level={headingLevel}
      />
      <GalleryViewer images={data.images} labels={data.labels} />
    </Section>
  )
}
