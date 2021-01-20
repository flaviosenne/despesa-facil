const oauth2Client = require('./google')
 // get token
 const accessToken = oauth2Client.getAccessToken()
   

module.exports = {
    host:process.env.MAIL_HOST,
    port:process.env.MAIL_PORT,
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user:process.env.MAIL_USER,
		clientId: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
		accessToken: accessToken,
		// expires: googleAuth.tokens.expiry_date
    }
}