import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { EntityManager, getManager } from 'typeorm'
import { Organization } from '../entity/organization'
import { Register, RegisterInput } from '../entity/register'

@Resolver()
export class RegisterResolver {
  manager: EntityManager = getManager()

  // -------
  // CREATE
  // -------
  @Mutation(() => Register, { nullable: true })
  async addRegister(
    @Arg('register') registerData: RegisterInput
  ): Promise<Register> {
    const newRegister: Register = await this.manager.create(
      Register,
      registerData
    )
    newRegister.organization = await this.manager.findOneOrFail(Organization, registerData.organization_id)
    return await this.manager.save(newRegister)
  }

  // -------
  // READ
  // -------
  @Query(() => [Register], { nullable: true })
  async getRegisters(): Promise<Register[]> {
    return await this.manager.find(Register, {relations: ['organization']})
  }

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
