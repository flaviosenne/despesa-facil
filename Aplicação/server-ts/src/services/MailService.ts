import { transporter } from '../config/smtp'
import ejs from 'ejs'
import path from 'path'

export class MailService {
    async sendEmailCreatorAccount(name: string, email: string){

        const pathTemplate = path.join(__dirname,'..',
        '..','templates','mailTemplateCreateAccount.ejs')
        
        ejs.renderFile(pathTemplate, {'email': email}, async(err, template) => {

            if(err) console.log('houve um erro no template ejs')
            
            await transporter.sendMail({
                from: 'Despesa Facil <facildespesa@gmail.com>',
                to: `${name} <${email}>`,
                subject: "Conta criada com sucesso",
                html: template,
            }).then(msg => {
                console.log(`email send to ${email}`)
                
            }).catch(err => {
                console.log(err)
                console.log('erro ao mandar email')
            })
        })
    }
}