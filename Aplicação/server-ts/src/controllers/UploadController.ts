import { UploadFileService } from './../services/UploadFileService';
import { Request, Response } from "express";

export class UploadController {
    uploadImage(req: Request, res: Response){
        try{

            const uploadFileService = new UploadFileService()
            
            uploadFileService.uploadImage()
            return res.status(200).json()
            
        }catch(err){
            return res.status(err['status']).json(err)
        }
    }   
}