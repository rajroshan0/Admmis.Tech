import type { SectionTone } from '@/components/ui'

/** Visible sections after the navy hero alternate bg, surface, bg, ... (service-spec.md §1). */
export function toneCycle(): () => SectionTone {
  let i = 0
  return () => (i++ % 2 === 0 ? 'bg' : 'surface')
}
