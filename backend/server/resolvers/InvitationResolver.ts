import { Arg, Mutation, Resolver } from 'type-graphql'
import { EntityManager, getManager } from 'typeorm'
import { Role, RoleManager } from '../auth/roleManagement'
import { Organization } from '../entity/organization'
import { Permission } from '../entity/permission'
import { Register } from '../entity/register'
import { Invitation, InvitationInfo } from '../entity/roleInvitation'
import { User } from '../entity/user'
import { CurrentUser } from '../middleware/currentUserParamDecorator'

@Resolver()
export class InvitationResolver {
  manager: EntityManager = getManager()
  roleManager: RoleManager = new RoleManager()

  // -------
  // CREATE
  // -------
  @Mutation(() => Invitation)
  async createInvitation(
    @Arg('invitation') invitationData: Invitation,
    @CurrentUser() user: User,
  ) {
    try {
      if (invitationData.organization_id && invitationData.register_id)
        throw new Error(
          'Can not make invitation for both organization and register at once.',
        )

      let hasRole
      if (invitationData.organization_id) {
        hasRole = await this.roleManager.hasOrganizationRole(
          user,
          invitationData.organization_id,
          [Role.OWNER],
        )
      }
      if (invitationData.register_id) {
        hasRole = await this.roleManager.hasRegisterRole(
          user,
          invitationData.register_id,
          [Role.OWNER],
        )
      }

      const newInvitation = this.manager.create(Invitation, invitationData)

      // SET EXPIRATION DATE
      const expDate = new Date(Date.now())
      expDate.setDate(expDate.getDate() + 14)
      newInvitation.expiration_date = expDate

      return await this.manager.save(newInvitation)
    } catch (error: any) {
      console.error(`⛔ (${user.email}) ` + error.message)
      throw error
    }
  }

  @Mutation(() => Boolean)
  async acceptInvitation(
    @Arg('id') invitationId: string,
    @CurrentUser() user: User,
  ) {
    try {
      // Search for invitation
      const invitation = await this.manager
        .findOneOrFail(Invitation, invitationId)
        .catch(() => {
          throw new Error('Could not find that invitation.')
        })

      // Expired?
      const expired = invitation.expiration_date < new Date(Date.now())

      if (expired) throw new Error('Invitation has expired.')
      else {
        // DEFINE PERMISSION
        const perms = this.manager.create(Permission, {
          user: user,
          role: invitation.role,
          organization_id: invitation.organization_id,
          register_id: invitation.register_id,
        })

        return await this.roleManager
          .addPermission(perms)
          .then(async () => {
            // SUCCESS > REMOVE INVITATION FROM DATABASE
            await this.manager.delete(Invitation, invitationId)
            return true
          })
          .catch(async error => {
            // FAIL
            console.error({ error })
            throw new Error('Something went wrong saving your new permissions.')
          })
      }
    } catch (error: any) {
      console.error(`⛔ (${user.email}) ` + error.message)
      throw error
    }
  }

  // -------
  // READ
  // -------
  @Mutation(() => InvitationInfo)
  async getInvitationInfo(@Arg('id') invitationId: string) {
    try {
      const invitation = await this.manager
        .findOneOrFail(Invitation, invitationId)
        .catch(e => {
          console.error(e)
          throw new Error('Could not find that invitation.')
        })

      console.log({ invitation })
      return invitation
    } catch (error: any) {
      console.error(`⛔ (GUEST) ` + error.message)
      throw error
    }
  }

  // -------
  // UPDATE
  // -------

  // -------
  // DELETE
  // -------
}
