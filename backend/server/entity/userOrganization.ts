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
import { Organization } from './organization'
import { Role } from './role'
import { User } from './user'

@ObjectType()
@InputType('UserOrganizationInput')
@Entity('user_organizations')
export class UserOrganization extends BaseEntity {
  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, u => u.userOrganization, {primary: true})
  @JoinColumn({ name: 'user_id' })
  user?: User

  @Field(() => Organization, { nullable: true })
  @ManyToOne(() => Organization, o => o.userOrganization, {primary:true})
  @JoinColumn({ name: 'organization_id' })
  organization?: Organization

  @Field(() => Role, { nullable: true})
  @ManyToOne(() => Role, r => r.userOrganization)
  @JoinColumn({ name: 'role_id' })
  role?: Role
}
