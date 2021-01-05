const connection = require("../database/connection")

const {
    queryExpenseDatabase,

    queryRecepDatabase,

    queryDatabaseCategory,
    queryDatabaseDateDefault,
    queryDatabaseDateAndCategory,
    queryDatabaseDate,

    existUserDatabase } = require('../services/helpers')

module.exports = {

    async indexExpense(req, res) {
        const { order } = req.headers
        const id_user = req.headers.authorization

        const expense = await queryExpenseDatabase(id_user, order)

        return res.status(200).json(expense)
    },

    async indexRecep(req, res) {
        const { order } = req.headers

        const id_user = req.headers.authorization

        const expense = await queryRecepDatabase(id_user, order)

        return res.status(200).json(expense)
    },

    async indexFlow(req, res) {

        const { category } = req.headers
        var dateStart = req.headers.datestart
        var dateEnd = req.headers.dateend

        const id_user = req.headers.authorization

        if(dateStart > dateEnd){
            var aux = dateEnd
            dateEnd = dateStart
            dateStart = aux
        }

        // if ((!category && !dateStart && !dateEnd) ||
        if(category == 'undefined' && dateStart
        == 'undefined' && dateEnd == 'undefined') {
            const flow = await queryDatabaseDateDefault(id_user)
            
            return res.json(flow)
        }

        // if ((dateStart && dateEnd && category) &&
            if(dateStart != 'undefined' && dateEnd
                != 'undefined' && category != 'undefined') {
            const flow = await queryDatabaseDateAndCategory(id_user, dateStart, dateEnd, category)

            return res.json(flow)
        }

        if ((category) && (category != 'undefined')) {

            const flow = await queryDatabaseCategory(id_user, category)

            return res.json(flow)
        }

        // if ((dateStart && dateEnd) &&
            if(dateStart != 'undefined' && dateEnd != 'undefined') {
            const flow = await queryDatabaseDate(id_user, dateStart, dateEnd)

            return res.json(flow)
        }
    },

    async removeFlow(req, res) {
        const id_user = req.headers.authorization
        const { id } = req.params

        const flow = await connection('flow')
            .where('id', id)
            .andWhere('id_user', id_user)
            .delete()


        if (flow == 0) {
            res.status(404)
            return res.json({ msg: 'not found' })
        }

        return res.status(204).json({ msg: 'flow deleted' })
    },

    async createFlow(req, res) {
        const day =
            (new Date().getDate()) < 10 ?
                '0' + (new Date().getDate()) :
                (new Date().getDate())

        const month =
            (new Date().getMonth() + 1) < 10 ?
                '0' + (new Date().getMonth() + 1) :
                (new Date().getMonth() + 1)

        const year = new Date().getFullYear()

        const { description, status, type, value, date, category, quantity = 1 } = req.body
        const id_user = req.body.authorization

        const user = await existUserDatabase(id_user)

        if (!user) return res.json({ msg: 'user not found' })


        var id_category = await connection('category')
            .select()
            .where('category', category.toUpperCase().trim())
            .first()

        if (!id_category) {

            id_category = await connection('category').insert(
                {
                    category: category.toUpperCase().trim(),
                    id_user
                })
        }

        // var quantity = 12

        const dateValidated = !date ? (year + '-' + month + '-' + day) : date
        
        await connection('flow').insert({
            category: id_category.id,
            type,
            description: description.trim(),
            status: !status ? 'pendente' : status,
            value,
            date: dateValidated,
            id_user
        })

        var cont = 1
        for(let i = 1; i< quantity; i++){
            let year = dateValidated.split('-')[0]
            
            let mounth = (Number(dateValidated.split('-')[1]) + i) < 10 ?
            '0'+(Number(dateValidated.split('-')[1]) + i):
            (Number(dateValidated.split('-')[1]) + i)
            
            let day = dateValidated.split('-')[2]
            if(Number(mounth) > 12){
                if(cont > 12){
                    cont = 1
                }
                year ++
                // outro ano
                mounth = cont < 10 ? '0'+cont : cont
                cont ++
            }
            
            await connection('flow').insert({
                category: id_category.id,
                type,
                description: description.trim(),
                status: !status ? 'pendente' : status,
                value,
                date: year + '-'+ mounth + '-'+ day,
                id_user
            })
        }

        return res.json({ msg: 'ok' })


    },

    async updateFlow(req, res) {

        const { id } = req.params
        const id_user = req.body.authorization

        const { description, status, date, value, category } = req.body

        if(category > 0){

            var id_category = await connection('category')
            .select()
            .where('id', category)
            .first()
        }else{
            var id_category = await connection('category')
            .select()
            .where('category', category.toUpperCase().trim())
            .first()
        }

        if (!id_category) {

            await connection('category').insert(
                {
                    category: category.toUpperCase().trim(),
                    id_user
                })

            id_category = await connection('category')
                .select()
                .where('category', category.toUpperCase().trim())
                .first()
        }

        const flow = await connection('flow')
            .update({
                description, status, date, value,
                category: id_category.id
            })
            .where('id', id)
            .andWhere('id_user', id_user)


        if (flow == 0) {
            return res.status(404).json({ msg: 'not found' })
        }

        return res.json({ msg: "updated success" })
    },

    async getOneFlow(req, res) {

        const { id } = req.params
        const flow = await connection('flow')
            .select()
            .where('id', id).first()

        if (!flow) {
            return res.status(404).json({ msg: 'not found' })
        }

        return res.json(flow)
    }

}