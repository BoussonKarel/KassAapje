import { Field, ID, InputType, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Order } from './order'
import { Product } from './product'
import { Register } from './register'
import { Variation } from './variation'

@ObjectType()
@InputType('PaymentInput')
@Entity('payments')
export class Payment extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  payment_id?: string

  @Field(() => Register)
  @ManyToOne(() => Order, r => r.payments)
  @JoinColumn({ name: 'order_id' })
  order!: Register

  @Field()
  @Column()
  payment_method?: string

  @Field()
  @Column('decimal')
  amount?: number
}
