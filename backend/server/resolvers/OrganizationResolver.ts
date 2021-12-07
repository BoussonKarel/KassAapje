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
    // Create organization
    const newOrganization = this.manager.create(Organization, {
      ...newOrganizationData,
    })

    return await this.manager
      .save(newOrganization)
      .then(async savedOrganization => {
        // SET USER's roles
        const ownerPerms = this.manager.create(Permission, {
          user: user,
          organization: savedOrganization,
          role: Role.OWNER,
        })
        return await this.roleManager.addPermission(ownerPerms).then(() => {
          return savedOrganization
        }).catch(async error => {
          await this.manager.remove(savedOrganization);
          throw error;
        })
      })
  }

  // -------
  // READ
  // -------
  @Query(() => [Organization], { nullable: true })
  async getOrganizations(
    @CurrentUser() user: any
  ): Promise<Organization[]> {
    console.log(user.roles)
    return await this.manager.find(Organization, { relations: ['registers'] })
  }

  @Query(() => Organization, { nullable: true })
  async getOrganizationById(
    @Arg('id') id: string,
  ): Promise<Organization | undefined | null> {
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
