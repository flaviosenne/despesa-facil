import { Postings } from './../models/Postings';
import { EntityRepository, Repository } from "typeorm";


@EntityRepository(Postings)
export class PostingsRepository extends Repository<Postings>{
    private date = new Date()
    private dateStartDefault = new Date(`${this.date.getFullYear()}-${this.date.getMonth()}-01`)
    private dateEndDefault = new Date(`${this.date.getFullYear()}-${this.date.getMonth() + 1}-01`)
    
    filterByDate = async (dateStart: string, dateEnd: string, userId: number ) =>{
        return await this.createQueryBuilder()
        .select('p')
        .from(Postings, 'p')
        .innerJoinAndSelect('p.status', 's')
        .innerJoinAndSelect('p.type', 't')
        .innerJoinAndSelect('p.user', 'u')
        .innerJoinAndSelect('p.category', 'c')
        .where('p.postings_date between :dateStart and :dateEnd')
        .andWhere('p.user_id = :userId')
        .setParameters({dateStart, dateEnd, userId})
        .getMany()
    }

    filterByCategory = async (categoryId: number, userId: number ) =>{
        return await this.createQueryBuilder()
        .select('p')
        .from(Postings, 'p')
        .innerJoinAndSelect('p.status', 's')
        .innerJoinAndSelect('p.type', 't')
        .innerJoinAndSelect('p.user', 'u')
        .innerJoinAndSelect('p.category', 'c')
        .where('c.id :categoryId')
        .andWhere('p.user_id = :userId')
        .andWhere('p.postings_date between :dateStart and :dateEnd')
        .setParameters({categoryId, userId, 
            dateStart:this.dateStartDefault, 
            dateEnd: this.dateEndDefault})
        .getMany()
    }

    filterDefault = async (userId: number ) =>{
        return await this.createQueryBuilder()
        .select('p')
        .from(Postings, 'p')
        .innerJoinAndSelect('p.status', 's')
        .innerJoinAndSelect('p.type', 't')
        .innerJoinAndSelect('p.user', 'u')
        .innerJoinAndSelect('p.category', 'c')
        .where('p.user_id = :userId')
        .andWhere('p.postings_date between :dateStart and :dateEnd')
        .setParameters({userId, 
            dateStart:this.dateStartDefault, 
            dateEnd: this.dateEndDefault})
        .getMany()
    }
}