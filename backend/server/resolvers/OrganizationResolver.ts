import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { EntityManager, getManager } from 'typeorm'
import { Organization, OrganizationInput } from '../entity/organization'
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
  ): Promise<Organization> {
    const newOrganization: Organization = await this.manager.create(
      Organization,
      newOrganizationData
    )

    this.manager.save(newOrganization).then(async organization => {
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
    @Arg('user_id') owner: string
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
    @CurrentUser() user: any
  ): Promise<Organization[]> {
    
    console.log({user})
    return await this.manager.find(Organization, { relations: ['registers'] })
  }

  @Query(() => Organization, { nullable: true })
  async getOrganizationById(
    @Arg('id') id: string
  ): Promise<Organization | undefined | null> {
    return await this.manager.findOne(Organization, id, {relations: ['registers']})
  }

  // -------
  // UPDATE
  // -------

  // -------
  // DELETE
  // -------
}
