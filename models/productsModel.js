const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    price:{
        type:String,
        required:true,
    },
    admin_id:{
        type:String,
        required:true,
    },


})

const productsModel = mongoose.model("products", productsSchema);
module.exports = productsModel;