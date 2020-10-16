const connection = require("../database/connection")

const { queryExpenseDatabaseCategory,
        queryExpenseDatabaseDateDefault,
        queryExpenseDatabaseDateAndCategory,
        queryExpenseDatabaseDate } = require('../services/helpers')

module.exports = {
    async indexExpense(req, res) {
        const { dateStart, dateEnd, category } = req.body

        const id_user = req.body.headers.Authorization


        if (!category && !dateStart && !dateEnd) {
            const expense = await queryExpenseDatabaseDateDefault('expense', id_user)

            return res.json(expense)
        }

        if (dateStart && dateEnd && category) {
            const expense = await queryExpenseDatabaseDateAndCategory('expense', id_user, dateStart, dateEnd, category.toUpperCase().trim())

            return res.json(expense)
        }

        if (category) {
            const expense = await queryExpenseDatabaseCategory('expense', id_user, category.toUpperCase().trim())

            return res.json(expense)
        }

        if (dateStart && dateEnd) {
            const expense = await queryExpenseDatabaseDate('expense', id_user, dateStart, dateEnd)

            return res.json(expense)
        }

    },
    async indexExpenseAll(req, res) {
        const { order } = req.body

        const id_user = req.body.headers.Authorization

        const Order = !order ? 'date': order

        if(Order == 'pendente' || Order == 'finalizado'){
            const expense =  await connection('expense')
            .where('id_user', id_user)
            .andWhere('status', Order)
            .orderBy('date', 'asc')
            .select()
            
            const recep = await connection('recep')
            .where('id_user', id_user)
            .orderBy('date', 'asc')
            .select()
            
            return res.json({expense, recep})
        }else{
            const expense =  await connection('expense')
            .where('id_user', id_user)
            .orderBy(Order, 'asc')
            .select()
            
            const recep = await connection('recep')
            .where('id_user', id_user)
            .orderBy(Order, 'asc')
            .select()

            return res.json({expense, recep})
        }


    },
    async indexRecep(req, res) {
        const { dateStart, dateEnd, category } = req.body

        const id_user = req.headers.authorization

        if (!category && !dateStart && !dateEnd) {
            const recep = await queryExpenseDatabaseDateDefault('recep',id_user)

            return res.json(recep)
        }

        if (dateStart && dateEnd && category) {
            const recep = await queryExpenseDatabaseDateAndCategory('recep',id_user, dateStart, dateEnd, category.toUpperCase().trim())

            return res.json(recep)
        }

        if (category) {
            const recep = await queryExpenseDatabaseCategory('recep',id_user, category.toUpperCase().trim())

            return res.json(recep)
        }

        if (dateStart && dateEnd) {
            const recep = await queryExpenseDatabaseDate('recep',id_user, dateStart, dateEnd)

            return res.json(recep)
        }

    },
    async removeExpense(req, res) {
        const id_user = req.headers.authorization
        const { id } = req.params

        const expense = await connection('expense')
            .where('id', id)
            .andWhere('id_user', id_user)
            .delete()


        if (expense == 0) {
            res.status(404)
            return res.json({ msg: 'not found' })
        }

        res.status(204)
        return res.json({ msg: 'expense deleted' })
    },

    async removeExpense(req, res) {
        const id_user = req.headers.authorization
        const { id } = req.params

        const expense = await connection('recep')
            .where('id', id)
            .andWhere('id_user', id_user)
            .delete()


        if (expense == 0) {
            res.status(404)
            return res.json({ msg: 'not found' })
        }

        res.status(204)
        return res.json({ msg: 'recep deleted' })
    }
}