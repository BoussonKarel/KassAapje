import { Request } from 'express'
import { AuthChecker } from 'type-graphql'
import { EntityManager, getManager } from 'typeorm'
import { Context } from 'vm'
import { User } from '../entity/user'
import admin from 'firebase-admin'
import { Role } from './roleManagement'

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

// Check if user is logged in
export const customAuthChecker: AuthChecker<Context> = async ({ context }) =>
  {
    return await addCurrentUserToRequest(context.request).then(async ({user}) => {
      return getManager().findOneOrFail(User, {uid: user.uid,}).then(user => {
        if (!user) return false; // user not found
        return true; // user valid (logged in), no roles required
      })
    })
  }