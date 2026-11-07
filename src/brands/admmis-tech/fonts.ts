import { Montserrat, Mukta } from 'next/font/google'

// Self-hosted at build time by next/font (no runtime request to Google). design-tokens.md §8.
// Latin: one variable file for every locale, the only font preloaded.
export const latin = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-latin',
})

// Devanagari (Nepali, from Feb 2027): preload is off so English pages request no Devanagari file;
// @font-face uses unicode-range, so a page with no Devanagari text downloads nothing.
export const devanagari = Mukta({
  subsets: ['devanagari'],
  weight: ['400', '700'],
  display: 'swap',
  preload: false,
  variable: '--font-devanagari',
})

/** Put on <html>: defines --font-latin and --font-devanagari used by the theme font stacks. */
export const fontVariables = `${latin.variable} ${devanagari.variable}`
