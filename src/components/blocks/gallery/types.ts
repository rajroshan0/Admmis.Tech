import type { SectionHead } from '../shared-types'
import type { Photo } from '@/components/ui/Initials'

export type GalleryLabels = {
  /** button name prefix: "Open image" gives "Open image: <alt>" */
  open: string
  close: string
  previous: string
  next: string
  /** dialog name, e.g. "Image viewer" */
  dialog: string
}

export type GalleryData = SectionHead & { images: Photo[]; labels: GalleryLabels }
