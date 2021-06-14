// import firebase from "firebase/app";
// import "firebase/analytics";
// import "firebase/auth";
// import "firebase/firestore";


// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.FIREBASE_APP_ID,
//     measurementId: process.env.FIREBASE_MEASUREMENT_ID
// };
  


// export default firebase.initializeApp(firebaseConfig)


// import {Storage} from'@google-cloud/storage'

// const storage = new Storage();


// const bucketName = String(process.env.FIREBASE_BUCKET_NAME)

// async function createBucket() {
//   await storage.createBucket(bucketName)
//   console.log(`Bucket ${bucketName} created.`)
// }

// createBucket().catch(console.error)