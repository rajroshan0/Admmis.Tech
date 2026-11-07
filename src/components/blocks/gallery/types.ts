import type { SectionHead } from '../shared-types'
import type { Photo } from '@/components/ui/Initials'

export type GalleryLabels = {
  /** link name template with {alt}: "Open image: {alt}" (the message owns the punctuation) */
  open: string
  close: string
  previous: string
  next: string
  /** dialog name, e.g. "Image viewer" */
  dialog: string
}

export type GalleryData = SectionHead & { images: Photo[]; labels: GalleryLabels }
