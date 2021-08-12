const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const chalk = require("chalk");
const cors = require("cors");
const session = require("express-session");
const app = express();
const PORT = 4000;
const jwt = require('jsonwebtoken');

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



app.get("/posts", verifyToken, (req, res) => {
  jwt.verify(req.headers.token, "secretKey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
      console.log(err)
    } else {
      res.json({
        message: "Post Created",
        authData,
      });
    }
  });
});

function verifyToken(req,res,next) {
  //Get auth header
  const bearerHeader = req.headers['authorization'];
  //Check if bearer is undefined
  try{
      if(typeof bearerHeader !== undefined){
          const bearer = bearerHeader.split(' ');
          //get token from array
          const bearerToken = bearer[1];
          //set the token
          req.token = bearerToken;
          next();
      }else{
          //Forbidden
          res.sendStatus(403);
      }
  } catch (err) {
      res.sendStatus(403);
  }
  
}


app.listen(PORT, () => {
  console.log("Server running on port : " + PORT);
});
