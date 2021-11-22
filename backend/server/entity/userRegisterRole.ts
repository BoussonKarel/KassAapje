import { Field, InputType, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm'
import { Register } from './register'
import { Role } from './role'
import { User } from './user'

@ObjectType()
@InputType('UserRegisterRoleInput')
@Entity('user_register_role')
export class UserRegisterRole extends BaseEntity {
  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, u => u.userRegisterRole, {primary: true})
  @JoinColumn({ name: 'user_id' })
  user?: User

  @Field(() => Register, { nullable: true })
  @ManyToOne(() => Register, o => o.userRegisterRole, {primary:true})
  @JoinColumn({ name: 'register_id' })
  register?: Register

  @Field(() => Role, { nullable: true})
  @ManyToOne(() => Role, r => r.userRegisterRole)
  @JoinColumn({ name: 'role_id' })
  role?: Role
}
