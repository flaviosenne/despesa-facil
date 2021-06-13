import { Column, CreateDateColumn, Entity, Generated, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";


@Entity("cod_password")
export class CodPassword{

    @PrimaryColumn()
    @Generated()
    id: number;

    @Column()
    name: string

    @Column({name: 'is_used'})
    isUsed: number

    @OneToOne(() => User, user => user.id, {cascade: false})
    @JoinColumn({name: 'user_id',referencedColumnName: 'id'})
    user: User
}