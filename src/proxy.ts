import { NextResponse, type NextRequest } from 'next/server'

// Minimal locale routing so `/` resolves to the default locale route [locale]=en.
// TODO(mahendra): replace with next-intl (docs/frontend/i18n.md §2.2): `/en/x` -> 308 `/x`, NE under `/ne/`.
// No env access here on purpose: the proxy runs on every request.
const LOCALES = ['en', 'ne']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const first = pathname.split('/')[1] ?? ''
  if (LOCALES.includes(first)) return NextResponse.next()
  const url = request.nextUrl.clone()
  url.pathname = `/en${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!api|admin|_next|.*\\..*).*)'],
}
