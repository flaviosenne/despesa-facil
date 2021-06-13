import { MailService } from './MailService';
import { generateToken } from './../helpers/utils/jwt';
import { notFound } from './../helpers/responses';
import { UserDto } from './../dtos/UserDto';
import { getCustomRepository } from 'typeorm';
import { User } from '../models/User';
import { UserRepository } from './../repositories/UserRepository';
import { badRequest, serverError } from '../helpers/responses';
import { passwordMatchers } from '../helpers/utils/bcrypt';

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

    async existUser(email: string): Promise<User | null> {

        const user: User | undefined = await this.userRepository.findByEmail(email)
        
        if(!user) return null

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
        
        const mailService = new MailService()

        await mailService.sendEmailCreatorAccount(userSaved.name, userSaved.email)
        return userSaved
    }

    async disable(id: number){
        try{
            await this.findByIdAndIsActive(id)

            await this.userRepository.update(id, {isActive: false})
        }
        catch(err){
            throw err
        }
    }

    async update(user: UserDto){
        try{
            const { id, name, email, urlImage} = user
            await this.findByIdAndIsActive(Number(id))

            const existEmail = await this.userRepository
            .findByEmail(user.email)

            if(existEmail) {
                if(existEmail.id !== user.id)
                throw badRequest('email já existe na base de dados')
            }
      
            await this.userRepository.update(Number(id), 
            {name, email, urlImage, updatedAt: new Date()})
        }
        catch(err){
            throw err
        }
    }

    async login(email: string, password: string) {
        
            if(!email) throw badRequest("informe o email")
            if(!password) throw badRequest("informe a senha")

            const existUser = await this.existUser(email)
    
            if(!existUser) throw badRequest("usuario ou senha inválidas")
            
            const matchers = passwordMatchers(password, existUser.password)
            
            if(!matchers) throw badRequest("usuario ou senha inválidas")
    
            const payload = {
                id: existUser.id,
                name: existUser.name,
                email: existUser.email
            }

            this.userRepository.update(existUser.id, {lastLogin: new Date()})
        try{
            return generateToken(payload)             
        }catch(err){
            throw serverError("Erro na geração do token")
        }
    }
}

