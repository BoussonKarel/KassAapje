import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export const enum roleTypes {
    REGISTER,
    ORGANIZATION
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
}