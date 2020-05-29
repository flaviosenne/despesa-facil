const mongoose = require('mongoose')

const RecepSchema = mongoose.Schema({
    date:{
        type: Date,
        required: true,
        default: Date.now(),
    },
    value:{
        type: Number,
        required: true,
    },
});
module.exports = mongoose.model('Recep', RecepSchema, 'recep');