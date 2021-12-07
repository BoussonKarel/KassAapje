import { EntityManager, getManager } from 'typeorm'
import admin from 'firebase-admin'

import { Organization } from '../entity/organization'
import { Permission } from '../entity/permission'
import { Register } from '../entity/register'

export enum Role {
  USER = 'u',
  OWNER = '*',
}

export class RoleManager {
  manager: EntityManager = getManager()

  encodePermissions(permissions: Permission[]): string {
    let permissionsString = "";

    // array of perms in string format
    const orgPermsStrings : string[] = [];
    const regPermsString : string[] = [];

    permissions.filter(p => p.organization).forEach(perm => {
      orgPermsStrings.push(
        `${perm.organization?.organization_id}/${perm.role}`
      );
    })

    permissions.filter(p => p.register).forEach(perm => {
      regPermsString.push(
        `${perm.register?.register_id}/${perm.role}`
      );
    })

    // Create new array of strings
    permissionsString += orgPermsStrings.join(",");
    if (regPermsString) permissionsString += "_" + regPermsString.join(",");

    console.log(permissionsString)
    return permissionsString;
  }

  async addPermission(permission: Permission) : Promise<void> {
    const { uid } = permission.user
    // Add role to database
    return await this.manager.save(Permission, permission).then(async () => {
      // Success > Add role to firebase claims
      // Get user's permissions from database
      const userPermissions = await this.manager.find(Permission, {where:{user:{uid:uid}}})
      if (!userPermissions) { throw new Error("Could not find permissions.")}
      // Format to our special string
      const encodedPerms = this.encodePermissions(userPermissions)

      // Get current custom claims
      const firebaseUser = await admin.auth().getUser(uid)
      const customClaims = firebaseUser.customClaims

      // Overwrite the 'perms' claim (property)
      return await admin
        .auth()
        .setCustomUserClaims(permission.user.uid, {
          ...customClaims,
          perms: encodedPerms,
        }).catch(error => {
          console.error("⛔ Error setting permission claims:", error)
          throw error;
        })
    }).catch(error => {
      console.error("⛔ Error saving new permission:", error)
      throw error;
    })
  }
}
