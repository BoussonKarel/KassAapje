import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { EntityManager, getManager } from 'typeorm'
import { Role, RoleManager } from '../auth/roleManagement'
import { Order, OrderInput } from '../entity/order'
import { Register } from '../entity/register'
import { User } from '../entity/user'
import { CurrentUser } from '../middleware/currentUserParamDecorator'

@Resolver()
export class OrderResolver {
  manager: EntityManager = getManager()
  roleManager: RoleManager = new RoleManager()

  // -------
  // CREATE
  // -------
  @Mutation(() => Order)
  async addOrder(
    @Arg('order') newOrderData: OrderInput,
    @CurrentUser() user: User,
  ): Promise<Order> {
    try {
      // Check if user has permissions
      return await this.roleManager
        .hasRegisterRole(user, newOrderData.register_id, [Role.OWNER])
        .then(async () => {
          // NIEUWE ORDER aanmaken
          const newOrder: Order = await this.manager.create(Order, newOrderData)

          // REGISTER TOEVOEGEN & TEGELIJK EEN CHECK
          newOrder.register = await this.manager
            .findOneOrFail(Register, newOrderData.register_id)
            .catch(() => {
              throw new Error(
                'Could not find the register you are trying to add an order to.',
              )
            })

          // SELLER TOEVOEGEN
          newOrder.seller = user

          // SAVE ORDER
          return await this.manager.save(newOrder)
        })
    } catch (error: any) {
      console.error(`⛔ (${user.email}) ` + error.message)
      throw error
    }
  }

  // -------
  // READ
  // -------
  @Query(() => [Order], { nullable: true })
  async getOrders(
    @Arg('register_id') registerId: string,
    @CurrentUser() user: User,
  ): Promise<Order[]> {
    try {
      // If authorized
      return await this.roleManager
        .hasRegisterRole(user, registerId, [Role.OWNER, Role.USER])
        .then(async () => {
          return await this.manager.find(Order)
        })
    } catch (error: any) {
      console.error(`⛔ (${user.email}) ` + error.message)
      throw error
    }
  }

  @Query(() => Order, { nullable: true })
  async getOrderById(
    @Arg('id') orderId: string,
    @CurrentUser() user: User,
  ): Promise<Order> {
    try {
      const foundOrder = await this.manager
        .findOneOrFail(Order, orderId)
        .catch(e => {
          throw new Error('Could not find that order.')
        })

      return await this.roleManager
        .hasRegisterRole(user, foundOrder.register_id, [Role.USER, Role.OWNER])
        .then(() => {
          return foundOrder
        })
    } catch (error: any) {
      console.error(`⛔ (${user.email}) ` + error.message)
      throw error
    }
  }

  // -------
  // UPDATE
  // -------

  // -------
  // DELETE
  // -------
  @Mutation(() => Number)
  async removeOrder(@Arg('id') orderId: string, @CurrentUser() user: User) {
    try {
      // DOES ORDER EXIST
      const existingOrder = await this.manager
        .findOneOrFail(Order, orderId)
        .catch(() => {
          throw new Error('Could not find the order you are trying to remove.')
        })

      // DOES USER HAVE ROLE
      return await this.roleManager
        .hasRegisterRole(user, existingOrder.register_id, [Role.OWNER])
        .then(async () => {
          const { affected } = await this.manager.delete(Order, orderId)

          if (!affected) throw Error("Could not delete order (<1 affected)")
          return affected
        })
    } catch (error: any) {
      console.error(`⛔ (${user.email}) ` + error.message)
      throw error
    }
  }
}
