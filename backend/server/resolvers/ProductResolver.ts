import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { EntityManager, getManager } from "typeorm";
import { Product, ProductInput } from "../entity/product";
import { Register } from "../entity/register";
import { Variation } from "../entity/variation";

@Resolver()
export class ProductResolver {
  manager: EntityManager = getManager()

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
    @Arg('register_id') registerId: string
  ): Promise<Product[]> {
    return await this.manager.find(Product, {relations: ['variations']})
  }

  @Query(() => Product, { nullable: true })
  async getProductById(
    @Arg('id') id: string,
  ): Promise<Product | undefined | null> {
    return await this.manager.findOne(Product, id, {relations: ['variations']})
  }

  // -------
  // UPDATE
  // -------

  // -------
  // DELETE
  // -------
}
