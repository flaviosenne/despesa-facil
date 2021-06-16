import { Postings } from './../models/Postings';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Postings)
export class PostingsRepository extends Repository<Postings>{
    filterByDate = (dateStart: string, dateEnd: string ) =>{
        // return this.query(`
        // select * from postings p 
        // inner join category c
        // inner join status s
        // inner join user u
        // where p.postings_date between 1 and 2`, [dateStart, dateEnd])
        return this.createQueryBuilder()
        .select('p')
        .from(Postings, 'p')
        .innerJoinAndSelect('p.status', 's')
        .innerJoinAndSelect('p.type', 't')
        .innerJoin('p.user', 'u')
        .where('p.postings_date between :dateStart and :dateEnd')
        .setParameters({dateStart, dateEnd})
        .getMany()
    }
}