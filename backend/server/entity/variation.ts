import { Field, ID, InputType, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { OrderItem } from './orderItem'
import { Product } from './product'

@ObjectType()
@InputType('VariationInput')
@Entity('variations')
export class Variation extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  product_id?: string

  @Field(() => Product)
  @ManyToOne(() => Product, p => p.variations)
  @JoinColumn({ name: 'product_id' })
  product!: Product

  @Field()
  @Column('text')
  name?: string

  @Field()
  @Column('decimal')
  price_diff?: number

  @Field(() => [OrderItem])
  @OneToMany(() => OrderItem, oi => oi.variation)
  orderItems?: OrderItem[]
}