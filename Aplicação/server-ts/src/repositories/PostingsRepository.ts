import { Postings } from './../models/Postings';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Postings)
export class PostingsRepository extends Repository<Postings>{
    filterByDate = (dateStart: string, dateEnd: string, userId: number ) =>{
        return this.createQueryBuilder()
        .select('p')
        .from(Postings, 'p')
        .innerJoinAndSelect('p.status', 's')
        .innerJoinAndSelect('p.type', 't')
        .innerJoinAndSelect('p.user', 'u')
        .where('p.postings_date between :dateStart and :dateEnd')
        .andWhere('p.user_id = :userId')
        .setParameters({dateStart, dateEnd, userId})
        .getMany()
    }
}