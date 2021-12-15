import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../auth/roleManagement";

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

  @Column({ nullable: true})
  @Field({ nullable: true})
  register_id?: string

  @Column({type: 'char'})
  @Field()
  role?: Role;

  @CreateDateColumn()
  @Field({ nullable: true})
  expiration_date?: Date = (() => {
    const result = new Date(Date.now());
    result.setDate(result.getDate() + 14);
    return result;
  })();
}