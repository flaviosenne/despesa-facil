import { PostingsDto } from './../dtos/PostingsDto';
import { Request, Response } from "express";
import { PostingsService } from "../services/PostingsService";

export class PostingsController {

    async listAll(req: Request, res: Response) {

        const postingsService = new PostingsService()

        const postings = await postingsService.listAll()

        return res.status(200).json(postings)
    }

    async listAllByFilter(req: Request, res: Response) {

        const postingsService = new PostingsService()

        const { datestart, dateend, status, category} = req.query

        console.log('estou aqui')
        const postings = await postingsService
        .listAllByFilter(String(datestart), String(dateend), Number(category), Number(status))

        return res.status(200).json(postings)
    }

    async findById(req: Request, res: Response) {
        try {

            const { id } = req.params

            const postingsService = new PostingsService()

            const postings = await postingsService.findById(Number(id))

            return res.status(200).json(postings)
        } catch (err) {
            return res.status(err['status']).json(err)
        }
    }

    async save(req: Request, res: Response) {
        try {
            const postingsService = new PostingsService()

            const postings = req.body as PostingsDto
            
            const token = String(req.headers.authorization)
            
            const postingsSaved = await postingsService.save(postings, token)

            return res.status(201).json(postingsSaved)
        } catch (err) {
            throw res.json(err)
        }
    }

    async delete(req: Request, res: Response) {
        try {

            const { id } = req.params

            const postingsService = new PostingsService()

            await postingsService.delete(Number(id))

            return res.status(204).json(null)
        } catch (err) {
            return res.status(err['status']).json(err)
        }
    }

    async update(req: Request, res: Response) {
        try {

         
        } catch (err) {
            return res.status(err['status']).json(err)
        }
    }
}