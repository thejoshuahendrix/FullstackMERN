const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");




router.get("/customer", async (req, res) => {
    try{
        Customer.find().sort({date: -1}).then((customers) => res.json(customers))
    }catch (err) {
        response.status(500).send(err)
    }
})
router.post("/customer", async (request, response) => {
  try {
    var customer = new Customer(request.body);
    var result = await customer.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.delete("/customer/:id", (req, res) => {
    Customer.findByIdAndDelete(req.params.id).then(res.json({ message: "Deleted" }));
  });
  

module.exports = router;