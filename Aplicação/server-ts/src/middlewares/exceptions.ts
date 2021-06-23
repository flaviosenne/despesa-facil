import {NextFunction, Request, Response} from 'express'
import { BadRequest } from '../exceptions/BadRequest';
import { NotFound } from '../exceptions/NotFound';
import { Unauthorized } from '../exceptions/Unauthorized';
import { Forbbiden } from '../exceptions/Forbbiden';
import { ServerError } from '../exceptions/ServerError';

export const exceptions = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof BadRequest) return res.status(400).json({msg: err.message})
    if(err instanceof NotFound) return res.status(404).json({msg: err.message})
    if(err instanceof Unauthorized) return res.status(401).json({msg: err.message})
    if(err instanceof Forbbiden) return res.status(403).json({msg: err.message})
    if(err instanceof ServerError) return res.status(500).json({msg: err.message})  
}