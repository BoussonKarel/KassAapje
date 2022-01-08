import type { Register } from "./Register";

export interface Organization {
  organization_id: string
  name?: string
  street?: string
  street_number?: number
  box?: string
  zip?: number
  city?: string
  country?: string
  website?: string
  logo?: string
  color?: string
  email?: string
  registers?: Register[]
  // permissions?: Object[] // Permission[]
  // invitations?: Object[] // Invitations[]
}