const mongoose = require('mongoose');

const dealersSchema = mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    commission_rate:{
        type:String,
        required:true,
    },


})

const dealersModel = mongoose.model("dealers", dealersSchema);
module.exports = dealersModel;