const connection = require("../database/connection")

module.exports = {
    async index(req, res){
        const id_user = req.headers.authorization

        const expense = await connection('expense')
            .where('id_user', id_user)
            .orderBy('date', 'asc')
            .select()
            
            const recep = await connection('recep')
            .where('id_user', id_user)
            .orderBy('date', 'asc')
            .select()

            return res.json({expense, recep})
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