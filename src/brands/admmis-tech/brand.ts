// Default brand. Tokens: ./tokens.css, fonts: ./fonts.ts (docs/frontend/design-tokens.md §5).
export const brand = {
  id: 'admmis-tech',
  name: 'ADMMIS.TECH',
  // Final lockups from design/logo/ (T-601). `logoOnDark` is for navy sections: footer, alt tones.
  logo: { src: '/brand/admmis-tech-lockup.svg', width: 437, height: 100 },
  logoOnDark: { src: '/brand/admmis-tech-lockup-dark.svg', width: 437, height: 100 },
} as const
