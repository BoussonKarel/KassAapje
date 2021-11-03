import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('organizations')
export class Organization extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    organization_id?: string

    @Column({ length: 100 })
    name?: string

    @Column()
    street?: string

    @Column()
    street_number?: number

    @Column()
    zip?: number

    @Column({ length: 100 })
    city?: string

    @Column()
    country?: string

    @Column()
    website?: string

    @Column('text')
    logo?: string

    @Column({ length: 7 })
    color?: string

    @Column()
    email?: string
}