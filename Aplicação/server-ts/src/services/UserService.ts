import { Unauthorized } from './../exceptions/Unauthorized';
import bcrypt from 'bcrypt'
import { MailService } from './MailService';
import { generateToken } from '../helpers/utils/jwt';
import { UserDto } from '../dtos/UserDto';
import { getCustomRepository } from 'typeorm';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { passwordMatchers } from '../helpers/utils/bcrypt';
import { CodPasswordRepository } from '../repositories/CodPasswordRepository';
import { BadRequest } from '../exceptions/BadRequest';
import { NotFound } from '../exceptions/NotFound';
import { ServerError } from '../exceptions/ServerError';
import { payload } from '../dtos/PayloadDto';

export class UserService {
    private userRepository: UserRepository
    private codPasswordRepository: CodPasswordRepository

    constructor() {
        this.userRepository = getCustomRepository(UserRepository)
        this.codPasswordRepository = getCustomRepository(CodPasswordRepository)
    }

    async listAll(): Promise<User[]> {

        const users: User[] = await this.userRepository.find()

        return users
    }

    async listAllActive(): Promise<User[]> {

        const users: User[] = await this.userRepository.find({ isActive: true })

        return users
    }

    async findByIdAndIsActive(id: number): Promise<User | undefined> {

        const user: User | undefined = await this.userRepository.findOne({ id, isActive: true })

        if (!user) throw new NotFound('usuário não encontrado')

        return user
    }

    private async existUserByEmail(email: string): Promise<User | null> {

        const user: User | undefined = await this.userRepository.findByEmail(email)

        if (!user) return null

        return user
    }

    async save(user: UserDto): Promise<User> {

        const decodeBase64 =Buffer.from(user.password, 'base64').toString('ascii')
   
        if (!user.email) throw new BadRequest('email não informado')
        if (!user.name) throw new BadRequest('nome não informado')
        if (!user.password) throw new BadRequest('senha não informada')

        const existEmail = await this.userRepository.findByEmail(user.email)

        if (existEmail) throw new BadRequest('email já existe na base de dados')

        user.createdAt = new Date()
        user.isActive = true

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(decodeBase64, salt)

        user.password = hash
        const userSaved: User = await this.userRepository.save(user)

        const mailService = new MailService()

        await mailService.sendEmailCreatorAccount(userSaved.name, userSaved.email)
        return userSaved
    }

    async disable(userId: payload) {
        await this.findByIdAndIsActive(userId.id)
        
        try {
            await this.userRepository.update({id: userId.id}, { isActive: false })
        }
        catch (err) {
            throw new ServerError('erro em desabilitar usuário')
        }
    }

    async update(userId: payload, userToUpadate: UserDto) {
        const { id, name, email, urlImage } = userToUpadate
 
        const userLogged = await this.findByIdAndIsActive(userId.id)
        
            const existUser = await this.userRepository
            .findOne(id)

            const existEmail = await this.userRepository.findByEmail(email)

            if(existEmail) {
                if(existEmail.email != userId.email) throw new BadRequest('emai já existe na base de dados')
            }
            if(!existUser) throw new NotFound('usuário não existe na base de dados')
            
            if (existUser) {
                if (existUser.id !== userLogged.id)
                throw new Unauthorized('não possui permissão  para alterar essa conta')
            }
            
        try {
            await this.userRepository.update(Number(userLogged.id),
                { name, email, urlImage, updatedAt: new Date() })
        }
        catch (err) {
            throw new ServerError('erro em atualizar usuário')
        }
    }

    async login(email: string, password: string) {

        if (!email) throw new BadRequest('informe o email')
        if (!password) throw new BadRequest('informe a senha')

        const existUser = await this.existUserByEmail(email)

        if (!existUser) throw new BadRequest('usuario ou senha inválidas')

        const decodeBase64 =Buffer.from(password, 'base64').toString('ascii')
   
        const matchers = passwordMatchers(decodeBase64, existUser.password)

        if (!matchers) throw new BadRequest('usuario ou senha inválidas')

        const payload = {
            id: existUser.id,
            name: existUser.name,
            email: existUser.email
        }

        this.userRepository.update(existUser.id, { lastLogin: new Date() })
        try {
            return generateToken(payload)
        } catch (err) {
            throw new ServerError('Erro na geração do token')
        }
    }

    async updatePassword(password: string, cod: string) {

        const existCode = await this.codPasswordRepository
            .findOne({ isUsed: 0, name: cod },{ relations: ['user']})

        if (!existCode) throw new BadRequest('código inválido')

        const user = await this.findByIdAndIsActive(existCode.user.id)

        if (!user) throw new NotFound('usuário não encontrado')

        const salt = bcrypt.genSaltSync(10)

        const hash = bcrypt.hashSync(password, salt)

        password = hash

        await this.userRepository.update(user.id, { password })
        
        await this.codPasswordRepository.update(existCode.id, { isUsed: 1 })        
    }

    async retrievePassword(email: string) {
        const mailService = new MailService()

        if(!email) throw new BadRequest('email não informado')

        const user = await this.userRepository.findByEmail(email)

        if (!user) throw new NotFound('esse email não consta na base de dados')

        const cod = Math.random().toString(36).substr(7)

        this.codPasswordRepository.save({ name: cod, user, isUsed: 0 })

        await mailService.sendEmailCodPassword(user.name, user.email, cod)
    }
}

