const connection = require("../database/connection");
const bcrypt = require('bcryptjs')

module.exports = {

    async create(req, res) {
        const { user, password } = req.body

        if (user == undefined || password == undefined) {
            return res.status(404).json({ msg: 'User not found' })
        }

        const User = await connection('users')
            .where('user', user.toLowerCase().trim())
            .select()
            .first()

        if(!User){
            return res.status(404).json({ msg: 'User not found' })
        }

        const hash = bcrypt.compareSync(password, User.password)

        if (!hash) {
            return res.status(404).json({ msg: 'User not found' })
        } else {
            return res.status(200).json(User)
        }
    }
}