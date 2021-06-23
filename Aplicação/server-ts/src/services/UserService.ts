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

    async existUser(email: string): Promise<User | null> {

        const user: User | undefined = await this.userRepository.findByEmail(email)

        if (!user) return null

        return user
    }

    async save(user: UserDto): Promise<User> {

        if (!user.email) throw new BadRequest('email não informado')
        if (!user.name) throw new BadRequest('nome não informado')
        if (!user.password) throw new BadRequest('senha não informada')

        const existEmail = await this.userRepository.findByEmail(user.email)

        if (existEmail) throw new BadRequest('email já existe na base de dados')

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

    async disable(id: number) {
        try {
            await this.findByIdAndIsActive(id)

            await this.userRepository.update(id, { isActive: false })
        }
        catch (err) {
            throw new ServerError('erro em desabilitar usuário')
        }
    }

    async update(user: UserDto) {
        try {
            const { id, name, email, urlImage } = user
            await this.findByIdAndIsActive(Number(id))

            const existEmail = await this.userRepository
                .findByEmail(user.email)

            if (existEmail) {
                if (existEmail.id !== user.id)
                    throw new BadRequest('email já existe na base de dados')
            }

            await this.userRepository.update(Number(id),
                { name, email, urlImage, updatedAt: new Date() })
        }
        catch (err) {
            throw new ServerError('erro em atualizar usuário')
        }
    }

    async login(email: string, password: string) {

        if (!email) throw new BadRequest('informe o email')
        if (!password) throw new BadRequest('informe a senha')

        const existUser = await this.existUser(email)

        if (!existUser) throw new BadRequest('usuario ou senha inválidas')

        const matchers = passwordMatchers(password, existUser.password)

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

