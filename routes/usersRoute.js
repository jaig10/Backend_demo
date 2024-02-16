const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Deal = require("../models/dealModel");
const Transaction = require("../models/transactionModel");
const bcrypt = require("bcryptjs");

router.post("/users", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(200).send({ msg: "User already exists" });
    }

    console.log(req.body);
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newuser = new User(req.body);
    await newuser.save();
    res.status(200).send({ msg: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error in creating user", error });
  }
});

router.get("/all-users", async (req, res) => {
  try {
    const allUsers = await User.find();
    if (!allUsers) {
      res.status(200).send({ msg: "No User found", data: allUsers });
    }
    res
      .status(200)
      .send({ msg: "All users data sent successfully", data: allUsers });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error in getting all users data", error });
  }
});

router.post("/deal-admin-dealer", async (req, res) => {
  try {
    const dealer = await User.findById(req.body.dealer_id);

    if (!dealer) {
      throw new Error("Dealer not found or commission rate is missing");
    }

    const price = Number(req.body.price);
    const commissionRate = Number(dealer.commission_rate);

    if (isNaN(price)) {
      throw new Error("Invalid price");
    }
    if (isNaN(commissionRate)) {
      throw new Error("Invalid commission rate");
    }

    const updatedPrice = ((price * commissionRate) / 100).toString();
    const deal = new Deal({
      dealer_id: req.body.dealer_id,
      admin_id: req.body.admin_id,
      product_id: req.body.product_id,
      price: updatedPrice,
    });

    await deal.save();
    res
      .status(200)
      .send({
        msg: "Deal is done successfully between admin and dealer",
        data: deal,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error in getting all deals data", error });
  }
});

router.post("/deal-admin-user", async (req, res) => {
  try {
    const deal = new Transaction(req.body);

    await deal.save();
    res
      .status(200)
      .send({
        msg: "Deal is done successfully between admin and user",
        data: deal,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error in getting all deals data", error });
  }
});
router.post("/deal-dealer-user", async (req, res) => {
  try {
    const deal = new Transaction(req.body);

    await deal.save();
    res
      .status(200)
      .send({
        msg: "Deal is done successfully between dealer and user",
        data: deal,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error in getting all deals data", error });
  }
});

module.exports = router;
