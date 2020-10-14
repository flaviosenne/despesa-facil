const connection = require('../database/connection')
module.exports ={
    async filterByCategory(category, id_user) {
        const expense = await connection('expense')
        .where('id_user', id_user)
        .andWhere('category', category.toUpperCase().trim())
        .orderBy('date', 'asc')
        .select()
        
        const recep = await connection('recep')
        .where('id_user', id_user)
        .andWhere('category', category.toUpperCase().trim())
        .orderBy('date', 'asc')
        .select()

       
        return {expense, recep}
    }
}