export class Forbbiden{
    message: string
    status: number
    timestamp: number

    constructor(msg: string){
        this.message = msg
        this.status = 403
        this.timestamp = new Date().getTime()
    }
}