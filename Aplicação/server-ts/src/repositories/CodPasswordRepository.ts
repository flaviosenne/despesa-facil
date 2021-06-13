import { EntityRepository, Repository } from "typeorm";
import { CodPassword } from "../models/CodPassword";

@EntityRepository(CodPassword)
export class CodPasswordRepository extends Repository<CodPassword>{
}