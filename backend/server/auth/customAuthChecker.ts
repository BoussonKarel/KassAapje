import { Request } from 'express'
import { AuthChecker } from 'type-graphql'
import { EntityManager, getManager } from 'typeorm'
import { Context } from 'vm'
import { User } from '../entity/user'
import admin from 'firebase-admin'
import { Role } from './roleManagement'
import { ErrorWithStatus } from '../models/errorWithStatus'

/**
 *@description checks if a user is authorized to use the requested query or mutation based on their role
 */
export const addCurrentUserToRequest = async (request: Request) : Promise<any> => {
  const headerToken = request.headers.authorization

  if (!headerToken) {
    throw new ErrorWithStatus("No token provided.", 401)
  }

  if (headerToken && headerToken.split(' ')[0] !== 'Bearer') {
    throw new ErrorWithStatus("Invalid token", 401)
  }

  const token = headerToken.split(' ')[1]

  return await admin.auth().verifyIdToken(token)
    .then(async claims => {
      ;(request as any).currentUser = claims
      return {user: claims};
    })
    .catch(error => {
      console.log(error)

      throw new ErrorWithStatus("Could not authorize.", 403)
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