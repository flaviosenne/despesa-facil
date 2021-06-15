import { Request, Response } from "express";
import { PostingsService } from "../services/PostingsService";

export class PostingsController {

    async listAll(req: Request, res: Response) {

        const postingsService = new PostingsService()

        const postings = await postingsService.listAll()

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
            
        } catch (err) {
            throw res.status(err['status']).json(err)
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