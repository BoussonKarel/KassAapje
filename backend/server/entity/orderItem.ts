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
import { Order } from './order'
import { Product } from './product'
import { Register } from './register'
import { Variation } from './variation'

@ObjectType()
@InputType('OrderItemInput')
@Entity('order_items')
export class OrderItem extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  orderitem_id?: string

  @Field(() => Register)
  @ManyToOne(() => Order, r => r.order_items)
  @JoinColumn({ name: 'order_id' })
  order!: Register

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
