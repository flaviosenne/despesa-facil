import { Column, Entity, Generated, PrimaryColumn } from "typeorm";


@Entity("status")
export class Status{

    @PrimaryColumn()
    @Generated()
    id: number;

    @Column()
    name: string
}