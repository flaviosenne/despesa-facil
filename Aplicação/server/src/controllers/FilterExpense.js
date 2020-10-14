const connection = require('../database/connection')
module.exports ={
    async filterByCategory(req, res) {
        const { category }=req.body
        const expense = await connection('expense')
        .where('category', category.toUpperCase().trim())
        .orderBy('date', 'asc')
        .select()
        
       
        return res.json(expense)
    },
    async filterByDateAndCategoryAndProfile(req, res) {
        const { dateStart, dateEnd, category }=req.body
        
        const id_user = req.headers.authorization
        if(!category && !dateStart && !dateEnd){
            
        const expense = await connection('expense')
        .where('id_user', id_user)
        .orderBy('date', 'asc')
        .select()

        const recep = await connection('recep')
        .where('id_user', id_user)
        .orderBy('date', 'asc')
        .select()
        
            console.log(expense)
            
            return res.json({expense, recep})
        }

        
        
       
    }
}