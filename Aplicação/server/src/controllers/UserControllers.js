const connection = require('../database/connection')
const { existEmailDatabase, existUserDatabase } = require('../services/helpers')

const crypto = require('crypto')

const bcrypt = require('bcryptjs')

const salt = bcrypt.genSaltSync(10)

module.exports = {
    async createUser(req, res) {
        const { name, user, email, password } = req.body

        const isEmail = await existEmailDatabase(email)
        const isUser = await existUserDatabase(email)

        if (isEmail)
            return res.json({ msg: 'Email already exist' })
        
        if (isUser)
            return res.json({ msg: 'User already exist' })


        const id = crypto.randomBytes(4).toString('HEX')

        const hash = bcrypt.hashSync(password, salt, (err, hash) => {
            if (err) {
                console.log(err)
                return undefined
            }
            return hash
        })

        await connection('users').insert({
            // método trim remove os espaços em branco do começo
            //e do fim da string
            id, name,
            user: user.toLowerCase().trim(),
            email: email.toLowerCase().trim(),
            password: hash
        })

        return res.status(201).json(id)
    },

    async listUser(req, res) {
        const users = await connection('users').select()

        return res.status(200).json(users)
    },

    async getOneUser(req, res) {
        const { id } = req.params
        const user = await connection('users').where('id', id).select()

        if(user.length == 0){
            return res.status(404).json({msg:'not found'})

        }
        return res.status(200).json(user)
    },

    async updateUser(req, res) {

        const { id } = req.params

        const { name, user, email } = req.body


        const User = await connection('users')
            .where('id', id)
            .update({
                name,
                user: user.toLowerCase().trim(),
                email: email.toLowerCase().trim(),
            })

        if (User == 0) {

            return res.status(404).json({ msg: 'not found' })
        }

        return res.status(200).json({ msg: "updated success" })
    }


}