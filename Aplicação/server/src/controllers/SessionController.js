
const connection = require("../database/connection");

module.exports = {
    async create(req, res) {
        const { user, password } = req.body


        if (user == undefined || password == undefined) {
            return res.status(404).json({ msg: 'User not found' })
        } 

        const User = await connection('users')
            .where('user', user)
            .select()
            .first()
        
        if (!User) {
            return res.status(404).json({ msg: 'User not found' })
        } else {
            
            return res.status(200).json(User)
        }
    }
}