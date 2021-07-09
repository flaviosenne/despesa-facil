import { Postings } from './../models/Postings';
import { EntityRepository, Repository } from "typeorm";


@EntityRepository(Postings)
export class PostingsRepository extends Repository<Postings>{
    private date = new Date()
    private dateStartDefault = new Date(`${this.date.getFullYear()}-${this.date.getMonth()+1}-01`)
    private dateEndDefault = new Date(`${this.date.getFullYear()}-${this.date.getMonth() + 2}-01`)
    
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
        .where('c.id = :categoryId')
        .andWhere('p.user_id = :userId')
        .andWhere('p.postings_date between :dateStart and :dateEnd')
        .setParameters({categoryId, userId, 
            dateStart:this.dateStartDefault, 
            dateEnd: this.dateEndDefault})
        .getMany()
    }

    filterByStatus = async (statusId: number, userId: number ) =>{
        return await this.createQueryBuilder()
        .select('p')
        .from(Postings, 'p')
        .innerJoinAndSelect('p.status', 's')
        .innerJoinAndSelect('p.type', 't')
        .innerJoinAndSelect('p.user', 'u')
        .innerJoinAndSelect('p.category', 'c')
        .where('s.id = :statusId')
        .andWhere('p.user_id = :userId')
        .andWhere('p.postings_date between :dateStart and :dateEnd')
        .setParameters({statusId, userId, 
            dateStart:this.dateStartDefault, 
            dateEnd: this.dateEndDefault})
        .getMany()
    }

    filterByStatusAndCategory = async (statusId: number,categoryId: number, userId: number ) =>{
        return await this.createQueryBuilder()
        .select('p')
        .from(Postings, 'p')
        .innerJoinAndSelect('p.status', 's')
        .innerJoinAndSelect('p.type', 't')
        .innerJoinAndSelect('p.user', 'u')
        .innerJoinAndSelect('p.category', 'c')
        .where('s.id = :statusId')
        .andWhere('c.id = :categoryId')
        .andWhere('p.user_id = :userId')
        .andWhere('p.postings_date between :dateStart and :dateEnd')
        .setParameters({statusId,categoryId, userId, 
            dateStart:this.dateStartDefault, 
            dateEnd: this.dateEndDefault})
        .getMany()
    }

    filterByStatusAndCategoryAndDate = async (dateStart: string, dateEnd: string,
        statusId: number,categoryId: number, userId: number ) =>{
        return await this.createQueryBuilder()
        .select('p')
        .from(Postings, 'p')
        .innerJoinAndSelect('p.status', 's')
        .innerJoinAndSelect('p.type', 't')
        .innerJoinAndSelect('p.user', 'u')
        .innerJoinAndSelect('p.category', 'c')
        .where('s.id = :statusId')
        .andWhere('c.id = :categoryId')
        .andWhere('p.user_id = :userId')
        .andWhere('p.postings_date between :dateStart and :dateEnd')
        .setParameters({statusId,categoryId, userId, 
            dateStart, dateEnd})
        .getMany()
    }

    filterByStatusAndDate = async (dateStart: string, dateEnd: string,
        statusId: number,userId: number ) =>{
        return await this.createQueryBuilder()
        .select('p')
        .from(Postings, 'p')
        .innerJoinAndSelect('p.status', 's')
        .innerJoinAndSelect('p.type', 't')
        .innerJoinAndSelect('p.user', 'u')
        .innerJoinAndSelect('p.category', 'c')
        .where('s.id = :statusId')
        .andWhere('p.user_id = :userId')
        .andWhere('p.postings_date between :dateStart and :dateEnd')
        .setParameters({statusId, userId, 
            dateStart, dateEnd})
        .getMany()
    }

    filterByCategoryAndDate = async (dateStart: string, dateEnd: string,
        categoryId: number,userId: number ) =>{
        return await this.createQueryBuilder()
        .select('p')
        .from(Postings, 'p')
        .innerJoinAndSelect('p.status', 's')
        .innerJoinAndSelect('p.type', 't')
        .innerJoinAndSelect('p.user', 'u')
        .innerJoinAndSelect('p.category', 'c')
        .where('c.id = :categoryId')
        .andWhere('p.user_id = :userId')
        .andWhere('p.postings_date between :dateStart and :dateEnd')
        .setParameters({categoryId, userId, 
            dateStart, dateEnd})
        .getMany()
    }

    filterByType = async (typeId: number,userId: number ) =>{
        return await this.createQueryBuilder()
        .select('p')
        .from(Postings, 'p')
        .innerJoinAndSelect('p.status', 's')
        .innerJoinAndSelect('p.type', 't')
        .innerJoinAndSelect('p.user', 'u')
        .innerJoinAndSelect('p.category', 'c')
        .where('t.id = :typeId')
        .andWhere('p.user_id = :userId')
        .andWhere('p.postings_date between :dateStart and :dateEnd')
        .setParameters({typeId, userId, 
            dateStart: this.dateStartDefault, dateEnd: this.dateEndDefault})
        .getMany()
    }

    filterByTypeAndStatus = async (typeId: number, statusId: number,userId: number ) =>{
        return await this.createQueryBuilder()
        .select('p')
        .from(Postings, 'p')
        .innerJoinAndSelect('p.status', 's')
        .innerJoinAndSelect('p.type', 't')
        .innerJoinAndSelect('p.user', 'u')
        .innerJoinAndSelect('p.category', 'c')
        .where('t.id = :typeId')
        .andWhere('s.id = :statusId')
        .andWhere('p.user_id = :userId')
        .andWhere('p.postings_date between :dateStart and :dateEnd')
        .setParameters({typeId, userId, statusId,
            dateStart: this.dateStartDefault, dateEnd: this.dateEndDefault})
        .getMany()
    }

    filterByTypeAndDate = async (typeId: number, dateStart: string, dateEnd: string,userId: number ) =>{
        return await this.createQueryBuilder()
        .select('p')
        .from(Postings, 'p')
        .innerJoinAndSelect('p.status', 's')
        .innerJoinAndSelect('p.type', 't')
        .innerJoinAndSelect('p.user', 'u')
        .innerJoinAndSelect('p.category', 'c')
        .where('t.id = :typeId')
        .andWhere('p.user_id = :userId')
        .andWhere('p.postings_date between :dateStart and :dateEnd')
        .setParameters({typeId, userId,
            dateStart, dateEnd})
        .getMany()
    }

    filterByTypeAndDateAndStatus = async (typeId: number, statusId: number, dateStart: string, dateEnd: string,userId: number ) =>{
        return await this.createQueryBuilder()
        .select('p')
        .from(Postings, 'p')
        .innerJoinAndSelect('p.status', 's')
        .innerJoinAndSelect('p.type', 't')
        .innerJoinAndSelect('p.user', 'u')
        .innerJoinAndSelect('p.category', 'c')
        .where('t.id = :typeId')
        .andWhere('s.id = :statusId')
        .andWhere('p.user_id = :userId')
        .andWhere('p.postings_date between :dateStart and :dateEnd')
        .setParameters({typeId, userId, statusId,
            dateStart, dateEnd})
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
        .andWhere(`p.postings_date between :dateStart and :dateEnd`)
        .setParameters({userId, 
            dateStart:this.dateStartDefault, 
            dateEnd: this.dateEndDefault})
        .getMany()
    }

    getPostingsLastTreeMonth = async (userId: number) =>{
        const month = new Date().getMonth() + 1
        const year = new Date().getFullYear()
        let dateStart = new Date(year,(month-3), 1),
        dateEnd = new Date(year,month, 0)

        dateStart =  new Date(`${dateStart.getFullYear()}-${dateStart.getMonth()+1}-${dateStart.getDate()}`)
        dateEnd =  new Date(`${dateEnd.getFullYear()}-${dateEnd.getMonth()}-${dateEnd.getDate()}`)
    
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