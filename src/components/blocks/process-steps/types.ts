import type { SectionHead } from '../shared-types'

export type ProcessStep = { title: string; text: string }

export type ProcessStepsData = SectionHead & { steps: ProcessStep[] }
