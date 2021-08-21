const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const chalk = require("chalk");
const cors = require("cors");

const app = express();
const PORT = 4000;
const jwt = require("jsonwebtoken");
const { response } = require("express");
app.use(express.json());
app.use(cors());

const DB = process.env.MONGO_URI;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(chalk.bgBlue.white.bold("[Mongo Connected]"));
  })
  .catch((err) => console.log(err));

app.use("/", require("./routes/users"));
app.use("/", require("./routes/posts"));
app.use("/", require("./routes/customers"));


app.listen(PORT, () => {
  console.log("Server running on port : " + PORT);
});
