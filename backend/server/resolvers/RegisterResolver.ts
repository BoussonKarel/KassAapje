import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { DeleteResult, EntityManager, getManager } from 'typeorm'
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
      return await this.roleManager
        .hasOrganizationRole(user, newRegisterData.organization_id, [
          Role.OWNER,
        ])
        .then(async () => {
          // Add register
          const newRegister = this.manager.create(Register, {
            ...newRegisterData,
            organization: { organization_id: newRegisterData.organization_id },
          })

          return this.manager.save(newRegister).catch(e => {
            throw new Error('Could not save new register.')
          })
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
    try {
      // Check if user has correct perms
      return await this.roleManager
        .hasOrganizationRole(user, organization_id, [Role.OWNER])
        .then(async () => {
          return await this.manager.find(Register, {
            where: {
              organization: { organization_id: organization_id },
            },
          })
        })
    } catch (error: any) {
      console.error(`⛔ (${user.email}) ` + error.message)
      throw error
    }
  }

  @Authorized()
  @Query(() => Register, { nullable: true })
  async getRegisterById(
    @Arg('id') id: string,
    @CurrentUser() user: User,
  ): Promise<Register | undefined | null> {
    try {
      return await this.roleManager
        .hasRegisterRole(user, id, [Role.USER, Role.OWNER])
        .then(async () => {
          return await this.manager.findOne(Register, id)
        })
    } catch (error: any) {
      console.error(`⛔ (${user.email}) ` + error.message)
      throw error
    }
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
      const updatingRegister = this.manager.create(
        Register,
        updatingRegisterData,
      )

      // Check if user has correct perms
      // This also checks if it exists
      return await this.roleManager
        .hasRegisterRole(user, updatingRegister.register_id, [Role.OWNER])
        .then(async () => {
          return await this.manager.save(Register, {
            ...updatingRegister,
          })
        })
    } catch (error: any) {
      console.error('⛔ ' + error.message)
      throw error
    }
  }

  // -------
  // DELETE
  // -------
  @Authorized()
  @Mutation(() => Number)
  async removeRegister(
    @Arg('id') register_id: string,
    @CurrentUser() user: User,
  ): Promise<Number> {
    try {
      // Check if user has correct perms
      return await this.roleManager
        .hasRegisterRole(user, register_id, [Role.OWNER])
        .then(async () => {
          const { affected } = await this.manager.delete(Register, register_id)
          if (!affected) throw Error('Could not delete register (<1 affected)')
          return affected
        })
    } catch (error: any) {
      console.error(`⛔ (${user.email}) ` + error.message)
      throw error
    }
  }
}
