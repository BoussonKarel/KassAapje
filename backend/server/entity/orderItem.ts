import { Field, ID, InputType, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Order } from './order'
import { Product } from './product'
import { Variation } from './variation'

@ObjectType()
@Entity('order_items')
export class OrderItem extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  orderitem_id?: string

  @Field()
  @Column()
  order_id!: string

  @Field(() => Order)
  @ManyToOne(() => Order, r => r.order_items, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'order_id' })
  order!: Order

  @Field()
  @Column()
  product_id!: string

  @Field(() => Product)
  @ManyToOne(() => Product, p => p.orderItems, {eager: true})
  @JoinColumn({ name: 'product_id' })
  product!: Product

  @Field({nullable: true})
  @Column({nullable: true})
  variation_id?: string

  @Field(() => Variation)
  @ManyToOne(() => Variation, v => v.orderItems, {eager: true})
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

  @Field()
  product_id!: string

  @Field({nullable: true})
  variation_id?: string

  @Field()
  price?: number

  @Field()
  quantity?: number

  @Field({nullable: true})
  delivered?: boolean = true
}