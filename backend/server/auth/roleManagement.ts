import { plainToClass } from 'class-transformer'
import admin from 'firebase-admin'
import { EntityManager, getManager } from 'typeorm'
import { Organization } from '../entity/organization'
import { Role } from '../entity/role'

export const userRoles = (uid: string) => {
  admin.auth().getUser(uid).then((user) => {
    if (user.customClaims)
    console.log("Roles: ", user.customClaims.roles)
  })
}

export const addUserRoles = async (uid: string, newRole: Role) => {
  const manager: EntityManager = getManager()

  // const newRole: Role = plainToClass(Role, {
  //   name: 'OWNER',
  //   organization_id: 'cc26ffd8-5d67-45e1-95a6-bbc1d4002be2',
  // })

  const roles = await admin.auth().getUser(uid).then((user) => {
    if (!user.customClaims || !user.customClaims.roles) return []
    return user.customClaims.roles
  })

  if(!roles.includes(newRole)) roles.push(newRole)

  admin.auth().setCustomUserClaims(uid, {roles: roles})
}
