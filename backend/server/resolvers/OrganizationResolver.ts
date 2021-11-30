import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { EntityManager, getManager } from 'typeorm'
import { Organization, OrganizationInput } from '../entity/organization'

@Resolver()
export class OrganizationResolver {
  manager: EntityManager = getManager()

  // -------
  // CREATE
  // -------
  @Mutation(() => Organization, { nullable: true })
  async addOrganization(
    @Arg('organization') newOrganizationData: OrganizationInput,
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
  async getOrganizations(): Promise<Organization[]> {
    return await this.manager.find(Organization, { relations: ['registers'] })
  }

  @Query(() => Organization, { nullable: true })
  async getOrganizationById(
    @Arg('organization_id') id: string,
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
