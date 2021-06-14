import { Column, Entity, Generated, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";


@Entity("category")
export class Category{

    @PrimaryColumn()
    @Generated()
    id: number;

    @Column()
    name: string
}