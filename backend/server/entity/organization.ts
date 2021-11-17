import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Register } from './register'

@Entity('organizations')
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  organization_id?: string

  @Column({ length: 100 })
  name?: string

  @Column()
  street?: string

  @Column('int')
  street_number?: number

  @Column()
  box?: string

  @Column()
  zip?: number

  @Column()
  city?: string

  @Column()
  country?: string

  @Column()
  website?: string

  @Column('text')
  logo?: string

  @Column({ length: 7 })
  color?: string

  @Column()
  email?: string

  @OneToMany(() => Register, r => r.organization)
  registers?: Register[]
}
