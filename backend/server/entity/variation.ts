import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Product } from './product'

@Entity('variations')
export class Variation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  product_id?: string

  @ManyToOne(() => Product, p => p.variations)
  @JoinColumn({ name: 'product_id' })
  product!: Product

  @Column('text')
  name?: string

  @Column('decimal')
  price?: number
}
