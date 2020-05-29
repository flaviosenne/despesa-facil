const User = require('../model/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');


const UserController = {
    async create(req, res) {
        try {
            const { user } = req.body;
            if (await User.findOne({ user })) {
                return res.json({ Status: `${user} já cadastrado` })
            }
            await User.create(req.body);
            return res.json({ 
                Status: `created sucesseful`,
                user,
                token: generateToken({id: user.id})
            })
        }
        catch (err) {
            return res.json({ Status: "Error" })
        }
    },

    async read(req, res) {
        try {
            return res.json(await User.find())
        }
        catch (err) {
            return res.json({ Status: "Error" })
        }
    },

    async getOne(req, res) {
        try {
            const id = req.params.id
            console.log(req.params.id)
            const getOne = await User.findById(id)
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

        try {
            const id = req.body._id
            const obj = await User.findByIdAndUpdate(id, req.body)
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
        try {
            const id = req.body._id
            const obj = await User.findByIdAndDelete(id)
            if (obj) {
                res.json({ status: `${obj.id} removed` })
            } else {
                res.json({ status: `${obj.id} not found` })
            }
        }
        catch (err) {
            res.json({ status: `error` })

        }
    },
    async authenticate(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).send({ Error: "User not found" })
        }
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({ Error: "Invalid pssword" })
        }

        user.password = "*********"

        // const token = jwt.sign({id: user.id}, authConfig.secret, {
        //     expiresIn: 86400, // quando token expira
        // });

        res.send({
            user,
            token: generateToken({id: user.id})
        })
    }

}

module.exports = UserController;