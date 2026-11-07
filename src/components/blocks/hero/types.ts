import type { Cta } from '../shared-types'

export type HeroData = {
  eyebrow?: string
  heading: string
  subheading?: string
  primaryCta?: Cta
  secondaryCta?: Cta
  /** short chips under the CTAs (service names), max 4 */
  chips?: string[]
  /** width and height are the intrinsic size of `src`; the stage keeps a 4:5 aspect ratio */
  image?: { src: string; width: number; height: number; alt: string }
  /** `plain`: navy, no image; an optional `aside` slot (ServiceFacts) is passed to HeroBlock */
  variant?: 'model' | 'plain'
}
