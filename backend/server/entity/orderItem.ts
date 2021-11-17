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
  
  @Entity('order_items')
  export class OrderItem extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    orderitem_id?: string
    
    @ManyToOne(() => Order, r => r.order_items)
    @JoinColumn({name: 'order_id'})
    order!: Register

    // @ManyToOne(() => Product, p => p.orders)
    @Column({name: 'product_id'})
    product!: Product

    // @ManyToOne(() => Variation, v => v.order)
    @Column({name: 'variation_id'})
    variation?: Variation

    @Column('decimal')
    price?: number

    @Column('int')
    quantity?: number
    
    @Column()
    delivered?: boolean
  }
  