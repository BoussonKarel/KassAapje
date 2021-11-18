import { Field, ID, InputType, ObjectType } from 'type-graphql'
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
import { OrderItem } from './orderItem'
import { Register } from './register'
import { Variation } from './variation'

@ObjectType()
@InputType('ProductInput')
@Entity('products')
export class Product extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  product_id?: string

  @Field(() => Register)
  @ManyToOne(() => Register, r => r.products)
  @JoinColumn({ name: 'register_id' })
  register!: Register

  @Field()
  @Column()
  name?: string

  @Field()
  @Column('decimal')
  price?: number

  @Field()
  @Column()
  stock_is_managed?: boolean

  @Field()
  @Column('int')
  stock_quantity?: number

  @Field()
  @Column()
  allow_backorders?: boolean

  @Field(() => [Variation])
  @OneToMany(() => Variation, v => v.product)
  variations?: Variation[]

  @Field(() => [OrderItem])
  @OneToMany(() => OrderItem, oi => oi.product)
  orderItems?: OrderItem[]
}
