const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const jwt = require("jsonwebtoken");

router.get("/customer", verifyToken, async (req, res) => {
  try {
    Customer.find()
      .sort({ date: -1 })
      .then((customers) => res.json(customers));
  } catch (err) {
    response.status(500).send(err);
  }
});
router.post("/customer", verifyToken, async (request, response) => {
  try {
    var customer = new Customer(request.body);
    var result = await customer.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.delete("/customer/:id", verifyToken, (req, res) => {
  Customer.findByIdAndDelete(req.params.id).then(
    res.json({ message: "Deleted" })
  );
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
