// Input cleaning shared by the lead schema and the form-encoded path.
const DEVANAGARI_ZERO = 0x0966

/** Devanagari digits (U+0966..096F) to ASCII 0..9. Nepali visitors type phone numbers this way. */
export const devanagariToAscii = (s: string): string =>
  s.replace(/[०-९]/g, (c) => String(c.charCodeAt(0) - DEVANAGARI_ZERO))

/** Removes NUL, control characters and zero-width characters. */
export const stripInvisible = (s: string): string =>
  s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F​-‍⁠﻿]/g, '')

export const cleanText = (s: string): string => stripInvisible(s).trim()

/**
 * Phone: Devanagari digits to ASCII, keep a leading +, drop spaces and punctuation.
 * Returns null when it does not have 7 to 20 digits. E.164 only when a country code is present.
 */
export function normalizePhone(raw: string): string | null {
  const ascii = devanagariToAscii(stripInvisible(raw)).trim()
  if (!/^[0-9+()\-\s.]+$/.test(ascii)) return null
  const digits = ascii.replace(/\D/g, '')
  if (digits.length < 7 || digits.length > 20) return null
  const plus = ascii.startsWith('+') || ascii.startsWith('00')
  return plus ? `+${ascii.startsWith('00') ? digits.slice(2) : digits}` : digits
}
