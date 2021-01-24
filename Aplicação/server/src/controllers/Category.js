const connection = require('../database/connection')
module.exports = {
    async listCategory(req, res){
        const id_user = req.params.id 
        const category = await connection('category')
        .where('id_user', id_user)
        .orderBy('category', 'asc')
        .select()
 
        return res.status(200).json(category)
    },

    async removeCategory(req, res){
        const category = await connection('category')
        .where('id', req.params.id)
        .select()
        .first()

        if(!category)  
        return res.status(404).json({msg: 'not found'})

        await connection('category').where('id', category.id)
        .delete()

        return res.status(204).json({msg: 'deleted'})
    }
}