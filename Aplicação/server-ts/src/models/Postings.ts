import { User } from './User';
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Category } from './Category';
import { Status } from './Status';
import { Type } from './Type';

@Entity("postings")
export class Postings{

    @PrimaryColumn()
    @Generated()
    id: number;

    @Column()
    description: string
    
    @Column()
    value: number

    @OneToOne(() => Type, type => type.id, {cascade: false})
    @JoinColumn({name: 'type_id',referencedColumnName: 'id'})
    type: Type

    @OneToOne(() => Status, status => status.id, {cascade: false})
    @JoinColumn({name: 'status_id',referencedColumnName: 'id'})
    status: Status

    @Column()
    installments: number

    @Column({name:'is_active'})
    isActive: boolean

    @CreateDateColumn({name:'created_at', default: Date.now()})
    createdAt: Date

    @Column({name:'postings_date', default: Date.now()})
    postingsDate: Date

    @UpdateDateColumn({name:'updated_at'})
    updatedAt: Date

    @ManyToOne(() => User, user => user.id, {cascade: false})
    @JoinColumn({name: 'user_id',referencedColumnName: 'id'})
    user: User
    
    @OneToOne(() => Category, category => category.id, {cascade: false})
    @JoinColumn({name: 'category_id',referencedColumnName: 'id'})
    category: Category

}