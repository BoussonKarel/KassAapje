import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { EntityManager, getManager } from 'typeorm'
import { addUserRoles, userRoles } from '../auth/roleManagement'
import { Organization, OrganizationInput } from '../entity/organization'
import { CurrentUser } from '../middleware/currentUserParamDecorator'

@Resolver()
export class RoleResolver {
  manager: EntityManager = getManager()

  // -------
  // CREATE
  // -------

  // -------
  // READ
  // -------

  // -------
  // UPDATE
  // -------

  // -------
  // DELETE
  // -------
}
