import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { EntityManager, getManager } from "typeorm";
import { Product, ProductInput } from "../entity/product";
import { Register } from "../entity/register";

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
    newProduct.register = new Register();
    newProduct.register.register_id = productData.register_id;
    
    return await this.manager.save(newProduct)
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
    @Arg('product_id') id: string,
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
