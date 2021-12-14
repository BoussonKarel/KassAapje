import { Arg, Mutation, Resolver } from "type-graphql"
import { EntityManager, getManager } from "typeorm"
import { Role, RoleManager } from "../auth/roleManagement"
import { Order, OrderInput } from "../entity/order"
import { Register } from "../entity/register"
import { User } from "../entity/user"
import { CurrentUser } from "../middleware/currentUserParamDecorator"

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
          newOrder.register = await this.manager.findOneOrFail(
            Register,
            newOrderData.register_id,
          ).catch(() => {
            throw new Error("Could not find the register you are trying to add an order to.")
          })

          // SELLER TOEVOEGEN
          newOrder.seller = user;

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

  // -------
  // UPDATE
  // -------

  // -------
  // DELETE
  // -------
}