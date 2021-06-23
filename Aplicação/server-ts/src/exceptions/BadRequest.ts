export class BadRequest{
    message: string
    status: number
    timestamp: number

    constructor(msg: string){
        this.message = msg
        this.status = 400
        this.timestamp = new Date().getTime()
    }
}