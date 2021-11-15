const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const chalk = require("chalk");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;
const jwt = require("jsonwebtoken");
const { response } = require("express");
app.use(express.json());
app.use(cors());
const path = require("path")

app.use(express.static(path.join(__dirname, "client", "build")))



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

app.use("/api/", require("./routes/users"));
app.use("/api/", require("./routes/posts"));
app.use("/api/", require("./routes/customers"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(PORT, () => {
  console.log("Server running on port : " + PORT);
});
