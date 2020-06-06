const Expense = require('../model/Expense')

const ExpenseController = {
    async create(req, res) {
        try {
            const { date, description, status, value } = req.body;
            if(Expense.findOne(description) == Expense.create()){
                return res.json({Status: "ID já cadastrado"})
            }
            else{            
                await Expense.create({ date, description, status, value })
                return res.json({ Status: "Create", date, description, status, value })
    
            }
        }
        catch (err) {
            return res.josn({ Status: "error" })
        }
    },

    async read(req, res) {
        try {
            const read = await Expense.find()
            return res.json(read)
        }
        catch (err) {
            return res.json({ Status: "Error" })
        }
    },

    async getOne(req, res) {
        try {
            const id = req.params.id
            console.log(req.params.id)
            const getOne = await Expense.findById(id)
            if (getOne) {
                return res.send(getOne).end()
            }
            else {
                return res.status(404).end()
            }
        }
        catch (err) {
            return res.json({ Status: "Error" })
        }
    },

    async update(req, res) {
        // const id = req.params.id
        // const user = await Recep.findByIdAndUpdate(id)

        // return res.send(user)

        try {
            const id = req.body._id
            const obj = await Expense.findByIdAndUpdate(id, req.body)
            if (obj) {// obj foi encontrado
                //HTTP 204: No content

                return res.send(obj).end()
            } else {
                return res.send(obj).end()
            }
        }
        catch (erro) {
            console.log(erro)
            return res.status(500).send(erro)
        }
    },

    async remove(req, res) {
            
            const id = req.params.id
            try{
                await Expense.findByIdAndDelete(id)

                res.json("Removido com sucesso")
            }
            catch(err){
                res.json(err)
            }

    }
}

module.exports = ExpenseController;