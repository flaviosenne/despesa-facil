const connection = require('../database/connection')

module.exports = {
    async listExpense(req, res){

        const {page=1} =  req.query

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

    async createExpense(req, res){
        const DATE = new Date()
        const year = (DATE.getFullYear())
        const month = (DATE.getMonth()+1) < 10? '0' + (DATE.getMonth()+1):(DATE.getMonth()+1)
        const day = (DATE.getDate()) < 10? '0' + (DATE.getDate()):(DATE.getDate())

        const {description, status, value, date} = req.body
        const id_user = req.body.headers.Authorization
       

        // formatar data que vem do front-end
        if(date != undefined){
            var date2 = date.split('-')
        }
        const [id] = await connection('expense').insert({
            description,
            status,
            value,
            date: date != undefined? 
                (date2[2]+'/'+date2[1]+'/'+date2[0]):
                (day+ '/'+month+'/'+ year),
            id_user
        })

        return res.json({id})
        
    },
    async deleteExpense(req, res){

        const {id} = req.params
        const id_user = req.headers.authorization

        const expense = await connection('expense')
            .where('id', id)
            .select('id_user')
            .first()

        if(expense.id_user != id_user){
            return res.status(401).json({err: "aren't authorization"})
        }

        await connection('expense').where('id', id).delete()

        return res.status(204).send()
    },
    async getOneExpense(req, res) {

        const {id} = req.params
        const expense = await connection('expense').where('id', id)


        if(expense.length == 0){
            console.log(expense)
            return res.status(404).json({msg: 'not found'})
        }
        
        return res.json(expense)
    },

    async updateExpense(req, res) {

        const {id} = req.params
        // const id_user = req.body.header.authorization

        const { description, status, date, value, id_user} = req.body
        const expense = await connection('expense')
            .where('id', id)
            .update({
                description, status, date, value, id_user})


        if(expense == 0){
            console.log(expense)
            return res.status(404).json({msg: 'not found'})
        }
        
        return res.json({msg: "updated success"})
    }
    
}