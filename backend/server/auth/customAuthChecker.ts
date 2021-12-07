import { Request } from 'express'
import { AuthChecker } from 'type-graphql'
import { EntityManager, getManager } from 'typeorm'
import { Context } from 'vm'
import { User } from '../entity/user'
import admin from 'firebase-admin'

/**
 *@description checks if a user is authorized to use the requested query or mutation based on their role
 */
export const addCurrentUserToRequest = async (request: Request) : Promise<{error?: string, statusCode?: number, user?: any}> => {
  const headerToken = request.headers.authorization

  if (!headerToken) {
    return {error: "No token provided", statusCode: 401} 
  }

  if (headerToken && headerToken.split(' ')[0] !== 'Bearer') {
    return {error: "Invalid token", statusCode: 401} 
    
  }

  const token = headerToken.split(' ')[1]

  return await admin.auth().verifyIdToken(token)
    .then(async claims => {
      ;(request as any).currentUser = claims
      return {user: claims};
    })
    .catch(error => {
      console.log(error)

      return { error: "Could not authorize", statusCode: 403 }
    })
}

export const customAuthChecker: AuthChecker<Context> = async ({ context }, roles) =>
  {
    const manager: EntityManager = getManager()

    return await addCurrentUserToRequest(context.request).then(async ({user}) => {
      const dbUser = await manager.findOne(User, 
        user.uid
      )

      // Logged in?
      if (context.request.currentUser) return true;

      // Not:
      return false
    })
  }