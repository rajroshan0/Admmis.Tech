import type { Access, Where } from 'payload'

// Roles (ADR-017): admin, editor, sales. Deny by default; anonymous gets nothing from REST.
// The frontend reads through the server local API (see src/lib/server/content.ts).
export type Role = 'admin' | 'editor' | 'sales'
type MaybeUser = { roles?: Role | null } | null | undefined

export const hasRole = (user: MaybeUser, ...roles: Role[]): boolean =>
  !!user?.roles && roles.includes(user.roles)

export const isAdmin: Access = ({ req }) => hasRole(req.user, 'admin')
export const isStaff: Access = ({ req }) => hasRole(req.user, 'admin', 'editor', 'sales')
export const isEditorOrAdmin: Access = ({ req }) => hasRole(req.user, 'admin', 'editor')
export const isSalesOrAdmin: Access = ({ req }) => hasRole(req.user, 'admin', 'sales')

// Editors may delete drafts only; admins delete anything.
export const deleteDraftsOrAdmin: Access = ({ req }): boolean | Where => {
  if (hasRole(req.user, 'admin')) return true
  if (hasRole(req.user, 'editor')) return { _status: { equals: 'draft' } }
  return false
}

export const contentAccess = {
  read: isStaff,
  create: isEditorOrAdmin,
  update: isEditorOrAdmin,
  delete: deleteDraftsOrAdmin,
}

// ADR-025: only admins change prices. Everyone on staff may read them.
export const priceAccess = { read: isStaff, create: isAdmin, update: isAdmin, delete: isAdmin }
