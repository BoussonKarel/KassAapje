import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { EntityManager, getManager } from 'typeorm'
import { Organization } from '../entity/organization'
import { Register, RegisterInput } from '../entity/register'

@Resolver()
export class RegisterResolver {
  manager: EntityManager = getManager()

  // -------
  // CREATE
  // -------

  // -------
  // READ
  // -------
  @Authorized()
  @Query(() => [Register], { nullable: true })
  async getRegisters(): Promise<Register[]> {
    return await this.manager.find(Register, {relations: ['organization']})
  }

  @Authorized()
  @Query(() => [Register], { nullable: true })
  async getRegistersByOrganization(
    @Arg('organization_id') organization_id: string,
  ): Promise<Register[]> {
    return await this.manager.find(Register, {
      where: {
        organization: { organization_id: organization_id },
      }
    })
  }

  @Authorized()
  @Query(() => Register, { nullable: true })
  async getRegisterById(
    @Arg('id') id: string,
  ): Promise<Register | undefined | null> {
    return await this.manager.findOne(Register, id)
  }

  // -------
  // UPDATE
  // -------

  // -------
  // DELETE
  // -------
}
