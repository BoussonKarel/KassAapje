import e from 'express'
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { EntityManager, getManager } from 'typeorm'
import { Role, RoleManager } from '../auth/roleManagement'
import {
  Organization,
  OrganizationInput,
  OrganizationUpdateInput,
} from '../entity/organization'
import { Permission } from '../entity/permission'
import { Register } from '../entity/register'
import { User } from '../entity/user'
import { CurrentUser } from '../middleware/currentUserParamDecorator'

@Resolver()
export class OrganizationResolver {
  manager: EntityManager = getManager()
  roleManager: RoleManager = new RoleManager()

  // -------
  // CREATE
  // -------
  @Authorized() // is logged in
  @Mutation(() => Organization, { nullable: true })
  async addOrganization(
    @Arg('organization') newOrganizationData: OrganizationInput,
    @CurrentUser() user: User,
  ) {
    try {
      // Create organization
      const newOrganization = this.manager.create(
        Organization,
        newOrganizationData,
      )

      return await this.manager
        .save(newOrganization)
        .then(async savedOrganization => {
          // DEFINE OWNER PERMISSION
          const ownerPerms = this.manager.create(Permission, {
            user: user,
            organization: savedOrganization,
            role: Role.OWNER,
          })
          // ADD THIS PERMISSION TO THE USER
          return await this.roleManager
            .addPermission(ownerPerms)
            .then(() => {
              // SUCCES > RETURN USER
              return savedOrganization
            })
            .catch(async error => {
              // FAIL > REMOVE ORGANIZATION
              await this.manager.remove(savedOrganization)
              throw error
            })
        })
    } catch (error: any) {
      console.error(`⛔ (${user.email}) ` + error.message)
      throw error
    }
  }

  // -------
  // READ
  // -------
  @Query(() => [Organization], { nullable: true })
  async getOrganizations(): Promise<Organization[]> {
    return await this.manager.find(Organization)
  }

  @Query(() => [Organization], { nullable: true })
  async getUserOrganizations(
    @CurrentUser() user: User
  ): Promise<Organization[]> {
    try {
      const data = await this.manager
      .createQueryBuilder(Organization, 'o')
      .leftJoin("o.permissions", "p")
      .addSelect("p.uid")
      .where("p.uid = :id", { id: user.uid })
      .leftJoinAndSelect("o.registers", "r")
      .getMany()
      .catch(e => {
        console.error(e)
        throw new Error('Could not fetch organizations for user.')
      });

      return data;
    }
    catch (error: any) {
      console.error(`⛔ (${user.email}) ` + error.message)
      throw error
    }
  }

  @Authorized()
  @Query(() => Organization, { nullable: true })
  async getOrganizationById(
    @Arg('id') id: string,
    @CurrentUser() user: any,
  ): Promise<Organization | undefined> {
    try {
      // Check if user has correct perms
      return await this.roleManager
        .hasOrganizationRole(user, id, [Role.USER, Role.OWNER])
        .then(async () => {
          return await this.manager.findOne(Organization, id)
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
  @Mutation(() => Organization, { nullable: true })
  async updateOrganization(
    @Arg('organization') updatingOrganizationData: OrganizationUpdateInput,
    @CurrentUser() user: User,
  ) {
    try {
      // Check if user has correct perms
      return await this.roleManager
        .hasOrganizationRole(user, updatingOrganizationData.organization_id, [
          Role.OWNER,
        ])
        .then(async () => {
          // Does organization exist?
          const existingOrganization = await this.manager.findOneOrFail(
            Organization,
            updatingOrganizationData.organization_id,
          )

          const updatingOrganization = this.manager.create(
            Organization,
            updatingOrganizationData,
          )

          // Exists => update
          if (existingOrganization)
            return await this.manager.save(Organization, {
              ...updatingOrganization,
            })
          else throw new Error('Organization not found.')
        })
    } catch (error: any) {
      console.error(`⛔ (${user.email}) ` + error.message)
      throw error
    }
  }

  // -------
  // DELETE
  // -------
  @Authorized()
  @Mutation(() => Number)
  async removeOrganization(
    @Arg('id') organizationId: string,
    @CurrentUser() user: User,
  ): Promise<Number> {
    try {
      // Check if user has correct perms
      return await this.roleManager
        .hasOrganizationRole(user, organizationId, [Role.OWNER])
        .then(async () => {
          const { affected } = await this.manager.delete(
            Organization,
            organizationId,
          )
          if (!affected)
            throw Error('Could not delete organization. Does it exist?')
          return affected
        })
    } catch (error: any) {
      console.error(`⛔ (${user.email}) ` + error.message)
      throw error
    }
  }
}
