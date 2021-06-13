import nodemailer from 'nodemailer'

const smtp = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS,
    }
} as any

const transporter = nodemailer.createTransport(smtp)

export { transporter }