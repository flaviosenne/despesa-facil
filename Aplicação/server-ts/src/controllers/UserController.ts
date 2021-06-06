import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { User } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";

export class UserController {
    async listAll(req: Request, res: Response){
        const userRepository: UserRepository = getCustomRepository(UserRepository)

        const users: User[] = await userRepository.find()
        
        return res.status(200).json(users)
    }
}