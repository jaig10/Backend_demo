const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Product = require("../models/productsModel");


router.get("/all-admins", async (req, res) => {
    try {
        const admins = await User.findOne({role:"admin"});
        if(!admins){
            res
            .status(200)
            .send({msg:"No admin found"});
        }
        res
            .status(200)
            .send({msg:"Admins found", data:admins});
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .send({msg:"error in finding admins", error})
    }
    
})

router.post("/add-product", async (req, res)=>{
    try {
        const prodExists = await Product.findOne({ name: req.body.name });
    if (prodExists) {
      return res.status(200).send({ msg: "Product already exists" });
    }
    console.log(req.body);
    const newProduct= new Product(req.body);
    await newProduct.save();
    res.status(200).send({ msg: "User created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({msg:"Error in adding product"});
    }
})

module.exports = router;