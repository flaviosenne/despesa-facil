import { badRequest, serverError } from './../helpers/responses';
import { getCustomRepository } from "typeorm"
import { PostingsDto } from "../dtos/PostingsDto"
import { notFound } from "../helpers/responses"
import { decodeToken } from "../helpers/utils/jwt"
import { Postings } from "../models/Postings"
import { CategoryRepository } from "../repositories/CategoryRepository"
import { PostingsRepository } from "../repositories/PostingsRepository"

export class PostingsService {
    private postingsRepository: PostingsRepository
    private categoryRepository: CategoryRepository

    constructor() {
        this.postingsRepository = getCustomRepository(PostingsRepository)
        this.categoryRepository = getCustomRepository(CategoryRepository)
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
        authorization: string) {

        try {

            const token = authorization.substr(7)
            const user = decodeToken(token)

            if (!user) throw badRequest('usuário não encontrado')

            if (dateStart != '' && dateStart != '' && status == 0 && category == 0) {
                const result = await this.postingsRepository
                    .filterByDate(dateStart+' 00:00:00', dateEnd+' 23:59:59', user.id)
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
                    .filterByStatusAndCategory(status,category, user.id)
                return result
            }
            if (dateStart != '' && dateStart != '' && status != 0 && category != 0) {
                const result = await this.postingsRepository
                    .filterByStatusAndCategoryAndDate(dateStart+' 00:00:00', dateEnd+' 23:59:59', status,category, user.id)
                return result
            }
            if (dateStart != '' && dateStart != '' && status != 0 && category == 0) {
                const result = await this.postingsRepository
                    .filterByStatusAndDate(dateStart+' 00:00:00', dateEnd+' 23:59:59', status, user.id)
                return result
            }
            if (dateStart != '' && dateStart != '' && status == 0 && category != 0) {
                const result = await this.postingsRepository
                    .filterByCategoryAndDate(dateStart+' 00:00:00', dateEnd+' 23:59:59', category, user.id)
                return result
            }
        } catch (err) {
            throw serverError("erro no servidor")
        }
    }

    async findById(id: number): Promise<Postings | undefined> {

        const postings: Postings | undefined = await this.postingsRepository.findOne({ id })

        if (!postings) throw notFound('usuário não encontrado')

        return postings
    }

    async save(postings: PostingsDto, authorization: string): Promise<Postings> {

        const token = authorization.substr(7)
        const user = decodeToken(token)
        if (!user) throw badRequest('usuário não encontrado')

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

    async delete(id: number) {
        try {
            await this.findById(id)

            await this.postingsRepository.delete(id)
        }
        catch (err) {
            throw err
        }
    }

    async update(postings: PostingsDto) {
        try {

        }
        catch (err) {
            throw err
        }
    }
}