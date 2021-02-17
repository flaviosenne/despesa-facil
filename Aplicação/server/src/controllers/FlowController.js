const connection = require("../database/connection")

const { existUserDatabase } = require('../services/helpers')
const {
    queryExpenseDatabase,
    queryRecepDatabase,

    queryDatabaseCategory,
    queryDatabaseDateDefault,
    queryDatabaseDateAndCategory,
    queryDatabaseDate, } = require('../services/queries')

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

        if (dateStart > dateEnd) {
            var aux = dateEnd
            dateEnd = dateStart
            dateStart = aux
        }


        // if ((!category && !dateStart && !dateEnd) ||
        if (category == 'undefined' && dateStart
            == 'undefined' && dateEnd == 'undefined') {
            const flow = await queryDatabaseDateDefault(id_user)

            return res.status(200).json(flow)
        }

        // if ((dateStart && dateEnd && category) &&
        if (dateStart != 'undefined' && dateEnd
            != 'undefined' && category != 'undefined') {
            const flow = await queryDatabaseDateAndCategory(id_user, dateStart, dateEnd, category)

            return res.status(200).json(flow)
        }

        if ((category) && (category != 'undefined')) {

            const flow = await queryDatabaseCategory(id_user, category)

            return res.status(200).json(flow)
        }

        // if ((dateStart && dateEnd) &&
        if (dateStart != 'undefined' && dateEnd != 'undefined') {
            const flow = await queryDatabaseDate(id_user, dateStart, dateEnd)

            return res.status(200).json(flow)
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
            .andWhere('id_user', id_user)
            .first()

        if (!id_category) {
            id_category = await connection('category').insert(
                {
                    category: category.toUpperCase().trim(),
                    id_user
                })
        }
        const dateValidated = !date ? (year + '-' + month + '-' + day) : date

        var yearr = dateValidated.split('-')[0]

        var mounth = Number(dateValidated.split('-')[1]) < 10 ?
            '0' + Number(dateValidated.split('-')[1]) :
            (dateValidated.split('-')[1])

        var days = dateValidated.split('-')[2]

        await connection('flow').insert({
            category: id_category[0] || id_category.id,
            type,
            description: description.trim(),
            status: !status ? 'pendente' : status,
            value,
            date: yearr + '-' + mounth + '-' + days,
            id_user
        })
        for (let i = 1; i < quantity; i++) {

            if (Number(mounth) < 12) {
                mounth++
                mounth = (mounth < 10 ? '0' + mounth : mounth)

            } else {
                yearr++
                mounth = '01'

            }

            await connection('flow').insert({
                category: id_category.id,
                type,
                description: description.trim(),
                status: !status ? 'pendente' : status,
                value,
                date: yearr + '-' + mounth + '-' + days,
                id_user
            })

        }

        return res.status(201).json({ msg: 'created' })


    },

    async updateFlow(req, res) {

        const { id } = req.params
        const id_user = req.body.authorization

        const { description, status, date, value, category } = req.body

        if (category > 0) {

            var id_category = await connection('category')
                .select()
                .where('id', category)
                .first()
        } else {
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
                category: id_category[0] || id_category.id
            })
            .where('id', id)
            .andWhere('id_user', id_user)


        if (flow == 0) {
            return res.status(404).json({ msg: 'not found' })
        }

        return res.status(204).json({ msg: "updated success" })
    },

    async getOneFlow(req, res) {

        const { id } = req.params
        const flow = await connection('flow')
            .select()
            .where('id', id).first()

        if (!flow) {
            return res.status(404).json({ msg: 'not found' })
        }

        return res.status(200).json(flow)
    }

}