import { describe, expect, it } from 'vitest'

import { dateParts } from '@/lib/routes/home-view'

describe('dateParts', () => {
  it('splits an ISO date for the date tile', () => {
    expect(dateParts('en', '2027-01-01')).toEqual({ day: '01', month: 'JAN', year: '2027' })
  })
})
