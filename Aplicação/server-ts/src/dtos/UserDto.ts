export interface UserDto{
    name: string
    email: string
    password: string
    urlImage?: string
    createdAt?: Date
    updatedAt?: Date
    lastLogin?: Date
    isActive?: boolean
}