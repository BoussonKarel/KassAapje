import { Field, ID, InputType, ObjectType } from 'type-graphql'
import {
  BaseEntity, Column, Entity, JoinColumn, ObjectIdColumn, OneToMany, PrimaryColumn,
} from 'typeorm'
import { UserOrganization } from './userOrganization'

@ObjectType()
@InputType('UserInput')
@Entity('users')
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  user_id?: string

  @Field()
  @Column()
  email?: string

  @OneToMany(() => UserOrganization, uo => uo.user)
  userOrganization?: UserOrganization
}
