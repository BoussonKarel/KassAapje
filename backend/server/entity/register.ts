import { Expose } from 'class-transformer'
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
import { Order } from './order'
import { Organization } from './organization'
import { Product } from './product'
import { UserRegisterRole } from './userRegisterRole'

@ObjectType()
@InputType('RegisterInput')
@Entity('registers')
export class Register extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  register_id?: string

  @Field(() => Organization)
  @ManyToOne(() => Organization, o => o.registers)
  @JoinColumn({ name: 'organization_id' })
  @Expose({name: 'organization_id'})
  organization!: Organization

  @Field()
  @Column({ length: 100 })
  name?: string

  @Field()
  @Column('text')
  description?: string

  @Field()
  @Column({ length: 7 })
  color?: string

  @Field(() => [Product])
  @OneToMany(() => Product, p => p.register)
  products?: Product[]

  @Field(() => [Order])
  @OneToMany(() => Order, o => o.register)
  orders?: Order[]

  @OneToMany(() => UserRegisterRole, urr => urr.register)
  userRegisterRole?: UserRegisterRole
}
