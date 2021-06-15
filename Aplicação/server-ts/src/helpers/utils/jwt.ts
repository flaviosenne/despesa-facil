import { UserDto } from './../../dtos/UserDto';
import jwt from 'jsonwebtoken'
const secret = String(process.env.JWT_SECRET)

export const generateToken = (payload: any): string => {

    return jwt.sign(payload, secret, {expiresIn: '1d'})
}

export const tokenValid = async (token: string) => {
    return jwt.verify(token, secret, (err: any, user: any) => {
        if(err) return false

        return true
    })
}

export const decodeToken = (token: string): any | null => {

    return jwt.verify(token, secret, (err: any, user: any) => {
        if(err) return null
        
        return user
    })
}