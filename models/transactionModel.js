const mongoose = require('mongoose');

const transactionsSchema = mongoose.Schema({

    user_id:{
        type:String,
        required:true,
    },
    dealer_id:{
        type:String,
    },
    admin_id:{
        type:String,
    },
    product_id:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true
    }


})

const transactionsModel = mongoose.model("dealers", transactionsSchema);
module.exports = transactionsModel;