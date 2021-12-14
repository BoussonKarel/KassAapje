import { Field, ID, InputType, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  ObjectID,
  ObjectIdColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { generateUID } from '../helpers/generateUID'
import { Order } from './order'
import { Product, ProductOrderInput } from './product'
import { Register } from './register'
import { Variation, VariationOrderInput } from './variation'

@ObjectType()
@Entity('order_items')
export class OrderItem extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  orderitem_id?: string

  @Field(() => Order)
  @ManyToOne(() => Order, r => r.order_items, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'order_id' })
  order!: Order

  @Field(() => Product)
  @ManyToOne(() => Product, p => p.orderItems)
  @JoinColumn({ name: 'product_id' })
  product!: Product

  @Field(() => Variation)
  @ManyToOne(() => Variation, v => v.orderItems)
  @JoinColumn({ name: 'variation_id' })
  variation?: Variation

  @Field()
  @Column('decimal')
  price?: number

  @Field()
  @Column('int')
  quantity?: number

  @Field()
  @Column()
  delivered?: boolean
}

@InputType('OrderItemInput')
export class OrderItemInput {
  @Field(() => ID, { nullable: true})
  orderitem_id?: string

  @Field(() => ProductOrderInput)
  product!: ProductOrderInput

  @Field(() => VariationOrderInput, { nullable: true})
  variation?: VariationOrderInput

  @Field()
  price?: number

  @Field()
  quantity?: number

  @Field()
  delivered?: boolean
}