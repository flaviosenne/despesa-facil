const connection = require('../database/connection')

const { existUserDatabase } = require('../services/helpers')
module.exports = {
    async listExpense(req, res) {

        const [count] = await connection('expense').count()


        const expense = await connection('expense')
            .join('users', 'users.id', '=', 'expense.id_user')
            .select(
                ['expense.*',
                    'users.name',
                    'users.email',
                    'users.user'])

        req.header('X-Total-Count', count['count(*)'])

        return res.json(expense)
    },

    async createExpense(req, res) {
        const day =
            (new Date().getDate()) < 10 ?
                +'0' + (new Date().getDate()) :
                (new Date().getDate())

        const month =
            (new Date().getMonth() + 1) < 10 ?
                +'0' + (new Date().getMonth() + 1) :
                (new Date().getMonth() + 1)

        const year = new Date().getFullYear()
        const { description, status, value, date, category } = req.body
        const id_user = req.body.headers.Authorization

        const user = await existUserDatabase(id_user)

        if (!user) return res.json({ msg: 'user not found' })


        const categories = await connection('category')
            .where('category', category.toUpperCase().trim())
            .first()

        if (!categories)
            await connection('category').insert(
                { category: category.toUpperCase().trim() })


        const [id] = await connection('expense').insert({
            category: (category.toUpperCase()).trim() || 'NÂO DEFINIDO',
            description: description.trim(),
            status: !status ? 'pendente': status,
            value,
            date: !date ? (year + '-' + month + '-' + day) : date,
            id_user
        })

        return res.json({ id })


    },
    async deleteExpense(req, res) {

        const { id } = req.params
        const id_user = req.headers.authorization

        const expense = await connection('expense')
            .where('id', id)
            .select('id_user')
            .first()

        if (expense.id_user != id_user) {
            return res.status(401).json({ err: "aren't authorization" })
        }

        await connection('expense').where('id', id).delete()

        return res.status(204).send()
    },
    async getOneExpense(req, res) {

        const { id } = req.params
        const expense = await connection('expense').where('id', id)


        if (expense.length == 0) {
            console.log(expense)
            return res.status(404).json({ msg: 'not found' })
        }

        return res.json(expense)
    },

    async updateExpense(req, res) {

        const { id } = req.params
        // const id_user = req.body.header.authorization

        const { description, status, date, value, id_user } = req.body
        const expense = await connection('expense')
            .where('id', id)
            .update({
                description, status, date, value, id_user
            })


        if (expense == 0) {
            console.log(expense)
            return res.status(404).json({ msg: 'not found' })
        }

        return res.json({ msg: "updated success" })
    }

}