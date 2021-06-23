export class Unauthorized{
    message: string
    status: number
    timestamp: number

    constructor(msg: string){
        this.message = msg
        this.status = 401
        this.timestamp = new Date().getTime()
    }
}