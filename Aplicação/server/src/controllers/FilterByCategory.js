const connection = require('../database/connection')
module.exports ={
    async filterByCategory(req, res) {
        const { category } = req.body
        const expense = await connection('expense')
        .where('category', category.toUpperCase().trim())
        .select()

        return res.json(expense)
    }
}