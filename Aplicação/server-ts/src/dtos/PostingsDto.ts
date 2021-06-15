import { Status } from '../models/Status';
import { Type } from '../models/Type';
import { UserDto } from './UserDto';

export interface PostingsDto{
    id?:number
    description: string
    value: number
    type: Type
    status: Status
    installments: number
    createdAt?: Date
    postingsDate?: Date
    updatedAt?: Date
    user: UserDto
    category: { id?: number, name?: string}
}