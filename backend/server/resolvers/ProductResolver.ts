import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { EntityManager, getManager } from 'typeorm'
import { Role, RoleManager } from '../auth/roleManagement'
import { Product, ProductInput, ProductUpdateInput } from '../entity/product'
import { Register } from '../entity/register'
import { User } from '../entity/user'
import { CurrentUser } from '../middleware/currentUserParamDecorator'

@Resolver()
export class ProductResolver {
  manager: EntityManager = getManager()
  roleManager: RoleManager = new RoleManager()

  // -------
  // CREATE
  // -------
  @Mutation(() => Product)
  async addProduct(
    @Arg('product') productData: ProductInput,
    @CurrentUser() user: User,
  ): Promise<Product> {
    try {
      // Check if user has permissions
      return await this.roleManager
        .hasRegisterRole(user, productData.register_id, [Role.OWNER])
        .then(async () => {
          // NIEUW PRODUCT AANMAKEN
          const newProduct: Product = await this.manager.create(
            Product,
            productData,
          )

          // REGISTER TOEVOEGEN
          newProduct.register = await this.manager.findOneOrFail(
            Register,
            productData.register_id,
          ).catch(() => {
            throw new Error("Could not find the register you are trying to add a product to.")
          })

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
      return await this.roleManager
        .hasRegisterRole(user, registerId, [Role.OWNER, Role.USER])
        .then(async () => {
          // ...then find products
          return await this.manager.find(Product, {where: {register_id: registerId}})
        })
    } catch (error: any) {
      console.error(`⛔ (${user.email}) ` + error.message)
      throw error
    }
  }

  @Query(() => Product)
  async getProductById(
    @Arg('id') productId: string,
    @CurrentUser() user: User,
  ): Promise<Product> {
    try {
      const foundProduct = await this.manager
        .findOneOrFail(Product, productId)
        .catch(e => {
          throw new Error('Could not find that product.')
        })

        if (foundProduct.register_id) {
          return await this.roleManager
          .hasRegisterRole(user, foundProduct.register_id, [
            Role.USER,
            Role.OWNER,
          ])
          .then(() => {
            return foundProduct
          })
        }
        // Has no register, can be accessed by anyone I guess?
        else return foundProduct;

      
    } catch (error: any) {
      console.error(`⛔ (${user.email}) ` + error.message)
      throw error
    }
  }

  // -------
  // UPDATE
  // -------
  @Mutation(() => Product)
  async updateProduct(
    @Arg('product') productData: ProductUpdateInput,
    @CurrentUser() user: User,
  ): Promise<Product> {
    try {
      // DOES PRODUCT EXIST (if so get id and register id)
      const existingProduct = await this.manager
        .createQueryBuilder(Product, 'p')
        .where('p.product_id = :id', { id: productData.product_id })
        .select('p.product_id')
        .leftJoin('p.register', 'r')
        .addSelect('r.register_id')
        .getOneOrFail()
        .catch(() => {
          throw new Error(
            'Could not find the product you are trying to update.',
          )
        })

      // DOES USER HAVE ROLE
      return await this.roleManager
        .hasRegisterRole(user, existingProduct.register.register_id, [
          Role.OWNER,
        ])
        .then(async () => {
          const updatingProduct: Product = await this.manager.create(
            Product,
            productData,
          )

          // SAVE PRODUCT
          return await this.manager.save(updatingProduct)
        })
    } catch (error: any) {
      console.error(`⛔ (${user.email}) ` + error.message)
      throw error
    }
  }

  // -------
  // DELETE
  // -------
  @Mutation(() => Number)
  async removeProduct(
    @Arg('id') productId: string,
    @CurrentUser() user: User,
  ) {
    try {
      // DOES PRODUCT EXIST (if so get id and register id)
      const existingProduct = await this.manager.findOneOrFail(Product, productId)
        .catch(() => {
          throw new Error(
            'Could not find the product you are trying to remove.',
          )
        })

      // DOES USER HAVE ROLE
      return await this.roleManager
        .hasRegisterRole(user, existingProduct.register_id, [
          Role.OWNER,
        ])
        .then(async () => {
          const {affected} = await this.manager.createQueryBuilder(Product, 'p')
          .update().set({
            register: () => "null"
          }).where("product_id = :id", {id: productId}).execute();

          if (!affected) throw Error('Could not \'delete\' product (<1 affected)')
          return affected
        })
    } catch (error: any) {
      console.error(`⛔ (${user.email}) ` + error.message)
      throw error
    }
  }
}
