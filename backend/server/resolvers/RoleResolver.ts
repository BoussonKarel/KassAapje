import { Resolver } from 'type-graphql'
import { EntityManager, getManager } from 'typeorm'

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
