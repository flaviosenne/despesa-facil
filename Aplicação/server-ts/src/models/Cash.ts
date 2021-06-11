import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity("cash")
export class Cash{

    @PrimaryColumn()
    @Generated()
    id: number;

    @Column()
    description: string

    @Column()
    type: string

    @Column()
    status: string

    @CreateDateColumn({name:'created_at', default: Date.now()})
    createdAt: Date

    @Column({name:'is_active'})
    isActive: boolean
}