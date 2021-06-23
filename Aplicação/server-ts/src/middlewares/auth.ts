import { tokenValid } from './../helpers/utils/jwt';
import { NextFunction, Request, Response } from "express"
import { Forbbiden } from '../exceptions/Forbbiden';
export const logged = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    const existToken = retrieveToken(String(authorization))
    
    if(!existToken) throw new Forbbiden('Usuário não autenticado')

    const tokenIsValid = tokenValid(existToken)
    
    if(!tokenIsValid) throw new Forbbiden('Usuário não autenticado')
    
    next()
}

const retrieveToken = (authorization: string) => {
    const token = authorization.substr(7)
    if(authorization.startsWith('Bearer ')) return token
    
    return null
}
