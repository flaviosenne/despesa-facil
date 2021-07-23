import { Postings } from './../models/Postings';
import { UserService } from './UserService';
import { getCustomRepository } from "typeorm"
import { payload } from "../dtos/PayloadDto"
import { PostingsDto } from "../dtos/PostingsDto"
import { BadRequest } from "../exceptions/BadRequest"
import { NotFound } from "../exceptions/NotFound"
import { ServerError } from "../exceptions/ServerError"
import { decodeToken } from "../helpers/utils/jwt"
import { CategoryRepository } from "../repositories/CategoryRepository"
import { PostingsRepository } from "../repositories/PostingsRepository"
import { StatusRepository } from "../repositories/StatusRepository"
import { Unauthorized } from '../exceptions/Unauthorized';

export class PostingsService {
    private postingsRepository: PostingsRepository
    private categoryRepository: CategoryRepository
    private statusRepository: StatusRepository

    constructor() {
        this.postingsRepository = getCustomRepository(PostingsRepository)
        this.categoryRepository = getCustomRepository(CategoryRepository)
        this.statusRepository = getCustomRepository(StatusRepository)
    }

    async listAll(): Promise<Postings[]> {
        try {

            const postings: Postings[] = await this.postingsRepository
                .find({ relations: ['user', 'category', 'status', 'type'] })

            return postings

        } catch (err) {
            throw new ServerError(err)
        }
    }

    async listAllByFilter(
        dateStart: string,
        dateEnd: string,
        category: number,
        status: number,
        type: number,
        user: payload) {

        try {
            let result = await this.postingsRepository.findByUserId(user.id)

            if (dateStart === 'undefined') dateStart = ''
            if (dateEnd === 'undefined') dateEnd = ''
            if (!status) status = 0
            if (!category) category = 0
            if (!type) type = 0

            if (dateStart !== '') {
                result = result.filter(res => res.postingsDate.getTime() >= new Date(dateStart).getTime())
            }
            if (dateEnd !== '') {
                result = result.filter(res => res.postingsDate.getTime() <= new Date(dateEnd).getTime())
            }
            if (dateStart !== '' && dateEnd !== '') {
                result = result.filter(res =>
                    res.postingsDate.getTime() <= new Date(dateEnd).getTime() &&
                    res.postingsDate.getTime() >= new Date(dateStart).getTime())
            }
            if (category !== 0) {
                result = result.filter(res => res.category.id === category)
            }
            if (status !== 0) {
                result = result.filter(res => res.status.id === status)
            }
            if (type !== 0) {
                result = result.filter(res => res.type.id === type)
            }

            return result
        } catch (err) {
            throw new ServerError(err)
        }
    }

    async findById(id: number, userId: payload): Promise<Postings | undefined> {

        try {

            const user = await new UserService().findByIdAndIsActive(userId.id)

            const postings: Postings | undefined = await this.postingsRepository.findOne({ id, user })

            if (!postings) throw new NotFound('usuário não encontrado')

            return postings
        } catch (err) {
            throw new ServerError(err)
        }

    }

    async save(postings: PostingsDto, authorization: string): Promise<Postings> {
        try {
            const token = authorization.substr(7)
            const user = decodeToken(token)
            if (!user) throw new BadRequest('usuário não encontrado')

            const categoryName = postings.category.name?.toUpperCase().trim()
            let category
            if (postings.category.id) {
                category = await this.categoryRepository.findOne({ id: postings.category.id })
                if (!category) {
                    category = await this.categoryRepository.findOne({ name: categoryName })
                    if (!category) category = await this.categoryRepository.save({ name: categoryName, user })
                }
            } else {
                category = await this.categoryRepository.findOne({ name: categoryName })
                if (!category) category = await this.categoryRepository.save({ name: categoryName, user })
            }


            postings.postingsDate = postings.postingsDate ? postings.postingsDate : new Date()
            postings.user = user
            postings.category = category
            postings.createdAt = new Date()
            const postingsSaved = await this.postingsRepository.save(postings)
            console.log('chegie')

            return postingsSaved
        } catch (err) {
            throw new ServerError(err)
        }
    }

    async delete(id: number, userId: payload): Promise<void> {
        try {
            await this.findById(id, userId)

            await this.postingsRepository.update(id, { isActive: false })
        }
        catch (err) {
            throw new ServerError(err)
        }
    }

