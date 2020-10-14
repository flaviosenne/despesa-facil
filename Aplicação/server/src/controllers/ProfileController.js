const connection = require("../database/connection")
const { queryExpenseDatabaseCategory,
    queryExpenseDatabaseDateDefault,
    queryExpenseDatabaseDateAndCategory,
    queryExpenseDatabaseDate}
     = require('../services/helpers')
const helpers = require('../services/helpers')
module.exports = {
    async index(req, res){
        const { dateStart, dateEnd, category }=req.body
        
        const id_user = req.headers.authorization
        
        if(!category && !dateStart && !dateEnd){
            console.log('cheguei aqui')
            const expense = await queryExpenseDatabaseDateDefault(id_user)
            
            return res.json(expense)
        }
        
        if(dateStart && dateEnd && category){
            console.log('cheguei aqui 1')
            const expense = await queryExpenseDatabaseDateAndCategory(id_user, dateStart, dateEnd, category)

            return res.json(expense)
        }

        if(category){
            console.log('cheguei aqui 2')
            const expense = await queryExpenseDatabaseCategory(id_user, category.toUpperCase().trim())
            
            return res.json(expense)
        }
        
        if(dateStart && dateEnd){
            console.log('cheguei aqui 3')
            const expense = await queryExpenseDatabaseDate(id_user, dateStart, dateEnd)

            return res.json(expense)
        }
           
    },
    async remove(req, res){
        const {id} = req.params

        const expense = await connection('expense')
            .where('id', id)
            .delete()

         
            if(expense == 0){
                res.status(404)
                return res.json({msg: 'not found'})
            }

            res.status(204)
            return res.json({msg: 'expense deleted'})
    }
}