const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
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
    const allUsers = await User.find({});

    res
      .status(200)
      .send({ msg: "All users data sent successfully", data: allUsers });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error in getting all users data", error });
  }
});

module.exports = router;
