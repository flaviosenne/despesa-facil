import { UploadFileService } from './../services/UploadFileService';
import { Request, Response } from "express";

export class UploadController {
    async uploadImage(req: Request, res: Response){
        try{

            const uploadFileService = new UploadFileService()
            
            await uploadFileService.uploadImage()
            return res.status(200).json()
            
        }catch(err){
            // return res.status(500).json(err)
        }
    }   
}