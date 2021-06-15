import { Column, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity("category")
export class Category{

    @PrimaryColumn()
    @Generated()
    id: number;

    @Column()
    name: string
}