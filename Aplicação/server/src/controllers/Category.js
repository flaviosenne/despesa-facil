const connection = require('../database/connection')
module.exports = {
    async listCategory(req, res){
        const category = await connection('category')
        .select()
 
        return res.json(category)
    },

    async removeCategory(req, res){
        const category = await connection('category')
        .where('id', req.params.id)
        .select()
        .first()

        if(!category)  
        return res.json({msg: 'not found'})

        await connection('category').where('id', category.id)
        .delete()

        return res.json({msg: 'deleted'})
    }
}