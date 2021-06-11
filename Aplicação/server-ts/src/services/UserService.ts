import { notFound } from './../helpers/responses';
import { UserDto } from './../dtos/UserDto';
import { getCustomRepository } from 'typeorm';
import { User } from '../models/User';
import { UserRepository } from './../repositories/UserRepository';
import { badRequest, serverError } from '../helpers/responses';
import bcrypt from 'bcrypt'

export class UserService {
    private userRepository: UserRepository

    constructor(){
        this.userRepository = getCustomRepository(UserRepository)
    }
    async listAll(): Promise<User[]>{

        const users: User[] = await this.userRepository.find()
        
        return users
    }

    async listAllActive(): Promise<User[]>{

        const users: User[] = await this.userRepository.find({isActive: true})
        
        return users
    }

    async findByIdAndIsActive(id: number): Promise<User | undefined>{

        const user: User | undefined = await this.userRepository.findOne({id, isActive: true})
        
        if(!user) throw notFound('usuário não encontrado')

        return user
    }

    async save(user: UserDto): Promise<User>{

        if(!user.email) throw badRequest('email não informado')
        if(!user.name) throw badRequest('nome não informado')
        if(!user.password) throw badRequest('senha não informada')

        const existEmail = await this.userRepository.findByEmail(user.email)
        if(existEmail) throw badRequest('email já existe na base de dados')
        
        user.createdAt = new Date()
        user.isActive = true

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(user.password, salt)
        
        user.password = hash
        const userSaved: User = await this.userRepository.save(user)
        
        return userSaved
    }
}

