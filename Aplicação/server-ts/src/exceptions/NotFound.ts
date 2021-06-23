export class NotFound{
    message: string
    status: number
    timestamp: number

    constructor(msg: string){
        this.message = msg
        this.status = 404
        this.timestamp = new Date().getTime()
    }
}