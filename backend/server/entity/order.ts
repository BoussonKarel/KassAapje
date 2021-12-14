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
import { OrderItem } from './orderItem'
import { Payment } from './payment'
import { Register } from './register'

@ObjectType()
@InputType('OrderInput')
@Entity('orders')
export class Order extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  order_id?: string

  @Field(() => Register)
  @ManyToOne(() => Register, r => r.orders)
  @JoinColumn({ name: 'register_id' })
  register?: Register

  @Field()
  @CreateDateColumn()
  timestamp?: Date

  @Field()
  @Column()
  customer_name?: string

  @Field()
  @Column()
  seller_id?: string

  @Field(() => [OrderItem])
  @OneToMany(() => OrderItem, p => p.order)
  order_items?: OrderItem[]

  @Field(() => [Payment])
  @OneToMany(() => Payment, p => p.order)
  payments?: Payment[]
}
