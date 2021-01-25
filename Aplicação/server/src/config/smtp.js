const oauth2Client = require('./google')
 // get token
//  const accessToken = oauth2Client.getAccessToken()
   
// const google = {
//     host:process.env.GOOGLE_MAIL_HOST,
//     port:process.env.GOOGLE_MAIL_PORT,
//     service: 'gmail',
//     auth: {
//         type: 'OAuth2',
//         user:process.env.GOOGLE_MAIL_USER,
// 		clientId: process.env.GOOGLE_CLIENT_ID,
// 		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// 		refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
//         accessToken: accessToken
//     }
// }

const mailtrap = {
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
        user:process.env.MAILTRAP_USER,
        pass:process.env.MAILTRAP_PASS,
    }
}
module.exports = mailtrap