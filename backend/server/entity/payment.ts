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

@ObjectType()
@InputType('PaymentInput')
@Entity('payments')
export class Payment extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  payment_id?: string

  @Field(() => Order)
  @ManyToOne(() => Order, r => r.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order!: Order

  @Field()
  @Column()
  payment_method?: string

  @Field()
  @Column('decimal')
  amount?: number
}

@InputType('PaymentOrderInput')
export class PaymentOrderInput {
  @Field(() => ID, { nullable: true})
  payment_id?: string

  @Field()
  payment_method?: string

  @Field()
  amount?: number
}