const express = require("express");
const router = express.Router();
const Bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { response } = require("express");
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
    const token = generateAccessToken({
      username: request.body.name,
      role: user.role,
    });
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
