import { Postings } from './../models/Postings';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Postings)
export class CodPasswordRepository extends Repository<Postings>{
}