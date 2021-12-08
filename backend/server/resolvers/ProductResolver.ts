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
    @Arg('product') productData: ProductInput
  ): Promise<Product> {


    if (productData.variations) {
      productData.variations.forEach(v => v.product_id = productData.product_id)
    }

    const newProduct : Product = await this.manager.create(
      Product,
      productData
    )
    newProduct.register = await this.manager.findOneOrFail(Register, productData.register_id)

    // ADD AND SAVE VARIATIONS
    if (productData.variations) {
      const variations : Variation[] = [];
      for (const variationInput of productData.variations) {
        const newVariation : Variation = await this.manager.create(
          Variation,
          variationInput
        )

        variations.push(newVariation);
      }

      newProduct.variations = variations;
    }
    
    // SAVE PRODUCT
    const savedProduct = await this.manager.save(newProduct)

    return savedProduct;
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
