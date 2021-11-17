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
  
  @Entity('orders')
  export class Order extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    order_id?: string

    @ManyToOne(() => Register, r => r.orders)
    @JoinColumn({ name:'register_id'})
    register?: Register

    @CreateDateColumn()
    timestamp?: Date

    @Column()
    customer_name?: string

    @Column()
    seller_id?: string

    @OneToMany(() => OrderItem, p => p.order)
    order_items?: OrderItem[]

    @OneToMany(() => Payment, p => p.order)
    payments?: Payment[]
  }
  