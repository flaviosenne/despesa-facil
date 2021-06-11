export interface UserDto{
    id?:number
    name: string
    email: string
    password: string
    urlImage?: string
    createdAt?: Date
    updatedAt?: Date
    lastLogin?: Date
    isActive?: boolean
}