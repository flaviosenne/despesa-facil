import { UserService } from './../services/UserService';
import { getCustomRepository } from 'typeorm';
import { PostingsRepository } from './../repositories/PostingsRepository';
import schedule from 'node-schedule'
import { MailService } from '../services/MailService'

schedule.scheduleJob('20 35 * */1 * *', async () => {

    console.log('schedule send report in email all users')
    const email = new MailService()
    

    const postingsRepository = getCustomRepository(PostingsRepository)
    const userService = new UserService()

    const users = await userService.listAll()

    users.forEach(async user => {
        const result = await postingsRepository
            .filterDefault(user.id)
        
        await email.sendEmailReport(result, user.name, user.email)
    })

})