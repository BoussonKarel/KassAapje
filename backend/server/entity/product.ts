import { Field, ID, InputType, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { OrderItem } from './orderItem'
import { Register } from './register'
import { ProductVariationInput, Variation } from './variation'

@ObjectType()
@Entity('products')
export class Product extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  product_id?: string

  @Field({nullable: true})
  @Column({nullable: true})
  register_id?: string

  @Field(() => Register)
  @ManyToOne(() => Register, r => r.products, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'register_id' })
  register!: Register

  @Field()
  @Column()
  name?: string

  @Field()
  @Column({type: 'decimal', precision: 10, scale:2})
  price?: number

  @Field()
  @Column('bool')
  stock_is_managed?: boolean = false

  @Field({ nullable: true })
  @Column('int', { nullable: true })
  stock_quantity?: number

  @Field()
  @Column('bool')
  allow_backorders?: boolean = false

  @Field(() => [Variation], { nullable: true })
  @OneToMany(() => Variation, v => v.product, {
    eager: true, // always include in 'find'
    cascade: true, // always update (add, update, remove) in 'save'
  })
  variations?: Variation[]

  @Field(() => [OrderItem], { nullable: true })
  @OneToMany(() => OrderItem, oi => oi.product)
  orderItems?: OrderItem[]
}

@InputType('ProductInput')
export class ProductInput {
  @Field(() => ID, { nullable: true })
  product_id?: string

  @Field()
  register_id!: string

  @Field()
  name?: string

  @Field()
  price?: number

  @Field({ nullable: true })
  stock_is_managed?: boolean

  @Field({ nullable: true })
  stock_quantity?: number

  @Field({ nullable: true })
  allow_backorders?: boolean = false

  @Field(() => [ProductVariationInput], { nullable: true })
  variations?: ProductVariationInput[]
}

@InputType('ProductUpdateInput')
export class ProductUpdateInput {
  @Field(() => ID)
  product_id!: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  price?: number

  @Field({ nullable: true })
  stock_is_managed?: boolean

  @Field({ nullable: true })
  stock_quantity?: number

  @Field({ nullable: true })
  allow_backorders?: boolean = false

  @Field(() => [ProductVariationInput], { nullable: true })
  variations?: ProductVariationInput[]
}

@InputType('ProductOrderInput')
export class ProductOrderInput {
  @Field(() => ID)
  product_id!: string
}