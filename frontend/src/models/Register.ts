import type { Organization } from "./Organization";

export interface Register {
  register_id: string
  organization_id: string
  organization: Organization
  name?: string
  description?: string
  color?: string
  // products?: Object[] // Product[]
  // orders?: Object[] // Order[]
  // permissions?: Object[] // Permission[]
  // invitations?: Object[] // Invitation[]
}