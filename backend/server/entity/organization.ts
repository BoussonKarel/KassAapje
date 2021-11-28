import { Field, ID, InputType, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Register, RegisterInput } from './register'
import { UserOrganization } from './userOrganization'

@ObjectType()
@Entity('organizations')
export class Organization extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  organization_id?: string

  @Field()
  @Column({ length: 100 })
  name?: string

  @Field()
  @Column()
  street?: string

  @Field()
  @Column('int')
  street_number?: number

  @Field({nullable: true})
  @Column({nullable: true})
  box?: string

  @Field()
  @Column()
  zip?: number

  @Field()
  @Column()
  city?: string

  @Field()
  @Column()
  country?: string

  @Field()
  @Column()
  website?: string

  @Field()
  @Column('text')
  logo?: string

  @Field()
  @Column({ length: 7 })
  color?: string

  @Field()
  @Column()
  email?: string

  @Field(() => [Register], {nullable: true, })
  @OneToMany(() => Register, r => r.organization)
  registers?: Register[]

  @OneToMany(() => UserOrganization, uo => uo.organization)
  userOrganization?: UserOrganization
}

@InputType('OrganizationInput')
export class OrganizationInput {
  @Field(() => ID, {nullable: true})
  organization_id?: string

  @Field()
  name?: string

  @Field()
  street?: string

  @Field()
  street_number?: number

  @Field({nullable: true})
  box?: string

  @Field()
  zip?: number

  @Field()
  city?: string

  @Field()
  country?: string

  @Field()
  website?: string

  @Field()
  logo?: string

  @Field()
  color?: string

  @Field()
  email?: string
}