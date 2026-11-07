import type { HeadingLevel } from './types'

type Props = {
  eyebrow?: string
  heading: string
  intro?: string
  id?: string
  level?: HeadingLevel
  className?: string
}

export function SectionHeader({ eyebrow, heading, intro, id, level = 2, className = '' }: Props) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3'
  return (
    <header className={`mb-8 max-w-[52rem] lg:mb-12 ${className}`}>
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <Tag id={id} className="text-h2 font-bold text-fg">
        {heading}
      </Tag>
      {intro ? <p className="mt-3 text-lead text-muted">{intro}</p> : null}
    </header>
  )
}
