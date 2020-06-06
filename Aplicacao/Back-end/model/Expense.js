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
    status:{
        type: String,
        required: true,
        default: "pendent",
    },
    value:{
        type: Number,
        required: true,
    },

});
module.exports = mongoose.model('Expense', ExpenseSchema, 'expense')