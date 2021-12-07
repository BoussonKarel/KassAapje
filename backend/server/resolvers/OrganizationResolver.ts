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
  // @Mutation(() => Organization, { nullable: true })
  // async addOrganization(
  //   @Arg('organization') newOrganizationData: OrganizationInput,
  //   @CurrentUser() user: User,
  // ): Promise<Organization> {

  //   // GET OWNER ROLE
  //   const orgOwnerRole = await this.manager.findOneOrFail(Role, {where: {name: "OWNER", type: roleTypes.ORGANIZATION}})

  //   // ASSIGN OWNER ROLE TO USER
  //   const userRole = this.manager.create(UserRole, {
  //     user: user,
  //     role: orgOwnerRole
  //   })
    
  //   // CREATE THE ORGANIZATION, WITH THE ASSIGNED ROLE
  //   const newOrganization = await this.manager.create(Organization, {
  //     ...newOrganizationData,
  //     userRoles: [userRole]
  //   });

  //   // ADD THE ROLE TO THE CLAIMS?
  //   return await this.manager.save(newOrganization).then(async savedOrganization => {
  //     return await addRoleToClaims(user, savedOrganization.userRoles![0]).then(async success => {
  //       console.log(savedOrganization.userRoles)
  //       if (!success) {
  //         // "UNDO" THE ADDING OF THE TRANSACTION
  //         await this.manager.remove(savedOrganization);
  //         throw new Error("Could not add role to claims");
  //       }
  //       return savedOrganization;
  //     });
  //   })
  // }

  // ADD AN ORGANIZATION WITH A (CUSTOM) OWNER [ONLY APP ADMIN]
  @Mutation(() => Organization, { nullable: true })
  async addOrganizationWithCustomOwner(
    @Arg('organization') newOrganizationData: OrganizationInput,
    @Arg('user_id') owner: string,
  ): Promise<Organization> {
    const newOrganization: Organization = await this.manager.create(
      Organization,
      newOrganizationData,
    )
    return await this.manager.save(newOrganization)
  }

  // -------
  // READ
  // -------
  @Query(() => [Organization], { nullable: true })
  async getOrganizations(@CurrentUser() user: any): Promise<Organization[]> {
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
