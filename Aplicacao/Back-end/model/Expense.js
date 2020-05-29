const mongoose = require('mongoose')

const ExpenseSchema = mongoose.Schema({
    date:{
        type: Date,
        required: true,
        default: Date.now()
    },
    description:{
        type: String,
        required: true,
        default: `make expense`
    },
    Satus:{
        type: String,
        required: true,
        default: "undefined",
    },
    value:{
        type: Number,
        required: true,
    },

});
module.exports = mongoose.model('Expense', ExpenseSchema, 'expense')