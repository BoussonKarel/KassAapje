import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { EntityManager, getManager } from 'typeorm'
import { Role, RoleManager } from '../auth/roleManagement'
import { Organization, OrganizationInput, OrganizationUpdateInput } from '../entity/organization'
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
  @Authorized() // is logged in
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
    } catch (error: any) {
      console.error('⛔ ' + error.message)
      throw error
    }
  }

  // -------
  // READ
  // -------
  @Query(() => [Organization], { nullable: true })
  async getOrganizations(): Promise<Organization[]> {
    return await this.manager.find(Organization, { relations: ['registers'] })
  }

  @Authorized()
  @Query(() => Organization, { nullable: true })
  async getOrganizationById(
    @Arg('id') id: string,
    @CurrentUser() user: any,
  ): Promise<Organization | undefined | null> {
    try {
      // Check if user has correct perms
      const authorized = this.roleManager.hasOrganizationRole(user, id, [Role.OWNER,])
      if (!authorized) throw Error('You do not have the right permissions.')

      return await this.manager.findOne(Organization, id, {
        relations: ['registers'],
      })
    } catch (error: any) {
      console.error('⛔ ' + error.message)
      throw error
    }
  }

  // -------
  // UPDATE
  // -------
  @Authorized()
  @Mutation(() => Organization, { nullable: true })
  async updateOrganization(
    @Arg('organization') updatingOrganizationData: OrganizationUpdateInput,
    @CurrentUser() user: User,
  ) {
    try {
      // Check if user has correct perms
      const authorized = this.roleManager.hasOrganizationRole(user, updatingOrganizationData.organization_id, [Role.OWNER,])
      if (!authorized) throw Error('You do not have the right permissions.')

      // Does organization exist?
      return await this.manager.findOneOrFail(Organization, updatingOrganizationData.organization_id).then(organization => {
        // Exists => update
        const updatingOrganization = this.manager.create(Organization,
          updatingOrganizationData
        )
        return this.manager.save(Organization, {...updatingOrganization});
      }).catch(e => {
        throw new Error("Organization not found.")
      })
    } catch (error: any) {
      console.error("⛔ " + error.message)
      throw error;
    }
  }
  // -------
  // DELETE
  // -------
}
