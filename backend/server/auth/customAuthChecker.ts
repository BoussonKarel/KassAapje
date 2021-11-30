import { AuthChecker } from 'type-graphql'
import { EntityManager, getManager } from 'typeorm'
import { Context } from 'vm'
import { User } from '../entity/user'
/**
 *@description checks if a user is authorized to use the requested query or mutation based on their role
 */
export const customAuthChecker: AuthChecker<Context> = async ({ context }) =>
  // roles, // Optional: you can use roles
  {
    const manager: EntityManager = getManager()

    const user = await manager.findOne(User, {
      user_id: context.request.currentUser.uid,
    })

    console.log("User: ", user)

    if (user) {
      return true
    }

    return false
  }