import jwt from 'jsonwebtoken'
const secret = String(process.env.JWT_SECRET)

export const generateToken = (payload: any): string => {

    return jwt.sign(payload, secret, { expiresIn: '1d' })
}

export const tokenValid = (token: string): any | boolean => {
    try {
        return jwt.verify(token, secret, (err: any, user: any) => {
            if (err) return false

            return user
        })
    } catch (err) {
        return false
    }
}

export const decodeToken = (token: string): any | null => {
    try {
        return jwt.verify(token, secret, (err: any, user: any) => {
            if (err) return null
            
            return user
        })
    } catch (err) {
        return null
    }
}