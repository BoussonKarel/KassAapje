import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { getRepository, Repository } from 'typeorm'
import { Organization } from '../entity/organization'

@Resolver()
export class OrganizationResolver {
  public repository: Repository<Organization>

  constructor() {
    this.repository = getRepository(Organization)
  }

  // -------
  // CREATE
  // -------
  @Mutation(() => Organization, { nullable: true })
  async addOrganization(
    @Arg('data') newOrganizationData: Organization,
  ): Promise<Organization> {
    const organization: Organization = await this.repository.create(
      newOrganizationData
    )
    const newOrganization = await this.repository.save(organization)
    return newOrganization
  }

  // -------
  // READ
  // -------
  @Query(() => [Organization], { nullable: true })
  async getOrganizations(): Promise<Organization[]> {
    return await this.repository.find({ relations: ['registers'] })
  }

  @Query(() => Organization, { nullable: true })
  async getOrganizationById(
    @Arg('organization_id') id: string,
  ): Promise<Organization | undefined | null> {
    return await this.repository.findOne(id, {relations: ['registers']})
  }

  // -------
  // UPDATE
  // -------

  // -------
  // DELETE
  // -------
}
