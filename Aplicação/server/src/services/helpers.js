const connection = require('../database/connection')
const day = '01'

const month =
    (new Date().getMonth() + 1) < 10 ?
        +'0' + (new Date().getMonth() + 1) :
        (new Date().getMonth() + 1)

const year = new Date().getFullYear()

const dateStart = year + '-' + month + '-' + day
const dateEnd = year + '-' + Number(month + 1) + '-' + day

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

        const result = await connection('users')
            .where('email', email)
            .select('id', 'email')
            .first()

        return result
    },
    async existUserDatabase(id) {

        return await connection('users')
            .where('id', id)
            .select('id')
            .first()

    },

    async codeIsValid(code){

        const data = await connection('codeRecoveryPassword')
        .select()
        .where({code: code})
        .andWhere({used: false})
        .first()

        return data
        

    },

    // queries expense in database 
    async queryExpenseDatabaseCategory(table, id_user, category) {


        return await connection(table)
            .whereBetween('date', [dateStart, dateEnd])
            .andWhere('category', category)
            .andWhere('id_user', id_user)
            .orderBy('date', 'asc')
            .select()

    },
    async queryExpenseDatabaseDate(table, id_user, dateStart, dateEnd) {
        return await connection(table)
            .whereBetween('date', [dateStart, dateEnd])
            .andWhere('id_user', id_user)
            .orderBy('date', 'asc')
            .select()


    },

    async queryExpenseDatabaseDateDefault(table, id_user) {

        return await connection(table)
            .whereBetween('date', [dateStart, dateEnd])
            .andWhere('id_user', id_user)
            .orderBy('date', 'asc')
            .select()



    },


    async queryExpenseDatabaseDateAndCategory(table, id_user, dateStart, dateEnd, category) {

        return await connection(table)
            .whereBetween('date', [dateStart, dateEnd])
            .andWhere('category', category)
            .andWhere('id_user', id_user)
            .orderBy('date', 'asc')
            .select()

    }
}