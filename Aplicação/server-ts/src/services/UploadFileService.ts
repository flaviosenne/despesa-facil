import { Storage } from '@google-cloud/storage'
import path from 'path'
export class UploadFileService {
    async uploadImage() {
        const filePath = path.join(__dirname, 'test.jpg')
        
        console.log(filePath)
        const bucketName = String(process.env.FIREBASE_BUCKET_NAME)
    
        const storage = new Storage();

        storage.bucket(bucketName).upload(filePath, {
            destination: '/test.png',
        }).then(() => console.log('deu certo'))
        .catch(() => console.log('deu erro'))
        
    }
}