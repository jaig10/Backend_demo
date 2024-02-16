const express = require('express');
const router = express.Router();
const Product = require("../models/productsModel");


router.get("/all-products", async (req, res) => {

    try {
        const allProducts = await Product.find();
        if(!allProducts){
          res
          .status(200)
          .send({ msg: "No Product found", data: allProducts });
        }
        res
          .status(200)
          .send({ msg: "All products data sent successfully", data: allProducts });
      } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Error in getting all users data", error });
      }
    
})

module.exports = router;