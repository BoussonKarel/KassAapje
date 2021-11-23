import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { EntityManager, getManager, getRepository, Repository } from 'typeorm'
import { Organization } from '../entity/organization'

@Resolver()
export class OrganizationResolver {
  manager: EntityManager = getManager()

  // -------
  // CREATE
  // -------
  @Mutation(() => Organization, { nullable: true })
  async addOrganization(
    @Arg('data') newOrganizationData: Organization,
  ): Promise<Organization> {
    const organization: Organization = await this.manager.create(
      Organization,
      newOrganizationData
    )
    const newOrganization = await this.manager.save(organization)
    return newOrganization
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
