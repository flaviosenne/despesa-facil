import { tokenValid } from './../helpers/utils/jwt';
import { NextFunction, Request, Response } from "express"
import { forbidden } from '../helpers/responses';
export const logged = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    const existToken = retrieveToken(String(authorization))
    
    if(!existToken) return res.status(403).json(forbidden("Usuário não autenticado"))

    const tokenIsValid = await tokenValid(existToken)
    
    if(!tokenIsValid) return res.status(403).json(forbidden("Usuário não autenticado"))
    
    next()
}

const retrieveToken = (authorization: string) => {
    const token = authorization.substr(7)
    if(authorization.startsWith('Bearer ')) return token
    
    return null
}