    async update(postings: PostingsDto, userId: payload) {

        if (postings.id == null) throw new BadRequest('id do lançamento não informado')
        if (postings.category.id == null) throw new BadRequest('id da categoria não informado')
        if (postings.status.id == null) throw new BadRequest('id do status não informado')

        const posting = await this.postingsRepository.findOne(postings.id, { relations: ['category', 'status', 'user'] })

        if (posting.user.id != userId.id) throw new Unauthorized('não possui permissão para atualizar esse lançamento')

        let category = await this.categoryRepository.findOne(postings.category.id)

        if (posting.category.id != postings.category.id) {

            const categoryName = postings.category.name?.toUpperCase().trim()
            category = await this.categoryRepository.findOne({ id: postings.category.id })

            if (!category) {
                category = await this.categoryRepository.findOne({ name: categoryName })
                if (!category) category = await this.categoryRepository.save({ name: categoryName, user: userId })
            }
        }

        const status = await this.statusRepository.findOne(postings.status.id)

        try {
            await this.postingsRepository.update(postings.id, {
                updatedAt: new Date(),
                description: postings.description,
                status,
                category,
                value: postings.value,
                installments: postings.installments,
                postingsDate: postings.postingsDate
            })
        }
        catch (err) {
            throw new ServerError(err)
        }
    }

    async frequencyCategory(postings: Postings[]) {

        return new Promise((resolve, reject) => {
            const values = []
            const categories = []
            let cont
            let frequency = []
            const colors = []
            postings.map(posting => {
                if (posting.type.id == 1) {

                    categories.push(posting.category.name)
                    values.push(posting.value)
                }
            })

            var aux = 0
            for (let i = 0; i < categories.length; i++) {
                cont = values[i + aux]
                for (let j = i; j < categories.length; j++) {
                    while (categories[i] === categories[j + 1]) {
                        cont = (parseFloat(cont) + parseFloat(values[j + aux + 1])).toFixed(2)
                        categories.splice(j, 1);
                        aux++
                    }
                }
                frequency[i] = cont
                var red = 0 + Math.floor((255 - 0) * Math.random());
                var green = 0 + Math.floor((255 - 0) * Math.random());
                var blue = 0 + Math.floor((255 - 0) * Math.random());
                colors.push(`rgb(${red}, ${green}, ${blue})`)
            }
            resolve({ categories, frequency, colors })
        })

    }

    async frequencyExpenses(postings: Postings[]) {

        return new Promise((resolve, reject) => {
            const values = []
            const period = []
            let cont
            let frequency = []
            const colors = []
            postings.map(posting => {
                if (posting.type.id == 1) {
                    period.push(
                        new Intl.DateTimeFormat('pt-BR', { month: 'long' })
                            .format(posting.postingsDate))
                    values.push(posting.value)
                }
            })

            var aux = 0
            for (let i = 0; i < period.length; i++) {
                cont = values[i + aux]
                for (let j = i; j < period.length; j++) {
                    while (period[i] === period[j + 1]) {
                        cont = (parseFloat(cont) + parseFloat(values[j + aux + 1])).toFixed(2)
                        period.splice(j, 1);
                        aux++
                    }
                }
                frequency[i] = cont
                var red = 0 + Math.floor((255 - 0) * Math.random());
                var green = 0 + Math.floor((255 - 0) * Math.random());
                var blue = 0 + Math.floor((255 - 0) * Math.random());
                colors.push(`rgb(${red}, ${green}, ${blue})`)
            }
            resolve({ period, frequency, colors })
        })

    }

    async frequencyRevenues(postings: Postings[]) {

        return new Promise((resolve, reject) => {
            const values = []
            const period = []
            let cont
            let frequency = []
            const colors = []
            postings.map(posting => {
                if (posting.type.id == 2) {
                    period.push(
                        new Intl.DateTimeFormat('pt-BR', { month: 'long' })
                            .format(posting.postingsDate))
                    values.push(posting.value)
                }
            })

            var aux = 0
            for (let i = 0; i < period.length; i++) {
                cont = values[i + aux]
                for (let j = i; j < period.length; j++) {
                    while (period[i] === period[j + 1]) {
                        cont = (parseFloat(cont) + parseFloat(values[j + aux + 1])).toFixed(2)
                        period.splice(j, 1);
                        aux++
                    }
                }
                frequency[i] = cont
                var red = 0 + Math.floor((255 - 0) * Math.random());
                var green = 0 + Math.floor((255 - 0) * Math.random());
                var blue = 0 + Math.floor((255 - 0) * Math.random());
                colors.push(`rgb(${red}, ${green}, ${blue})`)
            }
            resolve({ period, frequency, colors })
        })

    }

}