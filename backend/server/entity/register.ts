import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Order } from './order'
import { Organization } from './organization'
import { Product } from './product'

@Entity('registers')
export class Register extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  register_id?: string

  @ManyToOne(() => Organization, o => o.registers)
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization

  @Column({ length: 100 })
  name?: string

  @Column('text')
  description?: string

  @Column({ length: 7 })
  color?: string

  @OneToMany(() => Product, p => p.register)
  products?: Product[]

  @OneToMany(() => Order, o => o.register)
  orders?: Order[]
}
