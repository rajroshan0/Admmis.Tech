import { LinkButton } from './Button'
import { Icon } from './Icon'
import type { Cta } from './types'

export type ChannelRow = { label: string; value?: string; href?: string }

/** Rows come from siteSettings; rows without a value are omitted. WhatsApp is an outline button. */
export function ContactChannels({
  heading,
  whatsapp,
  rows,
  headingLevel = 2,
}: {
  heading: string
  whatsapp?: Cta
  rows: ChannelRow[]
  headingLevel?: 2 | 3
}) {
  const Tag = `h${headingLevel}` as 'h2' | 'h3'
  const visible = rows.filter((r) => r.value)
  return (
    <div className="rounded-card border border-line bg-surface p-5">
      <Tag className="mb-4 text-h3 font-bold">{heading}</Tag>
      <LinkButton
        cta={whatsapp}
        variant="secondary"
        className="mb-4 w-full"
        iconEnd={whatsapp ? <Icon name="whatsapp" className="size-5" /> : undefined}
      />
      <dl>
        {visible.map((r) => (
          <div key={r.label} className="border-t border-line py-3 first:border-t-0 first:pt-0">
            <dt className="text-small text-muted">{r.label}</dt>
            <dd className="m-0 font-bold">
              {r.href ? (
                <a
                  href={r.href}
                  className="inline-flex min-h-12 items-center text-fg underline underline-offset-4"
                >
                  {r.value}
                </a>
              ) : (
                r.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
