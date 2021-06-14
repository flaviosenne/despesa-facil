import { User } from './User';
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Category } from './Category';

@Entity("postings")
export class Postings{

    @PrimaryColumn()
    @Generated()
    id: number;

    @Column()
    description: string
    
    @Column()
    value: number

    @Column()
    type: string

    @Column()
    status: string

    @Column()
    installments: number

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