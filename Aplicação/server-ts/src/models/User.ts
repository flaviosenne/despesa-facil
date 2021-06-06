import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("user")
export class User{

    @PrimaryColumn()
    id: number;

    @Column()
    name: string

    @Column()
    email: string

    @CreateDateColumn({name:'created_at', default: Date.now()})
    createdAt: Date

    @CreateDateColumn({name:'updated_at'})
    updatedAt: Date

    @Column({name:'is_active'})
    isActive: boolean

    @Column({name:'last_login'})
    lastLogin: string

    @Column({name:'url_image'})
    urlImage: string
}