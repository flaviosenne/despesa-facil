import { Postings } from '../models/Postings';
import { transporter } from '../config/smtp'
import ejs from 'ejs'
import path from 'path'
import htmlPdf from 'html-pdf'
import { PostingsService } from './PostingsService';
import { PostingsRepository } from '../repositories/PostingsRepository';
import { User } from '../models/User';

export class MailService {
    async sendEmailCreatorAccount(name: string, email: string) {

        const pathTemplate = path.join(__dirname, '..',
            '..', 'templates', 'mailTemplateCreateAccount.ejs')

        ejs.renderFile(pathTemplate, { 'name': name }, async (err, template) => {

            if (err) console.log('houve um erro no template ejs')

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

    async sendEmailCodPassword(name: string, email: string, cod: string) {

        const pathTemplate = path.join(__dirname, '..',
            '..', 'templates', 'mailTemplateCodPassword.ejs')

        ejs.renderFile(pathTemplate, { 'cod': cod, 'name': name },
            async (err, template) => {

                if (err) console.log('houve um erro no template ejs')

                await transporter.sendMail({
                    from: 'Despesa Facil <facildespesa@gmail.com>',
                    to: `${name} <${email}>`,
                    subject: "Codigo da senha",
                    html: template,
                }).then(msg => {
                    console.log(`email send to ${email}`)

                }).catch(err => {
                    console.log(err)
                    console.log('erro ao mandar email')
                })
            })
    }


    async sendEmailReport(postings: Postings[], {name, email, id}:User) {
        const postingsService = new PostingsService()
        const pathTemplate = path.join(__dirname, '..',
            '..', 'templates', 'mailTemplateReport.ejs')

        const category = await postingsService.frequencyCategory(postings)
        const expensesPeriod = await postingsService.frequencyExpenses(postings)
        const revenuesPeriod = await postingsService.frequencyRevenues(postings)

        let expenses = postings.filter(posting => posting.type.id == 1)
        let revenues = postings.filter(posting => posting.type.id == 2)

        let totalExpense = 0
        let totalRevenue = 0
        expenses.forEach(expense => {
            return totalExpense += Number(expense.value)
        })
        revenues.forEach(revenue => {
            return totalRevenue += Number(revenue.value)
        })

        const formatValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
        const formatDate = new Intl.DateTimeFormat('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })
        
        ejs.renderFile(pathTemplate, {
            'postings': postings, 'name': name,
            'today': new Date(), 'situation': (totalRevenue - totalExpense) ? 'POSITIVO' : 'NEGATIVO',
            'situationPercent': ((totalExpense / totalRevenue) * 100).toFixed(2) + '%',
            'totalRecep': totalRevenue,
            'totalExpense': totalExpense,
            'total': (totalRevenue - totalExpense),
            'formatValue': formatValue,
            'formatDate': formatDate,
            'category':category['categories'],
            'frequency':category['frequency'],
            'periodExpense':expensesPeriod['period'],
            'frequencyExpense':expensesPeriod['frequency'],
            'periodRevenue':revenuesPeriod['period'],
            'frequencyRevenue':revenuesPeriod['frequency'],
           
        },
            async (err, template) => {

                if (err) return console.error('houve um erro no template relatorio mensal', err)

                htmlPdf.create(template, { format: 'A3' }).toBuffer(async (err, pdf) => {
                    if (err) console.log('houve um erro na geração do pdf do relatorio mensal', err)

                    await transporter.sendMail({
                        from: 'Despesa Facil <facildespesa@gmail.com>',
                        to: `${name} <${email}>`,
                        subject: "Relatório de lançamentos",
                        html: '<p>Segue o relatório do mês</p>',
                        attachments: [
                            {
                                filename: 'relatorio-mensal.pdf',
                                content: pdf
                            }
                        ]
                    }).then(msg => {
                        console.log(`email send to ${email}`)

                    }).catch(err => {
                        console.log(err)
                        console.log('erro ao mandar email')
                    })
                })
            }
        )
    }
}