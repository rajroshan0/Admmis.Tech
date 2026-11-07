import { Container, LinkButton } from '@/components/ui'
import { DEFAULT_LOCALE } from '@/lib/i18n/config'
import { getMessages } from '@/lib/i18n/messages'
import { pathFor } from '@/lib/routes/path'

// not-found receives no params, so the copy is in the default locale until T-304 decides how the
// locale reaches it (a static route cannot read headers or cookies).
export default async function NotFound() {
  const { notFound, header } = await getMessages(DEFAULT_LOCALE, 'common')
  return (
    <Container className="py-16 md:py-24">
      <h1 className="text-h1 font-bold">{notFound.title}</h1>
      <p className="mt-4 max-w-prose text-body">{notFound.text}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <LinkButton cta={{ label: notFound.homeLabel, href: pathFor(DEFAULT_LOCALE, '/') }} />
        <LinkButton
          variant="secondary"
          cta={{ label: notFound.contactLabel, href: pathFor(DEFAULT_LOCALE, header.ctaLink) }}
        />
      </div>
    </Container>
  )
}
