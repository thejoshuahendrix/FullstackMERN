const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const Post = require("../models/Post");

router.get("/posts", verifyToken, (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts));
});

router.post("/posts", verifyToken, async (req, res) => {
  try {
    const post = new Post(req.body);
    const result = await post.save();
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send();
  }
});

router.delete("/posts/:id", verifyToken, async (req, res) => {
  Post.findByIdAndDelete(req.params.id).then(res.json({ message: "Deleted" }));
});

router.post("/posts/update/:id", async (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
    if (err) {
      res.status(500).send();
    } else {
      res.status(200).send();
    }
  });
});

function verifyToken(req, res, next) {
  //Get auth header
  const bearerHeader = req.headers["authorization"];
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
    res.sendStatus(403);
  }
}

module.exports = router;
