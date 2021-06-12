import { UserService } from './../services/UserService';
import { NextFunction, Request, Response } from "express"
export const logged = async (req: Request, res: Response, next: NextFunction) => {
    
    next()
}
