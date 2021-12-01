import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { EntityManager, getManager } from 'typeorm'
import { Organization, OrganizationInput } from '../entity/organization'
import { Role } from '../entity/role'
import { User } from '../entity/user'
import { CreateUserOrganization, UserOrganization } from '../entity/userOrganization'
import { CurrentUser } from '../middleware/currentUserParamDecorator'

@Resolver()
export class OrganizationResolver {
  manager: EntityManager = getManager()

  // -------
  // CREATE
  // -------
  // ADD AN ORGANIZATION WITH AN OWNER [USER ITSELF]
  // @Authorized() // Check if user is logged in
  @Mutation(() => Organization, { nullable: true })
  async addOrganization(
    @Arg('organization') newOrganizationData: OrganizationInput,
    @CurrentUser() user: User
  ): Promise<Organization> {
    const newOrganization: Organization = await this.manager.create(
      Organization,
      newOrganizationData
    )

    this.manager.save(newOrganization).then(async organization => {
      console.log(user)
      // // Set this user as admin
      // const organizationOwnerData : CreateUserOrganization = {
      //   organization: organization,
      //   user: new User(),
      //   role: new Role()
      // }

      // const newOrganizationOwner = await this.manager.create(
      //   UserOrganization,
      //   organizationOwnerData
      // )

      // return await this.manager.save(newOrganizationOwner)
    })

    throw new Error("Failed to add organization")
  }

  // ADD AN ORGANIZATION WITH A (CUSTOM) OWNER [ONLY APP ADMIN]
  @Mutation(() => Organization, { nullable: true })
  async addOrganizationWithCustomOwner(
    @Arg('organization') newOrganizationData: OrganizationInput,
    @Arg('user_id') owner: User
  ): Promise<Organization> {
    const newOrganization: Organization = await this.manager.create(
      Organization,
      newOrganizationData
    )
    return await this.manager.save(newOrganization)
  }

  // -------
  // READ
  // -------
  @Query(() => [Organization], { nullable: true })
  async getOrganizations(
  ): Promise<Organization[]> {
    return await this.manager.find(Organization, { relations: ['registers'] })
  }

  @Query(() => Organization, { nullable: true })
  async getOrganizationById(
    @Arg('id') id: string,
    @CurrentUser() user: User
  ): Promise<Organization | undefined | null> {
    console.log("Current user: ", user)
    return await this.manager.findOne(Organization, id, {relations: ['registers']})
  }

  // -------
  // UPDATE
  // -------

  // -------
  // DELETE
  // -------
}
