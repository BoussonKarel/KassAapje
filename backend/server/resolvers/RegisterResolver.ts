import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { EntityManager, getManager } from 'typeorm'
import { Role, RoleManager } from '../auth/roleManagement'
import { Organization } from '../entity/organization'
import {
  Register,
  RegisterInput,
  RegisterUpdateInput,
} from '../entity/register'
import { User } from '../entity/user'
import { CurrentUser } from '../middleware/currentUserParamDecorator'

@Resolver()
export class RegisterResolver {
  manager: EntityManager = getManager()
  roleManager: RoleManager = new RoleManager()

  // -------
  // CREATE
  // -------
  @Authorized()
  @Mutation(() => Register, { nullable: true })
  async addRegister(
    @Arg('register') newRegisterData: RegisterInput,
    @CurrentUser() user: User,
  ): Promise<Register> {
    try {
      // Check if user has correct perms
      const authorized = this.roleManager.hasOrganizationRole(
        user,
        newRegisterData.organization_id,
        [Role.OWNER],
      )
      if (!authorized)
        throw Error(
          'You do not have the right permissions on that organization.',
        )

      // Add register
      const newRegister = this.manager.create(Register, {
        ...newRegisterData,
        organization: { organization_id: newRegisterData.organization_id },
      })

      return this.manager.save(newRegister).catch(e => {
        throw new Error('Could not save new register.')
      })
    } catch (error: any) {
      console.error('⛔ ' + error.message)
      throw error
    }
  }

  // -------
  // READ
  // -------
  @Authorized()
  @Query(() => [Register], { nullable: true })
  async getRegisters(): Promise<Register[]> {
    return await this.manager.find(Register, { relations: ['organization'] })
  }

  @Authorized()
  @Query(() => [Register], { nullable: true })
  async getRegistersByOrganization(
    @Arg('organization_id') organization_id: string,
    @CurrentUser() user: User,
  ): Promise<Register[]> {
    // Check if user has correct perms
    const authorized = this.roleManager.hasOrganizationRole(
      user,
      organization_id,
      [Role.OWNER],
    )
    if (!authorized)
      throw Error('You do not have the right permissions on that organization.')

    return await this.manager.find(Register, {
      where: {
        organization: { organization_id: organization_id },
      },
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
  @Authorized()
  @Mutation(() => Register, { nullable: true })
  async updateRegister(
    @Arg('register') updatingRegisterData: RegisterUpdateInput,
    @CurrentUser() user: User,
  ) {
    try {
      // Does register exist?
      const existingRegister = await this.manager
        .findOneOrFail(Register, updatingRegisterData.register_id, {
          relations: ['organization'],
        })
        .catch(e => {
          throw new Error('Register not found.')
        })

      const updatingRegister = this.manager.create(
        Register,
        updatingRegisterData,
      )

      // Exists => update
      if (existingRegister) {
        // Check if user has correct perms
        const authorized =
          this.roleManager.hasRegisterRole(user, existingRegister.register_id, [
            Role.OWNER,
          ])
        if (!authorized)
          throw Error(
            'You do not have the right permissions on that organization.',
          )

        // Save register
        return await this.manager.save(Register, {
          ...updatingRegister,
        })
      } else throw new Error('Register not found.')
    } catch (error: any) {
      console.error('⛔ ' + error.message)
      throw error
    }
  }

  // -------
  // DELETE
  // -------
}
