const connection = require('../database/connection')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const smtp = require('../config/smtp')

const transporter = nodemailer.createTransport(smtp)

const salt = bcrypt.genSaltSync(10)

const { existEmailDatabase, codeIsValid } = require('../services/helpers')

module.exports = {
    
    async sendEmail(req, res) {

        const { email } = req.body
        
        const existEmail = await existEmailDatabase(email)
        
        if (!existEmail) return res.status(404).json({ msg: 'not found' })
        
        const code = crypto.randomBytes(3).toString('HEX')
        
        await connection('codeRecoveryPassword')
        .insert({code, id_user: existEmail.id})
        
        transporter.sendMail({
            from: 'Despesa Facil <flaviodev3@gmail.com>',
            to: `${existEmail.name} <${existEmail.email}>`,
            subject: "Código de Validação",
            html: `Olá, este código tem apenas uma validade
            <h1><strong> ${code} </strong></h1>`
        }).then(msg => {
            // console.log(msg)
            return res.status(200).json(msg.accepted)
        }).catch(err => {
            console.log(err)
            return res.status(500).json('error')
        })
    },

    async updatePassword(req, res){
        const {code, password} =req.body
        
        
        const data = await codeIsValid(code)

        if(!data) return res.status(403).json({msg: 'code invalid'})

        const idUser = 
        await connection('codeRecoveryPassword')
        .select()
        .where({code: code})
        .first()

        const hash = bcrypt.hashSync(password, salt, (err, hash) => {
            if (err) {
                console.log(err)
                return undefined
            }
            return hash
        })
        
        const user = await connection('users')
        .update({password: hash})
        .where({id: idUser.id_user})

        await connection('codeRecoveryPassword')
        .update({used: true})
        .where({code: code})

        return res.status(200).json({user})
    }

}