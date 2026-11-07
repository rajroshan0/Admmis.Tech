import type { SectionHead } from '../shared-types'
import type { IconName } from '@/components/ui/Icon'
import type { Photo } from '@/components/ui/Initials'

export type TeamLink = { label: string; href: string; icon: IconName }
export type TeamMember = {
  name: string
  role?: string
  /** one line, max 100 */
  bio?: string
  photo?: Photo
  links?: TeamLink[]
}

export type TeamGridData = SectionHead & { members: TeamMember[] }
