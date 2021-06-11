import { UserDto } from './../dtos/UserDto';
import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
    
    async listAll(req: Request, res: Response){

        const userService = new UserService()

        const users = await userService.listAll()
        
        return res.status(200).json(users)
    }

    async listAllActive(req: Request, res: Response){

        const userService = new UserService()

        const users = await userService.listAllActive()
        
        return res.status(200).json(users)
    }

    async findById(req: Request, res: Response){
        try{

            const { id } = req.params
            
            const userService = new UserService()
            
            const users = await userService.findByIdAndIsActive(Number(id))
            
            return res.status(200).json(users)
        }catch(err) {
            return res.status(err['status']).json(err)
        }
    }

    async save(req: Request, res: Response){
        try{
            const userService = new UserService()
            
            const user = req.body as UserDto
            
            const {email, id, isActive, name,createdAt, updatedAt, lastLogin,urlImage}
             = await userService.save(user)
            
             
            return res.status(201).json({
                 id, name,email,isActive,createdAt, updatedAt, urlImage, lastLogin
            })
        }catch(err){
            throw res.status(err['status']).json(err)
        }
    }

    async disable(req: Request, res: Response){
        try{

            const { id } = req.params
            
            const userService = new UserService()
            
            await userService.disable(Number(id))
            
            return res.status(204).json(null)
        }catch(err) {
            return res.status(err['status']).json(err)
        }
    }
}