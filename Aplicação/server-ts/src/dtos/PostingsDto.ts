import { UserDto } from './UserDto';

export interface PostingsDto{
    id?:number
    description: string
    value: number
    type: string
    status: string
    installments: number
    createdAt?: Date
    postingsDate?: Date
    updatedAt?: Date
    user: UserDto
    category: { id?: number, name?: string}
}