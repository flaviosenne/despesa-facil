const connection = require('../database/connection')

module.exports = {
    async listRecep(req, res){

        const {page=1} =  req.query

        const [count] = await connection('recep').count()
        
        
        const recep = await connection('recep')
        .join('users', 'users.id', '=', 'recep.id_user')
        .limit(10)
        .offset((page - 1)* 10)
        .select(
            ['recep.*',
             'users.name',
              'users.email',
               'users.user'])

        req.header('X-Total-Count', count['count(*)'])

        return res.json(recep)
    },

    async createRecep(req, res){
        const DATE = new Date()
        const year = (DATE.getFullYear())
        const month = (DATE.getMonth()+1) < 10? '0' + (DATE.getMonth()+1):(DATE.getMonth()+1)
        const day = (DATE.getDate())

        const {value, date, description} = req.body
        const id_user = req.body.headers.Authorization
       

        // formatar data que vem do front-end
        if(date != undefined){
            var date2 = date.split('-')
        }
        const [id] = await connection('recep').insert({
            description,
            value,
            date: date != undefined? 
                (date2[2]+'/'+date2[1]+'/'+date2[0]):
                (day+ '/'+month+'/'+ year),
            id_user
        })

        return res.json({id})
        
    },
    async deleteRecep(req, res){

        const {id} = req.params
        const id_user = req.headers.authorization

        const recep = await connection('recep')
            .where('id', id)
            .select('id_user')
            .first()

        if(recep.id_user != id_user){
            return res.status(401).json({err: "aren't authorization"})
        }

        await connection('recep').where('id', id).delete()

        return res.status(204).send()
    },
    async getOneRecep(req, res) {

        const {id} = req.params
        const recep = await connection('recep').where('id', id)


        if(recep.length == 0){
            
            return res.status(404).json({msg: 'not found'})
        }
        
        return res.json(recep)
    },

    async updateRecep(req, res) {

        const {id} = req.params
        // const id_user = req.body.header.authorization

        const { date, value, id_user} = req.body
        const recep = await connection('recep')
            .where('id', id)
            .update({
                date, value, id_user})


        if(recep == 0){
            console.log(recep)
            return res.status(404).json({msg: 'not found'})
        }
        
        return res.json({msg: "updated success"})
    }
    
}