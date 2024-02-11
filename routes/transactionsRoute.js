const express = require("express");
const router = express.Router();

router.post("/admin-users", async (req, res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error in selling from admin to user" });
  }
});
