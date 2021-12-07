import { Field, ID, InputType, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
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

  @Field(() => Register)
  @ManyToOne(() => Register, r => r.products)
  @JoinColumn({ name: 'register_id' })
  register!: Register

  @Field()
  @Column()
  name?: string

  @Field()
  @Column('decimal')
  price?: number

  @Field()
  @Column('bool')
  stock_is_managed?: boolean

  @Field({nullable: true})
  @Column('int', { nullable: true})
  stock_quantity?: number

  @Field()
  @Column('bool')
  allow_backorders?: boolean

  @Field(() => [Variation], { nullable: true})
  @OneToMany(() => Variation, v => v.product, {eager: true, cascade: ['insert']})
  variations?: Variation[]

  @Field(() => [OrderItem], { nullable: true})
  @OneToMany(() => OrderItem, oi => oi.product)
  orderItems?: OrderItem[]
}

@InputType('ProductInput')
export class ProductInput {
  @Field(() => ID, { nullable: true})
  product_id?: string

  @Field()
  register_id?: string

  @Field()
  name?: string

  @Field()
  price?: number

  @Field()
  stock_is_managed?: boolean

  @Field({nullable: true})
  stock_quantity?: number

  @Field()
  allow_backorders?: boolean

  @Field(() => [ProductVariationInput], { nullable: true})
  variations?: ProductVariationInput[]
}
