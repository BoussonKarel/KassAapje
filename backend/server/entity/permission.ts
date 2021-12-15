import { Expose } from "class-transformer";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "../auth/roleManagement";
import { Organization } from "./organization";
import { Register } from "./register";
import { User } from "./user";

@Entity("perms")
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  permission_id?: string
  
  @ManyToOne(() => User, o => o.permissions, {eager: true})
  @JoinColumn({ name: 'uid'})
  @Expose({name: 'uid'})
  user!: User

  @ManyToOne(() => Organization, o => o.permissions, { nullable: true, eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organization_id'})
  @Expose({name: 'organization_id'})
  organization?: Organization

  @ManyToOne(() => Register, o => o.permissions, { nullable: true, eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'register_id'})
  @Expose({name: 'register_id'})
  register?: Register

  @Column({type: 'char'})
  role!: Role;
}