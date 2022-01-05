import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../auth/roleManagement";
import { Organization } from "./organization";
import { Register } from "./register";

@ObjectType("Invitation")
@Entity("invitations")
@InputType("InvitationInput")
export class Invitation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { nullable: true})
  invitation_id?: string

  @Column({ nullable: true})
  @Field({ nullable: true})
  organization_id?: string

  @ManyToOne(() => Organization, o => o.invitations, { nullable: true, eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organization_id'})
  organization?: Organization

  @Column({ nullable: true})
  @Field({ nullable: true})
  register_id?: string

  @ManyToOne(() => Register, r => r.invitations, { nullable: true, eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'register_id'})
  register?: Register

  @Column({type: 'char'})
  @Field()
  role?: Role;

  @CreateDateColumn()
  @Field({ nullable: true})
  expiration_date!: Date;
}

@ObjectType("InvitationInfo")
export class InvitationInfo extends Invitation {
  @Field(() => Register, { nullable: true})
  register?: Register;

  @Field(() => Organization, { nullable: true})
  organization?: Organization;
}