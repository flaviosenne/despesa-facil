import { UserDto } from './../dtos/UserDto';
import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
    
    async listAll(req: Request, res: Response){

        const userService = new UserService()

        const users = await userService.listAll()
        
        return res.status(200).json(users)
    }

    async save(req: Request, res: Response){
        try{
            const userService = new UserService()
            
            const user = req.body as UserDto
            
            const userSaved = await userService.save(user)
            
            return res.status(201).json(userSaved)
        }catch(err){
            throw res.status(err['status']).json(err)
        }
    }
}