import { Request } from 'express'
import { AuthChecker } from 'type-graphql'
import { EntityManager, getManager } from 'typeorm'
import { Context } from 'vm'
import { verifyToken } from '.'
import { User } from '../entity/user'
/**
 *@description checks if a user is authorized to use the requested query or mutation based on their role
 */
export const addCurrentUserToRequest = (request: Request) : {error?: string, statusCode?: number, success?: boolean} => {
  const headerToken = request.headers.authorization

  if (!headerToken) {
    return {error: "No token provided", statusCode: 401} 
  }

  if (headerToken && headerToken.split(' ')[0] !== 'Bearer') {
    return {error: "Invalid token", statusCode: 401} 
    
  }

  const token = headerToken.split(' ')[1]

  verifyToken(token)
    .then(claims => {
      ;(request as any).currentUser = claims
      console.log({ claims })
      return {success: true};
    })
    .catch(error => {
      console.log(error)

      return { error: "Could not authorize", statusCode: 403 }
    })

    return {success: false};
}

export const customAuthChecker: AuthChecker<Context> = async ({ context }, roles) =>
  {
    const manager: EntityManager = getManager()
    
    const user = await manager.findOne(User, {
      user_id: context.request.currentUser.uid,
    })

    // Not logged in
    if (!user) return false;

    // No role check: just check if logged in
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