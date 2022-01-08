import type { Organization } from "./Organization";
import type { Register } from "./Register";
import type { Role } from "./Role";

export interface Invitation {
  invitation_id?: string
  organization_id?: string
  organization?: Organization
  register_id?: string
  register?: Register
  role?: Role
  expiration_date?: Date
}