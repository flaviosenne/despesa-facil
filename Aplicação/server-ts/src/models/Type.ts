import { Column, Entity, Generated, PrimaryColumn } from "typeorm";


@Entity("type")
export class Type{

    @PrimaryColumn()
    @Generated()
    id: number;

    @Column()
    name: string
}