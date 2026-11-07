import type { ReactNode } from 'react'

import { Icon } from './Icon'

type Props = {
  title: string
  children?: ReactNode
  /** info: green rule; important: amber rule. The icon and title carry the meaning, never the colour alone. */
  tone?: 'info' | 'important'
  className?: string
}

export function Callout({ title, children, tone = 'info', className = '' }: Props) {
  return (
    <div
      role="note"
      className={`flex gap-3 rounded-card border border-line border-l-6 bg-surface p-4 lg:p-5 ${
        tone === 'important' ? 'border-l-warning' : 'border-l-success'
      } ${className}`}
    >
      <Icon name={tone === 'important' ? 'alert' : 'info'} className="mt-0.5" />
      <div>
        <p className="font-bold text-fg">{title}</p>
        {children ? <div className="mt-1 text-card text-muted">{children}</div> : null}
      </div>
    </div>
  )
}
