import { AuthChecker } from 'type-graphql'
import { EntityManager, getManager } from 'typeorm'
import { Context } from 'vm'
import { User } from '../entity/user'
/**
 *@description checks if a user is authorized to use the requested query or mutation based on their role
 */
export const customAuthChecker: AuthChecker<Context> = async ({ context }, roles) =>
  {
    const manager: EntityManager = getManager()
    
    const user = await manager.findOne(User, {
      user_id: context.request.currentUser.uid,
    })

    if (!user) return false;

    if (!roles) return true;

    // GET USER'S ROLES
    // Does at least one role of the user correspond to a role in roles[] ?
    // How do we check what organization or register we are working in?
    // We don't want a SHOP.ADMIN of shop A, having perms to change stuff in shop B

    // CUSTOM DECORATOR?
    // https://typegraphql.com/docs/custom-decorators.html
    // > Hoe weten we de "context" (register of organization) waarin het gebeurt?
    // ? Een gewone function waarin je required role & de context meegeeft?
    // Wat bij deleten van account? Daar kan je ingelogde user zijn of 'app admin'

    console.log("User: ", user)

    return false
  }