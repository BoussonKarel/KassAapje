import { Resolver } from "type-graphql"
import { EntityManager, getManager } from "typeorm"
import { RoleManager } from "../auth/roleManagement"

@Resolver()
export class OrderResolver {
  manager: EntityManager = getManager()
  roleManager: RoleManager = new RoleManager()

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