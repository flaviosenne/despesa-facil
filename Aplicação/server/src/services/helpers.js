const connection = require('../database/connection')
const day = '01'

const month =
    (new Date().getMonth() + 1) < 10 ?
        +'0' + (new Date().getMonth() + 1) :
        (new Date().getMonth() + 1)

const year = new Date().getFullYear()

const dateStart =  year + '-' + month  +'-' + day
const dateEnd =    year+ '-' + Number(month+1) + '-' + day
module.exports = {
    orderBy(value) {
        var aux
        for (let i = 0; i < value.length; i++) {
            aux = (value[i])
            j = i - 1;
            while ((j >= 0) && (aux.date.split('/')[1] < value[j].date.split('/')[1])) {
                value[j + 1] = (value[j]);
                j--;
            }
            value[j + 1] = aux;
        }
        return value
    },
    async existEmailDatabase(email) {
        console.log(email)

        const result = await connection('users')
            .where('email', email)
            .select('email')

        return result
    },
    async existUserDatabase(id) {

        const result = await connection('users')
            .where('id', id)
            .select('id').first()

        return result
    },


    // queries expense in database 
    async queryExpenseDatabaseCategory(id_user, category) {
        console.log(category)

        return await connection('expense')
            .whereBetween('date', [dateStart, dateEnd])
            .andWhere('category', category)
            .andWhere('id_user', id_user)
            .orderBy('date', 'asc')
            .select()

    },
    async queryExpenseDatabaseDate(id_user, dateStart, dateEnd) {
        const expense = await connection('expense')
            .whereBetween('date', [dateStart, dateEnd])
            .andWhere('id_user', id_user)
            .orderBy('date', 'asc')
            .select()

        return expense
    },

    async queryExpenseDatabaseDateDefault(id_user) {

        const expense = await connection('expense')
        .whereBetween('date', [dateStart, dateEnd])
        .andWhere('id_user', id_user)
        .orderBy('date', 'asc')
        .select()
        
        
        return expense
    },
    
    
    async queryExpenseDatabaseDateAndCategory(id_user, dateStart, dateEnd, category) {
        const expense = await connection('expense')
        .whereBetween('date', [dateStart, dateEnd])
        .andWhere('category', category)
        .andWhere('id_user', id_user)
        .orderBy('date', 'asc')
        .select()
        
        console.log(id_user, dateStart, dateEnd, category)
        return expense
    }
}