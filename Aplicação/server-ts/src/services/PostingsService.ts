import { UserService } from './UserService';
import { getCustomRepository } from "typeorm"
import { payload } from "../dtos/PayloadDto"
import { PostingsDto } from "../dtos/PostingsDto"
import { BadRequest } from "../exceptions/BadRequest"
import { NotFound } from "../exceptions/NotFound"
import { ServerError } from "../exceptions/ServerError"
import { decodeToken } from "../helpers/utils/jwt"
import { Postings } from "../models/Postings"
import { CategoryRepository } from "../repositories/CategoryRepository"
import { PostingsRepository } from "../repositories/PostingsRepository"
import { StatusRepository } from "../repositories/StatusRepository"

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

        const postings: Postings[] = await this.postingsRepository
            .find({ relations: ['user', 'category', 'status', 'type'] })

        return postings
    }

    async listAllByFilter(
        dateStart: string,
        dateEnd: string,
        category: number,
        status: number,
        type: number,
        user: payload) {

        try {

            if (dateStart == '' && dateStart == '' && status == 0 && category == 0 && type != 0) {
                const result = await this.postingsRepository
                    .filterByType(type, user.id)
                return result
            }
            if (dateStart == '' && dateStart == '' && status != 0 && category == 0 && type != 0) {
                const result = await this.postingsRepository
                    .filterByTypeAndStatus(type, status, user.id)
                return result
            }
            if (dateStart != '' && dateStart != '' && status == 0 && category == 0 && type != 0) {
                const result = await this.postingsRepository
                    .filterByTypeAndDate(type, dateStart + ' 00:00:00', dateEnd + ' 23:59:59', user.id)
                return result
            }
            if (dateStart != '' && dateStart != '' && status != 0 && category == 0 && type != 0) {
                const result = await this.postingsRepository
                    .filterByTypeAndDateAndStatus(type, status, dateStart + ' 00:00:00', dateEnd + ' 23:59:59', user.id)
                return result
            }
            if (dateStart != '' && dateStart != '' && status == 0 && category == 0) {
                const result = await this.postingsRepository
                    .filterByDate(dateStart + ' 00:00:00', dateEnd + ' 23:59:59', user.id)
                return result
            }
            if (dateStart == '' && dateStart == '' && status == 0 && category == 0) {
                const result = await this.postingsRepository
                    .filterDefault(user.id)
                return result
            }
            if (dateStart == '' && dateStart == '' && status == 0 && category != 0) {
                const result = await this.postingsRepository
                    .filterByCategory(category, user.id)
                return result
            }
            if (dateStart == '' && dateStart == '' && status != 0 && category == 0) {
                const result = await this.postingsRepository
                    .filterByStatus(status, user.id)
                return result
            }
            if (dateStart == '' && dateStart == '' && status != 0 && category != 0) {
                const result = await this.postingsRepository
                    .filterByStatusAndCategory(status, category, user.id)
                return result
            }
            if (dateStart != '' && dateStart != '' && status != 0 && category != 0) {
                const result = await this.postingsRepository
                    .filterByStatusAndCategoryAndDate(dateStart + ' 00:00:00', dateEnd + ' 23:59:59', status, category, user.id)
                return result
            }
            if (dateStart != '' && dateStart != '' && status != 0 && category == 0) {
                const result = await this.postingsRepository
                    .filterByStatusAndDate(dateStart + ' 00:00:00', dateEnd + ' 23:59:59', status, user.id)
                return result
            }
            if (dateStart != '' && dateStart != '' && status == 0 && category != 0) {
                const result = await this.postingsRepository
                    .filterByCategoryAndDate(dateStart + ' 00:00:00', dateEnd + ' 23:59:59', category, user.id)
                return result
            }
        } catch (err) {
            throw new ServerError("erro no servidor")
        }
    }

    async findById(id: number, userId: payload): Promise<Postings | undefined> {

        const user = await new UserService().findByIdAndIsActive(userId.id)
        
        const postings: Postings | undefined = await this.postingsRepository.findOne({ id, user })

        if (!postings) throw new NotFound('usuário não encontrado')

        return postings
    }

    async save(postings: PostingsDto, authorization: string): Promise<Postings> {

        const token = authorization.substr(7)
        const user = decodeToken(token)
        if (!user) throw new BadRequest('usuário não encontrado')

        const categoryName = postings.category.name?.toUpperCase().trim()
        let category = await this.categoryRepository.findOne({ id: postings.category.id })

        if (!category) {
            category = await this.categoryRepository.findOne({ name: categoryName })
            if (!category) category = await this.categoryRepository.save({ name: categoryName, user })
        }

        postings.postingsDate = postings.postingsDate ? postings.postingsDate : new Date()
        postings.user = user
        postings.category = category
        postings.createdAt = new Date()
        const postingsSaved = await this.postingsRepository.save(postings)

        return postingsSaved
    }

    async delete(id: number, userId: payload): Promise<void> {
        try {
            await this.findById(id, userId)

            await this.postingsRepository.update(id, { isActive: false })
        }
        catch (err) {
            throw new ServerError('erro na deleção do lançamento')
        }
    }

    async update(postings: PostingsDto, authorization: string) {
        const token = authorization.substr(7)
        const user = decodeToken(token)
        if (!user) throw new BadRequest('usuário não encontrado')

        if (postings.id == null) throw new BadRequest('id do lançamento não informado')
        if (postings.category.id == null) throw new BadRequest('id da categoria não informado')
        if (postings.status.id == null) throw new BadRequest('id do status não informado')

        const posting = await this.postingsRepository.findOne(postings.id, { relations: ['category', 'status', 'user'] })

        let category = await this.categoryRepository.findOne(postings.category.id)

        if (posting.category.id != postings.category.id) {

            const categoryName = postings.category.name?.toUpperCase().trim()
            category = await this.categoryRepository.findOne({ id: postings.category.id })

            if (!category) {
                category = await this.categoryRepository.findOne({ name: categoryName })
                if (!category) category = await this.categoryRepository.save({ name: categoryName, user })
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
            throw new ServerError('erro na atualização do lançamento')
        }
    }
}