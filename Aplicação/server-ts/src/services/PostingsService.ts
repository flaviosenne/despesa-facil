import { getCustomRepository } from "typeorm"
import { PostingsDto } from "../dtos/PostingsDto"
import { notFound } from "../helpers/responses"
import { Postings } from "../models/Postings"
import { CategoryRepository } from "../repositories/CategoryRepository"
import { PostingsRepository } from "../repositories/PostingsRepository"

export class PostingsService{
    private postingsRepository: PostingsRepository
    private categoryRepository: CategoryRepository

    constructor() {
        this.postingsRepository = getCustomRepository(PostingsRepository)
        this.categoryRepository = getCustomRepository(CategoryRepository)
    }

    async listAll(): Promise<Postings[]> {

        const users: Postings[] = await this.postingsRepository
        .find({relations: ['user', 'category']})

        return users
    }

    async findById(id: number): Promise<Postings | undefined> {

        const postings: Postings | undefined = await this.postingsRepository.findOne({ id })

        if (!postings) throw notFound('usuário não encontrado')

        return postings
    }

    async save(postings: PostingsDto): Promise<Postings>{

        let category = await this.categoryRepository.findOne({ id: postings.category.id})
        
        if(!category) category = await this.categoryRepository.save(postings.category)
        
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