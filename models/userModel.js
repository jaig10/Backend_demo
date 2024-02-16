const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
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
        role:{
            type:String,
            required:true,
            enum:["user","admin","dealer"],
            default:"user"
        },
        commission_rate:{
            type:String
        }
    }
)

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;