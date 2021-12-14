import { Field, ID, InputType, ObjectType } from 'type-graphql'
import {
  BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn,
} from 'typeorm'
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

  @OneToMany(() => Permission, p => p.user, {onDelete: 'CASCADE'}) // MAYBE ONDELETE: SET NULL?
  permissions?: Permission[]

  // @Column('bool') // APP ADMIN?
  // superUser?: boolean
}
