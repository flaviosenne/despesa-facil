import { Postings } from './../models/Postings';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Postings)
export class PostingsRepository extends Repository<Postings>{
    filterByDate = (dateStart: string, dateEnd: string ): Promise<Postings| undefined> =>{
        return this.query(`
        select * from postings p 
        inner join category c
        inner join status s
        inner join user u
        where p.postings_date between $1 and $2`, [dateStart, dateEnd])
    }
}