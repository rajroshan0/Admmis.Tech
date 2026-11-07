// Size bands are data, not approved numbers (content-model Q16). Keys are stable; labels live in src/messages.
export const SIZE_BANDS = ['S', 'M', 'L', 'XL'] as const
export type SizeBand = (typeof SIZE_BANDS)[number]
export const RENTAL_PRODUCTS = ['website', 'ai-agent', 'team'] as const
export type RentalProduct = (typeof RENTAL_PRODUCTS)[number]
