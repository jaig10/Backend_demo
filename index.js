const express = require("express");
require("dotenv").config();
const dbConfig = require("./config/dbconfig");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoute = require("./routes/usersRoute");
const adminRoute = require("./routes/adminRoute");
const productRoute = require("./routes/productRoute");

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/product", productRoute);

app.get("/", (req, res) => {
  console.log("hello world!");
  res.send("Hello wassup")
});
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
