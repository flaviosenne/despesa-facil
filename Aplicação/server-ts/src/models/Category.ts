import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity("category")
export class Category{

    @PrimaryColumn()
    @Generated()
    id: number;

    @Column()
    name: string

    @ManyToOne(() => User, user => user.id, {cascade: false})
    @JoinColumn({name: 'user_id',referencedColumnName: 'id'})
    user: User
}