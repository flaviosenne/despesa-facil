import { Postings } from './../models/Postings';
import { EntityRepository, Repository } from "typeorm";


@EntityRepository(Postings)
export class PostingsRepository extends Repository<Postings>{
    private date = new Date()
    private dateStartDefault = new Date(`${this.date.getFullYear()}-${this.date.getMonth()+1}-01`)
    private dateEndDefault = new Date(`${this.date.getFullYear()}-${this.date.getMonth() + 2}-01`)
    
    findByUserId = async (userId: number) =>{
        return await this.createQueryBuilder()
        .select('p')
        .from(Postings, 'p')
        .innerJoinAndSelect('p.status', 's')
        .innerJoinAndSelect('p.type', 't')
        .innerJoinAndSelect('p.category', 'c')
        .where('p.user.id = :userId')
        .setParameters({userId})
        .getMany()
    }

    getPostingsLastTreeMonth = async (userId: number) =>{
        const month = new Date().getMonth() + 1
        const year = new Date().getFullYear()
        let dateStart = new Date(year,(month-3), 1),
        dateEnd = new Date(year,month, 0)

        dateStart =  new Date(`${dateStart.getFullYear()}-${dateStart.getMonth()}-${dateStart.getDate()}`)
        dateEnd =  new Date(`${dateEnd.getFullYear()}-${dateEnd.getMonth()+1}-${dateEnd.getDate()}`)
    
        return await this.createQueryBuilder()
        .select('p')
        .from(Postings, 'p')
        .innerJoinAndSelect('p.status', 's')
        .innerJoinAndSelect('p.type', 't')
        .innerJoinAndSelect('p.user', 'u')
        .innerJoinAndSelect('p.category', 'c')
        .where('p.user_id = :userId')
        .andWhere(`p.postings_date between :dateStart and :dateEnd`)
        .orderBy('p.postingsDate')
        .setParameters({userId, dateStart,  dateEnd})
        .getMany()
    }
    
    getPostingsLastTwelveMonth = async (userId: number) =>{
        const month = new Date().getMonth() + 1
        const year = new Date().getFullYear()
        let dateStart = new Date(year,(month-12), 1),
        dateEnd = new Date(year,month, 0)

        dateStart =  new Date(`${dateStart.getFullYear()}-${dateStart.getMonth()}-${dateStart.getDate()}`)
        dateEnd =  new Date(`${dateEnd.getFullYear()}-${dateEnd.getMonth()+1}-${dateEnd.getDate()}`)
    
        return await this.createQueryBuilder()
        .select('p')
        .from(Postings, 'p')
        .innerJoinAndSelect('p.status', 's')
        .innerJoinAndSelect('p.type', 't')
        .innerJoinAndSelect('p.user', 'u')
        .innerJoinAndSelect('p.category', 'c')
        .where('p.user_id = :userId')
        .andWhere(`p.postings_date between :dateStart and :dateEnd`)
        .orderBy('p.postingsDate')
        .setParameters({userId, dateStart,  dateEnd})
        .getMany()
    }
}