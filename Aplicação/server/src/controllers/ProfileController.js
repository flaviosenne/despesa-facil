const connection = require("../database/connection")
const { filterByCategory} = require('./FilterByCategory')
const helpers = require('../services/helpers')
module.exports = {
    async index(req, res){
        const id_user = req.headers.authorization

        const { category} = req.headers
       
            const result = await filterByCategory(category, id_user)
           
            console.log(result)
            return res.json({
                expense: helpers.orderBy(result.expense) 
                ,
                recep:  helpers.orderBy(result.recep) 
            })
           
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
            return res.json({msg: 'deleted'})
    }
}