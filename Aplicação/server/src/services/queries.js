const connection = require('../database/connection')
const day = '01'

const month =
    (new Date().getMonth() + 1) < 10 ?
        '0' + (new Date().getMonth() + 1) :
        (new Date().getMonth() + 1)

const monthEnd =
    (new Date().getMonth() + 2) < 10 ?
        '0' + (new Date().getMonth() + 2) :
        (new Date().getMonth() + 2)

const year = new Date().getFullYear()

const dateStart = year + '-' + month + '-' + day
const dateEnd = year + '-' + monthEnd  + '-' + day

module.exports = {
     // --------------------------------//
    //Query expense in database 
    async queryExpenseDatabase(id_user, order) {

        if (order == 'pendente' || order == 'finalizado') {
            return await connection('flow')
                .where('status', order)
                .andWhere('flow.id_user', id_user)
                .andWhere('type', 'expense')
                .join('category', 'category.id', '=', 'flow.category')
                .select(['flow.id', 'flow.type', 'flow.status', 'flow.description', 'flow.date', 'flow.value', 'flow.id_user', 'category.category'])
                .orderBy('date', 'asc')
        }
        if (order == 'category') {
            return await connection('flow')
                .where('flow.id_user', id_user)
                .andWhere('type', 'expense')
                .join('category', 'category.id', '=', 'flow.category')
                .select(['flow.id', 'flow.type', 'flow.status', 'flow.description', 'flow.date', 'flow.value', 'flow.id_user', 'category.category'])
                .orderBy('category.category', 'asc')
        }
        return await connection('flow')
            .where('flow.id_user', id_user)
            .andWhere('type', 'expense')
            .join('category', 'category.id', '=', 'flow.category')
            .select(['flow.id', 'flow.type', 'flow.status', 'flow.description', 'flow.date', 'flow.value', 'flow.id_user', 'category.category'])
            .orderBy(order, 'asc')

    },


    // --------------------------------//
    //Query recep

    async queryRecepDatabase(id_user, order) {

        if (order == 'pendente' || order == 'finalizado') {
            return await connection('flow')
                .where('status', order)
                .andWhere('flow.id_user', id_user)
                .andWhere('type', 'recep')
                .join('category', 'category.id', '=', 'flow.category')
                .select(['flow.id', 'flow.type', 'flow.status', 'flow.description', 'flow.date', 'flow.value', 'flow.id_user', 'category.category'])
                .orderBy('date', 'asc')
        }
        if (order == 'category') {
            return await connection('flow')
                .where('flow.id_user', id_user)
                .andWhere('type', 'recep')
                .join('category', 'category.id', '=', 'flow.category')
                .select(['flow.id', 'flow.type', 'flow.status', 'flow.description', 'flow.date', 'flow.value', 'flow.id_user', 'category.category'])
                .orderBy('category.category', 'asc')
        }
        return await connection('flow')
            .where('flow.id_user', id_user)
            .andWhere('type', 'recep')
            .join('category', 'category.id', '=', 'flow.category')
            .select(['flow.id', 'flow.type', 'flow.status', 'flow.description', 'flow.date', 'flow.value', 'flow.id_user', 'category.category'])
            .orderBy(order, 'asc')

    },



    // ---------------------------//
    // Query generic
    async queryDatabaseCategory(id_user, category) {

        return await connection('flow')
            .whereBetween('date', [dateStart, dateEnd])
            .andWhere('category', category)
            .andWhere('id_user', id_user)
            .orderBy('date', 'asc')
            .select()

    },

    async queryDatabaseDate(id_user, dateStart, dateEnd) {
        return await connection('flow')
            .whereBetween('date', [dateStart, dateEnd])
            .andWhere('id_user', id_user)
            .orderBy('date', 'asc')
            .select()
    },

    async queryDatabaseDateDefault(id_user) {

        return await connection('flow')
            .whereBetween('date', [dateStart, dateEnd])
            .andWhere('id_user', id_user)
            .orderBy('date', 'asc')
            .select()

    },

    async queryDatabaseDateAndCategory(id_user, dateStart, dateEnd, category) {

        return await connection('flow')
            .whereBetween('date', [dateStart, dateEnd])
            .andWhere('category', category)
            .andWhere('id_user', id_user)
            .orderBy('date', 'asc')
            .select()

    },


    async queryCategoryInFlowToChart(id_user, initial, end){
       
        
        return  await connection('flow')
                .whereBetween('date', [initial, end])
                .andWhere('flow.id_user', id_user)
                .andWhere('type', 'expense')
                .join('category', 'category.id', '=', 'flow.category')
                .select(['flow.id', 'flow.type', 'flow.status', 'flow.description', 'flow.date', 'flow.value', 'flow.id_user', 'category.category'])
                .orderBy('date', 'asc')


    }

}