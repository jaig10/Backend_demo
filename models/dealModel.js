const mongoose = require('mongoose');

const dealSchema = mongoose.Schema({

    dealer_id:{
        type: String,
        required:true
    },
    admin_id:{
        type: String,
        required:true
    },
    product_id:{
        type: String,
        required:true
    },
    price:{
        type: String,
        required:true
    },
})

const dealsModel = mongoose.model("deals", dealSchema);
module.exports = dealsModel;