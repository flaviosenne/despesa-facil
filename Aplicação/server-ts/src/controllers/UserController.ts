import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
    private userService: UserService
    
    async listAll(req: Request, res: Response){

        const users = await this.userService.listAll()
        
        return res.status(201).json(users)
    }
}