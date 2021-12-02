import { Expose } from 'class-transformer'
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Organization } from './organization'
import { Register } from './register'

export const enum roleTypes {
  REGISTER,
  ORGANIZATION,
}

@Entity('roles')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  role_id?: string

  @Column()
  name?: string // eg. OWNER, USER...

  @Column('text')
  description?: string

  @Column()
  type?: roleTypes

  @ManyToOne(() => Organization, { nullable: true})
  @JoinColumn({ name: 'organization_id'})
  @Expose({ name: 'organization_id' })
  organization?: Organization

  @ManyToOne(() => Register, { nullable: true})
  @JoinColumn({ name: 'register_id'})
  @Expose({ name: 'register_id' })
  register?: Register
}
