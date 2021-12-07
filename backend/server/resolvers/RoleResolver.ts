import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { EntityManager, getManager } from 'typeorm'
import { CurrentUser } from '../middleware/currentUserParamDecorator';
import admin from 'firebase-admin';

@Resolver()
export class RoleResolver {
  manager: EntityManager = getManager()

  // -------
  // CREATE
  // -------

  // -------
  // READ
  // -------
  @Query(() => String)
  async getMyRoles(
    @CurrentUser() user: unknown
  ) {
    console.log({user})
    return "OK";
  }

  // -------
  // UPDATE
  // -------

  // -------
  // DELETE
  // -------
}