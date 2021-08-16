const express = require("express");
const router = express.Router();
const Bcrypt = require("bcryptjs");
const User = require("../models/User");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function generateAccessToken(username) {
  return jwt.sign(username, "secretKey", { expiresIn: "1800s" });
}

router.get("/", verifyToken, (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then((users) => res.json(users));
});

router.delete("/:id", verifyToken, (req, res) => {
  User.findByIdAndDelete(req.params.id).then(res.json({ message: "Deleted" }));
});

router.post("/register", async (request, response) => {
  try {
    request.body.password = Bcrypt.hashSync(request.body.password, 10);
    var user = new User(request.body);
    var result = await user.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/login", async (request, response) => {
  try {
    const user = await User.findOne({ name: request.body.name }).exec();
    if (!user) {
      return response
        .status(400)
        .send({ message: "The username does not exist" });
    }
    if (!Bcrypt.compareSync(request.body.password, user.password)) {
      return response.status(400).send({ message: "The password is invalid" });
    }
    //response.send("The username and password combination is correct!");
    //Auth JWT Somewhere here
    const token = generateAccessToken({ username: request.body.name });
    response.json(token);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

function verifyToken(req, res, next) {
  //Get auth header
  const bearerHeader = req.headers["authorization"];
  console.log("Header", bearerHeader);
  //Check if bearer is undefined
  try {
    if (typeof bearerHeader !== undefined) {
      const bearer = bearerHeader.split(" ");
      //get token from array
      const bearerToken = bearer[1];
      //set the token
      req.token = bearerToken;
      jwt.verify(req.token, "secretKey", (err, data) => {
        if (err) {
          res.sendStatus(403);
        } else {
          res.user = data;
          next();
        }
      });
    } else {
      //Forbidden
      res.sendStatus(403);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(403);
  }
}

module.exports = router;
