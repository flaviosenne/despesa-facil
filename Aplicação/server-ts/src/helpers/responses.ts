export const notFound = (msg: string) => {
    return {
        message: msg,
        status: 404,
        timestamp: Date.now()
    } 
}

export const forbidden = (msg: string) => {
    return {
        message: msg,
        status: 403,
        timestamp: Date.now()
    } 
}

export const serverError = (msg: string) => {
    return {
        message: msg,
        status: 500,
        timestamp: Date.now()
    } 
}

export const badRequest = (msg: string) => {
    return {
        message: msg,
        status: 400,
        timestamp: Date.now()
    } 
}