import { Field, ID, InputType, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Register } from './register'

@ObjectType()
@InputType('OrganizationInput')
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

  @Field(() => [Register], {nullable: true})
  @OneToMany(() => Register, r => r.organization)
  registers?: Register[]
}
