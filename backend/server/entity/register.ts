import { Expose } from 'class-transformer'
import { Field, ID, InputType, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { generateUID } from '../helpers/generateUID'
import { Order } from './order'
import { Organization } from './organization'
import { Permission } from './permission'
import { Product } from './product'

@ObjectType()
@Entity('registers')
export class Register extends BaseEntity {
  @Field(() => ID, {nullable: true})
  @PrimaryColumn({length: 6, unique: true})
  register_id: string = generateUID();

  @Field(() => Organization)
  @ManyToOne(() => Organization, o => o.registers)
  @JoinColumn({ name: 'organization_id' })
  @Expose({ name: 'organization_id' })
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
  @OneToMany(() => Product, p => p.register )
  products?: Product[]

  @Field(() => [Order])
  @OneToMany(() => Order, o => o.register )
  orders?: Order[]

  @OneToMany(() => Permission, p => p.register )
  permissions?: Permission[]
}

@InputType('RegisterInput')
export class RegisterInput {
  @Field(() => ID, { nullable: true})
  register_id?: string

  @Field()
  organization_id!: string

  @Field()
  name?: string

  @Field()
  description?: string

  @Field()
  color?: string
}

@InputType('RegisterUpdateInput')
export class RegisterUpdateInput {
  @Field(() => ID, { nullable: true})
  register_id!: string

  @Field({nullable: true})
  name?: string

  @Field({nullable: true})
  description?: string

  @Field({nullable: true})
  color?: string
}