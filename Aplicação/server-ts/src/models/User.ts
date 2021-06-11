import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn } from "typeorm";


@Entity("user")
export class User{

    @PrimaryColumn()
    @Generated()
    id: number;

    @Column()
    name: string

    @Column()
    email: string
    
    @Column()
    @Exclude({toPlainOnly: true})
    password: string

    @CreateDateColumn({name:'created_at', default: Date.now()})
    createdAt: Date

    @CreateDateColumn({name:'updated_at'})
    updatedAt: Date

    @Column({name:'is_active'})
    isActive: boolean

    @CreateDateColumn({name:'last_login'})
    lastLogin: Date

    @Column({name:'url_image'})
    urlImage: string
}