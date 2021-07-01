declare namespace Express{
    export interface Request {
        userId: {
            id: number
            name: string
            email: string
        }
    }
}