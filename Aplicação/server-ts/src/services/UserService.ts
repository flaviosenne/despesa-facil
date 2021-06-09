import { UserDto } from './../dtos/UserDto';
import { getCustomRepository } from 'typeorm';
import { User } from '../models/User';
import { UserRepository } from './../repositories/UserRepository';
export class UserService {
    private userRepository: UserRepository

    constructor(){
        this.userRepository = getCustomRepository(UserRepository)
    }
    async listAll(): Promise<User[]>{

        const users: User[] = await this.userRepository.find()
        
        return users
    }

    async save(user: UserDto): Promise<User>{

        const userSaved: User = await this.userRepository.save(user)
        
        return userSaved
    }
}

