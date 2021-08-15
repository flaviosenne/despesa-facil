import { UserService } from './../services/UserService';
import { getCustomRepository } from 'typeorm';
import { PostingsRepository } from './../repositories/PostingsRepository';
import schedule from 'node-schedule'
import { MailService } from '../services/MailService'

schedule.scheduleJob('0 13 * */1 * *', async () => {

    console.log('schedule send report in email all users')
    
    const email = new MailService()

    const postingsRepository = getCustomRepository(PostingsRepository)
    
    const userService = new UserService()

    const users = await userService.listAll()

    users.forEach(async user => {
        const result = await postingsRepository
            .getPostingsLastTreeMonth(user.id)
        
            const result2 = await postingsRepository
            .getPostingsLastTwelveMonth(user.id)
        
        await email.sendEmailReport(result, result2, user)
    })

})