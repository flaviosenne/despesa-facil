// const bcrypt = require('bcryptjs')
const UserSchema = require('mongoose').Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        lowercase: true
    },
    user: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
})

// UserSchema.pre('save', async function(next) {
//     const hash = await bcrypt.hash(this.password, 10)

//     this.password = hash

//     next()
// })

module.exports = require('mongoose').model('User', UserSchema, 'user');