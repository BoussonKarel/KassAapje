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

@Entity('payments')
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  payment_id?: string

  @ManyToOne(() => Order, r => r.payments)
  @JoinColumn({ name: 'order_id' })
  order!: Register

  @Column()
  payment_method?: string

  @Column('decimal')
  amount?: number
}
