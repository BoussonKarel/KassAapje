import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UserOrganization } from './userOrganization'
import { UserRegisterRole } from './userRegisterRole'

export const enum roleTypes {
  REGISTER,
  ORGANIZATION,
}

@Entity('roles')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  role_id!: string

  @Column()
  name!: string

  @Column('text')
  description?: string

  @Column()
  type?: roleTypes

  @OneToMany(() => UserOrganization, uo => uo.role)
  userOrganization?: UserOrganization

  @OneToMany(() => UserRegisterRole, urr => urr.role)
  userRegisterRole?: UserRegisterRole
}
