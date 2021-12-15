import { Field, ID, InputType, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { OrderItem, OrderItemInput } from './orderItem'
import { Payment, PaymentOrderInput } from './payment'
import { Register } from './register'
import { User } from './user'

@ObjectType()
@Entity('orders')
export class Order extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  order_id?: string

  @Field(() => Register)
  @ManyToOne(() => Register, r => r.orders, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'register_id' })
  register?: Register

  @Field()
  @CreateDateColumn()
  timestamp?: Date = new Date(Date.now())

  @Field({nullable: true})
  @Column({nullable: true})
  customer_name?: string

  @Field()
  @ManyToOne(() => User, u => u.orders)
  @JoinColumn({name: 'seller_id'})
  seller?: User

  @Field(() => [OrderItem])
  @OneToMany(() => OrderItem, p => p.order, {eager: true, cascade: true})
  order_items?: OrderItem[]

  @Field(() => [Payment])
  @OneToMany(() => Payment, p => p.order, {eager: true, cascade: true})
  payments?: Payment[]
}

@InputType('OrderInput')
export class OrderInput {
  @Field(() => ID, { nullable: true })
  order_id?: string

  @Field()
  register_id!: string

  @Field({nullable: true})
  timestamp?: Date

  @Field({nullable: true})
  customer_name?: string

  @Field(() => [OrderItemInput])
  order_items?: OrderItemInput[]

  @Field(() => [PaymentOrderInput])
  payments?: PaymentOrderInput[]
}