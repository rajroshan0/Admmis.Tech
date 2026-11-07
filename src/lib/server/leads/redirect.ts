// Redirect targets for the no-JS path. Never built from form input beyond a whitelist (no open redirect).
const FORM_PAGES = new Set(['/contact', '/rent', '/opening-event', '/pricing'])

const stripLocale = (p: string) => p.replace(/^\/ne(?=\/|$)/, '') || '/'

export function successTarget(locale: unknown): string {
  return locale === 'ne' ? '/ne/contact/thank-you' : '/contact/thank-you'
}

/** Back to the form page the post came from, error code only. Unknown pages fall back to /contact. */
export function errorTarget(referer: string | null, base: string, code: string): string {
  let path = '/contact'
  try {
    if (referer) {
      const u = new URL(referer, base)
      const bare = stripLocale(u.pathname)
      if (FORM_PAGES.has(bare) || /^\/(rent|services)\/[a-z0-9-]+$/.test(bare)) path = u.pathname
    }
  } catch {
    /* keep default */
  }
  return `${path}?error=${encodeURIComponent(code)}`
}
