  
module.exports = {
    host: 'smtp.gmail.com',
    port: 587,
    security: true,
    auth: {
        user:'joaodev3@gmail.com',
        pass: 'joaoflavio'
    },
    tls:{
        rejectUnauthorized: false
    }
}