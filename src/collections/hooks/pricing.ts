// Pricing validation (content-model §3.5). Pure function, unit tested.
export type PricingData = {
  kind?: string
  unit?: string
  sizeBand?: string | null
  rentalProduct?: string | null
  role?: string | null
  quoteOnly?: boolean | null
  amounts?: { currency?: string; minorUnits?: number }[] | null
}

const UNITS: Record<string, string[]> = {
  package: ['one-time'],
  rental: ['month', 'person-month'],
  hourly: ['hour'],
}

export function validatePricing(d: PricingData): string[] {
  const errors: string[] = []
  const amounts = d.amounts ?? []
  if (d.kind && d.unit && !UNITS[d.kind]?.includes(d.unit))
    errors.push(`Unit "${d.unit}" does not fit kind "${d.kind}".`)
  if (d.kind === 'rental' && (!d.sizeBand || !d.rentalProduct))
    errors.push('Rental prices need a size band and a rental product.')
  if (d.kind === 'hourly' && !d.role) errors.push('Hourly prices need a role.')
  if (d.kind === 'rental' && d.rentalProduct === 'team' && !d.role)
    errors.push('Team rental prices need a role.')
  const currencies = amounts.map((a) => a.currency)
  if (new Set(currencies).size !== currencies.length) errors.push('Each currency can appear once.')
  if (amounts.some((a) => !Number.isInteger(a.minorUnits) || (a.minorUnits as number) < 0))
    errors.push('Amounts must be whole numbers in minor units (paisa or cents), zero or more.')
  if (d.quoteOnly && amounts.length > 0)
    errors.push('A "request a quote" price cannot have amounts.')
  if (!d.quoteOnly && !(currencies.includes('NPR') && currencies.includes('USD')))
    errors.push('Add both NPR and USD amounts, or tick "request a quote".')
  return errors
}
