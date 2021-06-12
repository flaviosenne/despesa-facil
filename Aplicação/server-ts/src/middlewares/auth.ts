import { UserService } from './../services/UserService';
import { NextFunction, Request, Response } from "express"
import { UserDto } from '../dtos/UserDto';
import { badRequest } from '../helpers/responses';
import { passwordMatchers } from '../helpers/utils/bcrypt';

export const logged = async (req: Request, res: Response, next: NextFunction) => {
    const userService = new UserService()

    const user = req.body as UserDto

    const existUser = await userService.existUser(user.email)

    if(!existUser) return res.status(400).json(badRequest("usuario ou senha inválidas"))
    
    const matchers = passwordMatchers(user.password, existUser.password)
    
    if(!matchers) return res.status(400).json(badRequest("usuario ou senha inválidas"))
    
    next()
}
