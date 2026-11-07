import { Logo } from './Logo'
import { Container } from '@/components/ui/Container'

type Props = {
  about: string
  columns: { title: string; links: { label: string; href: string }[] }[]
  contact: { label: string; value: string; href?: string }[]
  copyright: string
}

export function Footer({ about, columns, contact, copyright }: Props) {
  return (
    <footer data-tone="alt" className="bg-bg pb-6 pt-12 text-muted">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr_1.3fr]">
          <div className="col-span-2 md:col-span-1">
            <Logo onDark lazy className="mb-4 h-8" />
            <p className="max-w-[32ch] text-card">{about}</p>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="eyebrow mb-3 text-small">{col.title}</h2>
              <ul>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-flex min-h-11 items-center text-card text-fg no-underline hover:underline hover:underline-offset-4 md:min-h-9"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          {contact.length > 0 ? (
            <dl className="col-span-2 grid gap-3 text-card md:col-span-1">
              {contact.map((item) => (
                <div key={item.label}>
                  <dt className="font-bold text-fg">{item.label}</dt>
                  <dd>
                    {item.href ? (
                      <a href={item.href} className="break-all text-fg">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
        <p className="mt-10 border-t border-line pt-5 text-small">{copyright}</p>
      </Container>
    </footer>
  )
}
