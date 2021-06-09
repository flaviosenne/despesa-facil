import { User } from './../models/User';
import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
    private userService: UserService

    constructor(){
        this.userService = new UserService()
    }
    
    async listAll(req: Request, res: Response){

        const users = await this.userService.listAll()
        
        return res.status(200).json(users)
    }

    async save(req: Request, res: Response){

        const user = req.body as User
        
        const userSaved = await this.userService.save(user)
        
        return res.status(201).json(userSaved)
    }
}