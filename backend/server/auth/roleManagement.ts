import { EntityManager, getManager } from 'typeorm'
import admin from 'firebase-admin'

import { Organization } from '../entity/organization'
import { Permission } from '../entity/permission'
import { Register } from '../entity/register'
import { User } from '../entity/user'

export enum Role {
  USER = 'u',
  OWNER = '*',
}

export class RoleManager {
  manager: EntityManager = getManager()

  encodePermissions(permissions: Permission[]): string {
    let permissionsString = ''

    // array of perms in string format
    const orgPermsStrings: string[] = []
    const regPermsString: string[] = []

    permissions
      .filter(p => p.organization)
      .forEach(perm => {
        orgPermsStrings.push(
          `${perm.organization?.organization_id}/${perm.role}`,
        )
      })

    permissions
      .filter(p => p.register)
      .forEach(perm => {
        regPermsString.push(`${perm.register?.register_id}/${perm.role}`)
      })

    // Create new array of strings
    permissionsString += orgPermsStrings.join(',')
    if (regPermsString) permissionsString += '_' + regPermsString.join(',')

    return permissionsString
  }

  permissionsContainRole(permissions: Permission[], roles: Role[]) {
    for (const p of permissions) {
      if (roles.includes(p.role)) return true
    }

    return false
  }

  async hasOrganizationRole(user: User, organization_id: string, roles: Role[]) {
    if (!user.permissions || user.permissions.length < 1) return false
    // Check roles in this organization_id
    const permissionsHere = user.permissions.filter(
      p => p.organization && p.organization.organization_id === organization_id,
    )
    // Check if role is present in those permissions
    const hasPermission = this.permissionsContainRole(permissionsHere, roles)
    if (hasPermission) return true;
    else throw Error('You do not have the right permissions on that register / organization.')
  }

  async hasRegisterRole(user: User, register_id: string, roles: Role[]) {
    if (!user.permissions || user.permissions.length < 1) return false

    // Get (register_id and) organization_id
    // Also kind of a check if the register exists
    const registerOnlyIDs = await this.manager
      .createQueryBuilder(Register, 'r')
      .select('r.register_id')
      .leftJoin('r.organization', 'o')
      .addSelect('o.organization_id')
      .where('r.register_id = :id', { id: register_id })
      .getOneOrFail()
      .catch(e => {
        console.error(e)
        throw new Error(
          'Could not find the register you are trying to work in.',
        )
      })

    // Check roles in above organization first: owner?
    const organization_id = registerOnlyIDs.organization.organization_id
    // user is owner in the above organization
    if (await this.hasOrganizationRole(user, organization_id, [Role.OWNER]))
      return true
    else {
      // Check roles in this register
      const permissionsHere = user.permissions.filter(
        p => p.register && p.register.register_id === register_id,
      )
      // Check if role is present in those permissions
      const hasPermission = this.permissionsContainRole(permissionsHere, roles)
      if (hasPermission) return true;
      else throw Error('You do not have the right permissions on that register / organization.')
    }
  }

  async addPermission(permission: Permission): Promise<void> {
    const { uid } = permission.user
    // Add role to database
    const savedPermission = await this.manager.save(Permission, permission)
    if (!savedPermission)
      throw new Error('Could not save permission to database.')

    // Success > Add role to firebase claims
    // Get user's permissions from database
    const userPermissions = await this.manager.find(Permission, {
      where: { user: { uid: uid } },
    })
    if (!userPermissions || userPermissions.length < 1)
      throw new Error('Could not find permissions for user.')

    // Format to our special string
    const encodedPerms = this.encodePermissions(userPermissions)

    const firebaseUser = await admin
      .auth()
      .getUser(uid)
      .catch(e => {
        throw new Error('Could not get firebase user.')
      })

    const customClaims = firebaseUser.customClaims

    // Overwrite the 'perms' claim (property)
    return await admin
      .auth()
      .setCustomUserClaims(uid, {
        ...customClaims,
        perms: encodedPerms,
      })
      .catch(error => {
        error.message = 'Error setting custom claims: ' + error.message
        throw error
      })
  }
}
