export class ServerError{
    message: string
    status: number
    timestamp: number

    constructor(msg: string){
        this.message = msg
        this.status = 500
        this.timestamp = new Date().getTime()
    }
}