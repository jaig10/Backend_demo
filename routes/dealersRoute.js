const express = require("express");
const router = express.Router();
const Dealer = require("../models/dealersModel");
const bcrypt = require("bcryptjs");

router.post("/dealers", async (req, res) => {
  try {
    const dealerExists = await Dealer.findOne({ email: req.body.email });
    if (dealerExists) {
      return res.status(200).send({ msg: "Dealer already exists" });
    }

    console.log(req.body);
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newuser = new Dealer(req.body);
    await newuser.save();
    res.status(200).send({ msg: "Dealer created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error in creating Dealer", error });
  }
});

router.get("/all-dealers", async (req, res) => {
  try {
    const allUsers = await Dealer.find({});

    res
      .status(200)
      .send({ msg: "All dealers data sent successfully", data: allUsers });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error in getting all dealers data", error });
  }
});

module.exports = router;
