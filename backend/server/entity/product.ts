import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm'
import { Order } from './order'
import { OrderItem } from './orderitem'
import { Register } from './register'
import { Variation } from './variation'
  
  @Entity('products')
  export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    product_id?: string
    
    @ManyToOne(() => Register, r => r.products)
    @JoinColumn({name: 'register_id'})
    register!: Register

    @Column()
    name?: string

    @Column()
    price?: number

    @Column()
    stock_is_managed?: boolean

    @Column()
    stock_quantity?: number

    @Column()
    allow_backorders?: boolean

    @OneToMany(() => Variation, v => v.product)
    variations?: Variation[]
  }
  