import type {
  ArrayField,
  Field,
  RichTextField,
  SelectField,
  TextField,
  TextareaField,
} from 'payload'

import { ICON_NAMES } from './icons'

// CMS max = English max x 1.4 (design specs §5) so Nepali fits. We show the English target to editors.
const hint = (max: number, extra?: string) =>
  `Aim for ${Math.round(max / 1.4)} characters or fewer (hard limit ${max}, room for Nepali).${extra ? ` ${extra}` : ''}`

export const loc = (
  name: string,
  max: number,
  o: Partial<TextField> & { help?: string } = {},
): TextField => {
  const { help, ...rest } = o
  return {
    name,
    type: 'text',
    localized: true,
    maxLength: max,
    admin: { description: help ? `${help} ${hint(max)}` : hint(max) },
    ...rest,
  } as TextField
}

export const locArea = (
  name: string,
  max: number,
  o: Partial<TextareaField> = {},
): TextareaField => ({
  name,
  type: 'textarea',
  localized: true,
  maxLength: max,
  admin: { description: hint(max) },
  ...o,
})

export const rich = (name: string, o: Partial<RichTextField> = {}): RichTextField => ({
  name,
  type: 'richText',
  localized: true,
  ...o,
})

export const icon = (o: Partial<SelectField> = {}): SelectField =>
  ({
    name: 'icon',
    type: 'select',
    options: [...ICON_NAMES],
    admin: { description: 'Pick an icon from the fixed set.' },
    ...o,
  }) as SelectField

// Arrays are structure, never localized; text inside is (content-model §1).
export const list = (name: string, fields: Field[], o: Partial<ArrayField> = {}): ArrayField => ({
  name,
  type: 'array',
  fields,
  ...o,
})

export const order = (): Field => ({
  name: 'order',
  type: 'number',
  defaultValue: 0,
  admin: { position: 'sidebar', description: 'Lower numbers come first.' },
})
