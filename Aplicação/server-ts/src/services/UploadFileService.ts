import { serverError } from './../helpers/responses';
import firebase from '../config/firebase'
import fs from 'fs'
export class UploadFileService {
    uploadImage() {
        const path = __dirname+'/test.jpg'
        console.log('path----',path)
        fs.readFile(path, (err, file) => {
            if(err) throw serverError('erro no upload da imagem')

            var storageRef = firebase.storage().ref();

            var uploadTask = storageRef.child('images/'+path).put(file);
    
            uploadTask.on('state_changed', function (snapshot) {
    
            }, function (error) {
                console.error("Something nasty happened", error);
            }, function () {
                var downloadURL = uploadTask.snapshot;
                console.log("Done. Enjoy.", downloadURL);
            });
        })
        
    }
}