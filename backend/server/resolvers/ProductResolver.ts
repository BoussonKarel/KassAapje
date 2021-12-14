import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { EntityManager, getManager } from "typeorm";
import { Role, RoleManager } from "../auth/roleManagement";
import { Product, ProductInput } from "../entity/product";
import { Register } from "../entity/register";
import { User } from "../entity/user";
import { Variation } from "../entity/variation";
import { CurrentUser } from "../middleware/currentUserParamDecorator";

@Resolver()
export class ProductResolver {
  manager: EntityManager = getManager()
  roleManager: RoleManager = new RoleManager();

  // -------
  // CREATE
  // -------
  @Mutation(() => Product, { nullable: true })
  async addProduct(
    @Arg('product') productData: ProductInput,
    @CurrentUser() user: User,
  ): Promise<Product> {
    try {
      // Check if user has permissions
      return await this.roleManager.hasRegisterRole(user, productData.register_id, [
        Role.OWNER
      ]).then(async () => {
        // NIEUW PRODUCT AANMAKEN
        const newProduct : Product = await this.manager.create(
          Product,
          productData
        )

        console.log({newProduct})
        console.log(newProduct.variations)

        // REGISTER TOEVOEGEN
        newProduct.register = await this.manager.findOneOrFail(Register, productData.register_id)

        // SAVE PRODUCT
        return await this.manager.save(newProduct)
      })
    } catch (error: any) {
      console.error(`⛔ (${user.email}) ` + error.message)
      throw error
    }
  }

  // -------
  // READ
  // -------
  @Query(() => [Product], { nullable: true })
  async getProducts(
    @Arg('register_id') registerId: string,
    @CurrentUser() user: User,
  ): Promise<Product[]> {
    try {
      // If authorized...
      return await this.roleManager.hasRegisterRole(user, registerId, [Role.OWNER, Role.USER]).then(async () => {
        // ...then find products
        return await this.manager.find(Product)
      })
    } catch (error: any) {
      console.error(`⛔ (${user.email}) ` + error.message)
      throw error;
    }
    
  }

  @Query(() => Product, { nullable: true })
  async getProductById(
    @Arg('id') id: string,
  ): Promise<Product | undefined | null> {
    return await this.manager.findOne(Product, id)
  }

  // -------
  // UPDATE
  // -------

  // -------
  // DELETE
  // -------
}
