import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { EntityManager, getManager } from 'typeorm'
import { Role, RoleManager } from '../auth/roleManagement'
import { Organization, OrganizationInput } from '../entity/organization'
import { Permission } from '../entity/permission'
import { User } from '../entity/user'
import { CurrentUser } from '../middleware/currentUserParamDecorator'

@Resolver()
export class OrganizationResolver {
  manager: EntityManager = getManager()
  roleManager: RoleManager = new RoleManager()

  // -------
  // CREATE
  // -------
  // @Authorized() // is logged in?
  @Mutation(() => Organization, { nullable: true })
  async addOrganization(
    @Arg('organization') newOrganizationData: OrganizationInput,
    @CurrentUser() user: User,
  ) {
    try {
      // Create organization
      const newOrganization = this.manager.create(Organization, {
        ...newOrganizationData,
      })

      return await this.manager
        .save(newOrganization)
        .then(async savedOrganization => {
          // DEFINE OWNER PERMISSION
          const ownerPerms = this.manager.create(Permission, {
            user: user,
            organization: savedOrganization,
            role: Role.OWNER,
          })
          // ADD THIS PERMISSION TO THE USER
          return await this.roleManager
            .addPermission(ownerPerms)
            .then(() => {
              // SUCCES > RETURN USER
              return savedOrganization
            })
            .catch(async error => {
              // FAIL > REMOVE ORGANIZATION
              await this.manager.remove(savedOrganization)
              throw error
            })
        })
    } catch (error:any) {
      console.error("⛔ " + error.message)
      throw error
    }
  }

  // -------
  // READ
  // -------
  @Query(() => [Organization], { nullable: true })
  async getOrganizations(@CurrentUser() user: any): Promise<Organization[]> {
    console.log(user.roles)
    return await this.manager.find(Organization, { relations: ['registers'] })
  }

  @Authorized()
  @Query(() => Organization, { nullable: true })
  async getOrganizationById(
    @Arg('id') id: string,
    @CurrentUser() user: any,
  ): Promise<Organization | undefined | null> {
    // Check if user has correct perms
    const authorized = this.roleManager.hasOrganizationRole(user, id, [
      Role.OWNER,
    ])
    if (!authorized) throw Error('You do not have the right permissions.')

    return await this.manager.findOne(Organization, id, {
      relations: ['registers'],
    })
  }

  // -------
  // UPDATE
  // -------

  // -------
  // DELETE
  // -------
}
