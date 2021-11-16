const express = require("express");
const router = express.Router();
const Bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { res } = require("express");
dotenv.config();

function generateAccessToken(username) {
  return jwt.sign(username, process.env.JWT_TOKEN, { expiresIn: "1800s" });
}

router.get("/", verifyToken, (req, res) => {
  if (res.user.role == process.env.ADMIN_KEY) {
    User.find()
      .sort({ date: -1 })
      .then((users) => res.json(users));
  }
});
router.get("/user/:name", verifyToken, async (req, res) => {
  const user = await User.findOne({ name: req.params.name }).exec();
  if (!user) {
    return res.status(400).send({ message: "The username does not exist" });
  }
  res.json(user);
});

router.delete("/:id", verifyToken, async (req, res) => {
  const user = await User.findOne({ name: res.user.username }).exec();
  if (user._id == req.params.id || user.role == process.env.ADMIN_KEY) {
    User.findByIdAndDelete(req.params.id).then(
      res.json({ message: "Deleted" })
    );
  }
});

router.post("/register", async (req, res) => {
  try {
    req.body.password = Bcrypt.hashSync(req.body.password, 10);
    var user = new User(req.body);
    var result = await user.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name }).exec();
    if (!user) {
      return res.status(400).send({ message: "The username does not exist" });
    }
    if (!Bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(400).send({ message: "The password is invalid" });
    }
    //res.send("The username and password combination is correct!");
    //Auth JWT Somewhere here
    const token = generateAccessToken({
      username: req.body.name,
      role: user.role,
    });
    res.status(200).json(token);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
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
      jwt.verify(req.token, process.env.JWT_TOKEN, (err, data) => {
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
