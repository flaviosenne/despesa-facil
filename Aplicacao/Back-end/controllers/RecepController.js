const Recep = require('../model/Recep');

const RecepController = {
    async create(req, res) {
        const { date, value } = req.body
        try {
            await Recep.create({
                date, value
            });
            return res.json({ Status: "Create Sucessful", date, value });
        }
        catch(err){
            return res.json({ Status: "Error Create"});
        }
    },
    async read(req, res){
        try{
            const read = await Recep.find()
            return res.json(read)
        }
        catch(err){
            return res.json({Status: "Error"})
        }
    },
    async getOne(req, res){
        try{
            const id = req.params.id
            console.log(req.params.id)
            const getOne = await Recep.findById(id)
            if (getOne) {
                return res.send(getOne).end()
            }
            else {
                return res.status(404).end()
            }
        }
        catch(err){
            return res.json({Status:"Error"})
        }
    },
    async remove(req, res){
        try{
            const id = req.body._id
            const obj = await Recep.findByIdAndDelete(id)
            if(obj){
                res.json({status: `${obj.id} removed`})
            }else{
                res.json({status: `${obj.id} not found`})
            }
        }
        catch(err){
            res.json({status: `error`})

        }
    }
}

module.exports = RecepController;