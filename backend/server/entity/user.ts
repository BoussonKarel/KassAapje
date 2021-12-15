import { Field, ID, InputType, ObjectType } from 'type-graphql'
import {
  BaseEntity, Column, Entity, OneToMany, PrimaryColumn,
} from 'typeorm'
import { Order } from './order'
import { Permission } from './permission'

@ObjectType()
@InputType('UserInput')
@Entity('users')
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  uid!: string

  @Field()
  @Column()
  email?: string

  @OneToMany(() => Permission, p => p.user)
  permissions?: Permission[]

  @OneToMany(() => Order, o => o.seller)
  orders?: User[]

  // @Column('bool') // APP ADMIN?
  // superUser?: boolean
}
